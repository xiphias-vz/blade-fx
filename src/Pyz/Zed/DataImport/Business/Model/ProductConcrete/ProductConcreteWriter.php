<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductConcrete;

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
use Pyz\Zed\DataImport\Business\Model\BaseProduct\StoreSpecificAttributeExtractorStep;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
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
    public const KEY_PRODUCT_NUMBER = 'Artikelnummer';
    public const KEY_LOCALIZED_ATTRIBUTES = 'localizedAttributes';
    public const KEY_LOCALES = 'locales';
    public const KEY_IS_ACTIVE = 'is_active';
    public const KEY_CUSTOM_IMAGE_URL = 'Custom Image';
    public const KEY_IS_QUANTITY_SPLITTABLE = 'is_quantity_splittable';

    /**
     * @var \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository
     */
    protected $productRepository;

    /**
     * @var array
     */
    protected static $idLocaleBuffer = [];

    /**
     * @param \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository $productRepository
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $productEntity = $this->importProduct($dataSet);

        $this->productRepository->addProductConcrete($productEntity, ProductAbstractWriterStep::getAbstractSku($dataSet));

        $this->importProductLocalizedAttributes($dataSet, $productEntity);
        $this->importProductPlaceholderImage($dataSet);

        $this->addPublishEvents(ProductEvents::PRODUCT_CONCRETE_PUBLISH, $productEntity->getIdProduct());
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    public static function getConcreteSku(DataSetInterface $dataSet): string
    {
        return strtolower(str_replace([' ', ',', ';', '/', '.'], '-', $dataSet[ProductAbstractWriterStep::KEY_CONCRETE_SKU]));
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

        $attributes = $this->removeUnnecessaryAttributes($dataSet);
        foreach ($dataSet[StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES] as $store => $storeAttributes) {
            foreach ($storeAttributes as $storeAttributeKey => $storeAttributeValue) {
                if ($storeAttributeKey === ProductConfig::KEY_PRICE) {
                    continue;
                }
                $attributes[sprintf(ProductConfig::PRODUCT_STORE_ATTRIBUTE_FORMAT, $storeAttributeKey, $store)] = $storeAttributeValue;
            }
        }

        $productEntity = SpyProductQuery::create()
            ->filterBySku($this->getConcreteSku($dataSet))
            ->findOneOrCreate();

        $idAbstract = $this->productRepository->getIdProductAbstractByAbstractSku(ProductAbstractWriterStep::getAbstractSku($dataSet));

        $productEntity
            ->setIsActive(true)
            ->setFkProductAbstract($idAbstract)
            ->setProductNumber($dataSet[static::KEY_PRODUCT_NUMBER])
            ->setAttributes(json_encode($attributes))
            ->setIsQuantitySplittable($dataSet[static::KEY_IS_QUANTITY_SPLITTABLE]);

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
        unset($attributes[ProductConfig::KEY_PRICE]);
        unset($attributes[ProductConfig::KEY_PRICE_ORIGINAL]);
        unset($attributes[ProductConfig::KEY_PRICE_ORIGINAL_FROM]);
        unset($attributes[ProductConfig::KEY_PRICE_ORIGINAL_TO]);
        unset($attributes[ProductConfig::KEY_PRICE_FROM]);
        unset($attributes[ProductConfig::KEY_PRICE_TO]);

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

            $productImageEntity = $this->findOrCreateImage(
                ProductConcreteWriter::getProductImageUrlForPDP($dataSet),
                ProductConcreteWriter::getProductImageUrlForCart($dataSet)
            );
            $this->updateOrCreateImageToImageSetRelation($productImageSetEntity, $productImageEntity, 1);

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

        $idProduct = $this->productRepository->getIdProductByConcreteSku($this->getConcreteSku($dataSet));
        $query->filterByFkProduct($idProduct);

        $productImageSetEntity = $query->findOneOrCreate();
        if ($productImageSetEntity->isNew() || $productImageSetEntity->isModified()) {
            $productImageSetEntity->save();

            $this->addImagePublishEvents($productImageSetEntity);
        }

        return $productImageSetEntity;
    }

    /**
     * @param string $imageUrlLarge
     * @param string $imageUrlSmall
     *
     * @return \Orm\Zed\ProductImage\Persistence\SpyProductImage
     */
    protected function findOrCreateImage(string $imageUrlLarge, string $imageUrlSmall): SpyProductImage
    {
        $productImageEntity = SpyProductImageQuery::create()
            ->filterByExternalUrlLarge($imageUrlLarge)
            ->findOneOrCreate();

        $productImageEntity->setExternalUrlSmall($imageUrlSmall);

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
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    public static function getProductImageUrlForPDP(DataSetInterface $dataSet): string
    {
        if (!empty($dataSet[static::KEY_CUSTOM_IMAGE_URL])) {
            return $dataSet[static::KEY_CUSTOM_IMAGE_URL];
        }

        return sprintf('https://d1zcre1alumj4g.cloudfront.net/products_v2/%s_500x500.jpg', self::getImageId($dataSet));
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    public static function getProductImageUrlForCatalog(DataSetInterface $dataSet): string
    {
        if (!empty($dataSet[static::KEY_CUSTOM_IMAGE_URL])) {
            return $dataSet[static::KEY_CUSTOM_IMAGE_URL];
        }

        return sprintf('https://d1zcre1alumj4g.cloudfront.net/products_v2/%s_228x228.jpg', self::getImageId($dataSet));
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    public static function getProductImageUrlForCart(DataSetInterface $dataSet): string
    {
        if (!empty($dataSet[static::KEY_CUSTOM_IMAGE_URL])) {
            return $dataSet[static::KEY_CUSTOM_IMAGE_URL];
        }

        return sprintf('https://d1zcre1alumj4g.cloudfront.net/products_v2/%s_80x80.jpg', self::getImageId($dataSet));
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    private static function getImageId(DataSetInterface $dataSet): string
    {
        return self::getConcreteSku($dataSet);
    }
}
