<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Persistence;

use Generated\Shared\Transfer\FileSystemContentTransfer;
use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\SalesOrderSummaryExport\Persistence\SalesOrderSummaryExportPersistenceFactory getFactory()
 */
class SalesOrderSummaryExportRepository extends AbstractRepository implements SalesOrderSummaryExportRepositoryInterface
{
    /**
     * @var string[]
     */
    protected $stringColumns = ["OrderNr", "store", "OrderDate", "DeliveryDate", "external_customer_identifier", "TimeSlot", "status", "comment"];

     /**
      * getCustomOrderItemData
      *
      * @return \Generated\Shared\Transfer\FileSystemContentTransfer
      */
    public function getCustomOrderItemData(): FileSystemContentTransfer
    {
        $transfer = new FileSystemContentTransfer();

        $qry = "select sso.order_reference as OrderNr
	, sso.store
	, date_format(CONVERT_TZ(sso.created_at, '+00:00', '+01:00'),  '%d.%m.%Y %T') as OrderDate
	, date_format(left(sss.requested_delivery_date, 10), '%d.%m.%Y') as DeliveryDate
    , sum(ssoi.gross_price) as ItemValueGross
    , round(sum(round(ssoi.gross_price / ((100 + str.rate)/100), 2)), 0) as ItemValueNet
    , sum(ssoi.quantity) as ItemQuantity
    , count(distinct ssoi.product_number) as ItemsCount
    , sc.id_customer as external_customer_identifier
    , sc.my_globus_card as loyalty_number
    , right(sss.requested_delivery_date, 11) as TimeSlot
    , max(sit.name) as status
    , case when sum(ssoi.gross_price) - ifnull(ssot.canceled_total, 0) > 0 then sum(ssoi.gross_price) - ifnull(ssot.canceled_total, 0) else 0 end as Delivered_ItemValueGross
    , round(sum(case when sit.name like '%cancelled%' then 0 else round(ssoi.gross_price / ((100 + str.rate)/100), 2) end), 0) as Delivered_ItemValueNet
    , sum(case when sit.name in ('\"cancellation process\"', '\"cancelled\"', '\"cancelled due to not in stock\"')  then 0 else
        	case when ssoi.new_weight is not null and sit.name not in ('\"ready for picking\"', '\"ready for selecting shelves\"') then round(ssoi.new_weight / ssoi.weight_per_unit, 0) else 1 end
        	end) as Delivered_ItemsQuantity,
        count(distinct case when sit.name like '%cancelled%' then 0 else ssoi.product_number end) - sign(sum(case when sit.name like '%cancelled%' then 1 else 0 end)) as Delivered_ItemsCount
    , case when sso.cart_note in ('null', '\"null\"') then null else sso.cart_note end as comment
    , ssot.order_expense_total as ShippingValueGross
    from spy_sales_order sso
        inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
        inner join spy_product sp on sp.sku = ssoi.product_number
		inner join spy_product_abstract spa on spa.id_product_abstract = sp.fk_product_abstract
		inner join spy_tax_set sts on sts.id_tax_set = spa.fk_tax_set
		inner join spy_tax_set_tax stst on stst.fk_tax_set = sts.id_tax_set
		inner join spy_tax_rate str ON str.id_tax_rate = stst.fk_tax_rate
        left outer join spy_customer sc on sso.customer_reference = sc.customer_reference
        left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
        left outer join spy_sales_order_item_bundle ssoib on ssoi.fk_sales_order_item_bundle = ssoib.id_sales_order_item_bundle
        inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
        left outer join spy_sales_order_totals ssot on ssot.fk_sales_order = sso.id_sales_order
    where ssoi.created_at > '2021-01-01'
        or ssoi.updated_at > '2021-01-01'
    group by
        sso.order_reference, sso.store, sso.created_at,
        sss.requested_delivery_date, ssoib.gross_price, sso.customer_reference, sso.cart_note
        , ssot.canceled_total, ssot.order_expense_total
    ";

        $connection = Propel::getConnection();
        $statement = $connection->prepare($qry);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_NAMED);

        $content = '';
        $header = '';

        foreach ($data as $item) {
            if ($header == '') {
                foreach ($item as $key => $value) {
                    $header = $header . '"' . $key . '",';
                }
                $header = mb_substr($header, 0, -1);
                $header = $header . "\n";
            }
            foreach ($item as $key => $value) {
                if ($key == "TimeSlot") {
                    $value = explode('_', $value)[1];
                    $content = $content . '"' . $value . '",';
                } elseif ($key == "DeliveryDate") {
                    $value = explode('_', $value)[0];
                    $content = $content . '"' . $value . '",';
                } elseif (in_array($key, $this->stringColumns)) {
                    $content = $content . '"' . $value . '",';
                } else {
                    $content = $content . $value . ',';
                }
            }
            $content = mb_substr($content, 0, -1);
            $content = $content . "\n";
        }
        $content = $header . $content;

        $transfer->setContent($content);

        return $transfer;
    }
}
