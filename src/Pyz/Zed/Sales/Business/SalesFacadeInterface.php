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
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Spryker\Zed\Sales\Business\SalesFacadeInterface as SprykerSalesFacadeInterface;

interface SalesFacadeInterface extends SprykerSalesFacadeInterface
{
    /**
     * Specification:
     * - Updates the order picking bags count
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param int $pickingBagsCount
     *
     * @return bool
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): bool;

    /**
     * Specification:
     * - Finds all sales order for provided filter criteria
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return int[]
     */
    public function findIdSalesOrdersByOrderFilterCriteria(OrderCriteriaFilterTransfer $orderFilterCriteriaTransport): array;

    /**
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return array
     */
    public function findSalesOrdersReferenceByOrderFilterCriteria(OrderCriteriaFilterTransfer $orderFilterCriteriaTransport): array;

    /**
     * Specification:
     * - Updates the order status
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param string $status
     *
     * @return bool
     */
    public function updateOrderStoreStatus(int $idSalesOrder, string $status): bool;

    /**
     * Specification:
     * - Returns true order shipment matches the required one
     *
     * @api
     *
     * @param int $idSalesShipment
     * @param string $shipmentMethodKey
     *
     * @return bool
     */
    public function checkOrderShipment(int $idSalesShipment, string $shipmentMethodKey): bool;

    /**
     * Specification:
     * - save order reference.
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param string $invoiceReference
     * @param \DateTime $invoiceDateTime
     *
     * @return void
     */
    public function saveInvoiceReference(int $idSalesOrder, string $invoiceReference, DateTime $invoiceDateTime): void;

    /**
     * Specification:
     * - hydrate sales order status.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateSalesOrderStatus(OrderTransfer $orderTransfer): OrderTransfer;

    /**
     * Specification:
     * - gets sales order ids by customer and order references.
     *
     * @api
     *
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return int[]
     */
    public function getSaleOrderIdsByCustomerReferenceAndIdSalesOrder(string $customerReference, int $idSalesOrder): array;

    /**
     * Specification:
     * - gets sales order item ids by sales order and oms order item states.
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param string[] $states
     *
     * @return string[]
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndStates(int $idSalesOrder, array $states): array;

    /**
     *  Specification:
     * - Retrieves sales order item IDs using given ID sales order, ID picking zone and OMS order item states.
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param int $idPickingZone
     * @param string[] $states
     *
     * @return string[]
     */
    public function getSalesOrderItemsIdsByIdSalesOrderAndPickingZoneAndStates(
        int $idSalesOrder,
        int $idPickingZone,
        array $states
    ): array;

    /**
     * Specification:
     * - save order reference.
     *
     * @api
     *
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return array
     */
    public function getOrdersInfoByInvoiceDateTimeRange(?DateTime $dateFrom, ?DateTime $dateTo): array;

    /**
     * @param int[] $idSalesOrders
     *
     * @return int[]
     */
    public function findIdOrderItemsByIdSalesOrders(array $idSalesOrders): array;

    /**
     * Specification:
     * - update order with values in the update request
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\OrderUpdateRequestTransfer $orderUpdateRequestTransfer
     *
     * @return bool
     */
    public function updateOrderWithOrderUpdateRequest(int $idSalesOrder, OrderUpdateRequestTransfer $orderUpdateRequestTransfer): bool;

    /**
     * Specification:
     * - update order items with new values
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderChangeRequestTransfer $orderChangeRequestTransfer
     *
     * @return bool
     */
    public function saveOrderChange(OrderChangeRequestTransfer $orderChangeRequestTransfer);

    /**
     * Specification:
     * - Retrieve all requested delivery dates for given sales order
     *
     * @api
     *
     * @param int[] $idSalesOrders
     *
     * @return string[]
     */
    public function findRequestedDeliveryDatesByIdSalesOrders(array $idSalesOrders): array;

    /**
     * Specification:
     * - hydrate the order with minimum required age for delivery
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateMinimumAge(OrderTransfer $orderTransfer): OrderTransfer;

    /**
     * Specification:
     * - checks if order requested date was `hours` hours in the past.
     *
     * @api
     *
     * @param string $requestedDeliveryDate
     * @param int $hours
     *
     * @return bool
     */
    public function isRequestedOrderDatePassed(string $requestedDeliveryDate, int $hours): bool;

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByIdSalesOrderForStoreApp(int $idSalesOrder): ?OrderTransfer;

    /**
     * Specification:
     * - Retrieves an order using sales order ID.
     * - Filters the order's items using the given picking zone name.
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
    ): ?OrderTransfer;

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer $itemEntityTransfer
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer
     */
    public function expandItemWithStockProductData(
        QuoteTransfer $quoteTransfer,
        SpySalesOrderItemEntityTransfer $itemEntityTransfer
    ): SpySalesOrderItemEntityTransfer;

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderWithPickingSalesOrdersByIdSalesOrder(int $idSalesOrder): ?OrderTransfer;

    /**
     * Specification:
     *  - Returns persisted order information for the given sales order id.
     *
     * @api
     *
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function getOrderByIdSalesOrderWithoutExpand($idSalesOrder);

    /**
     * @return string
     */
    public function getStoreName(): string;
}
