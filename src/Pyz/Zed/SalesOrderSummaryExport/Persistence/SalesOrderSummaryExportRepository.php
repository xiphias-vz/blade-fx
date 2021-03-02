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
      * @return \Generated\Shared\Transfer\FileSystemContentTransfer
      */
    public function getCustomOrderItemData(): FileSystemContentTransfer
    {
        $transfer = new FileSystemContentTransfer();

        $qry = "select
        sso.order_reference as OrderNr,
        sso.store, sso.created_at as OrderDate,
        sum(ssoi.gross_price) as ItemValueGross,
        sum(ssoi.net_price) as ItemValueNet,
        sum(ssoi.quantity) as itemsCount,
        sso.customer_reference as external_customer_identifier,
        sc.my_globus_card as loyalty_number,
        sss.requested_delivery_date as TimeSlot,
        max(sit.name) as status,
        sum(case when sit.name like 'cancelled' then 0 else ssoi.gross_price end) as Delivered_ItemValueGross,
        sum(case when sit.name like 'cancelled' then 0 else ssoi.net_price end) as Delivered_ItemValueNet,
        sum(case when sit.name like 'cancelled' then 0 else ssoi.quantity end) as Delivered_ItemsCount,
        sum(ssoi.refundable_amount) as Delivered_DepositValueGross,
        0 as Delivered_DepositValueNet,
        sum(case when ssoi.refundable_amount > 0 then 1 else 0 end) as Delivered_DepositArticle,
        case when sso.cart_note in ('null', '\"null\"') then null else sso.cart_note end as comment,
        case when sc.my_globus_card is null then 2.99 else 1.99 end as ShippingValueGross
    from spy_sales_order sso
        inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
        left outer join spy_customer sc on sso.customer_reference = sc.customer_reference
        left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
        left outer join  spy_sales_order_item_bundle ssoib on ssoi.fk_sales_order_item_bundle = ssoib.id_sales_order_item_bundle
        inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
    where ssoi.created_at > DATE_ADD(CURDATE(), INTERVAL -1 DAY)
        or ssoi.updated_at > DATE_ADD(CURDATE(), INTERVAL -1 DAY)
    group by
        sso.order_reference, sso.store, sso.created_at,
        sss.requested_delivery_date, ssoib.gross_price, sso.customer_reference, sso.cart_note
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
