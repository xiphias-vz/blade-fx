<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Aggregator;

use Generated\Shared\Transfer\ItemTransfer;

class ItemAggregator implements ItemAggregatorInterface
{
    /**
     * @inheritDoc
     */
    public function aggregateOrderItemsQuantities(array $itemTransfers): array
    {
        return array_reduce(
            $itemTransfers,
            function (array $aggregatedItemTransfers, ItemTransfer $itemTransfer): array {
                $itemSku = $itemTransfer->getSku();

                /** @var \Generated\Shared\Transfer\ItemTransfer $aggregatedItemTransfer */
                $aggregatedItemTransfer = $aggregatedItemTransfers[$itemSku] ?? null;
                if (empty($aggregatedItemTransfer)) {
                    $aggregatedItemTransfer->setQuantity(
                        $aggregatedItemTransfer->getQuantity() + $itemTransfer->getQuantity()
                    );
                } else {
                    $aggregatedItemTransfers[$itemSku] = clone $itemTransfer;
                }

                return $aggregatedItemTransfers;
            },
            []
        );
    }
}
