<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\ItemStateTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Propel\Runtime\Collection\ObjectCollection;
use Spryker\Zed\Oms\Persistence\Propel\Mapper\OrderItemMapper as SprykerOrderItemMapper;

class OrderItemMapper extends SprykerOrderItemMapper
{
    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateHistory[] $omsOrderItemStateHistoryEntities
     *
     * @return \Generated\Shared\Transfer\ItemStateTransfer[]
     */
    public function mapOmsOrderItemStateHistoryEntityCollectionToItemStateHistoryTransfers(
        ObjectCollection $omsOrderItemStateHistoryEntities
    ): array {
        $itemStateTransfers = [];

        foreach ($omsOrderItemStateHistoryEntities as $omsOrderItemStateHistory) {
            $itemStateTransfers[] = (new ItemStateTransfer())
                ->fromArray($omsOrderItemStateHistory->toArray(), true)
                ->setName($omsOrderItemStateHistory->getState()->getName())
                ->setIdSalesOrderItem($omsOrderItemStateHistory->getFkSalesOrderItem())
                ->setIdSalesOrder($omsOrderItemStateHistory->getVirtualColumn("fk_sales_order"));
        }

        return $itemStateTransfers;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $salesOrderItemEntityCollection
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    public function mapSalesOrderItemEntityCollectionToOrderItemTransfers(
        ObjectCollection $salesOrderItemEntityCollection
    ): array {
        $itemTransfers = [];

        foreach ($salesOrderItemEntityCollection as $salesOrderItemEntity) {
            $itemTransfer = (new ItemTransfer())->fromArray($salesOrderItemEntity->toArray(), true);

            $itemTransfer->setProcess(
                $salesOrderItemEntity->getProcess()->getName()
            );

            $itemTransfer->setState(
                (new ItemStateTransfer())->fromArray($salesOrderItemEntity->getState()->toArray(), true)
            );

            $itemTransfers[] = $itemTransfer;
        }

        return $itemTransfers;
    }
}
