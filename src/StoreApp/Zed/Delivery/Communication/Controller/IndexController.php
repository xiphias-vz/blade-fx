<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Delivery\Communication\Controller;

use Generated\Shared\Transfer\DeliveryOrderCollectionTransfer;
use Generated\Shared\Transfer\DeliveryOrderTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Delivery\DeliveryConfig;
use StoreApp\Zed\Delivery\Communication\Form\DeliveryForm;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Delivery\Business\DeliveryFacadeInterface getFacade()
 * @method \StoreApp\Zed\Delivery\Communication\DeliveryCommunicationFactory getFactory()
 */
class IndexController extends AbstractController
{
    public const SELECTED = 'selected';
    public const NOT_SELECTED = 'not-selected';

    protected const DELIVERY_INFO_MESSAGE_NO_ORDERS_TO_DELIVER = 'storeapp.delivery.message.info.no-orders-to-deliver';
    protected const DELIVERY_INFO_MESSAGE_NO_ORDERS_SELECTED_FOR_DELIVERY = 'storeapp.delivery.message.info.no-orders-selected-for-delivery';
    protected const DELIVERY_INFO_MESSAGE_NOT_ALL_SELECTED_ORDERS_WERE_PROCESSED = 'storeapp.delivery.message.info.not-all-selected-orders-were-processed';

    protected const DELIVERY_SUCCESS_MESSAGE_ORDER_SUCCESSFULLY_DELIVERED = 'storeapp.delivery.message.success.order-successfully-delivered';
    protected const DELIVERY_INFO_MESSAGE_ORDER_NOT_DELIVERED = 'storeapp.delivery.message.success.order-not-delivered';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $userTransfer = $this->getCurrentUser($request);

        $merchantSalesOrderTransfers = $this->getFactory()->getStoreOrderFacade()
            ->findDeliveryMerchantSalesOrders($userTransfer);

        $idSalesOrdersForDelivery = array_keys($merchantSalesOrderTransfers);

        $requestedDeliveryDatesByIdSalesOrders = $this->getFormattedDeliveryDates($idSalesOrdersForDelivery);

        $deliveryOrderCollection = $this->generateDeliveryOrderCollection(
            $idSalesOrdersForDelivery,
            $requestedDeliveryDatesByIdSalesOrders,
            $userTransfer,
            $merchantSalesOrderTransfers
        );

        $deliveryFormDataProvider = $this->getFactory()->createDeliveryFormDataProvider();
        $deliveryForm = $this->getFactory()
            ->createDeliveryForm(
                [],
                $deliveryFormDataProvider->getOptions($deliveryOrderCollection)
            )
            ->handleRequest($request);

        if ($deliveryForm->isSubmitted() && $deliveryForm->isValid()) {
            return $this->processDeliveryForm($deliveryForm, $userTransfer);
        }

        if (empty($idSalesOrdersForDelivery)) {
            $this->addInfoMessage(self::DELIVERY_INFO_MESSAGE_NO_ORDERS_TO_DELIVER);
        }

