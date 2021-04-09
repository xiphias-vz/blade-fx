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
            if (!array_key_exists($item["timeSlot"], $result)) {
                foreach ($statesToShow as $stateDef) {
                    $result[$item["timeSlot"]]["Total"][$stateDef] = 0;
                }
            }
            if (!array_key_exists($item["pickZone"], $result[$item["timeSlot"]])) {
                foreach ($statesToShow as $stateDef) {
                    $result[$item["timeSlot"]][$item["pickZone"]][$stateDef] = 0;
                }
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
                    foreach ($statesToShow as $stateDef) {
                        $result["Total"][$pickZoneKey][$stateDef] = 0;
                    }
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
             , case when not popb.fk_sales_order is null AND not ssoi1.fk_sales_order IS NULL
                then 'in picking'
                else
                    case when paused.fk_sales_order is null then
                        case when sit.name = 'cancelled' then 'picked' else sit.name end
                    else 'ready for picking' end
                end as status
             , count(distinct sso.order_reference) as ordersCount
             , count(distinct ssoi.sku + sso.order_reference) as orderItemsCount
             , sum(ssoi.quantity) as orderItemsQuantity
             , sum(ssoi.new_weight) as orderItemsWeight
        from spy_sales_order sso
                 inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
                 left outer join spy_sales_order_item ssoi1 on sso.id_sales_order = ssoi1.fk_sales_order AND ssoi.id_sales_order_item = ssoi1.id_sales_order_item
                 	and ssoi1.fk_oms_order_item_state = (select id_oms_order_item_state from spy_oms_order_item_state where name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "')
                 left outer join (select fk_sales_order from spy_sales_order_item where item_paused = 1 group by fk_sales_order) paused on sso.id_sales_order = paused.fk_sales_order
                 left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
                 inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                 left outer join (select fk_sales_order from pyz_order_picking_block group by fk_sales_order) popb on popb.fk_sales_order = sso.id_sales_order
                 inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
         where sss.requested_delivery_date like '" . $deliveryDate . "%'
                    and sso.merchant_reference = '" . $merchantReference . "'
        group by
            sss.requested_delivery_date
            , ssoi.pick_zone
            , status
        union
		select
            sss.requested_delivery_date
             , right(sss.requested_delivery_date, 11) as timeSlot
             , date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as deliveryDate
             , 'Total' as pickZone
             , case when not popb.fk_sales_order is null AND not ssoi1.fk_sales_order IS NULL
                then 'in picking'
                else
                    case when paused.fk_sales_order is null then
                        case when sit.name = 'cancelled' then 'picked' else sit.name end
                    else 'ready for picking' end
                end as status
             , count(distinct sso.order_reference) as ordersCount
             , count(distinct ssoi.sku + sso.order_reference) as orderItemsCount
             , sum(ssoi.quantity) as orderItemsQuantity
             , sum(ssoi.new_weight) as orderItemsWeight
        from spy_sales_order sso
                 inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
                 left outer join spy_sales_order_item ssoi1 on sso.id_sales_order = ssoi1.fk_sales_order AND ssoi.id_sales_order_item = ssoi1.id_sales_order_item
                 	and ssoi1.fk_oms_order_item_state = (select id_oms_order_item_state from spy_oms_order_item_state where name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "')
                 left outer join (select fk_sales_order from spy_sales_order_item where item_paused = 1 group by fk_sales_order) paused on sso.id_sales_order = paused.fk_sales_order
                 left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
                 inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                 left outer join (select fk_sales_order from pyz_order_picking_block group by fk_sales_order) popb on popb.fk_sales_order = sso.id_sales_order
                 inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
         where sss.requested_delivery_date like '" . $deliveryDate . "%'
                    and sso.merchant_reference = '" . $merchantReference . "'
        group by
            sss.requested_delivery_date
            , status";

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
