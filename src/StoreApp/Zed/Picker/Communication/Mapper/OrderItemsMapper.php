<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderItemStatusesTransfer;
use Generated\Shared\Transfer\OrderTransfer;

class OrderItemsMapper implements OrderItemsMapperInterface
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
        array $skuToWeightMap = []
    ): OrderItemStatusesTransfer {
        $orderItemPickingStatusesTransfer = new OrderItemStatusesTransfer();

        foreach ($salesOrderTransfer->getItems() as $itemTransfer) {
            $itemSku = $itemTransfer->getSku();
            if (!isset($skuToPickedQuantityMap[$itemSku])) {
                continue;
            }

            if ($skuToPickedQuantityMap[$itemSku] > 0) {
                // In case weight is given, we keep only one of requested items
                if (isset($skuToWeightMap[$itemSku])) {
                    $skuToPickedQuantityMap[$itemSku] = 1;

                    unset($skuToWeightMap[$itemSku]);
                }

                $orderItemPickingStatusesTransfer->addSelectedOrderItemId(
                    $itemTransfer->getIdSalesOrderItem()
                );

                $skuToPickedQuantityMap[$itemSku]--;
                continue;
            }

            $orderItemPickingStatusesTransfer->addnotSelectedOrderItemId(
                $itemTransfer->getIdSalesOrderItem()
            );
        }

        return $orderItemPickingStatusesTransfer;
    }
}
