<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Persistence;

use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\SalesOverview\Persistence\SalesOverviewPersistenceFactory getFactory()
 */
class SalesOverviewRepository extends AbstractRepository implements SalesOverviewRepositoryInterface
{
    /**
     * @param int $choice "1 => 'Order', 2 => 'Position', 3 => 'Stückzahl'"
     * @param string $deliveryDate
     * @param string $merchantReference
     *
     * @return array
     */
    public function getDataByChoiceFilter(int $choice, string $deliveryDate, string $merchantReference): array
    {
        $data = $this->getData($deliveryDate, $merchantReference);
        $statesToShow = [
            OmsConfig::STORE_STATE_READY_FOR_PICKING,
            OmsConfig::STORE_STATE_PICKED,
            OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER,
            "order invoiced",
            "in picking"];
        $result = [];
        foreach ($data as $item) {
            $state = $item["status"];
            foreach ($statesToShow as $stateDef) {
                $result[$item["timeSlot"]][$item["pickZone"]][$stateDef] = 0;
            }
            switch ($choice) {
                case 1:
                    $result[$item["timeSlot"]][$item["pickZone"]][$state] = $item["ordersCount"];
                    break;
                case 2:
                    $result[$item["timeSlot"]][$item["pickZone"]][$state] = $item["orderItemsCount"];
                    break;
                case 3:
                    $result[$item["timeSlot"]][$item["pickZone"]][$state] = $item["orderItemsQuantity"];
                    break;
            }
        }
        if (!array_key_exists("Total", $result)) {
            $result["Total"] = [];
        }
        foreach ($result as $timeSlotKey => $timeSlotValue) {
            foreach ($timeSlotValue as $pickZoneKey => $pickZoneValue) {
                if (!array_key_exists($pickZoneKey, $result["Total"])) {
                    $result["Total"][$pickZoneKey] = [];
                }
                foreach ($pickZoneValue as $stateKey => $stateValue) {
                    if (!array_key_exists($stateKey, $result["Total"][$pickZoneKey])) {
                        $result["Total"][$pickZoneKey][$stateKey] = 0;
                    }
                    $result["Total"][$pickZoneKey][$stateKey] = $result["Total"][$pickZoneKey][$stateKey] + $stateValue;
                }
            }
        }

        return $result;
    }

    /**
     * @param string $deliveryDate "should be in format yyyy-mm-dd"
     * @param string $merchantReference
     *
     * @return array
     */
    private function getData(string $deliveryDate, string $merchantReference): array
    {
        $sql = "select
            sss.requested_delivery_date
             , right(sss.requested_delivery_date, 11) as timeSlot
             , date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as deliveryDate
             , ssoi.pick_zone as pickZone
             , case when popb.fk_picking_zone is null then sit.name else
             	case when sit.name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "' then 'in picking' else sit.name end
               end as status
             , sso2.orderCount as zoneOrdersCount
             , count(distinct sso.order_reference) as ordersCount
             , count(distinct ssoi.sku) as orderItemsCount
             , sum(ssoi.quantity) as orderItemsQuantity
             , sum(ssoi.new_weight) as orderItemsWeight
        from spy_sales_order sso
                 inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
                 left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
                 inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                 left outer join pyz_order_picking_block popb on popb.fk_sales_order = sso.id_sales_order and ppz.id_picking_zone = popb.fk_picking_zone
                 inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
            inner join (
                select sss1.requested_delivery_date, ssoi1.pick_zone, sso1.merchant_reference,
                    count(distinct sso1.order_reference) as orderCount
                from spy_sales_order sso1
                    inner join spy_sales_order_item ssoi1 on sso1.id_sales_order = ssoi1.fk_sales_order
                    left outer join spy_sales_shipment sss1 on sso1.id_sales_order = sss1.fk_sales_order
                where sss1.requested_delivery_date like '" . $deliveryDate . "%'
                    and sso1.merchant_reference = '" . $merchantReference . "'
                group by sss1.requested_delivery_date, ssoi1.pick_zone, sso1.merchant_reference
            ) sso2 on sss.requested_delivery_date = sso2.requested_delivery_date
                     and ssoi.pick_zone = sso2.pick_zone and sso.merchant_reference = sso2.merchant_reference
        group by
            sss.requested_delivery_date
            , ssoi.pick_zone
            , status
            , sso2.orderCount
        union
        select
            sss.requested_delivery_date
             , right(sss.requested_delivery_date, 11) as timeSlot
             , date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as deliveryDate
             , 'Total' as pickZone
             , case when popb.fk_picking_zone is null then sit.name else
             	case when sit.name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "' then 'in picking' else sit.name end
               end as status
             , sso2.orderCount as zoneOrdersCount
             , count(distinct sso.order_reference) as ordersCount
             , count(distinct ssoi.sku) as orderItemsCount
             , sum(ssoi.quantity) as orderItemsQuantity
             , sum(ssoi.new_weight) as orderItemsWeight
        from spy_sales_order sso
                 inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
                 left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
                 inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                 left outer join pyz_order_picking_block popb on popb.fk_sales_order = sso.id_sales_order and ppz.id_picking_zone = popb.fk_picking_zone
                 inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
            inner join (
                select sss1.requested_delivery_date, ssoi1.pick_zone, sso1.merchant_reference,
                    count(distinct sso1.order_reference) as orderCount
                from spy_sales_order sso1
                    inner join spy_sales_order_item ssoi1 on sso1.id_sales_order = ssoi1.fk_sales_order
                    left outer join spy_sales_shipment sss1 on sso1.id_sales_order = sss1.fk_sales_order
                where sss1.requested_delivery_date like '" . $deliveryDate . "%'
                    and sso1.merchant_reference = '" . $merchantReference . "'
                group by sss1.requested_delivery_date, ssoi1.pick_zone, sso1.merchant_reference
            ) sso2 on sss.requested_delivery_date = sso2.requested_delivery_date
                     and ssoi.pick_zone = sso2.pick_zone and sso.merchant_reference = sso2.merchant_reference
        group by
            sss.requested_delivery_date
            , status
            , sso2.orderCount";

        return $this->getResult($sql, true);
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, bool $doFetch = true): array
    {
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();

        if ($doFetch) {
            return $statement->fetchAll(PDO::FETCH_NAMED);
        }

        return [];
    }
}
