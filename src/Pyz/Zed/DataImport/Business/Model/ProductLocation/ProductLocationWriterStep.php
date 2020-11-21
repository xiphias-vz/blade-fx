<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductLocation;

use Exception;
use Orm\Zed\Stock\Persistence\SpyStockProductQuery;
use Orm\Zed\Stock\Persistence\SpyStockQuery;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductLocationWriterStep implements DataImportStepInterface
{
    protected const KEY_STOCK_STORE = 'StoreID';
    protected const KEY_SHELF = 'Regal';
    protected const KEY_SHELF_FIELD = 'Regalmeter';
    protected const KEY_SHELF_FLOR = 'Ebene';
    protected const KEY_SEQUENCE = 'Reihenfolge';

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    protected $dataImportConfig;

    /**
     * @var array
     */
    protected static $idStockBuffer = [];

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
    public function execute(DataSetInterface $dataSet): void
    {
        $sapStoreIdToStoreMap = $this->dataImportConfig->getSapStoreIdToStoreMap();
        $storeName = $sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]];

        if (!isset($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]])) {
            throw new Exception('Sap store id does not exists in Spryker config map.');
        }

        $stockProductEntityCollection = SpyStockProductQuery::create()
            ->filterByShelf($dataSet[static::KEY_SHELF])
            ->filterByShelfField($dataSet[static::KEY_SHELF_FIELD])
            ->filterByShelfFloor($dataSet[static::KEY_SHELF_FLOR])
            ->filterByFkStock($this->getIdStockByName($storeName))
            ->find();

        foreach ($stockProductEntityCollection as $stockProductEntity) {
            $stockProductEntity->setSequence($dataSet[static::KEY_SEQUENCE]);
        }

        $stockProductEntityCollection->save();
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStockByName(string $storeName): int
    {
        if (!isset(static::$idStockBuffer[$storeName])) {
            static::$idStockBuffer[$storeName] = SpyStockQuery::create()
                ->findOneByName($storeName)
                ->getIdStock();
        }

        return static::$idStockBuffer[$storeName];
    }
}
