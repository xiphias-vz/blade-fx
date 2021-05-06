<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use DateTime;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Spryker\Zed\Sales\Communication\Table\OrdersTableQueryBuilder as SprykerOrdersTableQueryBuilder;

class OrdersTableQueryBuilder extends SprykerOrdersTableQueryBuilder implements OrdersTableQueryBuilderInterface
{
    public const FIELD_REQUESTED_DELIVERY_DATE = 'requested_delivery_date';

    /**
     * @param int|null $idOrderItemProcess
     * @param int|null $idOrderItemState
     * @param string|null $dateFilter
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function buildQuery($idOrderItemProcess = null, $idOrderItemState = null, $dateFilter = null)
    {
        $query = parent::buildQuery($idOrderItemProcess, $idOrderItemState, $dateFilter);

        $query->joinSpySalesShipment();
        $query->joinWithBillingAddress();
        $query = $this->addTimeSlot($query);

        return $query;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function addTimeSlot(SpySalesOrderQuery $query): SpySalesOrderQuery
    {
        $query
            ->useSpySalesShipmentQuery()
            ->withColumn(
                SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE,
                static::FIELD_REQUESTED_DELIVERY_DATE
            )
            ->endUse();

        return $query;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param \DateTime $dateTime
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyDayRangeFilter(SpySalesOrderQuery $query, DateTime $dateTime): SpySalesOrderQuery
    {
        return $query
            ->useSpySalesShipmentQuery()
                ->filterByRequestedDeliveryDate_Like(sprintf('%s%%', $dateTime->format('Y-m-d')))
            ->endUse();
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param string $merchantReference
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyMerchantReferenceFilter(SpySalesOrderQuery $query, string $merchantReference): SpySalesOrderQuery
    {
        return $query->filterByMerchantReference($merchantReference);
    }
}
