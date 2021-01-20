<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Service\UtilText\Model\Url\Url;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use StoreApp\Zed\Picker\Communication\Form\OrderItemSelectionForm;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 */
class PickingController extends BaseOrderPickingController
{
    protected const REQUEST_PARAM_PICKING_BAGS_COUNT = 'quantity';

    protected const PICKING_ERROR_MESSAGE_ORDER_FULLY_CANCELLED = 'storeapp.picking.message.error.order-is-fully-cancelled';

    protected const PICKING_INFO_MESSAGE_NO_ORDERS_TO_PICK = 'storeapp.picking.message.info.no-orders-to-pick';
    protected const PICKING_INFO_MESSAGE_ORDER_WILL_MOVE_TO_NEXT_STAGE = 'storeapp.picking.message.info.order-will-be-moved-to-next-stage';

    protected const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    protected const REQUEST_PARAM_CSRF_TOKEN = 'token';
    protected const FORMAT_START_PICKING_TOKEN_NAME = 'start-picking-%d';
    protected const FORMAT_STOP_PICKING_TOKEN_NAME = 'stop-picking-%d';

    protected const FORMAT_SELECT_CONTAINERS = 'select-containers-%d';

    protected const OMS_ORDER_STATUSES_FOR_PICKING_PROCESS = [
        OmsConfig::STORE_STATE_READY_FOR_PICKING,
        OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES,
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
        $userTransfer = $this->getCurrentUser($request);

        $merchantSalesOrderTransfers = $this
            ->findMerchantSalesOrderCollectionForPicking($userTransfer, $pickingZoneTransfer)
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

        $daysInTheWeek = $this->getFactory()->getConfig()->getDaysInTheWeek();

        foreach ($idSalesOrdersForPicking as $idSalesOrder) {
            $salesOrderTransfer = $this->getFactory()->getSalesFacade()
                ->findOrderByIdSalesOrderAndPickingZoneForStoreApp($idSalesOrder, $pickingZoneTransfer->getName());
            $merchantSalesOrderTransfer = $merchantSalesOrderTransfers[$idSalesOrder];
            $fullOrderTransfer = $this->getFactory()->getSalesFacade()
                ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
            $dayOfTheWeek = '';
            if ($requestedDeliveryDatesByIdSalesOrders[$idSalesOrder]) {
                $deliveryDate = str_split($requestedDeliveryDatesByIdSalesOrders[$idSalesOrder], 10);
                $dayInTheWeek = date('w', strtotime($deliveryDate[0]));
                $dayOfTheWeek = $daysInTheWeek[$dayInTheWeek];
            }

            $pickingOrders[] = [
                'idSalesOrder' => $idSalesOrder,
                'reference' => $salesOrderTransfer->getOrderReference(),
                'collectNumber' => $salesOrderTransfer->getCollectNumber(),
                'itemCount' => $salesOrderTransfer->getItems()->count(),
                'totalItemCount' => $fullOrderTransfer->getItems()->count(),
                'isPicked' => $merchantSalesOrderTransfer->getFkUser() === $userTransfer->getIdUser(),
                'requestedDeliveryDate' => $requestedDeliveryDatesByIdSalesOrders[$idSalesOrder],
                'cartNote' => $salesOrderTransfer->getCartNote(),
                'customerFullName' => $salesOrderTransfer->getFirstName() . ' ' . $salesOrderTransfer->getLastName(),
                'dayOfTheWeek' => $dayOfTheWeek,
                'pickupStatus' => $merchantSalesOrderTransfer->getStoreStatus(),
            ];
        }

        return $this->createIndexActionResponse($request, $requestedDeliveryDatesByIdSalesOrders, $pickingOrders);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function selectContainersAction(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER);
        $csrfTokenName = sprintf(static::FORMAT_START_PICKING_TOKEN_NAME, $idSalesOrder);

        if (!$this->isCsrfTokenValid($csrfTokenName, $request)) {
            $this->addErrorMessage(
                MessagesConfig::MESSAGE_PERMISSION_FAILED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
        $fullOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);

        $userTransfer = $this->getCurrentUser($request);

        if (!$this->isOrderPickingBlockAvailableForUser($idSalesOrder, $userTransfer, $pickingZoneTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderAndPickingZoneForStoreApp($idSalesOrder, $pickingZoneTransfer->getName());

        $containerInfo = $this->getFactory()->getPickerBusinessFactory()->createContainerReader()->getContainersByOrderId($idSalesOrder);
        $containerInfo = $containerInfo['picking_sales_orders'];
        $containerNumber = count($containerInfo);

        $listOfUsedContainers = $this->getFactory()->getPickerBusinessFactory()->createContainerReader()->getUsedContainers();

        $aggregatedItemTransfers = $this->getFactory()->getItemAggregator()
            ->aggregateOrderItemsQuantities($salesOrderTransfer->getItems()->getArrayCopy());

        $aggregatedItemTransfers = $this->sortAggregatedItemTransfersByPickingOrder($aggregatedItemTransfers);
        $orderItemSelectionFormDataProvider = $this->getFactory()->createOrderItemSelectionFormDataProvider();
        $orderItemSelectionForm = $this->getFactory()->createOrderItemSelectionForm(
            $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
            $orderItemSelectionFormDataProvider->getOptions($aggregatedItemTransfers, $salesOrderTransfer->getStore())
        );

        $orderItemSelectionForm->handleRequest($request);

        if ($orderItemSelectionForm->isSubmitted()) {
            $orderPickingBlockTransfer = (new OrderPickingBlockTransfer())
                ->setIdSalesOrder($idSalesOrder)
                ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
                ->setIdUser($userTransfer->getIdUser());
            $this->getFactory()->getPickingZoneFacade()->createOrderPickingBlock($orderPickingBlockTransfer);

            $formData = $orderItemSelectionForm->getData();

            $containers = $formData['field_sales_order_containers'];
            foreach ($containers as $container) {
                $containerEntity = PyzPickingSalesOrderQuery::create()
                    ->filterByFkSalesOrder($idSalesOrder)
                    ->filterByContainerCode($container['containerCode'])
                    ->filterByFkPickingZone($pickingZoneTransfer->getIdPickingZone())
                    ->findOneOrCreate();
                $containerEntity->setContainerCode($container['containerCode']);

                if ($containerEntity->isModified() || $containerEntity->isNew()) {
                    $containerEntity->save();
                }
            }
            $orderPickingPath = Url::generate(
                PickerConfig::URL_ORDER_PICKING,
                [
                    PickerConfig::REQUEST_PARAM_ID_ORDER => $idSalesOrder,
                ]
            )->build();

            return $this->redirectResponse($orderPickingPath);
        }

        $pickingOrders[] = [
            'idSalesOrder' => $idSalesOrder,
            'reference' => $salesOrderTransfer->getOrderReference(),
            'collectNumber' => $salesOrderTransfer->getCollectNumber(),
            'itemCount' => $salesOrderTransfer->getItems()->count(),
            'totalItemCount' => $fullOrderTransfer->getItems()->count(),
            'cartNote' => $salesOrderTransfer->getCartNote(),
            'customerFullName' => $salesOrderTransfer->getFirstName() . ' ' . $salesOrderTransfer->getLastName(),
            'containerCount' => $containerNumber,
            'listOfUsedContainers' => json_encode($listOfUsedContainers),
        ];

        return $this->createSelectContainersActionsResponse($request, $pickingOrders, $containerInfo, $orderItemSelectionForm);
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
        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();

        if (!$this->isOrderPickingBlockAvailableForUser($idSalesOrder, $userTransfer, $pickingZoneTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $orderPickingBlockTransfer = (new OrderPickingBlockTransfer())
            ->setIdSalesOrder($idSalesOrder)
            ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
            ->setIdUser($userTransfer->getIdUser());
        $this->getFactory()->getPickingZoneFacade()->createOrderPickingBlock($orderPickingBlockTransfer);

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
    public function stopOrderPickingAction(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER);
        $csrfTokenName = sprintf(static::FORMAT_STOP_PICKING_TOKEN_NAME, $idSalesOrder);

        if (!$this->isCsrfTokenValid($csrfTokenName, $request)) {
            $this->addErrorMessage(
                MessagesConfig::MESSAGE_PERMISSION_FAILED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $userTransfer = $this->getCurrentUser($request);
        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();

        $orderPickingBlockTransfer = (new OrderPickingBlockTransfer())
            ->setIdSalesOrder($idSalesOrder)
            ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
            ->setIdUser($userTransfer->getIdUser());

        $this->getFactory()->getPickingZoneFacade()
            ->deleteOrderPickingBlock($orderPickingBlockTransfer);

        return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function orderPickingAction(Request $request)
    {
        $indexOfOrdersArray = 0;
        $nextSku = "";
        $aggregatedItemTransfers1 = [];
        $counter = 0;
        $products = [];
        $obj = "";

        if ($request->request->count() == 0) {
            $counter = 1;
        } else {
//            $counter = key($request->request->get('order_item_selection_form'));
            $counter = $request->request->get('counter') + 1;
            [$skuFromRequest, $skuFromRequest1] = explode('__', key($request->request->get('order_item_selection_form')));
        }
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $containerInfo = $this->getFactory()->getPickerBusinessFactory()->createContainerReader()->getContainersByOrderId($idSalesOrder);
        if (!empty($containerInfo['picking_sales_orders'])) {
            $containerInfo = $containerInfo['picking_sales_orders'][0];
            $containerInfo["shelf_code"] = "A01-01-01";
        }

        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderAndPickingZoneForStoreApp($idSalesOrder, $pickingZoneTransfer->getName());

        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
            $salesOrderTransfer,
            $userTransfer,
            static::OMS_ORDER_STATUSES_FOR_PICKING_PROCESS
        )) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();

        if (!$this->isOrderPickingBlockAvailableForUser($idSalesOrder, $userTransfer, $pickingZoneTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $aggregatedItemTransfers = $this->getFactory()->getItemAggregator()
            ->aggregateOrderItemsQuantities($salesOrderTransfer->getItems()->getArrayCopy());

        $arrayLength = count($aggregatedItemTransfers);

        if (!empty($skuFromRequest1)) {
            $indexOfOrdersArray = array_search($skuFromRequest1, array_keys($aggregatedItemTransfers)) + 1;

            foreach ($aggregatedItemTransfers as $orderItem) {
                if ($orderItem['sku'] == $skuFromRequest1) {
                    $nextSku = '*';
                } elseif ($nextSku == '*') {
                    $nextSku = $orderItem['sku'];
                    break;
                }
            }
            if ($nextSku != '*') {
                $obj = $aggregatedItemTransfers[$nextSku];
            }
        } else {
            $obj = array_values($aggregatedItemTransfers)[0];
        }

        $orderItemSelectionFormDataProvider = $this->getFactory()->createOrderItemSelectionFormDataProvider();
        if ($nextSku != '*') {
            foreach ($aggregatedItemTransfers as $product) {
                array_push($products, [
                "sku" => $product["sku"],
                "quantity" => $product["quantity"],
                "itemName" => $product["name"],
                "itemBrand" => $product["brand"],
                    "price" => $product["unitPrice"], "bontext" => $product["bontext"], "basePriceContent" => $product["basePriceContent"],
                    "basePriceUnit" => $product["basePriceUnit"], "shelf" => $product["shelf"],
                    "shelfFloor" => $product["shelfFloor"], "shelfField" => $product["shelfField"]]);
            }

            array_push($aggregatedItemTransfers1, $obj);

            $aggregatedItemTransfers = array_values($aggregatedItemTransfers)[$indexOfOrdersArray];

            $orderItemSelectionForm = $this->getFactory()->createOrderItemSelectionForm(
                $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
                $orderItemSelectionFormDataProvider->getOptionsForOneOrder($aggregatedItemTransfers1, $salesOrderTransfer->getStore())
            );
        } else {
            $orderItemSelectionForm = $this->getFactory()->createOrderItemSelectionForm(
                $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
                [
                    OrderItemSelectionForm::OPTION_SALES_ORDER_ITEMS => [],
                    OrderItemSelectionForm::OPTION_ITEM_ATTRIBUTES => [],
                ]
            );
        }

         $orderItemSelectionForm->handleRequest($request);

        if ($orderItemSelectionForm->isSubmitted() && $nextSku == '*' && $counter > $arrayLength) {
            $pickingBagsCount = (int)$request->get(static::REQUEST_PARAM_PICKING_BAGS_COUNT);

            return $this->processOrderPickingForm(
                $orderItemSelectionForm,
                $pickingBagsCount,
                $salesOrderTransfer
            );
        }

        $pickingFormSkuKeys = [];
        $pickingFormWeightKeys = [];

        foreach ($orderItemSelectionForm->all() as $item) {
            if (strpos($item->getName(), OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_SKU) === 0) {
                $pickingFormSkuKeys[] = $item->getName();
            }

            if (strpos($item->getName(), OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_NEW_WEIGHT) !== false) {
                $nameParts = explode('__', $item->getName());
                $sku = end($nameParts);
                $pickingFormWeightKeys[$sku] = $item->getName();
            }
        }

        return [
            'merchant' => $this->getMerchantFromRequest($request),
            'maxPickingBags' => $this->getFactory()->getConfig()->getMaxPickingBags(),
            'itemsCount' => 1,
            'itemsToShelfMap' => $this->getItemsToShelfMap($aggregatedItemTransfers),
            'itemsToProductAttributesMap' => $this->getItemsToProductAttributesMap($aggregatedItemTransfers),
            'itemImageUrls' => $aggregatedItemTransfers->getMetadata()->getImage(),
            'pickingForm' => $orderItemSelectionForm->createView(),
            'pickingFormSkuKeys' => $pickingFormSkuKeys,
            'pickingFormWeightKeys' => $pickingFormWeightKeys,
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'idSalesOrder' => $idSalesOrder,
            'formatStartPickingTokenName' => static::FORMAT_START_PICKING_TOKEN_NAME,
            'orderReference' => $salesOrderTransfer->getOrderReference(),
            'collectNumber' => $salesOrderTransfer->getCollectNumber(),
            'orderDeliveryTime' => null,
            'containerInfo' => $containerInfo,
            'ordersCount' => count($pickingFormSkuKeys),
            'ordersInfo' => $products,
            'urlContainerSelect' => PickerConfig::URL_SELECT_CONTAINERS,
            'orderItemCounter' => $counter,
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

        $skuToWeightMap = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToSelectedWeightMap(
                $formData,
                OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_NEW_WEIGHT
            );

        $orderItemStatusesTransfer = $this->getFactory()->getOrderItemsMapper()
            ->mapOrderItemsToOrderItemStatuses(
                $salesOrderTransfer,
                $skuToSelectedQuantityMap,
                $skuToWeightMap
            );

        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
        $pickingSalesOrderCollectionTransfer = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToPickingSalesOrderCollection(
                $formData,
                $salesOrderTransfer,
                $pickingZoneTransfer
            );

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

        $this->getFacade()->markOrderItemsAsContainerSelected($selectedIdSalesOrderItems);
        $this->getFacade()->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);

        $orderPickingPath = Url::generate(
            PickerConfig::URL_SELECT_SHELVES,
            [
                PickerConfig::REQUEST_PARAM_ID_ORDER => $idSalesOrder,
            ]
        )->build();

        $orderChangeRequestTransfer = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToOrderItemChangeRequest(
                $formData,
                $salesOrderTransfer,
                $selectedIdSalesOrderItems,
                OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_NEW_WEIGHT
            );

        if ($orderChangeRequestTransfer->getOrderItemChangeRequest()->count() > 0) {
            $this->getFactory()->getSalesFacade()->saveOrderChange($orderChangeRequestTransfer);
        }

        return $this->redirectResponse($orderPickingPath);
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
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer
     */
    protected function findMerchantSalesOrderCollectionForPicking(
        UserTransfer $userTransfer,
        PickingZoneTransfer $pickingZoneTransfer
    ): MerchantSalesOrderCollectionTransfer {
        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setMerchantReferences([$userTransfer->getMerchantReference()])
            ->setItemStatuses([
                OmsConfig::STORE_STATE_READY_FOR_PICKING,
            ])
            ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
            ->setIdUser($userTransfer->getIdUser())
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
     * @param object $itemTransfer
     *
     * @return array
     */
    protected function getItemsToShelfMap(object $itemTransfer): array
    {
        $itemsToShelfMap = [];

        $itemsToShelfMap[$itemTransfer->getSku()] = [
            ItemTransfer::SHELF => $itemTransfer->getShelf(),
            ItemTransfer::SHELF_FLOOR => $itemTransfer->getShelfFloor(),
            ItemTransfer::SHELF_FIELD => $itemTransfer->getShelfField(),
            ItemTransfer::SUM_PRICE => $itemTransfer->getSumPrice(),
        ];

        return $itemsToShelfMap;
    }

    /**
     * @param object $itemTransfer
     *
     * @return array
     */
    protected function getItemsToProductAttributesMap(object $itemTransfer): array
    {
        $itemsToProductAttributesMap = [];

        $itemsToProductAttributesMap[$itemTransfer->getSku()] = [
            ItemTransfer::WEIGHT_PER_UNIT => $itemTransfer->getWeightPerUnit(),
            ItemTransfer::BRAND => $itemTransfer->getBrand(),
            ItemTransfer::BASE_PRICE_CONTENT => $itemTransfer->getBasePriceContent(),
            ItemTransfer::BASE_PRICE_UNIT => $itemTransfer->getBasePriceUnit(),
        ];

        return $itemsToProductAttributesMap;
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
            'urlContainerSelect' => PickerConfig::URL_SELECT_CONTAINERS,
            'urlOrderPicking' => PickerConfig::URL_START_ORDER_PICKING,
            'urlStopOrderPicking' => PickerConfig::URL_STOP_ORDER_PICKING,
            'formatStartPickingTokenName' => static::FORMAT_START_PICKING_TOKEN_NAME,
            'formatStopPickingTokenName' => static::FORMAT_STOP_PICKING_TOKEN_NAME,
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param array $pickingOrders
     * @param array $containerInfo
     * @param \Symfony\Component\Form\FormInterface $orderItemSelectionForm
     *
     * @return array
     */
    protected function createSelectContainersActionsResponse(
        Request $request,
        array $pickingOrders,
        array $containerInfo,
        FormInterface $orderItemSelectionForm
    ): array {
        return [
            'merchant' => $this->getMerchantFromRequest($request),
            'pickingOrders' => $pickingOrders,
            'containerInfo' => $containerInfo,
            'pickingForm' => $orderItemSelectionForm->createView(),
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'urlOrderPicking' => PickerConfig::URL_START_ORDER_PICKING,
            'urlStopOrderPicking' => PickerConfig::URL_STOP_ORDER_PICKING,
            'urlContainerSelect' => PickerConfig::URL_SELECT_CONTAINERS,
            'formatStartPickingTokenName' => static::FORMAT_START_PICKING_TOKEN_NAME,
            'formatStopPickingTokenName' => static::FORMAT_STOP_PICKING_TOKEN_NAME,
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
        $skuToProductPickingOrderMap = [];
        foreach ($aggregatedItemTransfers as $sku => $aggregatedItemTransfer) {
            $skuToProductPickingOrderMap[$sku] = (int)$aggregatedItemTransfer->getSequence();
        }

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
}
