<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence;

use DateTime;
use Orm\Zed\Oms\Persistence\Map\SpyOmsOrderItemStateTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
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
        $query->where("not " . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER . " in(
            select " . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER . "
            from " . SpySalesOrderItemTableMap::TABLE_NAME . "
                INNER JOIN " . SpyOmsOrderItemStateTableMap::TABLE_NAME . " on " . SpySalesOrderItemTableMap::COL_FK_OMS_ORDER_ITEM_STATE . " = " . SpyOmsOrderItemStateTableMap::COL_ID_OMS_ORDER_ITEM_STATE . "
            where " . SpyOmsOrderItemStateTableMap::COL_NAME . " = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "')" .
            " AND " . (empty($processId) ? SpySalesOrderItemTableMap::COL_OMS_PROCESSOR_ID . " BETWEEN 1 AND 10" : SpySalesOrderItemTableMap::COL_OMS_PROCESSOR_ID . " = " . $processId));

        if ($processId !== null) {
            $query->filterByOmsProcessorId($processId);
        }

        if ($storeName) {
            $query->filterByStore($storeName);
        }

        if ($limit !== null) {
            $query
                ->withColumn('DISTINCT ' . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER, 'fk_sales_order')
                ->select(['fk_sales_order']);

            $salesOrderIds = $query->find()->getData();
            $query = parent::querySalesOrderItemsByState($states, $processName);
            $query->where("not " . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER . " in(
            select " . SpySalesOrderItemTableMap::COL_FK_SALES_ORDER . "
            from " . SpySalesOrderItemTableMap::TABLE_NAME . "
                INNER JOIN " . SpyOmsOrderItemStateTableMap::TABLE_NAME . " on " . SpySalesOrderItemTableMap::COL_FK_OMS_ORDER_ITEM_STATE . " = " . SpyOmsOrderItemStateTableMap::COL_ID_OMS_ORDER_ITEM_STATE . "
            where " . SpyOmsOrderItemStateTableMap::COL_NAME . " = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "')" .
            " AND " . (empty($processId) ? SpySalesOrderItemTableMap::COL_OMS_PROCESSOR_ID . " BETWEEN 1 AND 10" : SpySalesOrderItemTableMap::COL_OMS_PROCESSOR_ID . " = " . $processId));

            if (!empty($salesOrderIds)) {
                $query->filterByFkSalesOrder_In($salesOrderIds);
            }

            if ($processId !== null) {
                $query->filterByOmsProcessorId($processId);
            }

            if ($storeName) {
                $query->filterByStore($storeName);
            }

            if ($processName == 'DummyPayment01') {
                dump('STORE: ' . $storeName);
                date_default_timezone_set("Europe/Zagreb");
                dump('DATE: ' . date('d/m/Y H:i:s', time()));
                date_default_timezone_set('UTC');
                dump('ORDER ID:');
                dump($salesOrderIds);
            }
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

    /**
     * @param string $idSalesOrderItem
     *
     * @return void
     */
    public function updateSalesOrderItemPausedStatus(string $idSalesOrderItem): void
    {
        $item = SpySalesOrderItemQuery::create()->filterByIdSalesOrderItem($idSalesOrderItem)->findOne();
        $item->setItemPaused(false);
        $item->save();
    }

    /**
     * @param string $sku
     * @param string $store
     *
     * @return array
     */
    public function queryRelatedProductsBySku(string $sku, string $store): array
    {
        $qry = "SELECT sp2.product_number, spp.fk_price_type,  spps.gross_price, spps.net_price, sc.symbol, spala.name
FROM  spy_product sp
    INNER JOIN spy_product_alternative spa on spa.fk_product = sp.id_product
    INNER JOIN spy_product sp2 on sp2.fk_product_abstract = spa.fk_product_abstract_alternative
        OR sp2.id_product = spa.fk_product_concrete_alternative
    INNER JOIN spy_stock_product ssp on ssp.fk_product = sp.id_product
        AND ssp.quantity > 0
    INNER JOIN spy_stock_store sss on ssp.fk_stock = sss.fk_stock
    INNER JOIN spy_store ss on ss.id_store = sss.fk_store
    INNER JOIN spy_merchant sm on ss.id_store = sm.fk_store
    INNER JOIN spy_price_product spp on spp.fk_product = sp.id_product
    INNER JOIN spy_price_product_store spps on spps.fk_store = ss.id_store
    INNER JOIN spy_product_abstract_localized_attributes spala on sp2.fk_product_abstract  = spala.fk_product_abstract
        AND spps.fk_price_product = spp.id_price_product
    INNER JOIN spy_price_type spt on spt.id_price_type = spp.fk_price_type
        AND spt.name = 'DEFAULT'
    INNER JOIN spy_currency sc on sc.id_currency = spps.fk_currency
WHERE sp.product_number = '" . $sku . "'
    AND sm.filial_number = " . $store;

        $connection = Propel::getConnection();
        $statement = $connection->prepare($qry);
        $statement->execute();

        $relatedProduct = $statement->fetchAll(PDO::FETCH_NAMED);

        return $relatedProduct;
    }
}
