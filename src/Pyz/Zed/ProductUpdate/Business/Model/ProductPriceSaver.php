<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Business\Model;

use NumberFormatter;
use Orm\Zed\Currency\Persistence\SpyCurrencyQuery;
use Orm\Zed\PriceProduct\Persistence\Map\SpyPriceTypeTableMap;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductDefaultQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductStore;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductStoreQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceTypeQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Pyz\Shared\Application\ApplicationConstants;
use Pyz\Zed\DataImport\Business\Exception\InvalidDataException;
use Pyz\Zed\DataImport\Business\Model\BaseProduct\StoreSpecificAttributeExtractorStep;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Spryker\Shared\Config\Config;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\PriceProduct\Dependency\PriceProductEvents;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\Product\Dependency\ProductEvents;

class ProductPriceSaver
{
    public const PRICE_TYPE_DEFAULT = 'DEFAULT';
    public const PRICE_TYPE_ORIGINAL = 'ORIGINAL';

    /**
     * @var array
     */
    private static $idCurrencyBuffer = [];

    /**
     * @var array
     */
    private static $idStoreBuffer = [];

    /**
     * @var array
     */
    private static $idPriceTypeBuffer = [];

    /**
     * @var \NumberFormatter
     */
    private $numberFormatter;

    /**
     * @var \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    private $moneyFacade;

    /**
     * @param \NumberFormatter $numberFormatter
     * @param \Spryker\Zed\Money\Business\MoneyFacadeInterface $moneyFacade
     */
    public function __construct(
        NumberFormatter $numberFormatter,
        MoneyFacadeInterface $moneyFacade
    ) {
        $this->numberFormatter = $numberFormatter;
        $this->moneyFacade = $moneyFacade;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $priceType
     * @param string $priceField
     * @param string|null $pricePerKg
     *
     * @return void
     */
    public function saveSinglePrice(DataSetInterface $dataSet, string $priceType, string $priceField, ?string $pricePerKg = null)
    {
        $priceProductStoreEntity = $this->createPriceProductStoreEntityByPriceType($dataSet, $priceType, $priceField, $pricePerKg);
        $this->savePriceProductDefault($priceProductStoreEntity->getPrimaryKey());
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $priceType
     * @param string $priceField
     * @param string|null $pricePerKg
     *
     * @return \Orm\Zed\PriceProduct\Persistence\SpyPriceProductStore
     */
    private function createPriceProductStoreEntityByPriceType(DataSetInterface $dataSet, string $priceType, string $priceField, ?string $pricePerKg = null): SpyPriceProductStore
    {
        $priceProductQuery = SpyPriceProductQuery::create();
        $priceProductQuery->filterByFkPriceType($this->getIdPriceTypeByName($priceType));

        if (isset($dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT]) && !$dataSet[ProductAbstractWriterStep::IS_PRODUCT_CONCRETE]) {
            $idProductAbstract = $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT];
            $priceProductQuery->filterByFkProductAbstract($idProductAbstract);

            $this->addPublishEvents(PriceProductEvents::PRICE_ABSTRACT_PUBLISH, $idProductAbstract);
            $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $idProductAbstract);
        } else {
            $idProduct = $dataSet[PriceProductDataSet::ID_PRODUCT_CONCRETE];
            $priceProductQuery->filterByFkProduct($idProduct);
            $this->addPublishEvents(PriceProductEvents::PRICE_CONCRETE_PUBLISH, $idProduct);
        }

        $productPriceEntity = $priceProductQuery->findOneOrCreate();

        if ($productPriceEntity->isNew() || $productPriceEntity->isModified()) {
            $productPriceEntity->save();
        }

        $curr = Config::get(ApplicationConstants::CURRENCY_CODE);
        $priceProductStoreEntity = SpyPriceProductStoreQuery::create()
            ->filterByFkStore($this->getIdStoreByName($dataSet[PriceProductDataSet::KEY_STORE]))
            ->filterByFkCurrency($this->getIdCurrencyByCode($curr))
            ->filterByFkPriceProduct($productPriceEntity->getPrimaryKey())
            ->joinPriceProductDefault()
            ->findOne();

