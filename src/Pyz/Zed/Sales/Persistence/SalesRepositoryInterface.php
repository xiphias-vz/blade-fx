<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Persistence;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer;
use Spryker\Zed\Sales\Persistence\SalesRepositoryInterface as SprykerSalesRepositoryInterface;

interface SalesRepositoryInterface extends SprykerSalesRepositoryInterface
{
    /**
     * @param int $idSalesShipment
     *
     * @return string
     */
    public function findSalesShipmentNameByIdSalesShipment(int $idSalesShipment): string;

    /**
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return int[]
     */
    public function findIdSalesOrdersByOrderFilterCriteria(OrderCriteriaFilterTransfer $orderFilterCriteriaTransport): array;

    /**
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return int[]
     */
    public function getSaleOrderIdsByCustomerReferenceAndIdSalesOrder(string $customerReference, int $idSalesOrder): array;

    /**
     * @param array $criteria
     *
     * @return array
     */
    public function getOrdersInfoByInvoiceDateTimeRange(array $criteria): array;

    /**
     * @param int[] $idSalesOrders
     *
     * @return int[]
     */
    public function findIdOrderItemsByIdSalesOrders(array $idSalesOrders): array;

    /**
     * @param int[] $idSalesOrders
     *
     * @return string[]
     */
    public function findRequestedDeliveryDatesByIdSalesOrders(array $idSalesOrders): array;

    /***
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SpySalesOrderItemEntityTransfer $itemEntityTransfer
     *
     * @return string|null
     */
    public function findProductSequence(QuoteTransfer $quoteTransfer, SpySalesOrderItemEntityTransfer $itemEntityTransfer): ?string;
}
