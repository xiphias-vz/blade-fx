<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock;

use Exception;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Orm\Zed\Stock\Persistence\Map\SpyStockProductTableMap;
use Orm\Zed\Stock\Persistence\SpyStockProductQuery;
use Orm\Zed\Stock\Persistence\SpyStockQuery;
use Orm\Zed\Stock\Persistence\SpyStockStoreQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Propel\Runtime\Propel;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Product\Dependency\ProductEvents;

class ProductStockWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;
    public const KEY_STOCK_QTY = 'instock';
    public const KEY_STOCK_STORE = 'store';
    public const KEY_STOCK_SHELF = 'shelf';
    public const KEY_STOCK_SHELF_FIELD = 'shelffield';
    public const KEY_STOCK_SHELF_FLOR = 'shelffloor';

    /**
     * @var array
     */
    protected static $idStockBuffer = [];

    /**
     * @var array
     */
    protected static $idStoreBuffer = [];

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    protected $dataImportConfig;

    /**
     * @param \Pyz\Zed\DataImport\DataImportConfig $dataImportConfig
     */
    public function __construct(DataImportConfig $dataImportConfig)
    {
        $this->dataImportConfig = $dataImportConfig;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Exception
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $sapStoreIdToStoreMap = $this->dataImportConfig->getSapStoreIdToStoreMap();
        $storeName = $sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]];

        if (!isset($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]])) {
            throw new Exception('Sap store id does not exists in Spryker config map.');
        }

        $productEntityCollection = SpyProductQuery::create()
            ->filterBySapNumber($dataSet[ProductConfig::KEY_SAP_NUMBER])
            ->find();

        if ($productEntityCollection->isEmpty()) {
            return;
        }

        foreach ($productEntityCollection as $productEntity) {
            $stockProductEntity = SpyStockProductQuery::create()
                ->filterByFkProduct($productEntity->getIdProduct())
                ->filterByFkStock($this->getIdStockByWarehouseName($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]]))
                ->findOneOrCreate();

            $stockProductEntity
                ->setQuantity($dataSet[static::KEY_STOCK_QTY])
                ->setShelf($dataSet[static::KEY_STOCK_SHELF] ? : $stockProductEntity->getShelf())
                ->setShelfField($dataSet[static::KEY_STOCK_SHELF_FIELD] ? : $stockProductEntity->getShelfField())
                ->setShelfFloor($dataSet[static::KEY_STOCK_SHELF_FLOR] ? : $stockProductEntity->getShelfFloor())
                ->setIsNeverOutOfStock(false);

            $quantityModified = $stockProductEntity->isModified() && in_array(SpyStockProductTableMap::COL_QUANTITY, $stockProductEntity->getModifiedColumns());

            if ($quantityModified || $stockProductEntity->isNew()) {
                $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $productEntity->getFkProductAbstract());
            }

            $stockProductEntity->save();

            $stockStoreEntity = SpyStockStoreQuery::create()
                ->filterByFkStore($this->getIdStoreByName($storeName))
                ->filterByFkStock($this->getIdStockByWarehouseName($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]]))
                ->findOneOrCreate();
            $stockStoreEntity->save();
        }
    }

    /**
     * @param string $warehouseName
     *
     * @return int
     */
    protected function getIdStockByWarehouseName($warehouseName)
    {
        if (!isset(static::$idStockBuffer[$warehouseName])) {
            $stockEntity = SpyStockQuery::create()->filterByName($warehouseName)->findOneOrCreate();
            $stockEntity->save();
            static::$idStockBuffer[$warehouseName] = $stockEntity->getIdStock();
        }

        return static::$idStockBuffer[$warehouseName];
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStoreByName(string $storeName)
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            $storeEntity = SpyStoreQuery::create()->filterByName($storeName)->findOne();
            static::$idStoreBuffer[$storeName] = $storeEntity->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }

    /**
     * @param int $idProduct
     * @param string $storeName
     * @param string|null $shelf
     * @param string|null $shelf_field
     * @param string|null $shelf_floor
     *
     * @return void
     */
    protected function updateOrderItemShelfs(int $idProduct, string $storeName, ?string $shelf, ?string $shelf_field, ?string $shelf_floor)
    {
        if (!empty($shelf)) {
            //$sql = 'UPDATE spy_sales_order_item INNER JOIN spy_sales_order on spy_sales_order_item.fk_sales_order = spy_sales_order.id_sales_order INNER JOIN spy_product on spy_product.sku = spy_sales_order_item.sku INNER JOIN spy_merchant on spy_merchant.filial_number = spy_sales_order.merchant_reference INNER JOIN spy_stock_store on spy_stock_store.fk_store = spy_merchant.fk_store INNER JOIN spy_stock_product on spy_stock_product.fk_stock = spy_stock_store.fk_stock AND spy_stock_product.fk_product = spy_product.id_product SET spy_sales_order_item.shelf = spy_stock_product.shelf, spy_sales_order_item.shelf_field = spy_stock_product.shelf_field, spy_sales_order_item.shelf_floor = spy_stock_product.shelf_floor WHERE spy_stock_product.fk_product = ' . $idProduct .' AND spy_sales_order_item.fk_oms_order_item_state in (select id_oms_order_item_state from spy_oms_order_item_state where spy_oms_order_item_state.name in (\'new\', \'confirmed\', \'ready for picking\')) AND (spy_sales_order_item.shelf <> spy_stock_product.shelf or spy_sales_order_item.shelf_field <> spy_stock_product.shelf_field or spy_sales_order_item.shelf_floor <> spy_stock_product.shelf_floor)';
            $sql = 'UPDATE spy_sales_order_item
SET spy_sales_order_item.shelf = \'' . $shelf . '\',
    spy_sales_order_item.shelf_field = \'' . $shelf_field . '\',
    spy_sales_order_item.shelf_floor = \'' . $shelf_floor . '\'
where id_sales_order_item in(
    select spy_sales_order_item.id_sales_order_item
    from spy_sales_order_item
             INNER JOIN spy_sales_order on spy_sales_order_item.fk_sales_order = spy_sales_order.id_sales_order
             INNER JOIN spy_product on spy_product.sku = spy_sales_order_item.sku
             INNER JOIN spy_merchant on spy_merchant.filial_number = spy_sales_order.merchant_reference
             INNER JOIN spy_stock_store on spy_stock_store.fk_store = spy_merchant.fk_store
             INNER JOIN spy_stock_product on spy_stock_product.fk_stock = spy_stock_store.fk_stock
        AND spy_stock_product.fk_product = spy_product.id_product
    WHERE spy_stock_product.fk_product = ' . $idProduct . '
      AND spy_sales_order_item.fk_oms_order_item_state in (select id_oms_order_item_state from spy_oms_order_item_state where spy_oms_order_item_state.name in (\'new\', \'confirmed\', \'ready for picking\'))
      AND (spy_sales_order_item.shelf <> spy_stock_product.shelf or spy_sales_order_item.shelf_field <> spy_stock_product.shelf_field or spy_sales_order_item.shelf_floor <> spy_stock_product.shelf_floor)
      AND spy_sales_order_item.store = \'' . $storeName . '\'
    )';
            $this->executeLocalSql($sql, $idProduct);
        }
    }

    /**
     * @param string $sql
     * @param array $parameters
     *
     * @return void
     */
    protected function executeLocalSql(string $sql, $parameters = [])
    {
        try {
            //$parameters = [$parameters];
            $connection = Propel::getConnection();
            //$stmt = $connection->prepare($sql);
            $connection->exec($sql);
            //$stmt->execute($parameters);
        } catch (Exception $ex) {
            dump($ex);
        }
    }
}
