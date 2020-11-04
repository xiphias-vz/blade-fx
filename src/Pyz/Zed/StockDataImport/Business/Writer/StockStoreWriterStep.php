<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StockDataImport\Business\Writer;

use Orm\Zed\Stock\Persistence\SpyStockStoreQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\StockDataImport\Business\Writer\DataSet\StockStoreDataSetInterface;
use Spryker\Zed\StockDataImport\Business\Writer\StockStoreWriterStep as SprykerStockStoreWriterStep;

class StockStoreWriterStep extends SprykerStockStoreWriterStep
{
    public const BULK_SIZE = 100;

    /**
     * @var int[] Keys are store names, values are store ids.
     */
    protected static $idStoreBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $allowedStores = Store::getInstance()->getAllowedStores();

        foreach ($allowedStores as $storeName) {
            $dataSet[StockStoreDataSetInterface::COLUMN_ID_STORE] = $this->getIdStoreByStoreName($storeName);
            $stockStoreEntity = SpyStockStoreQuery::create()
                ->filterByFkStore($dataSet[StockStoreDataSetInterface::COLUMN_ID_STORE])
                ->filterByFkStock($dataSet[StockStoreDataSetInterface::COLUMN_ID_STOCK])
                ->findOneOrCreate();

            $this->createStockStore($stockStoreEntity, $dataSet);
        }
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStoreByStoreName(string $storeName): int
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            static::$idStoreBuffer[$storeName] =
                SpyStoreQuery::create()->findOneByName($storeName)->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }
}
