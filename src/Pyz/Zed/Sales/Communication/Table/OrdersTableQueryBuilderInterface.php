<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use DateTime;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Spryker\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface as SprykerOrdersTableQueryBuilderInterface;

interface OrdersTableQueryBuilderInterface extends SprykerOrdersTableQueryBuilderInterface
{
    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param \DateTime $dateTime
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyDayRangeFilter(SpySalesOrderQuery $query, DateTime $dateTime): SpySalesOrderQuery;

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param string $merchantReference
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyMerchantReferenceFilter(SpySalesOrderQuery $query, string $merchantReference): SpySalesOrderQuery;
}
