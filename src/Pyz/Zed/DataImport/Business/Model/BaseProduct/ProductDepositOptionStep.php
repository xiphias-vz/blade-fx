<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Orm\Zed\Currency\Persistence\SpyCurrencyQuery;
use Orm\Zed\Glossary\Persistence\SpyGlossaryKeyQuery;
use Orm\Zed\Glossary\Persistence\SpyGlossaryTranslationQuery;
use Orm\Zed\ProductOption\Persistence\SpyProductAbstractProductOptionGroupQuery;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionGroupQuery;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePriceQuery;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionValueQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Orm\Zed\Tax\Persistence\SpyTaxSetQuery;
use Pyz\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Glossary\Dependency\GlossaryEvents;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\ProductOption\Dependency\ProductOptionEvents;

class ProductDepositOptionStep extends PublishAwareStep implements DataImportStepInterface
{
    /**
     * @var array
     */
    public static $productAbstractProductOptionBuffer = [];

    public const ID_PRODUCT_OPTION_GROUP = 'id_product_option_group';

    protected const KEY_DEPOSIT_COUNT_1 = 'pfand_1_count';
    protected const KEY_DEPOSIT_COUNT_2 = 'pfand_2_count';
    protected const KEY_DEPOSIT_TYPE_1 = 'pfand_1_plu';
    protected const KEY_DEPOSIT_TYPE_2 = 'pfand_2_plu';
    protected const KEY_DEPOSIT_AMOUNT_1 = 'pfand_1_amount';
    protected const KEY_DEPOSIT_AMOUNT_2 = 'pfand_2_amount';
    protected const KEY_DEPOSIT_SAP_NUMBER_1 = 'pfand_1_sapnumber';

    protected const KEY_DEPOSIT_SAP_NUMBER_2 = 'pfand_2_sapnumber';
    protected const KEY_DEPOSIT_COUNT = 'pfand_count';
    protected const KEY_DEPOSIT_TYPE = 'pfand_plu';
    protected const KEY_DEPOSIT_AMOUNT = 'pfand_amount';

    protected const KEY_DEPOSIT_SAP_NUMBER = 'pfand_sapnumber';
    protected const GROUP_NAME_TRANSLATION_KEY_PATTERN = 'product.option.group.name.deposit';

    protected const OPTION_NAME_TRANSLATION_KEY_PATTERN = 'product.option.group.name.deposit';

    protected const OPTION_SKU_PREFIX = 'OP_product_deposit_';
    protected const KEY_PRODUCT_OPTION_SKU = 'product_option_sku';

    protected const DEFAULT_CURRENCY = 'EUR';

    protected const DEFAULT_DEPOSIT_NAME = 'Pfand';

    protected const DEPOSITS_TAX_SET = 'STANDARD';

    protected const DEFAULT_DEPOSIT_AMOUNT_MULTIPLIER = 100;
    protected const DEFAULT_DEPOSIT_COUNT = 1;

    /**
     * @var array
     */
    protected static $idStoreBuffer = [];

    /**
     * @var array
     */
    protected static $idCurrencyBuffer = [];

    /**
     * @var array
     */
    protected static $idTaxSetBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        if (!empty($dataSet[static::KEY_DEPOSIT_AMOUNT_1])) {
            $dataSet[static::KEY_DEPOSIT_COUNT] = $dataSet[static::KEY_DEPOSIT_COUNT_1];
            $dataSet[static::KEY_DEPOSIT_TYPE] = $dataSet[static::KEY_DEPOSIT_TYPE_1];
            $dataSet[static::KEY_DEPOSIT_AMOUNT] = $dataSet[static::KEY_DEPOSIT_AMOUNT_1];
            $dataSet[static::KEY_DEPOSIT_SAP_NUMBER] = $dataSet[static::KEY_DEPOSIT_SAP_NUMBER_1];

            $this->write($dataSet);
        }

