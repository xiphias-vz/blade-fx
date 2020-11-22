<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business;

use DateTime;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Spryker\Zed\Sales\Business\SalesFacade as SprykerSalesFacade;

/**
 * @method \Pyz\Zed\Sales\Business\SalesBusinessFactory getFactory()
 * @method \Pyz\Zed\Sales\Persistence\SalesEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class SalesFacade extends SprykerSalesFacade implements SalesFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): bool
    {
        return $this->getEntityManager()->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);
    }

    /**
     * @inheritDoc
     */
    public function updateOrderStoreStatus(int $idSalesOrder, string $status): bool
    {
        return $this->getEntityManager()->updateOrderStoreStatus($idSalesOrder, $status);
    }

    /**
     * @inheritDoc
     */
    public function checkOrderShipment(int $idSalesShipment, string $shipmentMethodKey): bool
    {
        return $this->getFactory()->createSalesOrderChecker()
            ->checkOrderShipment($idSalesShipment, $shipmentMethodKey);
    }

    /**
     * @inheritDoc
     *
     * @api
     *
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
     * @inheritDoc
     *
     * @api
     *
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
     * @inheritDoc
     *
     * @api
     *
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
     * @inheritDoc
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param string[] $states
     *
     * @return string[]
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndStates(int $idSalesOrder, array $states): array
    {
        return $this->getRepository()->getSalesOrderItemsIdsByIdSalesOrderAndStates($idSalesOrder, $states);
    }

    /**
     * @inheritDoc
     */
    public function getOrdersInfoByInvoiceDateTimeRange(?DateTime $dateFrom, ?DateTime $dateTo): array
    {
        return $this->getFactory()
            ->createInvoiceSalesOrderReader()
            ->getOrdersInfoByInvoiceDateTimeRange($dateFrom, $dateTo);
    }

    /**
     * @inheritDoc
     */
    public function findIdSalesOrdersByOrderFilterCriteria(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): array {
        return $this->getRepository()->findIdSalesOrdersByOrderFilterCriteria($orderFilterCriteriaTransport);
    }

    /**
     * @inheritDoc
     */
    public function updateOrderWithOrderUpdateRequest(int $idSalesOrder, OrderUpdateRequestTransfer $orderUpdateRequestTransfer): bool
    {
        return $this->getEntityManager()
            ->updateOrderWithOrderUpdateRequest($idSalesOrder, $orderUpdateRequestTransfer);
    }

    /**
     * @inheritDoc
     */
    public function findIdOrderItemsByIdSalesOrders(array $idSalesOrders): array
    {
        return $this->getRepository()->findIdOrderItemsByIdSalesOrders($idSalesOrders);
    }

    /**
     * @inheritDoc
     */
    public function findRequestedDeliveryDatesByIdSalesOrders(array $idSalesOrders): array
    {
        return $this->getRepository()->findRequestedDeliveryDatesByIdSalesOrders($idSalesOrders);
    }

    /**
     * {@inheritDoc}
     *
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
     * {@inheritDoc}
     *
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
     * {@inheritDoc}
     *
     * @api
     *
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
     * {@inheritDoc}
     *
     * @api
     *
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
    public function expandOrderItemWithSequence(
        QuoteTransfer $quoteTransfer,
        SpySalesOrderItemEntityTransfer $itemEntityTransfer
    ): SpySalesOrderItemEntityTransfer {
        return $this->getFactory()->createOrderItemExpander()->expandItemWithSequence($quoteTransfer, $itemEntityTransfer);
    }
}
