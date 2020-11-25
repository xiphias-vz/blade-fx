<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence;

use DateTime;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Spryker\Zed\Oms\Persistence\OmsQueryContainer as SprykerOmsQueryContainer;

/**
 * @method \Spryker\Zed\Oms\Persistence\OmsPersistenceFactory getFactory()
 */
class OmsQueryContainer extends SprykerOmsQueryContainer implements OmsQueryContainerInterface
{
    /**
     * @api
     *
     * @param array $states
     * @param string $processName
     * @param int|null $processId
     * @param int|null $limit
     * @param string|null $storeName
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function querySalesOrderItemsByState(array $states, $processName, $processId = null, $limit = null, ?string $storeName = null)
    {
        $query = parent::querySalesOrderItemsByState($states, $processName);

        if ($processId !== null) {
            $query->filterByOmsProcessorId($processId);
        }

        if ($storeName) {
            // due to EIN store name
            //$query->filterByStore($storeName);
        }

        if ($limit !== null) {
            $query
                ->withColumn('DISTINCT ' . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER, 'fk_sales_order')
                ->select(['fk_sales_order'])
                ->limit($limit);

            $salesOrderIds = $query->find()->getData();
            $query = parent::querySalesOrderItemsByState($states, $processName)
                ->filterByFkSalesOrder_In($salesOrderIds);
        }

        return $query;
    }

    /**
     * @api
     *
     * @param \DateTime $now
     * @param int|null $processId
     * @param int|null $limit
     * @param string|null $storeName
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function querySalesOrderItemsWithExpiredTimeouts(DateTime $now, $processId = null, $limit = null, ?string $storeName = null)
    {
        $query = parent::querySalesOrderItemsWithExpiredTimeouts($now);

        if ($processId !== null) {
            $query->filterByOmsProcessorId($processId);
        }

        if ($storeName) {
            $query->filterByStore($storeName);
        }

        if ($limit !== null) {
            $query
                ->clearSelectColumns()
                ->withColumn('DISTINCT ' . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER, 'fk_sales_order')
                ->select(['fk_sales_order'])
                ->limit($limit);

            $salesOrderIds = $query->find()->getData();
            $query = parent::querySalesOrderItemsWithExpiredTimeouts($now)
                ->filterByFkSalesOrder_In($salesOrderIds);
        }

        return $query;
    }
}