        return [
            'merchant' => $this->getMerchantFromRequest($request),

            'deliveryForm' => $deliveryForm->createView(),

            'deliveryOrders' => $deliveryOrderCollection->getReadyForDeliveryOrders(),
            'alreadyAssignedOrders' => $deliveryOrderCollection->getAlreadyAssignedOrders(),
            'deliveredOrders' => $deliveryOrderCollection->getDeliveredOrders(),
            'notDeliveredOrders' => $deliveryOrderCollection->getNotDeliveredOrders(),

            'requestedDeliveryDates' => $this->getUniqueTimeslots($requestedDeliveryDatesByIdSalesOrders),

            'requestParamIdSalesOrder' => DeliveryConfig::REQUEST_PARAM_ID_ORDER,
            'urlStartDelivery' => DeliveryConfig::URL_DELIVERY_START,
            'urlStartAllDelivery' => DeliveryConfig::URL_DELIVERY_START_ALL,
            'urlConfirmDelivery' => DeliveryConfig::URL_DELIVERY_CONFIRM,
            'urlCancelDelivery' => DeliveryConfig::URL_DELIVERY_CANCEL,
        ];
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $deliveryForm
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function processDeliveryForm(FormInterface $deliveryForm, UserTransfer $userTransfer): RedirectResponse
    {
        $formData = $deliveryForm->getData();

        $groupedIdSalesOrders = $this->getSelectedIdSalesOrdersFromDeliveryFormData($formData);

        $this->cancelStartDeliveryForIdSalesOrders($groupedIdSalesOrders[static::NOT_SELECTED]);
        $this->startDeliveryForIdSalesOrders($userTransfer, $groupedIdSalesOrders[static::SELECTED]);

        return $this->redirectResponse(DeliveryConfig::URL_DELIVERY_IN_PROGRESS);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deliveryAction(Request $request)
    {
        $userTransfer = $this->getCurrentUser($request);

        $merchantSalesOrderTransfers = $this->getFactory()->getStoreOrderFacade()
            ->findSelectedDeliveryMerchantSalesOrders($userTransfer);

        $idSalesOrdersReadyForDelivery = array_keys($merchantSalesOrderTransfers);

        if (empty($idSalesOrdersReadyForDelivery)) {
            $this->addInfoMessage(self::DELIVERY_INFO_MESSAGE_NO_ORDERS_SELECTED_FOR_DELIVERY);

            return $this->redirectResponse(DeliveryConfig::URL_DELIVERY_LIST);
        }

        $requestedDeliveryDatesByIdSalesOrders = $this->getFormattedDeliveryDates($idSalesOrdersReadyForDelivery);

        $deliveryOrderCollection = $this->generateDeliveryOrderCollection(
            $idSalesOrdersReadyForDelivery,
            $requestedDeliveryDatesByIdSalesOrders,
            $userTransfer,
            $merchantSalesOrderTransfers
        );

        return [
            'merchant' => $this->getMerchantFromRequest($request),

            'deliveryOrders' => $deliveryOrderCollection->getReadyForDeliveryOrders(),

            'deliveredOrders' => $deliveryOrderCollection->getDeliveredOrders(),
            'notDeliveredOrders' => $deliveryOrderCollection->getNotDeliveredOrders(),

            'requestedDeliveryDates' => $this->getUniqueTimeslots($requestedDeliveryDatesByIdSalesOrders),

            'requestParamIdSalesOrder' => DeliveryConfig::REQUEST_PARAM_ID_ORDER,
            'urlConfirmDelivery' => DeliveryConfig::URL_DELIVERY_CONFIRM,
            'urlCancelDelivery' => DeliveryConfig::URL_DELIVERY_CANCEL,
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function confirmAction(Request $request): RedirectResponse
    {
        $idSalesOrder = $request->get(DeliveryConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $orderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);

        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()
            ->getPermissionAccessFacade()
            ->isAccessAllowed($orderTransfer, $userTransfer, [OmsConfig::STORE_STATE_DELIVERY_STARTED])
            ||
            $orderTransfer->getMerchantSalesOrder()->getFkUser() !== $userTransfer->getIdUser()
        ) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(DeliveryConfig::URL_DELIVERY_IN_PROGRESS);
        }

        $idSalesOrderItems = $this->getIdOrderItems($orderTransfer);

        $this->getFacade()->markOrderItemsAsDelivered($idSalesOrderItems);

        $this->addSuccessMessage(static::DELIVERY_SUCCESS_MESSAGE_ORDER_SUCCESSFULLY_DELIVERED);

        return $this->redirectResponse(DeliveryConfig::URL_DELIVERY_IN_PROGRESS);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function cancelByCustomerAction(Request $request): RedirectResponse
    {
        $idSalesOrder = $request->get(DeliveryConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $orderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);

        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()
            ->getPermissionAccessFacade()
            ->isAccessAllowed($orderTransfer, $userTransfer, [OmsConfig::STORE_STATE_DELIVERY_STARTED])
            ||
            $orderTransfer->getMerchantSalesOrder()->getFkUser() !== $userTransfer->getIdUser()
        ) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(DeliveryConfig::URL_DELIVERY_IN_PROGRESS);
        }

        $idSalesOrderItems = $this->getIdOrderItems($orderTransfer);

        $this->getFacade()->markOrderItemsAsDeliveryCancelledByCustomer($idSalesOrderItems);

        $this->addInfoMessage(static::DELIVERY_INFO_MESSAGE_ORDER_NOT_DELIVERED);

        return $this->redirectResponse(DeliveryConfig::URL_DELIVERY_IN_PROGRESS);
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return bool
     */
    protected function isOrderDelivered(MerchantSalesOrderTransfer $merchantSalesOrderTransfer): bool
    {
        return $merchantSalesOrderTransfer->getStoreStatus() === OmsConfig::STORE_STATE_DELIVERED;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\UserTransfer|null
     */
    protected function getOrderAssignedUser(MerchantSalesOrderTransfer $merchantSalesOrderTransfer): ?UserTransfer
    {
        $idUserAssignedToOrder = $merchantSalesOrderTransfer->getFkUser();

        if ($idUserAssignedToOrder === null) {
            return null;
        }

        return $this->getFactory()->getUserFacade()->getUserById($idUserAssignedToOrder);
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return bool
     */
    protected function isOrderCancelled(MerchantSalesOrderTransfer $merchantSalesOrderTransfer): bool
    {
        return in_array(
            $merchantSalesOrderTransfer->getStoreStatus(),
            [
                OmsConfig::STORE_STATE_DELIVERY_CANCELLED_BY_CUSTOMER,
                OmsConfig::STORE_STATE_DELIVERY_CANCELLED_BY_STORE,
            ]
        );
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return bool
     */
    protected function isDeliveryStarted(MerchantSalesOrderTransfer $merchantSalesOrderTransfer): bool
    {
        return $merchantSalesOrderTransfer->getStoreStatus() === OmsConfig::STORE_STATE_DELIVERY_STARTED;
    }

    /**
     * @param int[] $idSalesOrdersForDelivery
     * @param array $requestedDeliveryDatesByIdSalesOrders
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer[] $merchantSalesOrderTransfers
     *
     * @return \Generated\Shared\Transfer\DeliveryOrderCollectionTransfer
     */
    protected function generateDeliveryOrderCollection(
        array $idSalesOrdersForDelivery,
        array $requestedDeliveryDatesByIdSalesOrders,
        UserTransfer $userTransfer,
        array $merchantSalesOrderTransfers
    ): DeliveryOrderCollectionTransfer {
        $deliveryOrderCollection = new DeliveryOrderCollectionTransfer();

        foreach ($idSalesOrdersForDelivery as $idSalesOrder) {
            $salesOrderTransfer = $this->getFactory()->getSalesFacade()->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
            $merchantSalesOrderTransfer = $merchantSalesOrderTransfers[$idSalesOrder];

            $deliveryOrderTransfer = $this->mapSalesOrderToDeliveryOrder(
                $salesOrderTransfer,
                $requestedDeliveryDatesByIdSalesOrders[$idSalesOrder],
                $merchantSalesOrderTransfer
            );

            if ($deliveryOrderTransfer->getAssignedUser() !== null
                && $deliveryOrderTransfer->getAssignedUser()->getIdUser() !== $userTransfer->getIdUser()
            ) {
                $deliveryOrderCollection->getAlreadyAssignedOrders()->offsetSet($idSalesOrder, $deliveryOrderTransfer);

                continue;
            }

            if ($this->isOrderDelivered($merchantSalesOrderTransfer)) {
                $deliveryOrderCollection->getDeliveredOrders()->offsetSet($idSalesOrder, $deliveryOrderTransfer);

                continue;
            }

            if ($this->isOrderCancelled($merchantSalesOrderTransfer)) {
                $deliveryOrderCollection->getNotDeliveredOrders()->offsetSet($idSalesOrder, $deliveryOrderTransfer);

                continue;
            }

            $deliveryOrderCollection->getReadyForDeliveryOrders()->offsetSet($idSalesOrder, $deliveryOrderTransfer);
        }

        return $deliveryOrderCollection;
    }

    /**
     * @param array $formData
     *
     * @return array
     */
    protected function getSelectedIdSalesOrdersFromDeliveryFormData(array $formData): array
    {
        $groupedIdSalesOrders = [
            self::SELECTED => [],
            self::NOT_SELECTED => [],
        ];

        $pattern = '/' . DeliveryForm::FORMAT_FIELD_ID_SALES_ORDER . '(\\d+)/';

        foreach ($formData as $fieldName => $fieldValue) {
            $matches = [];
            if (preg_match($pattern, $fieldName, $matches) === false || empty($matches)) {
                continue;
            }

            $groupedIdSalesOrders[$fieldValue ? self::SELECTED : self::NOT_SELECTED][] = (int)$matches[1];
        }

        return $groupedIdSalesOrders;
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     * @param int[] $selectedIdSalesOrders
     *
     * @return void
     */
    protected function startDeliveryForIdSalesOrders(UserTransfer $userTransfer, array $selectedIdSalesOrders): void
    {
        if (empty($selectedIdSalesOrders)) {
            return;
        }

        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setIdSalesOrders($selectedIdSalesOrders)
            ->setAssignedIdUsers([$userTransfer->getIdUser()])
            ->setAssignedIdUserCanBeNull(true);

        $filteredIdSalesOrders = array_keys(
            $this->getFactory()->getMerchantSalesOrderFacade()
                ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
                ->getMerchantSalesOrders()->getArrayCopy()
        );

        if (count($selectedIdSalesOrders) !== count($filteredIdSalesOrders)) {
            $this->addInfoMessage(static::DELIVERY_INFO_MESSAGE_NOT_ALL_SELECTED_ORDERS_WERE_PROCESSED);
        }

        $idOrderItems = $this->getFactory()->getSalesFacade()
            ->findIdOrderItemsByIdSalesOrders($filteredIdSalesOrders);

        $this->getFactory()->getOmsFacade()
            ->triggerEventForOrderItems(
                OmsConfig::STORE_EVENT_START_DELIVERY,
                $idOrderItems,
                [
                    OmsConfig::EVENT_ID_USER => $userTransfer->getIdUser(),
                ]
            );
    }

    /**
     * @param int[] $selectedIdSalesOrders
     *
     * @return void
     */
    protected function cancelStartDeliveryForIdSalesOrders(array $selectedIdSalesOrders): void
    {
        $idOrderItems = $this->getFactory()->getSalesFacade()
            ->findIdOrderItemsByIdSalesOrders($selectedIdSalesOrders);

        $this->getFactory()->getOmsFacade()
            ->triggerEventForOrderItems(
                OmsConfig::STORE_EVENT_CANCEL_START_DELIVERY,
                $idOrderItems
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
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function getCurrentUser(Request $request): UserTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_USER);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return int[]
     */
    private function getIdOrderItems(OrderTransfer $orderTransfer): array
    {
        $ids = [];

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            $idSalesOrderItem = $itemTransfer->getIdSalesOrderItem();
            $ids[$idSalesOrderItem] = $idSalesOrderItem;
        }

        return $ids;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param string $requestedDeliveryDate
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\DeliveryOrderTransfer
     */
    protected function mapSalesOrderToDeliveryOrder(
        OrderTransfer $salesOrderTransfer,
        string $requestedDeliveryDate,
        MerchantSalesOrderTransfer $merchantSalesOrderTransfer
    ): DeliveryOrderTransfer {
        return (new DeliveryOrderTransfer())
            ->setIdSalesOrder($salesOrderTransfer->getIdSalesOrder())
            ->setDeliveryAddress($salesOrderTransfer->getShippingAddress())
            ->setOrderReference($salesOrderTransfer->getOrderReference())
            ->setPickingBags($salesOrderTransfer->getPickingBagsCount())
            ->setDeliveryMinimumAge($salesOrderTransfer->getDeliveryMinimumAge())

            ->setIsStarted($this->isDeliveryStarted($merchantSalesOrderTransfer))
            ->setIsDelivered($this->isOrderDelivered($merchantSalesOrderTransfer))
            ->setDeliveredAt($merchantSalesOrderTransfer->getDeliveredAt())
            ->setIsCancelled($this->isOrderCancelled($merchantSalesOrderTransfer))
            ->setAssignedUser($this->getOrderAssignedUser($merchantSalesOrderTransfer))
            ->setRequestedDeliveryDate($requestedDeliveryDate);
    }
}
