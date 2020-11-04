<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Sku\Aggregator;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;

class SkuAggregator implements SkuAggregatorInterface
{
    /**
     * @inheritDoc
     */
    public function aggregateOrderSkus(OrderTransfer $orderTransfer): array
    {
        return array_reduce(
            $orderTransfer->getItems()->getArrayCopy(),
            function (array $skus, ItemTransfer $itemTransfer): array {
                $skus[$itemTransfer->getSku()] = $itemTransfer->getSku();

                return $skus;
            },
            []
        );
    }
}
