<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use DateTime;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Propel\Runtime\ActiveQuery\Criteria;
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
        $query->joinPyzPickingSalesOrder(null, Criteria::LEFT_JOIN);
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
     * @param \DateTime $dateFrom
     * @param \DateTime $dateTo
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyFilterDateBetween(SpySalesOrderQuery $query, DateTime $dateFrom, DateTime $dateTo): SpySalesOrderQuery
    {
        return $query
                ->where(SpySalesOrderTableMap::COL_ID_SALES_ORDER . " in (select s.fk_sales_order from spy_sales_shipment s where s.requested_delivery_date BETWEEN '" . $dateFrom->format('Y-m-d') . "_00:00' and '" . $dateTo->format('Y-m-d') . "_23:59')");
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param string $storeStatus
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyFilterByState(SpySalesOrderQuery $query, string $storeStatus): SpySalesOrderQuery
    {
        return $query
            ->where(SpySalesOrderTableMap::COL_ID_SALES_ORDER . " in (select i.fk_sales_order from spy_sales_order_item i inner join spy_oms_order_item_state s on i.fk_oms_order_item_state = s.id_oms_order_item_state where s.name like '" . $storeStatus . "')");
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyFilterByPausedState(SpySalesOrderQuery $query): SpySalesOrderQuery
    {
        return $query
            ->where(SpySalesOrderTableMap::COL_ID_SALES_ORDER . " in (select i.fk_sales_order from spy_sales_order_item i where i.item_paused = 1)");
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param array $pickZones
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyFilterByPickZone(SpySalesOrderQuery $query, array $pickZones): SpySalesOrderQuery
    {
        return $query
            ->where(SpySalesOrderTableMap::COL_ID_SALES_ORDER . " in (select i.fk_sales_order from spy_sales_order_item i where i.pick_zone in('" . implode("','", $pickZones) . "'))");
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderQuery $query
     * @param array $timeSlots
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function applyFilterByTimeSlots(SpySalesOrderQuery $query, array $timeSlots): SpySalesOrderQuery
    {
        return $query
            ->where(SpySalesOrderTableMap::COL_ID_SALES_ORDER . " in (select s.fk_sales_order from spy_sales_shipment s where s.requested_delivery_date like '%" . implode("' or s.requested_delivery_date like '%", $timeSlots) . "')");
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
