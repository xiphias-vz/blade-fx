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
        $sql = "
    select
     sss.requested_delivery_date
     , right(sss.requested_delivery_date, 11) as timeSlot
     , date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as deliveryDate
     , ssoi.pick_zone as pickZone
     , case when popb.fk_sales_order is not null
     and ssoi1.id_sales_order_item is not null
     then 'in picking'
     else
     case when sit.name in ('order invoiced') then 'order invoiced'
     else
     case when sit.name in ('ready for picking') then 'ready for picking'
     else
     case when sit.name in ('ready for collection') then 'ready for collection'
     else case when sit.name in ('cancelled', 'picked') then 'picked'
     end
     end
     end
     end
     end as status
     , count(distinct sso.order_reference) as ordersCount
     , count(distinct ssoi.sku + sso.order_reference) as orderItemsCount
     , sum(ssoi.quantity) as orderItemsQuantity
     , sum(ssoi.new_weight) as orderItemsWeight
     from spy_sales_order sso
     inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
     inner join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
     inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
     left outer join spy_sales_order_item ssoi1 on sso.id_sales_order = ssoi1.fk_sales_order
     AND ssoi.id_sales_order_item = ssoi1.id_sales_order_item
     AND ssoi1.fk_oms_order_item_state = (select id_oms_order_item_state from spy_oms_order_item_state where name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "')
     left outer join pyz_picking_zone ppz1 on ssoi1.pick_zone = ppz1.name
     inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
     left outer join pyz_order_picking_block popb on popb.fk_sales_order = sso.id_sales_order
     and popb.fk_picking_zone = ppz.id_picking_zone
     and popb.fk_picking_zone = ppz1.id_picking_zone
     where sss.requested_delivery_date like '" . $deliveryDate . "%'
     and sso.merchant_reference = '" . $merchantReference . "'
     group by
     sss.requested_delivery_date
     , ssoi.pick_zone
     , status
     union
    select b.requested_delivery_date, b.timeSlot, b.deliveryDate, b.pickZone, right(b.status, length(b.status) -2) as status
        , b.ordersCount, b.orderItemsCount, b.orderItemsQuantity, b.orderItemsWeight
        from
            (
             select a.requested_delivery_date, a.timeSlot, a.deliveryDate, a.pickZone
                 , count(distinct a.id_sales_order) as ordersCount, sum(a.orderItemsCount) as orderItemsCount, sum(a.orderItemsQuantity) as orderItemsQuantity
                 , sum(a.orderItemsWeight) as orderItemsWeight, a.id_sales_order
                 , case when min(status) in ('1 picked') and sum(a.readyForPickingCount) > 0 then '0 in picking' else min(status) end  as status
            from
                (
                select
                sss.requested_delivery_date
                , sso.id_sales_order
               , right(sss.requested_delivery_date, 11) as timeSlot
               , date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as deliveryDate
               , 'Total' as pickZone
               , case when popb.fk_sales_order is not null
                           and ssoi1.id_sales_order_item is not null
                  then '0 in picking'
                  else
                      case when sit.name in ('order invoiced') then '1 order invoiced'
                      else
                          case when sit.name in ('ready for picking') then '1 ready for picking'
                          else
                          case when sit.name in ('ready for collection') then '1 ready for collection'
                              else case when sit.name in ('cancelled', 'picked') then '1 picked'
                              end
                           end
                         end
                         end
                  end as status
               , count(distinct sso.order_reference) as ordersCount
               , count(distinct ssoi.sku + sso.order_reference) as orderItemsCount
               , sum(ssoi.quantity) as orderItemsQuantity
               , sum(ssoi.new_weight) as orderItemsWeight
               , sum(case when sit.name in ('ready for picking') then 1 else 0 END) AS readyForPickingCount
          from spy_sales_order sso
                inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
                inner join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
                inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                left outer join spy_sales_order_item ssoi1 on sso.id_sales_order = ssoi1.fk_sales_order
                    AND ssoi.id_sales_order_item = ssoi1.id_sales_order_item
                    AND ssoi1.fk_oms_order_item_state = (select id_oms_order_item_state from spy_oms_order_item_state where name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "')
                left outer join pyz_picking_zone ppz1 on ssoi1.pick_zone = ppz1.name
                inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
                left outer join pyz_order_picking_block popb on popb.fk_sales_order = sso.id_sales_order
                    and popb.fk_picking_zone = ppz.id_picking_zone
                    and popb.fk_picking_zone = ppz1.id_picking_zone
                where sss.requested_delivery_date like '" . $deliveryDate . "%'
                and sso.merchant_reference = '" . $merchantReference . "'
            group by
              sss.requested_delivery_date
              , sso.id_sales_order
              , status
        ) a
      group by requested_delivery_date, id_sales_order
      ) b
      group by b.requested_delivery_date, b.status
        ";

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
