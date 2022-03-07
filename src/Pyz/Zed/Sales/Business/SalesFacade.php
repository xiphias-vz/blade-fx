<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business;

use DateTime;
use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesShipmentQuery;
use Spryker\Zed\Sales\Business\SalesFacade as SprykerSalesFacade;
use Spryker\Zed\Shipment\Persistence\ShipmentEntityManager;

/**
 * @method \Pyz\Zed\Sales\Business\SalesBusinessFactory getFactory()
 * @method \Pyz\Zed\Sales\Persistence\SalesEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class SalesFacade extends SprykerSalesFacade implements SalesFacadeInterface
{
    /**
     * @param int $idSalesOrder
     * @param int $pickingBagsCount
     *
     * @return bool
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): bool
    {
        return $this->getEntityManager()->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);
    }

    /**
     * @param int $idSalesOrder
     * @param string $status
     *
     * @return bool
     */
    public function updateOrderStoreStatus(int $idSalesOrder, string $status): bool
    {
        return $this->getEntityManager()->updateOrderStoreStatus($idSalesOrder, $status);
    }

    /**
     * @param int $idSalesShipment
     * @param string $shipmentMethodKey
     *
     * @return bool
     */
    public function checkOrderShipment(int $idSalesShipment, string $shipmentMethodKey): bool
    {
        return $this->getFactory()->createSalesOrderChecker()
            ->checkOrderShipment($idSalesShipment, $shipmentMethodKey);
    }

    /**
     * @param int $idSalesOrder
     * @param string $invoiceReference
     * @param \DateTime $invoiceDateTime
     *
     * @return void
     */
    public function saveInvoiceReference(int $idSalesOrder, string $invoiceReference, DateTime $invoiceDateTime): void
    {
        $this->getEntityManager()
            ->saveInvoiceReference($idSalesOrder, $invoiceReference, $invoiceDateTime);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateSalesOrderStatus(OrderTransfer $orderTransfer): OrderTransfer
    {
        return $this->getFactory()
            ->createOrderStatusHydrator()
            ->hydrateOrderStatus($orderTransfer);
    }

    /**
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return int[]
     */
    public function getSaleOrderIdsByCustomerReferenceAndIdSalesOrder(string $customerReference, int $idSalesOrder): array
    {
        return $this->getRepository()->getSaleOrderIdsByCustomerReferenceAndIdSalesOrder($customerReference, $idSalesOrder);
    }

    /**
     * @param int $idSalesOrder
     * @param array $states
     *
     * @return string[]
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndStates(int $idSalesOrder, array $states): array
    {
        return $this->getRepository()->getSalesOrderItemsIdsByIdSalesOrderAndStates($idSalesOrder, $states);
    }

    /**
     * @param int $idSalesOrder
     * @param int $idPickingZone
     * @param array $states
     *
     * @return string[]
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndPickingZoneAndStates(
        int $idSalesOrder,
        int $idPickingZone,
        array $states
    ): array {
        return $this->getRepository()
            ->getSalesOrderItemsIdsByIdSalesOrderAndPickingZoneAndStates($idSalesOrder, $idPickingZone, $states);
    }

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return array
     */
    public function getOrdersInfoByInvoiceDateTimeRange(?DateTime $dateFrom, ?DateTime $dateTo): array
    {
        return $this->getFactory()
            ->createInvoiceSalesOrderReader()
            ->getOrdersInfoByInvoiceDateTimeRange($dateFrom, $dateTo);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return int[]
     */
    public function findIdSalesOrdersByOrderFilterCriteria(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): array {
        return $this->getRepository()->findIdSalesOrdersByOrderFilterCriteria($orderFilterCriteriaTransport);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return array
     */
    public function findSalesOrdersReferenceByOrderFilterCriteria(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): array {
        return $this->getRepository()->findSalesOrdersReferenceByOrderFilterCriteria($orderFilterCriteriaTransport);
    }

    /**
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\OrderUpdateRequestTransfer $orderUpdateRequestTransfer
     *
     * @return bool
     */
    public function updateOrderWithOrderUpdateRequest(int $idSalesOrder, OrderUpdateRequestTransfer $orderUpdateRequestTransfer): bool
    {
        return $this->getEntityManager()
            ->updateOrderWithOrderUpdateRequest($idSalesOrder, $orderUpdateRequestTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderChangeRequestTransfer $orderChangeRequestTransfer
     *
     * @return bool
     */
    public function saveOrderChange(OrderChangeRequestTransfer $orderChangeRequestTransfer)
    {
        return $this->getFactory()
            ->createOrderChangeSaver()
            ->saveOrderChange($orderChangeRequestTransfer);
    }

    /**
     * @param array $idSalesOrders
     *
     * @return int[]
     */
    public function findIdOrderItemsByIdSalesOrders(array $idSalesOrders): array
    {
        return $this->getRepository()->findIdOrderItemsByIdSalesOrders($idSalesOrders);
    }

    /**
     * @param array $idSalesOrders
     *
     * @return string[]
     */
    public function findRequestedDeliveryDatesByIdSalesOrders(array $idSalesOrders): array
    {
        return $this->getRepository()->findRequestedDeliveryDatesByIdSalesOrders($idSalesOrders);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateMinimumAge(OrderTransfer $orderTransfer): OrderTransfer
    {
        return $this->getFactory()
            ->createMinimumAgeHydrator()
            ->hydrateOrderTransfer($orderTransfer);
    }

    /**
     * @param string $requestedDeliveryDate
     * @param int $hours
     *
     * @return bool
     */
    public function isRequestedOrderDatePassed(string $requestedDeliveryDate, int $hours): bool
    {
        return $this->getFactory()
            ->createOrderDateCheck()
            ->isRequestedOrderDatePassed($requestedDeliveryDate, $hours);
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByIdSalesOrderForStoreApp(int $idSalesOrder): ?OrderTransfer
    {
        return $this->getFactory()
            ->createOrderReaderForStoreApp()
            ->findOrderByIdSalesOrder($idSalesOrder);
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderWithPickingSalesOrdersByIdSalesOrder(int $idSalesOrder): ?OrderTransfer
    {
        return $this->getFactory()
            ->createOrderReaderWithMultiShippingAddress()
            ->findOrderWithPickingSalesOrdersByIdSalesOrder($idSalesOrder);
    }

    /**
     * @param int $idSalesOrder
     * @param string $pickingZoneName
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByIdSalesOrderAndPickingZoneForStoreApp(
        int $idSalesOrder,
        string $pickingZoneName
    ): ?OrderTransfer {
        return $this->getFactory()
            ->createOrderReaderForStoreApp()
            ->findOrderByIdSalesOrderAndPickingZone($idSalesOrder, $pickingZoneName);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer $itemEntityTransfer
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer
     */
    public function expandItemWithStockProductData(
        QuoteTransfer $quoteTransfer,
        SpySalesOrderItemEntityTransfer $itemEntityTransfer
    ): SpySalesOrderItemEntityTransfer {
        return $this->getFactory()->createOrderItemExpander()->expandItemWithStockProductData($quoteTransfer, $itemEntityTransfer);
    }

    /**
     * @param string $storeName
     *
     * @return void
     */
    public function executeTimeSlotCheckJenkinsJob(string $storeName): void
    {
        $this->getFactory()->createExecuteTimeSlotCapacityUpdateJob()->executeTimeSlotCheckJenkinsJob($storeName);
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function getOrderByIdSalesOrderWithoutExpand($idSalesOrder)
    {
        return $this->getFactory()
            ->createOrderHydratorForCashier()
            ->getOrderByIdSalesOrderWithoutExpand($idSalesOrder);
    }

    /**
     * @return string
     */
    public function getStoreName(): string
    {
        return $this->getFactory()->getStore()->getStoreName();
    }

    /**
     * @param mixed $idSalesOrder
     *
     * @return string[]
     */
    public function getDistinctOrderStates($idSalesOrder)
    {
        return $this->getFactory()
            ->createOrderReaderWithMultiShippingAddress()
            ->getDistinctOrderStates($idSalesOrder);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param string $requestedDeliveryDate
     *
     * @return void
     */
    public function updateRequstedDeliveryDateForOrder(OrderTransfer $orderTransfer, string $requestedDeliveryDate): void
    {
        $qry = SpySalesShipmentQuery::create();
        $item = $qry->findOneByFkSalesOrder($orderTransfer->getIdSalesOrder());
        $item->setRequestedDeliveryDate($requestedDeliveryDate);

        $manager = new ShipmentEntityManager();
        $transfer = new ShipmentTransfer();
        $transfer->fromArray($item->toArray(), true);

        $manager->saveSalesShipment($transfer, $orderTransfer);

        $merchantSalesOrder = $this->getFactory()->createOrderReaderForStoreApp()->findMerchantSalesOrderByIdSalesOrder($orderTransfer->getIdSalesOrder());
        [$shipmentDate, $shipmentTime] = explode('_', $requestedDeliveryDate);
        [$startTime, $endTime] = explode('-', $shipmentTime);
        $completeRequestedDeliveryTime = $shipmentDate . ' ' . $startTime . ':00';
        $merchantSalesOrder->setRequestedDeliveryDate($completeRequestedDeliveryTime);
        $merchantSalesOrder->save();
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderConfirmationMail(SpySalesOrder $salesOrderEntity): void
    {
        $this->getFactory()->getNewOmsFacade()->sendEmail($salesOrderEntity);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     *
     * @return void
     */
    public function saveSalesOrder(QuoteTransfer $quoteTransfer, SaveOrderTransfer $saveOrderTransfer)
    {
        $orderUuid = $quoteTransfer->getUuid();
        if ($orderUuid != null) {
            $uuid = $this->getOrderByUid($orderUuid);
        } else {
            $uuid = null;
        }
        if ($uuid == null) {
            $this->getFactory()
                ->createSalesOrderSaver()
                ->saveOrderSales($quoteTransfer, $saveOrderTransfer);
        }
    }

    /**
     * @param string $uid
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function getOrderByUid(string $uid)
    {
        return $this->getFactory()
            ->createOrderReaderForStoreApp()
            ->findOrderByOrderUid($uid);
    }
}
