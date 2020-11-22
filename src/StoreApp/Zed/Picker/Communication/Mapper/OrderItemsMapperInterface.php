<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderItemStatusesTransfer;
use Generated\Shared\Transfer\OrderTransfer;

interface OrderItemsMapperInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param int[] $skuToPickedQuantityMap
     * @param int[] $skuToWeightMap
     *
     * @return \Generated\Shared\Transfer\OrderItemStatusesTransfer
     */
    public function mapOrderItemsToOrderItemStatuses(
        OrderTransfer $salesOrderTransfer,
        array $skuToPickedQuantityMap,
        array $skuToWeightMap
    ): OrderItemStatusesTransfer;
}
