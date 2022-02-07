<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence;

use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Oms\Persistence\OmsRepository as SprykerOmsRepository;

class OmsRepository extends SprykerOmsRepository
{
    /**
     * @param int[] $salesOrderItemIds
     *
     * @return \Generated\Shared\Transfer\ItemStateTransfer[]
     */
    public function getItemHistoryStatesByOrderItemIds(array $salesOrderItemIds): array
    {
        $omsOrderItemStateHistoryQuery = $this->getFactory()
            ->createOmsOrderItemStateHistoryQuery()
            ->filterByFkSalesOrderItem_In($salesOrderItemIds)
            ->leftJoinWithState()
            ->leftJoinOrderItem()
            ->groupByFkSalesOrderItem()
            ->groupByIdOmsOrderItemStateHistory()
            ->orderByIdOmsOrderItemStateHistory(Criteria::DESC)
            ->withColumn(SpySalesOrderItemTableMap::COL_FK_SALES_ORDER, "fk_sales_order");

        return $this->getFactory()
            ->createOrderItemMapper()
            ->mapOmsOrderItemStateHistoryEntityCollectionToItemStateHistoryTransfers($omsOrderItemStateHistoryQuery->find());
    }
}
