<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock;

use Exception;
use Orm\Zed\DataImport\Persistence\PyzImpStock;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\DataImporterCollection;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductStockWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;
    public const KEY_STOCK_QTY = 'instock';
    public const KEY_STOCK_STORE = 'store';
    public const KEY_STOCK_SHELF = 'shelf';
    public const KEY_STOCK_SHELF_FIELD = 'shelffield';
    public const KEY_STOCK_SHELF_FLOR = 'shelffloor';
    public const KEY_GTIN = 'GTIN';

    /**
     * @var string
     */
    private static $sapNumberColumn = '';

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
        $fileName = "";
        if (isset($GLOBALS["argv"][4])) {
            $fileName = $GLOBALS["argv"][4];
        }
        $sapStoreIdToStoreMap = $this->dataImportConfig->getSapStoreIdToStoreMap();

        $storeName = $sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]];

        if (!isset($sapStoreIdToStoreMap[$dataSet[static::KEY_STOCK_STORE]])) {
            throw new Exception('Sap store id does not exists in Spryker config map.');
        }

        if (empty(static::$sapNumberColumn)) {
            static::$sapNumberColumn = ProductConfig::KEY_SAP_NUMBER;
            foreach (array_keys($dataSet->getArrayCopy()) as $key) {
                if (str_ends_with($key, ProductConfig::KEY_SAP_NUMBER)) {
                    static::$sapNumberColumn = $key;
                    break;
                }
            }
        }

        $importEntity = new PyzImpStock();
        if (isset($dataSet[static::KEY_GTIN]) && !ctype_space($dataSet[static::KEY_GTIN]) && !empty($dataSet[static::KEY_GTIN])) {
            $importEntity->setGtin($dataSet[static::KEY_GTIN]);
        }

        $importEntity
            ->setStore($storeName)
            ->setSapnumber($dataSet[static::$sapNumberColumn])
            ->setInstock($dataSet[static::KEY_STOCK_QTY])
            ->setShelf($dataSet[static::KEY_STOCK_SHELF])
            ->setShelffield($dataSet[static::KEY_STOCK_SHELF_FIELD])
            ->setShelffloor($dataSet[static::KEY_STOCK_SHELF_FLOR])
            ->setDtimported(DataImporterCollection::$importDateTime)
            ->setFilename($fileName);

        $importEntity->save();
    }
}
