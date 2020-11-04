<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\StoreOrder\Business\Reader;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use StoreApp\Zed\StoreOrder\StoreOrderConfig;

class StoreOrderReader implements StoreOrderReaderInterface
{
    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @var \StoreApp\Zed\StoreOrder\StoreOrderConfig
     */
    private $storeOrderConfig;

    /**
     * @var \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    private $merchantSalesOrderFacade;

    /**
     * @param \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface $merchantSalesOrderFacade
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \StoreApp\Zed\StoreOrder\StoreOrderConfig $storeOrderConfig
     */
    public function __construct(
        MerchantSalesOrderFacadeInterface $merchantSalesOrderFacade,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        StoreOrderConfig $storeOrderConfig
    ) {
        $this->merchantSalesOrderFacade = $merchantSalesOrderFacade;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->storeOrderConfig = $storeOrderConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $readyOrStartedDeliveryOrders = $this->findReadyOrStartedDeliveryOrders($userTransfer);
        $deliveredOrCancelledOrders = $this->findDeliveredOrCancelledOrders($userTransfer);

        return $readyOrStartedDeliveryOrders + $deliveredOrCancelledOrders;
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findSelectedDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $assignedStartedOrders = $this->findAssignedStartedMerchantSalesOrders($userTransfer);

        $assignedDeliveredOrCancelledOrders = $this->findAssignedDeliveredOrCancelledMerchantSalesOrders($userTransfer);

        return $assignedStartedOrders + $assignedDeliveredOrCancelledOrders;
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findReadyOrStartedDeliveryOrders(UserTransfer $userTransfer): array
    {
        $orderCriteriaFilterTransfer = $this->getOrderCriteriaFilter(
            $userTransfer->getMerchantReference(),
            $this->storeOrderConfig->getMaxOrdersCountToDisplay()
        );

        $orderCriteriaFilterTransfer->setStoreStatuses(
            [
                OmsConfig::STORE_STATE_READY_FOR_DELIVERY,
                OmsConfig::STORE_STATE_DELIVERY_STARTED,
            ]
        );

        return $this->merchantSalesOrderFacade
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findDeliveredOrCancelledOrders(UserTransfer $userTransfer): array
    {
        $orderCriteriaFilterTransfer = $this->getDeliveredOrCancelledOrderFilterCriteria($userTransfer);

        return $this->merchantSalesOrderFacade
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return \Generated\Shared\Transfer\OrderCriteriaFilterTransfer
     */
    protected function hydrateOrderFilterCriteriaWithDeliveryToday(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): OrderCriteriaFilterTransfer {
        $currentDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone('now');

        $orderFilterCriteriaTransport->setDeliveryDate($currentDateTime->format('c'));

        return $orderFilterCriteriaTransport;
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findAssignedStartedMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $orderCriteriaFilterTransfer = $this
            ->getOrderCriteriaFilter(
                $userTransfer->getMerchantReference(),
                $this->storeOrderConfig->getMaxOrdersCountToDisplay()
            )
            ->setStoreStatuses([
                OmsConfig::STORE_STATE_DELIVERY_STARTED,
            ])
            ->setAssignedIdUsers([$userTransfer->getIdUser()]);

        return $this->merchantSalesOrderFacade
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findAssignedDeliveredOrCancelledMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $orderCriteriaFilterTransfer = $this
            ->getDeliveredOrCancelledOrderFilterCriteria($userTransfer)
            ->setAssignedIdUsers([$userTransfer->getIdUser()]);

        return $this->merchantSalesOrderFacade
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\OrderCriteriaFilterTransfer
     */
    protected function getDeliveredOrCancelledOrderFilterCriteria(UserTransfer $userTransfer): OrderCriteriaFilterTransfer
    {
        $orderFilterCriteriaTransport = $this
            ->getOrderCriteriaFilter(
                $userTransfer->getMerchantReference(),
                $this->storeOrderConfig->getMaxOrdersCountToDisplay()
            )
            ->setStoreStatuses([
                OmsConfig::STORE_STATE_DELIVERED,
                OmsConfig::STORE_STATE_DELIVERY_CANCELLED_BY_CUSTOMER,
                OmsConfig::STORE_STATE_DELIVERY_CANCELLED_BY_STORE,
            ]);

        return $orderFilterCriteriaTransport;
    }

    /**
     * @param string $merchantReference
     * @param int $maxOrdersCountToDisplay
     *
     * @return \Generated\Shared\Transfer\OrderCriteriaFilterTransfer
     */
    protected function getOrderCriteriaFilter(
        string $merchantReference,
        int $maxOrdersCountToDisplay
    ): OrderCriteriaFilterTransfer {
        return (new OrderCriteriaFilterTransfer())
            ->setMerchantReferences([$merchantReference])
            ->setOrderCountLimit($maxOrdersCountToDisplay);
    }
}
