<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock;

use Orm\Zed\Product\Persistence\SpyProductQuery;
use Orm\Zed\Stock\Persistence\SpyStockProductQuery;
use Orm\Zed\Stock\Persistence\SpyStockQuery;
use Orm\Zed\Stock\Persistence\SpyStockStoreQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

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
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $sapStoreIdToStoreMap = $this->dataImportConfig->getSapStoreIdToStoreMap();
        $storeName = $sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]];

        if (!isset($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]])) {
            throw new \Exception('Sap store id does not exists in Spryker config map.');
        }

        $productEntityCollection = SpyProductQuery::create()
            ->filterBySapNumber($dataSet[ProductConfig::KEY_SAP_NUMBER])
            ->find();

        if (!$productEntityCollection) {
            return;
        }

        foreach ($productEntityCollection as $productEntity) {
            $stockProductEntity = SpyStockProductQuery::create()
                ->filterByFkProduct($productEntity->getIdProduct())
                ->filterByFkStock($this->getIdStockByWarehouseName($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]]))
                ->findOneOrCreate();

            $stockProductEntity
                ->setQuantity($dataSet[static::KEY_STOCK_QTY])
                ->setShelf($dataSet[static::KEY_STOCK_SHELF])
                ->setShelfField($dataSet[static::KEY_STOCK_SHELF_FIELD])
                ->setShelfFloor($dataSet[static::KEY_STOCK_SHELF_FLOR])
                ->setIsNeverOutOfStock(true);

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
}
