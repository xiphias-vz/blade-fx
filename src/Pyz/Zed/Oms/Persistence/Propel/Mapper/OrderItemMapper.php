<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\ItemStateTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateHistory;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Propel\Runtime\Collection\ObjectCollection;
use Spryker\Zed\Oms\Persistence\Propel\Mapper\OrderItemMapper as SprykerOrderItemMapper;

class OrderItemMapper extends SprykerOrderItemMapper
{
    /**
     * @var array
     */
    private $stateList;

    /**
     * @var array
     */
    private $processList;

    /**
     * @param \Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateHistory|null $orderItemHistoryEntity
     *
     * @return mixed|\Orm\Zed\Oms\Persistence\SpyOmsOrderItemState
     */
    private function getState(?SpyOmsOrderItemStateHistory $orderItemHistoryEntity = null)
    {
        if (!isset($this->stateList[$orderItemHistoryEntity->getFkOmsOrderItemState()])) {
            $this->stateList[$orderItemHistoryEntity->getFkOmsOrderItemState()] = $orderItemHistoryEntity->getState();
        }

        return $this->stateList[$orderItemHistoryEntity->getFkOmsOrderItemState()];
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItemEntity
     *
     * @return mixed|\Orm\Zed\Oms\Persistence\SpyOmsOrderItemState
     */
    private function getStateByItem(SpySalesOrderItem $orderItemEntity)
    {
        if (!isset($this->stateList[$orderItemEntity->getFkOmsOrderItemState()])) {
            $this->stateList[$orderItemEntity->getFkOmsOrderItemState()] = $orderItemEntity->getState();
        }

        return $this->stateList[$orderItemEntity->getFkOmsOrderItemState()];
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItemEntity
     *
     * @return mixed|\Orm\Zed\Oms\Persistence\SpyOmsOrderProcess|null
     */
    private function getProcess(SpySalesOrderItem $orderItemEntity)
    {
        if (!isset($this->processList[$orderItemEntity->getFkOmsOrderProcess()])) {
            $this->processList[$orderItemEntity->getFkOmsOrderProcess()] = $orderItemEntity->getProcess();
        }

        return $this->processList[$orderItemEntity->getFkOmsOrderProcess()];
    }

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
                ->setName($this->getState($omsOrderItemStateHistory)->getName())
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
                $this->getProcess($salesOrderItemEntity)->getName()
            );

            $itemTransfer->setState(
                (new ItemStateTransfer())->fromArray($this->getStateByItem($salesOrderItemEntity)->toArray(), true)
            );

            $itemTransfers[] = $itemTransfer;
        }

        return $itemTransfers;
    }
}
