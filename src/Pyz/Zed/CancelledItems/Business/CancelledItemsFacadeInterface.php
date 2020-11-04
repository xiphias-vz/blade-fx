<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CancelledItems\Business;

use Generated\Shared\Transfer\OrderTransfer;

interface CancelledItemsFacadeInterface
{
    /**
     * @param int $idSalesOrder
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return void
     */
    public function cancelItemsInSalesOrder(int $idSalesOrder, array $orderItems): void;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function getCancelledItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function getAvailableItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array;
}
