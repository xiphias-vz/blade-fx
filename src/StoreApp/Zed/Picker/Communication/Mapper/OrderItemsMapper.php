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
     *
     * @return \Generated\Shared\Transfer\OrderItemStatusesTransfer
     */
    public function mapOrderItemsToOrderItemStatuses(
        OrderTransfer $salesOrderTransfer,
        array $skuToPickedQuantityMap
    ): OrderItemStatusesTransfer {
        $orderItemPickingStatussesTransfer = new OrderItemStatusesTransfer();

        foreach ($salesOrderTransfer->getItems() as $itemTransfer) {
            $itemSku = $itemTransfer->getSku();
            if (!isset($skuToPickedQuantityMap[$itemSku])) {
                continue;
            }

            if ($skuToPickedQuantityMap[$itemSku] > 0) {
                $orderItemPickingStatussesTransfer->addSelectedOrderItemId(
                    $itemTransfer->getIdSalesOrderItem()
                );

                $skuToPickedQuantityMap[$itemSku]--;
                continue;
            }

            $orderItemPickingStatussesTransfer->addnotSelectedOrderItemId(
                $itemTransfer->getIdSalesOrderItem()
            );
        }

        return $orderItemPickingStatussesTransfer;
    }
}
