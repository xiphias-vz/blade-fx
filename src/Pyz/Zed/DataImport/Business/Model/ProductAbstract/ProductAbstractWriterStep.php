<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductAbstract;

use Orm\Zed\Locale\Persistence\SpyLocaleQuery;
use Orm\Zed\Product\Persistence\SpyProductAbstract;
use Orm\Zed\Product\Persistence\SpyProductAbstractLocalizedAttributesQuery;
use Orm\Zed\Product\Persistence\SpyProductAbstractQuery;
use Orm\Zed\Tax\Persistence\Map\SpyTaxRateTableMap;
use Orm\Zed\Tax\Persistence\SpyTaxRateQuery;
use Orm\Zed\Url\Persistence\SpyUrlQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\BaseProduct\AttributesExtractorStep;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Pyz\Zed\DataImport\Business\Model\Product\ProductLocalizedAttributesExtractorStep;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Service\UtilText\UtilTextServiceInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\Url\Dependency\UrlEvents;

class ProductAbstractWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    public const KEY_PRODUCT_NUMBER = ProductConfig::KEY_PRODUCT_NUMBER;
    public const KEY_CONCRETE_SKU = 'Key';
    public const KEY_NAME = ProductConfig::KEY_ARTIKELNAME_SPRYKER;
    public const KEY_DESCRIPTION = 'description_long';
    public const KEY_LOCALES = 'locales';
    public const ID_PRODUCT_ABSTRACT = 'id_product_abstract';
    public const IS_PRODUCT_CONCRETE = 'Concrete';

    protected const SHIPMENT_TAX_RATE_NAME = 'Germany Shipment Tax';

    /**
     * @var \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository
     */
    protected $productRepository;

    /**
     * @var array
     */
    protected static $idLocaleBuffer = [];

    /**
     * @var array
     */
    protected static $idTaxSetBuffer = [];

    /**
     * @var \Spryker\Service\UtilText\UtilTextServiceInterface
     */
    private $utilTextService;

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    protected $dataImportConfig;

    /**
     * @param \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository $productRepository
     * @param \Spryker\Service\UtilText\UtilTextServiceInterface $utilTextService
     * @param \Pyz\Zed\DataImport\DataImportConfig $dataImportConfig
     */
    public function __construct(
        ProductRepository $productRepository,
        UtilTextServiceInterface $utilTextService,
        DataImportConfig $dataImportConfig
    ) {
        $this->productRepository = $productRepository;
        $this->utilTextService = $utilTextService;
        $this->dataImportConfig = $dataImportConfig;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $productAbstractEntity = $this->importProductAbstract($dataSet);

        $this->productRepository->addProductAbstract($productAbstractEntity);

        $this->importProductAbstractLocalizedAttributes($dataSet, $productAbstractEntity);

        $locales = Store::getInstance()->getLocales();
        $this->importProductUrls($dataSet, $productAbstractEntity, $locales);

        $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $productAbstractEntity->getIdProductAbstract());
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    public static function getAbstractSku(DataSetInterface $dataSet): string
    {
        $sku = $dataSet[static::KEY_PRODUCT_NUMBER];
        $pos = strpos($sku, '_');
        if ($pos > 0) {
            $sku = substr($sku, 0, $pos);
        }

        return $sku . '_abstract';
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\Product\Persistence\SpyProductAbstract
     */
    protected function importProductAbstract(DataSetInterface $dataSet): SpyProductAbstract
    {
        $productAbstractEntity = SpyProductAbstractQuery::create()
            ->filterBySku(static::getAbstractSku($dataSet))
            ->findOneOrCreate();

        if (preg_match_all("/(.*?)_\d{4}$/", $dataSet[ProductConfig::KEY_PRODUCT_NUMBER], $out) < 1) {
            $productAttributes = $this->removeUnnecessaryAttributes($dataSet[AttributesExtractorStep::KEY_ATTRIBUTES]);

            $productAbstractEntity
                ->setFkTaxSet($this->getIdTaxSet($dataSet[ProductConfig::KEY_TAX]))
                ->setSapNumber($dataSet[ProductConfig::KEY_SAP_NUMBER])
                ->setAttributes(json_encode($productAttributes));

            if ($productAbstractEntity->isNew() || $productAbstractEntity->isModified()) {
                $productAbstractEntity->save();
            }
        }

        $dataSet[static::ID_PRODUCT_ABSTRACT] = $productAbstractEntity->getIdProductAbstract();

        return $productAbstractEntity;
    }

    /**
     * @param array $productAttributes
     *
     * @return array
     */
    protected function removeUnnecessaryAttributes(array $productAttributes): array
    {
        unset($productAttributes[ProductConfig::KEY_ACTIVE]);
        unset($productAttributes[ProductConfig::KEY_TAX]);
        unset($productAttributes[ProductConfig::KEY_MAIN_IMAGE_FILE_NAME]);
        unset($productAttributes[ProductConfig::KEY_ARTIKELNAME_SPRYKER]);
        unset($productAttributes[ProductConfig::KEY_DESCRIPTION]);
        unset($productAttributes[ProductConfig::KEY_PRODUCT_NUMBER]);
        unset($productAttributes[ProductConfig::KEY_PRODUCT_NUMBER]);
        unset($productAttributes[ProductConfig::KEY_SAP_NUMBER]);

        return $productAttributes;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\Product\Persistence\SpyProductAbstract $productAbstractEntity
     *
     * @return void
     */
    protected function importProductAbstractLocalizedAttributes(DataSetInterface $dataSet, SpyProductAbstract $productAbstractEntity)
    {
        foreach ($dataSet[ProductLocalizedAttributesExtractorStep::KEY_LOCALIZED_ATTRIBUTES] as $idLocale => $localizedAttributes) {
            $productAbstractLocalizedAttributesEntity = SpyProductAbstractLocalizedAttributesQuery::create()
                ->filterByFkProductAbstract($productAbstractEntity->getIdProductAbstract())
                ->filterByFkLocale($idLocale)
                ->findOneOrCreate();

            $productAbstractLocalizedAttributesEntity
                ->setName($localizedAttributes[static::KEY_NAME])
                ->setDescription($dataSet[static::KEY_DESCRIPTION])
                ->setAttributes(json_encode([]));

            if ($productAbstractLocalizedAttributesEntity->isNew() || $productAbstractLocalizedAttributesEntity->isModified()) {
                $productAbstractLocalizedAttributesEntity->save();
            }
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\Product\Persistence\SpyProductAbstract $productAbstractEntity
     * @param string[] $locales
     *
     * @return void
     */
    protected function importProductUrls(DataSetInterface $dataSet, SpyProductAbstract $productAbstractEntity, array $locales)
    {
        foreach ($dataSet[ProductLocalizedAttributesExtractorStep::KEY_LOCALIZED_ATTRIBUTES] as $idLocale => $localizedAttributes) {
            $urlPathParts = [
                array_search($localizedAttributes[ProductLocalizedAttributesExtractorStep::KEY_LOCALE_KEY], $locales),
                $localizedAttributes[static::KEY_NAME],
                $dataSet[static::KEY_PRODUCT_NUMBER],
            ];

            $convertCallback = function ($value) {
                return $this->utilTextService->generateSlug(trim(iconv('UTF-8', 'ASCII//IGNORE', $value)));
            };
            $urlPathParts = array_map($convertCallback, $urlPathParts);
            $abstractProductUrl = '/' . implode('/', $urlPathParts);

            $this->cleanupRedirectUrls($abstractProductUrl);

            $urlEntity = SpyUrlQuery::create()
                ->filterByFkLocale($idLocale)
                ->filterByFkResourceProductAbstract($productAbstractEntity->getIdProductAbstract())
                ->_or()
                ->filterByUrl($abstractProductUrl)
                ->findOneOrCreate();

            $urlEntity->setFkResourceProductAbstract($productAbstractEntity->getIdProductAbstract());
            $urlEntity->setUrl($abstractProductUrl);

            if ($urlEntity->isNew() || $urlEntity->isModified()) {
                $urlEntity->save();

                $this->addPublishEvents(UrlEvents::URL_PUBLISH, $urlEntity->getIdUrl());
            }
        }
    }

    /**
     * @param string $abstractProductUrl
     *
     * @return void
     */
    protected function cleanupRedirectUrls($abstractProductUrl)
    {
        SpyUrlQuery::create()
            ->filterByUrl($abstractProductUrl)
            ->filterByFkResourceRedirect(null, Criteria::ISNOTNULL)
            ->delete();
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
     * @param string $taxRate
     *
     * @return int
     */
    protected function getIdTaxSet(string $taxRate)
    {
        if (!isset(static::$idTaxSetBuffer[$taxRate])) {
            static::$idTaxSetBuffer[$taxRate] = SpyTaxRateQuery::create()
                ->filterByRate($taxRate)
                ->_and()
                ->where(SpyTaxRateTableMap::COL_NAME . Criteria::NOT_EQUAL . "'" . static::SHIPMENT_TAX_RATE_NAME . "'")
                ->joinWithSpyTaxSetTax()
                ->find()
                ->getFirst()
                ->getSpyTaxSetTaxes()
                ->getFirst()
                ->getFkTaxSet();
        }

        return static::$idTaxSetBuffer[$taxRate];
    }
}
