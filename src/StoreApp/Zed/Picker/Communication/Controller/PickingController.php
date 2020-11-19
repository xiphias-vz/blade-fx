<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use StoreApp\Zed\Picker\Communication\Form\OrderItemSelectionForm;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class PickingController extends AbstractController
{
    protected const REQUEST_PARAM_PICKING_BAGS_COUNT = 'quantity';

    protected const PICKING_SUCCESS_MESSAGE_ORDER_PICKED = 'storeapp.picking.message.success.order-has-been-picked';

    protected const PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED = 'storeapp.picking.message.error.order-is-already-being-processed';
    protected const PICKING_ERROR_MESSAGE_ORDER_FULLY_CANCELLED = 'storeapp.picking.message.error.order-is-fully-cancelled';

    protected const PICKING_INFO_MESSAGE_NO_ORDERS_TO_PICK = 'storeapp.picking.message.info.no-orders-to-pick';
    protected const PICKING_INFO_MESSAGE_ORDER_WILL_MOVE_TO_NEXT_STAGE = 'storeapp.picking.message.info.order-will-be-moved-to-next-stage';

    protected const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    protected const REQUEST_PARAM_CSRF_TOKEN = 'token';
    protected const FORMAT_START_PICKING_TOKEN_NAME = 'start-picking-%d';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $userTransfer = $this->getCurrentUser($request);

        $merchantSalesOrderTransfers = $this
            ->findMerchantSalesOrderCollectionForPicking($userTransfer)
            ->getMerchantSalesOrders();

        $idSalesOrdersForPicking = array_keys(
            $merchantSalesOrderTransfers->getArrayCopy()
        );

        $pickingOrders = [];
        $requestedDeliveryDatesByIdSalesOrders = [];

        if (empty($idSalesOrdersForPicking)) {
            $this->addInfoMessage(
                static::PICKING_INFO_MESSAGE_NO_ORDERS_TO_PICK
            );

            return $this->createIndexActionResponse($request, $requestedDeliveryDatesByIdSalesOrders, $pickingOrders);
        }

        $requestedDeliveryDatesByIdSalesOrders = $this->getFormattedDeliveryDates($idSalesOrdersForPicking);

        foreach ($idSalesOrdersForPicking as $idSalesOrder) {
            $salesOrderTransfer = $this->getFactory()->getSalesFacade()->getOrderByIdSalesOrder($idSalesOrder);
            $merchantSalesOrderTransfer = $merchantSalesOrderTransfers[$idSalesOrder];

            $pickerUserTransfer = $this->getPickerUserTransferByMerchantSalesOrder($merchantSalesOrderTransfer);
            if ($pickerUserTransfer !== null && $pickerUserTransfer->getIdUser() === $userTransfer->getIdUser()) {
                $pickerUserTransfer = null;
            }

            $pickingOrders[] = [
                'idSalesOrder' => $idSalesOrder,
                'reference' => $salesOrderTransfer->getOrderReference(),
                'collectNumber' => $salesOrderTransfer->getCollectNumber(),
                'itemCount' => $salesOrderTransfer->getItems()->count(),
                'picked' => $this->isOrderPicked($merchantSalesOrderTransfer),
                'pickedAt' => $merchantSalesOrderTransfer->getPickedAt(),
                'isPickedBy' => $pickerUserTransfer,
                'requestedDeliveryDate' => $requestedDeliveryDatesByIdSalesOrders[$idSalesOrder],
            ];
        }

        return $this->createIndexActionResponse($request, $requestedDeliveryDatesByIdSalesOrders, $pickingOrders);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function startOrderPickingAction(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER);

        $csrfTokenName = sprintf(static::FORMAT_START_PICKING_TOKEN_NAME, $idSalesOrder);

        if (!$this->isCsrfTokenValid($csrfTokenName, $request)) {
            $this->addErrorMessage(
                MessagesConfig::MESSAGE_PERMISSION_FAILED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $userTransfer = $this->getCurrentUser($request);

        if ($this->isOrderPickingStartedByAnotherUser($idSalesOrder, $userTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $this->assignIdUserToSalesOrder(
            $this->getCurrentUser($request)->getIdUser(),
            $idSalesOrder
        );

        $orderPickingPath = Url::generate(
            PickerConfig::URL_ORDER_PICKING,
            [
                PickerConfig::REQUEST_PARAM_ID_ORDER => $idSalesOrder,
            ]
        )->build();

        return $this->redirectResponse($orderPickingPath);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function orderPickingAction(Request $request)
    {
//        dd(123);
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
            $salesOrderTransfer,
            $userTransfer,
            [OmsConfig::STORE_STATE_READY_FOR_PICKING]
        )) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        if ($this->isOrderPickingStartedByAnotherUser($idSalesOrder, $userTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $aggregatedItemTransfers = $this->getFactory()->getItemAggregator()
            ->aggregateOrderItemsQuantities($salesOrderTransfer->getItems()->getArrayCopy());

        $aggregatedItemTransfers = $this->sortAggregatedItemTransfersByPickingOrder($aggregatedItemTransfers);

        $orderItemSelectionFormDataProvider = $this->getFactory()->createOrderItemSelectionFormDataProvider();
        $orderItemSelectionForm = $this->getFactory()->createOrderItemSelectionForm(
            $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
            $orderItemSelectionFormDataProvider->getOptions($aggregatedItemTransfers, $salesOrderTransfer->getStore())
        );

//        dd(
//            $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
//            $orderItemSelectionFormDataProvider->getOptions($aggregatedItemTransfers, $salesOrderTransfer->getStore())
//        );

        $orderItemSelectionForm->handleRequest($request);

        if ($orderItemSelectionForm->isSubmitted() && $orderItemSelectionForm->isValid()) {
            $pickingBagsCount = (int)$request->get(static::REQUEST_PARAM_PICKING_BAGS_COUNT);

            return $this->processOrderPickingForm(
                $orderItemSelectionForm,
                $pickingBagsCount,
                $salesOrderTransfer
            );
        }

        return [
            'merchant' => $this->getMerchantFromRequest($request),
            'maxPickingBags' => $this->getFactory()->getConfig()->getMaxPickingBags(),
            'itemsCount' => $this->getItemsCount($aggregatedItemTransfers),
            'itemImageUrls' => $this->getSkuToImageMapFromItemTransfers($aggregatedItemTransfers),
            'pickingForm' => $orderItemSelectionForm->createView(),
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'idSalesOrder' => $idSalesOrder,
            'orderReference' => $salesOrderTransfer->getOrderReference(),
            'collectNumber' => $salesOrderTransfer->getCollectNumber(),
            'orderDeliveryTime' => null,
        ];
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $orderPickingForm
     * @param int $pickingBagsCount
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function processOrderPickingForm(
        FormInterface $orderPickingForm,
        int $pickingBagsCount,
        OrderTransfer $salesOrderTransfer
    ): RedirectResponse {
        $formData = $orderPickingForm->getData();

        $skuToSelectedQuantityMap = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToSelectedQuantityMap(
                $formData,
                OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_SKU
            );

        $orderItemStatusesTransfer = $this->getFactory()->getOrderItemsMapper()
            ->mapOrderItemsToOrderItemStatuses(
                $salesOrderTransfer,
                $skuToSelectedQuantityMap
            );

        $orderContainerCollectionTransfer = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToOrderContainerCollection(
                $formData,
                $salesOrderTransfer
            );

//        dd($formData, $pickingBagsCount, $salesOrderTransfer->toArray(), $skuToSelectedQuantityMap, $orderItemStatusesTransfer->toArray());

        $this->addInfoMessage(
            static::PICKING_INFO_MESSAGE_ORDER_WILL_MOVE_TO_NEXT_STAGE
        );

        $this->getFacade()->markOrderItemsAsNotPicked(
            $orderItemStatusesTransfer->getNotSelectedOrderItemIds()
        );

        $selectedIdSalesOrderItems = $orderItemStatusesTransfer->getSelectedOrderItemIds();

        $idSalesOrder = (int)$formData[OrderItemSelectionForm::FIELD_ID_SALES_ORDER];
        if (count($selectedIdSalesOrderItems) === 0) {
            $this->addErrorMessage(static::PICKING_ERROR_MESSAGE_ORDER_FULLY_CANCELLED);

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $this->addSuccessMessage(static::PICKING_SUCCESS_MESSAGE_ORDER_PICKED);

        $this->getFacade()->createOrderContainers($orderContainerCollectionTransfer);
        $this->getFacade()->markOrderItemsAsPicked($selectedIdSalesOrderItems);
        $this->getFacade()->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);

        return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return bool
     */
    protected function isOrderPicked(MerchantSalesOrderTransfer $merchantSalesOrderTransfer): bool
    {
        return $merchantSalesOrderTransfer->getStoreStatus() !== OmsConfig::STORE_STATE_READY_FOR_PICKING;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\UserTransfer|null
     */
    protected function getPickerUserTransferByMerchantSalesOrder(MerchantSalesOrderTransfer $merchantSalesOrderTransfer): ?UserTransfer
    {
        $idUserAssignedToOrder = $merchantSalesOrderTransfer->getFkUser();

        if ($idUserAssignedToOrder === null) {
            return null;
        }

        return $this->getFactory()->getUserFacade()->getUserById($idUserAssignedToOrder);
    }

    /**
     * @param int $idUser
     * @param int $idSalesOrder
     *
     * @return bool
     */
    protected function assignIdUserToSalesOrder(int $idUser, int $idSalesOrder): bool
    {
        $orderUpdateRequestTransfer = (new OrderUpdateRequestTransfer())
            ->setFkUser($idUser);

        return $this->getFactory()->getMerchantSalesOrderFacade()->updateOrderWithOrderUpdateRequest(
            $idSalesOrder,
            $orderUpdateRequestTransfer
        );
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer
     */
    protected function findMerchantSalesOrderCollectionForPicking(UserTransfer $userTransfer): MerchantSalesOrderCollectionTransfer
    {
        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setMerchantReferences([$userTransfer->getMerchantReference()])
            ->setStoreStatuses([
                OmsConfig::STORE_STATE_READY_FOR_PICKING,
                OmsConfig::STORE_STATE_PICKED,
            ])
            ->setOrderCountLimit($this->getFactory()->getConfig()->getMaxOrdersCountToDisplay());

        return $this->getFactory()->getMerchantSalesOrderFacade()
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     *
     * @return array
     */
    protected function getSkuToImageMapFromItemTransfers(array $itemTransfers): array
    {
        return array_reduce(
            $itemTransfers,
            function (array $itemImages, ItemTransfer $itemTransfer) {
                $itemImages[$itemTransfer->getSku()] = $itemTransfer->getMetadata()->getImage();

                return $itemImages;
            },
            []
        );
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     *
     * @return int
     */
    protected function getItemsCount(array $itemTransfers): int
    {
        return array_reduce(
            $itemTransfers,
            function ($itemCount, ItemTransfer $itemTransfer): int {
                $itemCount += $itemTransfer->getQuantity();

                return $itemCount;
            },
            0
        );
    }

    /**
     * @param string[] $idSalesOrdersForPicking
     *
     * @return string[]
     */
    protected function getFormattedDeliveryDates($idSalesOrdersForPicking): array
    {
        $requestedDeliveryDatesByIdSalesOrders = $this->getFactory()->getSalesFacade()
            ->findRequestedDeliveryDatesByIdSalesOrders($idSalesOrdersForPicking);

        $requestedDeliveryDatesByIdSalesOrders = array_map(
            function (string $requestedDate): string {
                return str_replace('_', ' ', $requestedDate);
            },
            $requestedDeliveryDatesByIdSalesOrders
        );

        return $requestedDeliveryDatesByIdSalesOrders;
    }

    /**
     * @param string[] $requestedDeliveryDatesByIdSalesOrders
     *
     * @return string[]
     */
    protected function getUniqueTimeslots(array $requestedDeliveryDatesByIdSalesOrders): array
    {
        $requestedDeliveryDatesByIdSalesOrders = array_map(
            function (string $requestedDate): string {
                return explode(' ', $requestedDate)[1];
            },
            $requestedDeliveryDatesByIdSalesOrders
        );

        return array_unique($requestedDeliveryDatesByIdSalesOrders);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function getMerchantFromRequest(Request $request): MerchantTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_MERCHANT);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string[] $requestedDeliveryDatesByIdSalesOrders
     * @param array $pickingOrders
     *
     * @return array
     */
    protected function createIndexActionResponse(
        Request $request,
        array $requestedDeliveryDatesByIdSalesOrders,
        array $pickingOrders
    ): array {
        return [
            'merchant' => $this->getMerchantFromRequest($request),
            'activities' => PickerConfig::ACTIVITIES,
            'requestedDeliveryDates' => $this->getUniqueTimeslots($requestedDeliveryDatesByIdSalesOrders),
            'pickingOrders' => $pickingOrders,
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'urlOrderPicking' => PickerConfig::URL_START_ORDER_PICKING,
            'formatStartPickingTokenName' => static::FORMAT_START_PICKING_TOKEN_NAME,
        ];
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        $tokenValue = $request->get(static::REQUEST_PARAM_CSRF_TOKEN);

        $csrfToken = new CsrfToken($id, $tokenValue);

        return $this->getCsrfTokenManager()->isTokenValid($csrfToken);
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    protected function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(static::SERVICE_FORM_CSRF_PROVIDER);
    }

    /**
     * @param array $aggregatedItemTransfers
     *
     * @return array
     */
    protected function sortAggregatedItemTransfersByPickingOrder(array $aggregatedItemTransfers): array
    {
        $skuToAttributesMap = $this->getSkuToAttributesMap(array_keys($aggregatedItemTransfers));

        $skuToProductPickingOrderMap = $this->getFactory()->getPickingRouteFacade()
            ->getSkuToProductPickingOrderMap($skuToAttributesMap);

        uksort(
            $aggregatedItemTransfers,
            function (string $sku1, string $sku2) use ($skuToProductPickingOrderMap): int {
                return $skuToProductPickingOrderMap[$sku1] - $skuToProductPickingOrderMap[$sku2];
            }
        );

        return $aggregatedItemTransfers;
    }

    /**
     * @param string[] $skus
     *
     * @return array
     */
    public function getSkuToAttributesMap(array $skus): array
    {
        $productsConcreteTransfers = $this->getFactory()->getProductFacade()->findProductConcretesBySkus($skus);

        $productAttributes = [];
        foreach ($productsConcreteTransfers as $productConcreteTransfer) {
            $productAttributes[$productConcreteTransfer->getSku()] = $productConcreteTransfer->getAttributes();
        }

        return $productAttributes;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function getCurrentUser(Request $request): UserTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_USER);
    }

    /**
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return bool
     */
    protected function isOrderPickingStartedByAnotherUser(int $idSalesOrder, UserTransfer $userTransfer): bool
    {
        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setIdSalesOrders([$idSalesOrder]);

        $merchantSalesOrderTransfers = $this->getFactory()->getMerchantSalesOrderFacade()
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders();

        if ($merchantSalesOrderTransfers->count() !== 1) {
            return true;
        }

        $assignedIdUser = $merchantSalesOrderTransfers[$idSalesOrder]->getFkUser();
        if ($assignedIdUser === null || $assignedIdUser === $userTransfer->getIdUser()) {
            return false;
        }

        return true;
    }
}
