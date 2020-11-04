<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CancelledItems\Business\Filter;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;

class ItemFilter implements ItemFilterInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function filterOutCancelledItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array
    {
        return array_filter(
            $salesOrderTransfer->getItems()->getArrayCopy(),
            function (ItemTransfer $itemTransfer) {
                return $itemTransfer->getCanceledAmount() === 0;
            }
        );
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function filterOutAvailableItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array
    {
        return array_filter(
            $salesOrderTransfer->getItems()->getArrayCopy(),
            function (ItemTransfer $itemTransfer) {
                return $itemTransfer->getCanceledAmount() > 0;
            }
        );
    }
}
