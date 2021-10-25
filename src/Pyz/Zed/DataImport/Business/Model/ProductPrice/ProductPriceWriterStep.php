<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductPrice;

use NumberFormatter;
use Orm\Zed\Currency\Persistence\SpyCurrencyQuery;
use Orm\Zed\DataImport\Persistence\PyzImpPriceProduct;
use Orm\Zed\PriceProduct\Persistence\Map\SpyPriceTypeTableMap;
use Orm\Zed\PriceProduct\Persistence\SpyPriceTypeQuery;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductSchedule;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleListQuery;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery;
use Orm\Zed\Product\Persistence\SpyProductAbstractQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Orm\Zed\Tax\Persistence\SpyTaxSetQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Exception\InvalidDataException;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Pyz\Zed\DataImport\DataImportConfig;
use Pyz\Zed\ProductUpdate\Business\Model\ProductPriceSaver;
use Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;

class ProductPriceWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const KEY_GTIN = 'GTIN';

    /**
     * @var array
     */
    protected static $idCurrencyBuffer = [];

    /**
     * @var array
     */
    protected static $idStoreBuffer = [];

    /**
     * @var array
     */
    protected static $idPriceTypeBuffer = [];

    protected const ZERO_PSEUDO_PRICE = "0,00";

    /**
     * @var string
     */
    protected static $dtImport;

    /**
     * @var \NumberFormatter
     */
    private $numberFormatter;

    /**
     * @var \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    private $moneyFacade;

    /**
     * @var \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface
     */
    private $productUpdateFacade;

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    private $dataImportConfig;

    /**
     * @param \NumberFormatter $numberFormatter
     * @param \Spryker\Zed\Money\Business\MoneyFacadeInterface $moneyFacade
     * @param \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface $productUpdateFacade
     * @param \Pyz\Zed\DataImport\DataImportConfig $dataImportConfig
     */
    public function __construct(
        NumberFormatter $numberFormatter,
        MoneyFacadeInterface $moneyFacade,
        ProductUpdateFacadeInterface $productUpdateFacade,
        DataImportConfig $dataImportConfig
    ) {
        $this->numberFormatter = $numberFormatter;
        $this->moneyFacade = $moneyFacade;
        $this->productUpdateFacade = $productUpdateFacade;
        $this->dataImportConfig = $dataImportConfig;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $sapStoreIdToStoreMap = $this->dataImportConfig->getSapStoreIdToStoreMap();
        $dataSet[PriceProductDataSet::KEY_STORE] = $sapStoreIdToStoreMap[$dataSet[PriceProductDataSet::KEY_STORE]];

        $key = ProductConfig::KEY_SAP_NUMBER;
        $keys = array_keys($dataSet->getArrayCopy());
        if (!in_array($key, $keys)) {
            foreach ($keys as $str) {
                if (str_ends_with($str, $key)) {
                    $key = $str;
                    break;
                }
            }
        }

        if (!static::$dtImport) {
            static::$dtImport = date("Y-m-d h:i:sa");
        }

        $importEntity = new PyzImpPriceProduct();
        if (isset($dataSet[static::KEY_GTIN]) && !ctype_space($dataSet[static::KEY_GTIN]) && !empty($dataSet[static::KEY_GTIN])) {
            $importEntity->setGtin($dataSet[static::KEY_GTIN]);
        }

        $importEntity
            ->setStore($dataSet[PriceProductDataSet::KEY_STORE])
            ->setSapnumber($dataSet[$key])
            ->setPrice($this->numberFormatter->parse(trim($dataSet[ProductConfig::KEY_PRICE])))
            ->setPseudoprice($this->numberFormatter->parse(trim($dataSet[ProductConfig::KEY_PSEUDO_PRICE])))
            ->setDtimported(static::$dtImport);
        if (!empty($dataSet[ProductConfig::KEY_PRICE_FROM])) {
            $importEntity
                ->setPromotion($dataSet[ProductConfig::KEY_PRICE_PROMOTION])
                ->setPromotionstart($dataSet[ProductConfig::KEY_PRICE_FROM])
                ->setPromotionend($dataSet[ProductConfig::KEY_PRICE_TO]);
        }
        $importEntity->save();

        if (isset($dataSet[static::KEY_GTIN]) && !ctype_space($dataSet[static::KEY_GTIN]) && !empty($dataSet[static::KEY_GTIN])) {
            $productAbstractEntitiesCollection = SpyProductAbstractQuery::create()
                ->filterBySku($dataSet[static::KEY_GTIN] . '_abstract')
                ->find();
        } else {
            $productAbstractEntitiesCollection = SpyProductAbstractQuery::create()
                ->filterBySapNumber($dataSet[$key])
                ->find();
        }

        if ($productAbstractEntitiesCollection->isEmpty()) {
            // according to requirements price data files can be provided with non existing sap number.
            // this data should skipped
            return;
        }
        $pricePerKg = null;

        foreach ($productAbstractEntitiesCollection as $productAbstractEntity) {
            $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT] = $productAbstractEntity->getIdProductAbstract();
            $dataSet[ProductAbstractWriterStep::IS_PRODUCT_CONCRETE] = false;

            $productAbstractEntityAttributes = json_decode($productAbstractEntity->getAttributes(), true);

            $productConcreteEntity = $productAbstractEntity->getSpyProducts()[0];
            $productConcreteEntityAttributes = json_decode($productConcreteEntity->getAttributes(), true);

            if (isset($productAbstractEntityAttributes[ProductConfig::KEY_WEIGHT_PER_ITEM])) {
                $priceMultiplier = $productAbstractEntityAttributes[ProductConfig::KEY_WEIGHT_PER_ITEM];
                if (!$pricePerKg) {
                    $pricePerKg = $dataSet[ProductConfig::KEY_PRICE];
                }
                $dataSet[ProductConfig::PRICE_PER_KG] = $pricePerKg;

                $parsedPricePerKg = $this->numberFormatter->parse(trim($pricePerKg));
                $integerPricePerKg = $this->moneyFacade->convertDecimalToInteger($parsedPricePerKg);

                $multipliedPrice = (int)round($priceMultiplier * $integerPricePerKg);
                $multipliedPriceDecimal = $this->moneyFacade->convertIntegerToDecimal($multipliedPrice);

                $dataSet[ProductConfig::KEY_PRICE] = str_replace('.', ',', $multipliedPriceDecimal);

                $this->productUpdateFacade->saveSinglePrice($dataSet, ProductPriceSaver::PRICE_TYPE_DEFAULT, ProductConfig::KEY_PRICE, ProductConfig::PRICE_PER_KG);

                //TODO: clarify
                $productAbstractEntity->setAttributes(json_encode($productAbstractEntityAttributes));
                $productAbstractEntity->save();

                $productConcreteEntity->setAttributes(json_encode($productConcreteEntityAttributes));
                $productConcreteEntity->save();

                continue;
            }

            if (!empty($dataSet[ProductConfig::KEY_PRICE_FROM])) {
                if (date("D", strtotime($dataSet[ProductConfig::KEY_PRICE_FROM])) === 'Mon') {
                    $dataSet[ProductConfig::KEY_PRICE_FROM] = date('Y-m-d', strtotime($dataSet[ProductConfig::KEY_PRICE_FROM] . " -1 days"));
                }

                if (!empty($dataSet[ProductConfig::KEY_PRICE_TO]) &&
                    $dataSet[ProductConfig::KEY_PSEUDO_PRICE] !== static::ZERO_PSEUDO_PRICE) {
                    $this->savePriceProductSchedule($dataSet, ProductPriceSaver::PRICE_TYPE_DEFAULT, ProductConfig::KEY_PRICE);
                    $this->savePriceProductSchedule($dataSet, ProductPriceSaver::PRICE_TYPE_ORIGINAL, ProductConfig::KEY_PSEUDO_PRICE);

                    continue;
                }
            }

            $this->productUpdateFacade->saveSinglePrice($dataSet, ProductPriceSaver::PRICE_TYPE_DEFAULT, ProductConfig::KEY_PRICE);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $type
     * @param string $keyActiveFrom
     * @param string $keyActiveTo
     *
     * @return \Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery
     */
    protected function createPriceProductScheduleQuery(DataSetInterface $dataSet, string $type, string $keyActiveFrom, string $keyActiveTo): SpyPriceProductScheduleQuery
    {
        $priceProductScheduleQuery = SpyPriceProductScheduleQuery::create();
        $priceProductScheduleQuery
            ->filterByFkPriceType($this->getIdPriceTypeByName($type))
            ->filterByFkStore($this->getIdStoreByName($dataSet[PriceProductDataSet::KEY_STORE]))
            ->filterByFkCurrency($this->getIdCurrencyByCode('EUR'))
            ->filterByActiveFrom($dataSet[$keyActiveFrom])
            ->filterByActiveTo($dataSet[$keyActiveTo])
            ->filterByFkProductAbstract($dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT]);

        return $priceProductScheduleQuery;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $priceType
     * @param string $priceKey
     *
     * @return void
     */
    protected function savePriceProductSchedule(
        DataSetInterface $dataSet,
        string $priceType,
        string $priceKey
    ): void {
        $priceProductScheduleEntity = $this->createPriceProductScheduleQuery(
            $dataSet,
            $priceType,
            ProductConfig::KEY_PRICE_FROM,
            ProductConfig::KEY_PRICE_TO
        )->findOneOrCreate();

        if (!empty($priceKey)) {
            $this->createPriceProductSchedule($dataSet, $priceProductScheduleEntity, $priceKey);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductSchedule $priceProductScheduleEntity
     * @param string $priceKey
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function createPriceProductSchedule(DataSetInterface $dataSet, SpyPriceProductSchedule $priceProductScheduleEntity, string $priceKey): void
    {
        $priceProductScheduleListEntity = SpyPriceProductScheduleListQuery::create()
            ->filterByName($dataSet[ProductConfig::KEY_PRICE_PROMOTION])
            ->filterByIsActive(true)
            ->findOneOrCreate();

        if ($priceProductScheduleListEntity->isNew()) {
            $priceProductScheduleListEntity->save();
        }

        $parsedPrice = $this->numberFormatter->parse(trim($dataSet[$priceKey]));
        if ($parsedPrice === false) {
            throw new InvalidDataException(
                sprintf('Product price "%s" for ID %s is not a number.', $dataSet[$priceKey], $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT])
            );
        }

        $grossPrice = $this->moneyFacade->convertDecimalToInteger($parsedPrice);

        $taxSetEntity = SpyTaxSetQuery::create()
            ->filterByIdTaxSet($priceProductScheduleEntity->getProductAbstract()->getFkTaxSet())
            ->findOne();
        $netPrice = $grossPrice / ($taxSetEntity->getSpyTaxRates()[0]->getRate() / 100 + 1);

        $priceProductScheduleEntity
            ->setFkPriceProductScheduleList($priceProductScheduleListEntity->getIdPriceProductScheduleList())
            ->setGrossPrice($grossPrice)
            ->setNetPrice($netPrice)
            ->save();
    }

    /**
     * @param string $priceTypeName
     *
     * @return int
     */
    protected function getIdPriceTypeByName($priceTypeName)
    {
        if (!isset(static::$idPriceTypeBuffer[$priceTypeName])) {
            $priceTypeEntity = SpyPriceTypeQuery::create()
                ->filterByName($priceTypeName)
                ->findOneOrCreate();
            if ($priceTypeEntity->isNew() || $priceTypeEntity->isModified()) {
                $priceTypeEntity->setPriceModeConfiguration(SpyPriceTypeTableMap::COL_PRICE_MODE_CONFIGURATION_GROSS_MODE);
                $priceTypeEntity->save();
            }
            static::$idPriceTypeBuffer[$priceTypeName] = $priceTypeEntity->getIdPriceType();
        }

        return static::$idPriceTypeBuffer[$priceTypeName];
    }

    /**
     * @param string $currencyCode
     *
     * @return int
     */
    protected function getIdCurrencyByCode($currencyCode)
    {
        if (!isset(static::$idCurrencyBuffer[$currencyCode])) {
            static::$idCurrencyBuffer[$currencyCode] =
                SpyCurrencyQuery::create()->findOneByCode($currencyCode)->getIdCurrency();
        }

        return static::$idCurrencyBuffer[$currencyCode];
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStoreByName($storeName)
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            static::$idStoreBuffer[$storeName] =
                SpyStoreQuery::create()->findOneByName($storeName)->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }
}
