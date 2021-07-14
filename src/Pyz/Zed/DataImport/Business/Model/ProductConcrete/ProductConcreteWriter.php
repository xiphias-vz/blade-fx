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
use Orm\Zed\ProductImage\Persistence\SpyProductImage;
use Orm\Zed\ProductImage\Persistence\SpyProductImageQuery;
use Orm\Zed\ProductImage\Persistence\SpyProductImageSet;
use Orm\Zed\ProductImage\Persistence\SpyProductImageSetQuery;
use Orm\Zed\ProductImage\Persistence\SpyProductImageSetToProductImageQuery;
use Orm\Zed\ProductSearch\Persistence\SpyProductSearchQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Exception\ProductNumberIsMissingException;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\ProductImage\Dependency\ProductImageEvents;

class ProductConcreteWriter extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    public const KEY_ATTRIBUTES = 'attributes';
    public const KEY_PRODUCT_NUMBER = ProductConfig::KEY_PRODUCT_NUMBER;
    public const KEY_LOCALIZED_ATTRIBUTES = 'localizedAttributes';
    public const KEY_LOCALES = 'locales';
    public const KEY_IS_ACTIVE = 'active';

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
        $this->importProductPlaceholderImage($dataSet);

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
            ->setAttributes(json_encode($attributes))
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
     * @return void
     */
    protected function importProductPlaceholderImage(DataSetInterface $dataSet)
    {
        foreach (Store::getInstance()->getLocales() as $localeKey => $localeName) {
            $productImageSetEntity = $this->findOrCreateImageSet($dataSet, $localeName);
            SpyProductImageSetToProductImageQuery::create()->findByFkProductImageSet($productImageSetEntity->getIdProductImageSet())->delete();
            $images = explode(';', $dataSet[ProductConfig::KEY_MAIN_IMAGE_FILE_NAME]);
            foreach ($images as $key => $image) {
                $imageUrl = $this->dataImportConfig->getImagesHostUrl() . '/' . $image;
                $productImageEntity = $this->findOrCreateImage($imageUrl);
                $this->updateOrCreateImageToImageSetRelation($productImageSetEntity, $productImageEntity, $key);
            }
            $this->addImagePublishEvents($productImageSetEntity);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $localeName
     *
     * @return \Orm\Zed\ProductImage\Persistence\SpyProductImageSet
     */
    protected function findOrCreateImageSet(DataSetInterface $dataSet, string $localeName)
    {
        $idLocale = null;

        $query = SpyProductImageSetQuery::create()
            ->filterByName('default')
            ->filterByFkLocale($this->getIdLocaleByName($localeName));

        $idProduct = $this->productRepository->getIdProductByConcreteSku($dataSet[ProductConfig::KEY_PRODUCT_NUMBER]);
        $query->filterByFkProduct($idProduct);

        $productImageSetEntity = $query->findOneOrCreate();
        if ($productImageSetEntity->isNew() || $productImageSetEntity->isModified()) {
            $productImageSetEntity->save();

            $this->addImagePublishEvents($productImageSetEntity);
        }

        return $productImageSetEntity;
    }

    /**
     * @param string $imageUrl
     *
     * @return \Orm\Zed\ProductImage\Persistence\SpyProductImage
     */
    protected function findOrCreateImage(string $imageUrl): SpyProductImage
    {
        $productImageEntity = SpyProductImageQuery::create()
            ->filterByExternalUrlLarge($imageUrl)
            ->findOneOrCreate();

        $productImageEntity->setExternalUrlSmall($imageUrl);

        if ($productImageEntity->isNew() || $productImageEntity->isModified()) {
            $productImageEntity->save();
        }

        return $productImageEntity;
    }

    /**
     * @param \Orm\Zed\ProductImage\Persistence\SpyProductImageSet $productImageSetEntity
     * @param \Orm\Zed\ProductImage\Persistence\SpyProductImage $productImageEntity
     * @param int $sortOrder
     *
     * @return void
     */
    protected function updateOrCreateImageToImageSetRelation(
        SpyProductImageSet $productImageSetEntity,
        SpyProductImage $productImageEntity,
        int $sortOrder
    ): void {
        $productImageSetToProductImageEntity = SpyProductImageSetToProductImageQuery::create()
            ->filterByFkProductImageSet($productImageSetEntity->getIdProductImageSet())
            ->filterByFkProductImage($productImageEntity->getIdProductImage())
            ->findOneOrCreate();

        $productImageSetToProductImageEntity
            ->setSortOrder($sortOrder);

        if ($productImageSetToProductImageEntity->isNew() || $productImageSetToProductImageEntity->isModified()) {
            $productImageSetToProductImageEntity->save();

            $this->addImagePublishEvents($productImageSetEntity);
        }
    }

    /**
     * @param \Orm\Zed\ProductImage\Persistence\SpyProductImageSet $productImageSetEntity
     *
     * @return void
     */
    protected function addImagePublishEvents(SpyProductImageSet $productImageSetEntity)
    {
        if ($productImageSetEntity->getFkProductAbstract()) {
            $this->addPublishEvents(ProductImageEvents::PRODUCT_IMAGE_PRODUCT_ABSTRACT_PUBLISH, $productImageSetEntity->getFkProductAbstract());
            $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $productImageSetEntity->getFkProductAbstract());
        } elseif ($productImageSetEntity->getFkProduct()) {
            $this->addPublishEvents(ProductImageEvents::PRODUCT_IMAGE_PRODUCT_CONCRETE_PUBLISH, $productImageSetEntity->getFkProduct());
        }
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
