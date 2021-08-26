<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductConcrete;

use DateTime;
use Orm\Zed\Locale\Persistence\SpyLocaleQuery;
use Orm\Zed\Product\Persistence\SpyProduct;
use Orm\Zed\Product\Persistence\SpyProductLocalizedAttributesQuery;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Orm\Zed\ProductSearch\Persistence\SpyProductSearchQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Exception\ProductNumberIsMissingException;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\Product\Dependency\ProductEvents;

class ProductConcreteWriter extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    public const KEY_ATTRIBUTES = 'attributes';
    public const KEY_PRODUCT_NUMBER = ProductConfig::KEY_PRODUCT_NUMBER;
    public const KEY_LOCALIZED_ATTRIBUTES = 'localizedAttributes';
    public const KEY_LOCALES = 'locales';
    public const KEY_IS_ACTIVE = 'active';
    public const ASSORTMENT_ZONE = 'assortmentzone';

    public const FILE_TYPE_PRODUCT = 1;
    public const FILE_TYPE_METZGEREI = 2;

    /**
     * @var \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository
     */
    protected $productRepository;

    /**
     * @var array
     */
    protected static $idLocaleBuffer = [];

    /**
     * @var \DateTime|null
     */
    public static $lastImportTime = null;

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    protected $dataImportConfig;

    /**
     * @param \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository $productRepository
     * @param \Pyz\Zed\DataImport\DataImportConfig $dataImportConfig
     */
    public function __construct(
        ProductRepository $productRepository,
        DataImportConfig $dataImportConfig
    ) {
        $this->productRepository = $productRepository;
        $this->dataImportConfig = $dataImportConfig;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $productEntity = $this->importProduct($dataSet);

        $this->productRepository->addProductConcrete($productEntity, $dataSet[ProductConfig::KEY_PRODUCT_NUMBER]);

        $this->importProductLocalizedAttributes($dataSet, $productEntity);

        $this->addPublishEvents(ProductEvents::PRODUCT_CONCRETE_PUBLISH, $productEntity->getIdProduct());
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

        $productEntity = SpyProductQuery::create()
            ->filterBySku($dataSet[ProductConfig::KEY_PRODUCT_NUMBER])
            ->findOneOrCreate();

        $idAbstract = $this->productRepository->getIdProductAbstractByAbstractSku(ProductAbstractWriterStep::getAbstractSku($dataSet));

        $productEntity
            ->setIsActive($dataSet[static::KEY_IS_ACTIVE])
            ->setFkProductAbstract($idAbstract)
            ->setProductNumber($dataSet[static::KEY_PRODUCT_NUMBER])
            ->setSapNumber($dataSet[ProductConfig::KEY_SAP_NUMBER])
            ->setSku($dataSet[static::KEY_PRODUCT_NUMBER])
            ->setLastImportAt(static::$lastImportTime->format('Y-m-d H:i:s'))
            ->setAssortmentZone($dataSet[static::ASSORTMENT_ZONE])
            ->setAttributes(json_encode($attributes))
            ->setImages($this->getImagesJson($dataSet))
            ->setFileType($this->getFileType());

        if ($productEntity->isNew() || $productEntity->isModified()) {
            $productEntity->save();
        }

        $dataSet[PriceProductDataSet::ID_PRODUCT_CONCRETE] = $productEntity->getIdProduct();

        return $productEntity;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return array
     */
    protected function removeUnnecessaryAttributes(DataSetInterface $dataSet): array
    {
        $attributes = $dataSet[static::KEY_ATTRIBUTES];
        $attributes[ProductConfig::KEY_ARTIKELNAME_SPRYKER] = $dataSet[ProductConfig::KEY_ARTIKELNAME_SPRYKER];
        unset($attributes[ProductConfig::KEY_ACTIVE]);
        unset($attributes[ProductConfig::KEY_TAX]);
        unset($attributes[ProductConfig::KEY_MAIN_IMAGE_FILE_NAME]);
        unset($attributes[ProductConfig::KEY_DESCRIPTION]);
        unset($attributes[ProductConfig::KEY_PRODUCT_NUMBER]);
        unset($attributes[ProductConfig::KEY_PRODUCT_NUMBER]);
        unset($attributes[ProductConfig::KEY_SAP_NUMBER]);

        return $attributes;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\Product\Persistence\SpyProduct $productEntity
     *
     * @return void
     */
    protected function importProductLocalizedAttributes(DataSetInterface $dataSet, SpyProduct $productEntity)
    {
        foreach ($dataSet[static::KEY_LOCALIZED_ATTRIBUTES] as $idLocale => $localizedAttributes) {
            $productLocalizedAttributesEntity = SpyProductLocalizedAttributesQuery::create()
                ->filterByFkProduct($productEntity->getIdProduct())
                ->filterByFkLocale($idLocale)
                ->findOneOrCreate();

            $productLocalizedAttributesEntity
                ->setName($localizedAttributes[ProductAbstractWriterStep::KEY_NAME])
                ->setDescription($dataSet[ProductAbstractWriterStep::KEY_DESCRIPTION])
                ->setIsComplete(true)
                ->setAttributes(json_encode([]));

            if ($productLocalizedAttributesEntity->isNew() || $productLocalizedAttributesEntity->isModified()) {
                $productLocalizedAttributesEntity->save();
            }

            $productSearchEntity = SpyProductSearchQuery::create()
                ->filterByFkProduct($productEntity->getIdProduct())
                ->filterByFkLocale($idLocale)
                ->findOneOrCreate();

            $productSearchEntity->setIsSearchable(true);
            if ($productSearchEntity->isNew() || $productSearchEntity->isModified()) {
                $productSearchEntity->save();
            }
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string|false
     */
    protected function getImagesJson(DataSetInterface $dataSet)
    {
        $images = explode(';', $dataSet[ProductConfig::KEY_MAIN_IMAGE_FILE_NAME]);
        $json["default"] = ["images" => $images];

        return json_encode($json);
    }

    /**
     * @param string $localeName
     *
     * @return int
     */
    protected function getIdLocaleByName($localeName)
    {
        if (!isset(static::$idLocaleBuffer[$localeName])) {
            static::$idLocaleBuffer[$localeName] =
                SpyLocaleQuery::create()->findOneByLocaleName($localeName)->getIdLocale();
        }

        return static::$idLocaleBuffer[$localeName];
    }

    /**
     * @return int
     */
    protected function getFileType(): int
    {
        foreach ($_SERVER["argv"] as $arg) {
            if (str_contains($arg, ".csv")) {
                return str_contains($arg, "metzgerei") ? static::FILE_TYPE_METZGEREI : static::FILE_TYPE_PRODUCT;
            }
        }

        return static::FILE_TYPE_PRODUCT;
    }
}
