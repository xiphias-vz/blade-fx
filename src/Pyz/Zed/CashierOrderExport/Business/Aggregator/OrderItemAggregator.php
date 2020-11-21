<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Aggregator;

use ArrayObject;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;

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
            $currentIndexedItem = $itemsIndexedBySku[$itemTransfer->getSku()] ?? null;

            if ($currentIndexedItem) {
                $itemsIndexedBySku[$itemTransfer->getSku()] = $this->addQuantityToItem(
                    $currentIndexedItem,
                    $itemTransfer->getQuantity()
                );

                continue;
            }

            $itemsIndexedBySku[$itemTransfer->getSku()] = $itemTransfer;
        }

        return $orderTransfer->setItems(new ArrayObject($itemsIndexedBySku));
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param int $quantity
     *
     * @return \Generated\Shared\Transfer\ItemTransfer
     */
    protected function addQuantityToItem(ItemTransfer $itemTransfer, int $quantity): ItemTransfer
    {
        $newItemQuantity = $itemTransfer->getQuantity() + $quantity;

        return $itemTransfer->setQuantity($newItemQuantity);
    }
}
