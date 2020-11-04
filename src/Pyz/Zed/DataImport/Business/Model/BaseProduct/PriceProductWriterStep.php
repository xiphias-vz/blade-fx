<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use NumberFormatter;
use Orm\Zed\Currency\Persistence\SpyCurrencyQuery;
use Orm\Zed\PriceProduct\Persistence\Map\SpyPriceTypeTableMap;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductStoreQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceTypeQuery;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductSchedule;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleListQuery;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Orm\Zed\Tax\Persistence\SpyTaxSetQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Exception\InvalidDataException;
use Pyz\Zed\ProductUpdate\Business\Model\ProductPriceSaver;
use Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;

class PriceProductWriterStep extends PublishAwareStep implements DataImportStepInterface
{
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
     * @param \NumberFormatter $numberFormatter
     * @param \Spryker\Zed\Money\Business\MoneyFacadeInterface $moneyFacade
     * @param \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface $productUpdateFacade
     */
    public function __construct(
        NumberFormatter $numberFormatter,
        MoneyFacadeInterface $moneyFacade,
        ProductUpdateFacadeInterface $productUpdateFacade
    ) {
        $this->numberFormatter = $numberFormatter;
        $this->moneyFacade = $moneyFacade;
        $this->productUpdateFacade = $productUpdateFacade;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $availableStores = Store::getInstance()->getAllowedStores();

        $dataSet = $this->increaseProductPriceBy50Percent($dataSet);

        foreach ($availableStores as $store) {
            $dataSet[PriceProductDataSet::KEY_STORE] = $store;
            if (!empty($dataSet[ProductConfig::KEY_PRICE_FROM]) && !empty($dataSet[ProductConfig::KEY_PRICE_TO])) {
                $this->savePriceProductSchedule($dataSet);

                continue;
            }

            $this->productUpdateFacade->saveSinglePrice($dataSet, ProductPriceSaver::PRICE_TYPE_DEFAULT, ProductConfig::KEY_PRICE);

            if (!empty($dataSet[ProductConfig::KEY_PRICE_ORIGINAL])) {
                $this->productUpdateFacade->saveSinglePrice($dataSet, ProductPriceSaver::PRICE_TYPE_ORIGINAL, ProductConfig::KEY_PRICE_ORIGINAL);

                continue;
            }

            $this->removeOriginalPrices($dataSet);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function removeOriginalPrices($dataSet): void
    {
        (SpyPriceProductScheduleQuery::create())
            ->filterByFkPriceType($this->getIdPriceTypeByName(ProductPriceSaver::PRICE_TYPE_ORIGINAL))
            ->filterByFkStore($this->getIdStoreByName($dataSet[PriceProductDataSet::KEY_STORE]))
            ->filterByFkProductAbstract($dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT])
            ->delete();

        $productPrices = SpyPriceProductQuery::create()
            ->filterByFkPriceType($this->getIdPriceTypeByName(ProductPriceSaver::PRICE_TYPE_ORIGINAL))
            ->filterByFkProductAbstract($dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT])
            ->find();

        foreach ($productPrices as $priceProduct) {
            SpyPriceProductStoreQuery::create()
                ->filterByFkStore($this->getIdStoreByName($dataSet[PriceProductDataSet::KEY_STORE]))
                ->filterByFkPriceProduct($priceProduct->getIdPriceProduct())
                ->delete();

            $priceProduct->delete();
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
     *
     * @return void
     */
    protected function savePriceProductSchedule(
        DataSetInterface $dataSet
    ): void {
        $priceProductScheduleEntity = $this->createPriceProductScheduleQuery(
            $dataSet,
            ProductPriceSaver::PRICE_TYPE_DEFAULT,
            ProductConfig::KEY_PRICE_FROM,
            ProductConfig::KEY_PRICE_TO
        )->findOneOrCreate();

        if (!empty($dataSet[ProductConfig::KEY_PRICE])) {
            $this->createPriceProductSchedule($dataSet, $priceProductScheduleEntity, ProductConfig::KEY_PRICE);
        }

        if (!empty($dataSet[ProductConfig::KEY_PRICE_ORIGINAL])) {
            $keyActiveFrom = !empty($dataSet[ProductConfig::KEY_PRICE_ORIGINAL_FROM]) ? ProductConfig::KEY_PRICE_ORIGINAL_FROM : ProductConfig::KEY_PRICE_FROM;
            $keyActiveTo = !empty($dataSet[ProductConfig::KEY_PRICE_ORIGINAL_TO]) ? ProductConfig::KEY_PRICE_ORIGINAL_TO : ProductConfig::KEY_PRICE_TO;

            $priceProductScheduleEntity = $this->createPriceProductScheduleQuery($dataSet, ProductPriceSaver::PRICE_TYPE_ORIGINAL, $keyActiveFrom, $keyActiveTo)
                ->findOneOrCreate();
            $this->createPriceProductSchedule($dataSet, $priceProductScheduleEntity, ProductConfig::KEY_PRICE_ORIGINAL);
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
            ->filterByName('price schedule data import')
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

    /**
     * @param DataSetInterface $dataSet
     *
     * @return DataSetInterface
     */
    private function increaseProductPriceBy50Percent(DataSetInterface $dataSet): DataSetInterface
    {
        $parsedPrice = $this->numberFormatter->parse(trim($dataSet[ProductConfig::KEY_PRICE]));
        $parsedPrice = round($parsedPrice * 1, 2);

        $dataSet[ProductConfig::KEY_PRICE] = str_replace('.', ',', (string)$parsedPrice);

        return $dataSet;
    }
}
