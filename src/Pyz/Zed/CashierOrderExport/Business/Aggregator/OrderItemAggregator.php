<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Aggregator;

use ArrayObject;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Shared\Oms\OmsConfig;

class OrderItemAggregator implements OrderItemAggregatorInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function aggregateSplitItems(OrderTransfer $orderTransfer): OrderTransfer
    {
        $itemsIndexedBySku = [];

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getState()->getName() === OmsConfig::STATE_CANCELLED) {
                continue;
            }

            $currentIndexedItem = $itemsIndexedBySku[$itemTransfer->getSku()] ?? null;

            if ($currentIndexedItem) {
                $itemsIndexedBySku[$itemTransfer->getSku()] = $this->combineItems(
                    $currentIndexedItem,
                    $itemTransfer
                );

                continue;
            }

            $itemsIndexedBySku[$itemTransfer->getSku()] = $itemTransfer;
        }

        return $orderTransfer->setItems(new ArrayObject($itemsIndexedBySku));
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransferOne
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransferTwo
     *
     * @return \Generated\Shared\Transfer\ItemTransfer
     */
    protected function combineItems(ItemTransfer $itemTransferOne, ItemTransfer $itemTransferTwo): ItemTransfer
    {
        return $itemTransferOne->setQuantity($itemTransferOne->getQuantity() + $itemTransferTwo->getQuantity());
    }
}