        if (!empty($dataSet[static::KEY_DEPOSIT_AMOUNT_2])) {
            $dataSet[static::KEY_DEPOSIT_COUNT] = $dataSet[static::KEY_DEPOSIT_COUNT_2];
            $dataSet[static::KEY_DEPOSIT_TYPE] = $dataSet[static::KEY_DEPOSIT_TYPE_2];
            $dataSet[static::KEY_DEPOSIT_AMOUNT] = $dataSet[static::KEY_DEPOSIT_AMOUNT_2];
            $dataSet[static::KEY_DEPOSIT_SAP_NUMBER] = $dataSet[static::KEY_DEPOSIT_SAP_NUMBER_2];

            $this->write($dataSet);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function write(DataSetInterface $dataSet): void
    {
        $this->writeProductOption($dataSet);
        $this->writeProductOptionPrice($dataSet);
        $this->writeProductAbstractProductOptionGroup($dataSet);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function writeProductOption(DataSetInterface $dataSet): void
    {
        $optionGroupName = self::GROUP_NAME_TRANSLATION_KEY_PATTERN . '_' . $dataSet[static::KEY_DEPOSIT_TYPE];
        $productOptionGroupEntity = SpyProductOptionGroupQuery::create()
            ->filterByName($optionGroupName)
            ->findOneOrCreate();

        $productOptionGroupEntity
            ->setActive(true)
            ->setFkTaxSet($this->getIdTaxSet(static::DEPOSITS_TAX_SET))
            ->save();

        $dataSet[static::ID_PRODUCT_OPTION_GROUP] = $productOptionGroupEntity->getIdProductOptionGroup();

        $optionSku = static::OPTION_SKU_PREFIX .
            $dataSet[self::KEY_DEPOSIT_SAP_NUMBER] . '_' .
            $dataSet[self::KEY_DEPOSIT_TYPE] . '_' .
            $dataSet[self::KEY_DEPOSIT_COUNT];

        $dataSet[static::KEY_PRODUCT_OPTION_SKU] = $optionSku;

        $productOptionValueEntity = SpyProductOptionValueQuery::create()
            ->filterBySku($optionSku)
            ->filterByFkProductOptionGroup($productOptionGroupEntity->getIdProductOptionGroup())
            ->findOneOrCreate();

        $optionValue = static::OPTION_NAME_TRANSLATION_KEY_PATTERN . $dataSet[self::KEY_DEPOSIT_TYPE] . '_' . $dataSet[self::KEY_DEPOSIT_COUNT];
        $productOptionValueEntity
            ->setValue($optionValue)
            ->save();

        $this->findOrCreateTranslation($optionGroupName, static::DEFAULT_DEPOSIT_NAME, $dataSet->getArrayCopy()['locales']['de_DE']);
        $this->findOrCreateTranslation($optionValue, static::DEFAULT_DEPOSIT_NAME, $dataSet->getArrayCopy()['locales']['de_DE']);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function writeProductOptionPrice(DataSetInterface $dataSet): void
    {
        $productOptionValueEntity = SpyProductOptionValueQuery::create()
            ->findOneBySku($dataSet[static::KEY_PRODUCT_OPTION_SKU]);

        if ($productOptionValueEntity === null) {
            throw new InvalidDataException(
                sprintf('Product option SKU (%s) not found in permanent storage.', $dataSet[static::KEY_PRODUCT_OPTION_SKU])
            );
        }

        $allowedStores = Store::getInstance()->getAllowedStores();

        foreach ($allowedStores as $storeName) {
            $priceEntity = SpyProductOptionValuePriceQuery::create()
                ->filterByFkStore($this->getIdStore($storeName))
                ->filterByFkCurrency($this->getIdCurrency(static::DEFAULT_CURRENCY))
                ->filterByFkProductOptionValue($productOptionValueEntity->getIdProductOptionValue())
                ->findOneOrCreate();

            $taxSetEntity = SpyTaxSetQuery::create()
                ->filterByIdTaxSet($this->getIdTaxSet(static::DEPOSITS_TAX_SET))
                ->findOne();

            $depositCount = $dataSet[static::KEY_DEPOSIT_COUNT] ?? static::DEFAULT_DEPOSIT_COUNT;
            $grossPrice = ((float)$dataSet[static::KEY_DEPOSIT_AMOUNT] * static::DEFAULT_DEPOSIT_AMOUNT_MULTIPLIER) * (int)$depositCount;
            $netPrice = $grossPrice / ($taxSetEntity->getSpyTaxRates()[0]->getRate() / 100 + 1);

            $priceEntity
                ->setGrossPrice($grossPrice)
                ->setNetPrice($netPrice)
                ->save();
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function writeProductAbstractProductOptionGroup(DataSetInterface $dataSet): void
    {
        SpyProductAbstractProductOptionGroupQuery::create()
            ->filterByFkProductOptionGroup($dataSet[static::ID_PRODUCT_OPTION_GROUP])
            ->filterByFkProductAbstract($dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT])
            ->findOneOrCreate()
            ->save();

        $productAbstractProductOptionBufferKey = $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT] . '-' . $dataSet[static::ID_PRODUCT_OPTION_GROUP];
        static::$productAbstractProductOptionBuffer[$productAbstractProductOptionBufferKey] = $productAbstractProductOptionBufferKey;

        $this->addPublishEvents(
            ProductOptionEvents::PRODUCT_ABSTRACT_PRODUCT_OPTION_PUBLISH,
            $dataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT]
        );
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStore(string $storeName): int
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            static::$idStoreBuffer[$storeName] =
                SpyStoreQuery::create()->findOneByName($storeName)->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }

    /**
     * @param string $currencyCode
     *
     * @return int
     */
    protected function getIdCurrency(string $currencyCode): int
    {
        if (!isset(static::$idCurrencyBuffer[$currencyCode])) {
            static::$idCurrencyBuffer[$currencyCode] =
                SpyCurrencyQuery::create()->findOneByCode($currencyCode)->getIdCurrency();
        }

        return static::$idCurrencyBuffer[$currencyCode];
    }

    /**
     * @param string $taxSetName
     *
     * @return int
     */
    protected function getIdTaxSet(string $taxSetName): int
    {
        if (!isset(static::$idTaxSetBuffer[$taxSetName])) {
            static::$idTaxSetBuffer[$taxSetName] = SpyTaxSetQuery::create()
                ->filterByName($taxSetName)
                ->findOne()
                ->getIdTaxSet();
        }

        return static::$idTaxSetBuffer[$taxSetName];
    }

    /**
     * @param string $key
     * @param string $translation
     * @param int $idLocale
     *
     * @return void
     */
    protected function findOrCreateTranslation($key, $translation, $idLocale)
    {
        $glossaryKeyEntity = SpyGlossaryKeyQuery::create()
            ->filterByKey($key)
            ->findOneOrCreate();

        $glossaryKeyEntity->save();

        $glossaryTranslationEntity = SpyGlossaryTranslationQuery::create()
            ->filterByFkLocale($idLocale)
            ->filterByFkGlossaryKey($glossaryKeyEntity->getIdGlossaryKey())
            ->findOneOrCreate();

        $glossaryTranslationEntity
            ->setValue($translation)
            ->save();

        $this->addPublishEvents(GlossaryEvents::GLOSSARY_KEY_PUBLISH, $glossaryTranslationEntity->getFkGlossaryKey());
    }
}
