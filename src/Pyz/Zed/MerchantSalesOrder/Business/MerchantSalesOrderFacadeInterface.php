<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Business;

use Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Spryker\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface as SprykerMerchantSalesOrderFacadeInterface;

interface MerchantSalesOrderFacadeInterface extends SprykerMerchantSalesOrderFacadeInterface
{
    /**
     * Specification:
     * - Finds all sales order IDs for provided filter criteria
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderCollectionTransfer
     */
    public function findMerchantSalesOrdersByOrderFilterCriteria(
        OrderCriteriaFilterTransfer $orderFilterCriteriaTransport
    ): MerchantSalesOrderCollectionTransfer;

    /**
     * Specification:
     * - update merchant sales order with values in the update request
     *
     * @api
     *
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\OrderUpdateRequestTransfer $orderUpdateRequestTransfer
     *
     * @return bool
     */
    public function updateOrderWithOrderUpdateRequest(
        int $idSalesOrder,
        OrderUpdateRequestTransfer $orderUpdateRequestTransfer
    ): bool;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expandOrderWithMerchantSalesOrder(OrderTransfer $orderTransfer): OrderTransfer;
}
