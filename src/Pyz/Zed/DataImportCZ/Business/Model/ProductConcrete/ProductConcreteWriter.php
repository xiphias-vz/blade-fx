<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business\Model\ProductConcrete;

use DateTime;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Exception\ProductNumberIsMissingException;
use Pyz\Zed\DataImport\Business\Model\DataImporterCollection;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductConcrete\ProductConcreteWriter as PyzProductConcreteWriter;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;

class ProductConcreteWriter extends PyzProductConcreteWriter
{
    public const KEY_PRODUCT_NUMBER = ProductConfig::KEY_SAP_NUMBER;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        if (DataImporterCollection::$importCounters["product"] === 0) {
            DataImporterCollection::$importCounters["productStart"] = date_create(date("Y-m-d h:i:s"));
        }
        DataImporterCollection::$importCounters["product"]++;
        if (DataImporterCollection::$importCounters["product"] % 100 === 0) {
            $now = date_create(date("Y-m-d h:i:s"));
            $diff = date_diff(DataImporterCollection::$importCounters["productStart"], $now);
            var_dump("Duration from start: " . $diff->format("%H:%I:%S") . ", Memory usage for " . DataImporterCollection::$importCounters["product"] . " items:" . memory_get_usage(true) / 1024 / 1024 . " Mb");
        }

        parent::execute($dataSet);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\ProductNumberIsMissingException
     *
     * @return \Orm\Zed\Product\Persistence\SpyProduct
     */
    protected function importProduct(DataSetInterface $dataSet)
    {
        if (!isset($dataSet[static::KEY_PRODUCT_NUMBER])) {
            throw new ProductNumberIsMissingException(sprintf(
                'Product number is missing in current data set "%s"',
                implode(', ', array_keys($dataSet->getArrayCopy()))
            ));
        }

        if (static::$lastImportTime == null) {
            static::$lastImportTime = new DateTime();
        } elseif (static::$lastImportTime->diff(new DateTime())->s > 7200) {
            static::$lastImportTime = new DateTime();
        }

        $attributes = $this->removeUnnecessaryAttributes($dataSet);

        $productQuery = SpyProductQuery::create();

        $pattern = "/_\d\d\d\d$/i";
        if (preg_match($pattern, $dataSet[ProductConfig::KEY_PRODUCT_NUMBER]) === 1) {
            $productQuery->filterBySku($dataSet[ProductConfig::KEY_PRODUCT_NUMBER]);
        }
        $productQuery->filterBySapNumber($dataSet[ProductConfig::KEY_SAP_NUMBER]);

        $productEntity = $productQuery->findOneOrCreate();

        $idAbstract = $this->productRepository->getIdProductAbstractByAbstractSku(ProductAbstractWriterStep::getAbstractSku($dataSet));

        $productEntity
            ->setIsActive($dataSet[static::KEY_IS_ACTIVE])
            ->setFkProductAbstract($idAbstract)
            ->setProductNumber($dataSet[ProductConfig::KEY_PRODUCT_NUMBER])
            ->setSapNumber($dataSet[ProductConfig::KEY_SAP_NUMBER])
            ->setSku($dataSet[ProductConfig::KEY_PRODUCT_NUMBER])
            ->setLastImportAt(static::$lastImportTime->format('Y-m-d H:i:s'))
            ->setAssortmentZone($dataSet[static::ASSORTMENT_ZONE])
            ->setAttributes(json_encode($attributes))
            ->setImages($this->getImagesJson($dataSet))
            ->setFileType($this->getFileType());

        if (isset($dataSet[static::IS_STOCK_FROM_STATUS])) {
            $productEntity->setIsStockFromStatus($dataSet[static::IS_STOCK_FROM_STATUS]);
        }

        if ($productEntity->isNew() || $productEntity->isModified()) {
            $productEntity->save();
        }

        $dataSet[PriceProductDataSet::ID_PRODUCT_CONCRETE] = $productEntity->getIdProduct();

        return $productEntity;
    }
}
