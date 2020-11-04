<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Sku\Aggregator;

use Generated\Shared\Transfer\OrderTransfer;

interface SkuAggregatorInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array
     */
    public function aggregateOrderSkus(OrderTransfer $orderTransfer): array;
}
