<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CancelledItems\Business\Filter;

use Generated\Shared\Transfer\OrderTransfer;

interface ItemFilterInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function filterOutCancelledItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function filterOutAvailableItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array;
}
