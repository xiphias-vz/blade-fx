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
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Glossary\Dependency\GlossaryEvents;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\ProductOption\Dependency\ProductOptionEvents;

class ProductDepositOptionStep extends PublishAwareStep implements DataImportStepInterface
{
    private const KEY_DEPOSIT_COUNT_1 = 'pfand_1_count';
    private const KEY_DEPOSIT_COUNT_2 = 'pfand_2_count';
    private const KEY_DEPOSIT_TYPE_1 = 'pfand_1_plu';
    private const KEY_DEPOSIT_TYPE_2 = 'pfand_2_plu';
    private const KEY_DEPOSIT_AMOUNT_1 = 'pfand_1_amount';
    private const KEY_DEPOSIT_AMOUNT_2 = 'pfand_2_amount';
    private const KEY_DEPOSIT_SAP_NUMBER_1 = 'pfand_1_sapnumber';
    private const KEY_DEPOSIT_SAP_NUMBER_2 = 'pfand_2_sapnumber';

    private const KEY_DEPOSIT_COUNT = 'pfand_count';
    private const KEY_DEPOSIT_TYPE = 'pfand_plu';
    private const KEY_DEPOSIT_AMOUNT = 'pfand_amount';
    private const KEY_DEPOSIT_SAP_NUMBER = 'pfand_sapnumber';

    private const GROUP_NAME_TRANSLATION_KEY_PATTERN = 'product.option.group.name.deposit_';
    private const OPTION_NAME_TRANSLATION_KEY_PATTERN = 'product.option.group.name.deposit_';

    private const FK_TAX_SET = ProductAbstractWriterStep::FK_TAX_SET;
    private const PRODUCT_OPTION_SKU = 'product_option_sku';

    private const DEFAULT_CURRENCY = 'EUR';

    private const ID_PRODUCT_OPTION_GROUP = 'id_product_option_group';

    /**
     * @var array
     */
    private static $idStoreBuffer = [];

    /**
     * @var array
     */
    protected static $idCurrencyBuffer = [];

    /**
     * @var int[]
     */
    private static $idProductOptionGroup;

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
        $productOptionGroupEntity = SpyProductOptionGroupQuery::create()
            ->filterByName(self::GROUP_NAME_TRANSLATION_KEY_PATTERN . $dataSet[static::KEY_DEPOSIT_TYPE])
            ->findOneOrCreate();

        $productOptionGroupEntity
            ->setActive(true)
            ->setFkTaxSet($dataSet[static::FK_TAX_SET])
            ->save();

        $dataSet[static::ID_PRODUCT_OPTION_GROUP] = $productOptionGroupEntity->getIdProductOptionGroup();

        $optionSku = 'OP_product_deposit_'.
            $dataSet[self::KEY_DEPOSIT_SAP_NUMBER] . '_' .
            $dataSet[self::KEY_DEPOSIT_TYPE] . '_' .
            $dataSet[self::KEY_DEPOSIT_COUNT];

        $dataSet[static::PRODUCT_OPTION_SKU] = $optionSku;

        $productOptionValueEntity = SpyProductOptionValueQuery::create()
            ->filterBySku($optionSku)
            ->filterByFkProductOptionGroup($productOptionGroupEntity->getIdProductOptionGroup())
            ->findOneOrCreate();

        $productOptionValueEntity
            ->setValue(static::OPTION_NAME_TRANSLATION_KEY_PATTERN . $dataSet[self::KEY_DEPOSIT_TYPE] . '_' . $dataSet[self::KEY_DEPOSIT_COUNT])
            ->save();

        //TODO: check if translations are used
//        foreach ($dataSet[ProductLocalizedAttributesExtractorStep::KEY_LOCALIZED_ATTRIBUTES] as $idLocale => $attributes) {
//            $this->findOrCreateTranslation($dataSet[static::KEY_OPTION_NAME_TRANSLATION_KEY], $attributes[static::KEY_OPTION_NAME], $idLocale);
//            $this->findOrCreateTranslation($dataSet[static::KEY_GROUP_NAME_TRANSLATION_KEY], $attributes[static::KEY_GROUP_NAME], $idLocale);
//        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function writeProductOptionPrice(DataSetInterface $dataSet): void
    {
        $productOptionValueEntity = SpyProductOptionValueQuery::create()
            ->findOneBySku($dataSet[static::PRODUCT_OPTION_SKU]);

        if ($productOptionValueEntity === null) {
            throw new InvalidDataException(
                sprintf('Product option SKU (%s) not found in permanent storage.', $dataSet[static::PRODUCT_OPTION_SKU])
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
                ->filterByIdTaxSet($dataSet[static::FK_TAX_SET])
                ->findOne();

            $grossPrice = (float)$dataSet[static::KEY_DEPOSIT_AMOUNT] * 100;
            $netPrice = $grossPrice / ($taxSetEntity->getSpyTaxRates()[0]->getRate() / 100 + 1);

            $priceEntity
                ->setGrossPrice($grossPrice)
                ->setNetPrice($netPrice)
                ->save();

            //TODO: check that additional publish is not required
//            $this->publishRelatedProductAbstracts($priceEntity->getFkProductOptionValue());
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
    protected function getIdStore($storeName)
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
    protected function getIdCurrency($currencyCode)
    {
        if (!isset(static::$idCurrencyBuffer[$currencyCode])) {
            static::$idCurrencyBuffer[$currencyCode] =
                SpyCurrencyQuery::create()->findOneByCode($currencyCode)->getIdCurrency();
        }

        return static::$idCurrencyBuffer[$currencyCode];
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