        if (!$priceProductStoreEntity) {
            $priceProductStoreEntity = (new SpyPriceProductStore())
                ->setFkStore($this->getIdStoreByName($dataSet[PriceProductDataSet::KEY_STORE]))
                ->setFkCurrency($this->getIdCurrencyByCode($curr))
                ->setFkPriceProduct($productPriceEntity->getPrimaryKey());
        }

        $grossPrice = $this->getProductPriceByStore($dataSet, $priceField);
        if ($pricePerKg) {
            $perKgPrice = $this->getProductPricePerKgByStore($dataSet, $pricePerKg);
            $priceProductStoreEntity->setPricePerKg($perKgPrice);
        }
        $priceProductStoreEntity->setGrossPrice($grossPrice);
        $priceProductStoreEntity->setNetPrice(null);
        $priceProductStoreEntity->setPriceData('[]');
        $priceProductStoreEntity->setPriceDataChecksum($grossPrice);

        if ($priceProductStoreEntity->isModified()) {
            $priceProductStoreEntity->save();
        }

        return $priceProductStoreEntity;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $priceField
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return int
     */
    private function getProductPriceByStore(DataSetInterface $dataSet, string $priceField)
    {
        $priceValue = $dataSet[$priceField];
        if ($dataSet->offsetExists(StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES)) {
            $storeSpecificAttributes = $dataSet[StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES];
            $storeName = $dataSet[PriceProductDataSet::KEY_STORE];
            if (!empty($storeSpecificAttributes[$storeName][$priceField])) {
                $priceValue = $storeSpecificAttributes[$storeName][$priceField];
            }
        }

        $parsedPrice = $this->numberFormatter->parse(trim($priceValue));
        if ($parsedPrice === false) {
            throw new InvalidDataException(
                sprintf('Product price "%s" for ID %s is not a number.', $dataSet[$priceField], $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT])
            );
        }

        return $this->moneyFacade->convertDecimalToInteger($parsedPrice);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $pricePerKg
     *
     * @return int|null
     */
    private function getProductPricePerKgByStore(DataSetInterface $dataSet, string $pricePerKg)
    {
        $priceValue = $dataSet[$pricePerKg];
        if ($dataSet->offsetExists(StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES)) {
            $storeSpecificAttributes = $dataSet[StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES];
            $storeName = $dataSet[PriceProductDataSet::KEY_STORE];
            if (!empty($storeSpecificAttributes[$storeName][$pricePerKg])) {
                $priceValue = $storeSpecificAttributes[$storeName][$pricePerKg];
            }
        }
        $parsedPrice = $this->numberFormatter->parse(trim($priceValue));
        if ($parsedPrice === false) {
            return null;
        }

        return $this->moneyFacade->convertDecimalToInteger($parsedPrice);
    }

    /**
     * @param string $idPriceProductStore
     *
     * @return void
     */
    private function savePriceProductDefault(string $idPriceProductStore): void
    {
        $priceProductDefaultEntity = SpyPriceProductDefaultQuery::create()
            ->filterByFkPriceProductStore($idPriceProductStore)
            ->findOneOrCreate();

        if ($priceProductDefaultEntity->isNew()) {
            $priceProductDefaultEntity->save();
        }
    }

    /**
     * @param string $priceTypeName
     *
     * @return int
     */
    private function getIdPriceTypeByName($priceTypeName)
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
    private function getIdCurrencyByCode($currencyCode)
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
    private function getIdStoreByName($storeName)
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            static::$idStoreBuffer[$storeName] =
                SpyStoreQuery::create()->findOneByName($storeName)->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }

    /**
     * @param string $eventName
     * @param int $entityId
     *
     * @return void
     */
    private function addPublishEvents($eventName, $entityId)
    {
        DataImporterPublisher::addEvent($eventName, $entityId);
    }
}
