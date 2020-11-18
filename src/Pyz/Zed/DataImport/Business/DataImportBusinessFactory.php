<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business;

use NumberFormatter;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\BaseProduct\AttributesExtractorStep as BaseAttributesExtractorStep;
use Pyz\Zed\DataImport\Business\Model\BaseProduct\ProductCategoryWriterStep;
use Pyz\Zed\DataImport\Business\Model\BaseProduct\ProductDepositOptionStep;
use Pyz\Zed\DataImport\Business\Model\CategoryTemplate\CategoryTemplateWriterStep;
use Pyz\Zed\DataImport\Business\Model\CmsBlock\CmsBlockWriterStep;
use Pyz\Zed\DataImport\Business\Model\CmsBlockStore\CmsBlockStoreWriterStep;
use Pyz\Zed\DataImport\Business\Model\CmsTemplate\CmsTemplateWriterStep;
use Pyz\Zed\DataImport\Business\Model\Country\Repository\CountryRepository;
use Pyz\Zed\DataImport\Business\Model\Currency\CurrencyWriterStep;
use Pyz\Zed\DataImport\Business\Model\Customer\CustomerWriterStep;
use Pyz\Zed\DataImport\Business\Model\Glossary\GlossaryWriterStep;
use Pyz\Zed\DataImport\Business\Model\Locale\AddLocalesStep;
use Pyz\Zed\DataImport\Business\Model\Locale\LocaleNameToIdLocaleStep;
use Pyz\Zed\DataImport\Business\Model\MerchantDeliveryPostalCode\MerchantDeliveryPostalCodeWriterStep;
use Pyz\Zed\DataImport\Business\Model\MerchantUser\GroupToIdGroupStep;
use Pyz\Zed\DataImport\Business\Model\MerchantUser\MerchantReferenceToIdMerchantStep;
use Pyz\Zed\DataImport\Business\Model\MerchantUser\MerchantUserWriterStep;
use Pyz\Zed\DataImport\Business\Model\Navigation\NavigationKeyToIdNavigationStep;
use Pyz\Zed\DataImport\Business\Model\Navigation\NavigationWriterStep;
use Pyz\Zed\DataImport\Business\Model\NavigationNode\NavigationNodeValidityDatesStep;
use Pyz\Zed\DataImport\Business\Model\NavigationNode\NavigationNodeWriterStep;
use Pyz\Zed\DataImport\Business\Model\PickingRoute\PickingRouteWriterStep;
use Pyz\Zed\DataImport\Business\Model\PickingZone\PickingZoneWriterStep;
use Pyz\Zed\DataImport\Business\Model\PostalCode\PostalCodeWriterStep;
use Pyz\Zed\DataImport\Business\Model\Product\ProductLocalizedAttributesExtractorStep;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\AddProductAbstractSkusStep;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductAbstractStore\ProductAbstractStoreWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductAttributeKey\AddProductAttributeKeysStep;
use Pyz\Zed\DataImport\Business\Model\ProductAttributeKey\ProductAttributeKeyWriter;
use Pyz\Zed\DataImport\Business\Model\ProductConcrete\ProductConcreteWriter;
use Pyz\Zed\DataImport\Business\Model\ProductLabel\Hook\ProductLabelAfterImportPublishHook;
use Pyz\Zed\DataImport\Business\Model\ProductLabel\ProductLabelWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductManagementAttribute\ProductManagementAttributeWriter;
use Pyz\Zed\DataImport\Business\Model\ProductManagementAttribute\ProductManagementLocalizedAttributesExtractorStep;
use Pyz\Zed\DataImport\Business\Model\ProductOption\ProductOptionWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductOptionPrice\ProductOptionPriceWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductPrice\ProductPriceWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductQuantity\ProductQuantityWriterStep;
use Pyz\Zed\DataImport\Business\Model\ProductSearchAttribute\Hook\ProductSearchAfterImportHook;
use Pyz\Zed\DataImport\Business\Model\ProductSearchAttribute\ProductSearchAttributeWriter;
use Pyz\Zed\DataImport\Business\Model\ProductSearchAttributeMap\ProductSearchAttributeMapWriter;
use Pyz\Zed\DataImport\Business\Model\ProductStock\Hook\UpdateAvailabilityAfterImport;
use Pyz\Zed\DataImport\Business\Model\ProductStock\Hook\UpdateAvailabilityAfterImportInterface;
use Pyz\Zed\DataImport\Business\Model\ProductStock\ProductStockWriterStep;
use Pyz\Zed\DataImport\Business\Model\Shipment\ShipmentWriterStep;
use Pyz\Zed\DataImport\Business\Model\ShipmentPrice\ShipmentPriceWriterStep;
use Pyz\Zed\DataImport\Business\Model\Stock\StockWriterStep;
use Pyz\Zed\DataImport\Business\Model\Store\StoreReader;
use Pyz\Zed\DataImport\Business\Model\Store\StoreWriterStep;
use Pyz\Zed\DataImport\Business\Model\Tax\TaxSetNameToIdTaxSetStep;
use Pyz\Zed\DataImport\Business\Model\Tax\TaxWriterStep;
use Pyz\Zed\DataImport\DataImportDependencyProvider;
use Pyz\Zed\MerchantRegion\Communication\Plugin\DataImport\MerchantRegionDataImportPlugin;
use Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface;
use Pyz\Zed\ProductUpdate\ProductUpdateDependencyProvider;
use Spryker\Service\UtilText\UtilTextServiceInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Shared\ProductSearch\Code\KeyBuilder\FilterGlossaryKeyBuilder;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\DataImport\Business\DataImportBusinessFactory as SprykerDataImportBusinessFactory;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassLength)
 */
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterCollectionInterface
     */
    public function getImporter()
    {
        /** @var \Spryker\Zed\DataImport\Business\Model\DataImporterPluginCollectionInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterCollectionInterface $dataImporterCollection */
        $dataImporterCollection = $this->createDataImporterCollection();
        $dataImporterCollection
            ->addDataImporter($this->createStoreImporter())
            ->addDataImporter($this->createCurrencyImporter())
            ->addDataImporter($this->createNavigationImporter())
            ->addDataImporter($this->createCategoryTemplateImporter())
            ->addDataImporter($this->createCustomerImporter())
            ->addDataImporter($this->createGlossaryImporter())
            ->addDataImporter($this->createTaxImporter())
            ->addDataImporter($this->createShipmentImporter())
            ->addDataImporter($this->createShipmentPriceImporter())
            ->addDataImporter($this->createStockImporter())
            ->addDataImporter($this->getMerchantRegionImporter())
            ->addDataImporter($this->getMerchantImporter())
            ->addDataImporter($this->createProductAttributeKeyImporter())
            ->addDataImporter($this->createProductManagementAttributeImporter())
            ->addDataImporter($this->createProductLabelImporter())
            ->addDataImporter($this->createProductSearchAttributeMapImporter())
            ->addDataImporter($this->createProductSearchAttributeImporter())
            ->addDataImporter($this->createCmsTemplateImporter())
            ->addDataImporter($this->createCmsBlockImporter())
            ->addDataImporter($this->createCmsBlockStoreImporter())
            ->addDataImporter($this->createProductOptionImporter())
            ->addDataImporter($this->createProductOptionPriceImporter())
            ->addDataImporter($this->getProductImporter())
            ->addDataImporter($this->getPriceImporter())
            ->addDataImporter($this->getProductStockWriterStep())
            ->addDataImporter($this->createPostalCodeImporter())
            ->addDataImporter($this->createPickingRouteImporter())
            ->addDataImporter($this->createPickingZoneImporter());

        $dataImporterCollection->addDataImporterPlugins($this->getDataImporterPlugins());

        $dataImporterCollection
            ->addDataImporter($this->createNavigationNodeImporter())
            ->addDataImporter($this->getMerchantDeliveryPostalCodeImporter())
            ->addDataImporter($this->getMerchantUserImporter());

        return $dataImporterCollection;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductPrice\ProductPriceWriterStep
     */
    public function createPriceProductWriterStep()
    {
        return new ProductPriceWriterStep(
            $this->createNumberFormatter(),
            $this->getMoneyFacade(),
            $this->getProductUpdateFacade(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function getProductImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductDataImporterConfiguration());
        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ProductAbstractWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createAttributesExtractorStep())
            ->addStep($this->createProductLocalizedAttributesExtractorStep([
                ProductConfig::KEY_ARTIKELNAME_SPRYKER,
                ProductConfig::KEY_DESCRIPTION,
            ]))
            ->addStep($this->createProductAbstractWriterStep())
            ->addStep($this->createProductAbstractStoreWriterStep())
            ->addStep($this->createProductCategoryWriterStep())
            ->addStep($this->createProductConcreteWriter())
            ->addStep($this->createProductQuantityWriterStep())
            ->addStep($this->createProductDepositOptionStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function getPriceImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductPriceDataImporterConfiguration());
        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ProductAbstractWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createPriceProductWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function getProductStockWriterStep()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductStockDataImporterConfiguration());
        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ProductAbstractWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createProductStockWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductStock\ProductStockWriterStep
     */
    protected function createProductStockWriterStep()
    {
        return new ProductStockWriterStep(
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductManagementAttributeImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductManagementAttributeImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createAddProductAttributeKeysStep())
            ->addStep($this->createProductManagementLocalizedAttributesExtractorStep())
            ->addStep(new ProductManagementAttributeWriter());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductManagementAttribute\ProductManagementLocalizedAttributesExtractorStep
     */
    protected function createProductManagementLocalizedAttributesExtractorStep()
    {
        return new ProductManagementLocalizedAttributesExtractorStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductAbstractStore\ProductAbstractStoreWriterStep
     */
    protected function createProductAbstractStoreWriterStep(): ProductAbstractStoreWriterStep
    {
        return new ProductAbstractStoreWriterStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductConcrete\ProductConcreteWriter
     */
    protected function createProductConcreteWriter(): ProductConcreteWriter
    {
        return new ProductConcreteWriter(
            $this->createProductRepository(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\BaseProduct\ProductCategoryWriterStep
     */
    protected function createProductCategoryWriterStep(): ProductCategoryWriterStep
    {
        return new ProductCategoryWriterStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductQuantity\ProductQuantityWriterStep
     */
    private function createProductQuantityWriterStep(): ProductQuantityWriterStep
    {
        return new ProductQuantityWriterStep();
    }

    /**
     * @return Model\BaseProduct\AttributesExtractorStep
     */
    protected function createAttributesExtractorStep()
    {
        return new BaseAttributesExtractorStep(
            $this->getConfig(),
            $this->createNumberFormatter()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    protected function createCurrencyImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCurrencyDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep(new CurrencyWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    protected function createStoreImporter()
    {
        /** @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface $dataImporter */
        $dataImporter = $this->createDataImporter(
            $this->getConfig()->getStoreDataImporterConfiguration()->getImportType(),
            new StoreReader(
                $this->createDataSet(
                    Store::getInstance()->getAllowedStores()
                )
            )
        );

        $dataSetStepBroker = $this->createDataSetStepBroker();
        $dataSetStepBroker->addStep(new StoreWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    protected function createGlossaryImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getGlossaryDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(GlossaryWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createLocaleNameToIdStep(GlossaryWriterStep::KEY_LOCALE))
            ->addStep(new GlossaryWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    protected function createCategoryTemplateImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCategoryTemplateDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep(new CategoryTemplateWriterStep());

        $dataImporter
            ->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createCustomerImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCustomerDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep(new CustomerWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createCmsTemplateImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCmsTemplateDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep(new CmsTemplateWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createCmsBlockImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCmsBlockDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(CmsBlockWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createLocalizedAttributesExtractorStep([
                CmsBlockWriterStep::KEY_PLACEHOLDER_TITLE,
                CmsBlockWriterStep::KEY_PLACEHOLDER_DESCRIPTION,
                CmsBlockWriterStep::KEY_PLACEHOLDER_CONTENT,
                CmsBlockWriterStep::KEY_PLACEHOLDER_LINK,
            ]))
            ->addStep(new CmsBlockWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createCmsBlockStoreImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getCmsBlockStoreDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(CmsBlockStoreWriterStep::BULK_SIZE);
        $dataSetStepBroker->addStep(new CmsBlockStoreWriterStep());
        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductOptionImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductOptionDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createTaxSetNameToIdTaxSetStep(ProductOptionWriterStep::KEY_TAX_SET_NAME))
            ->addStep($this->createLocalizedAttributesExtractorStep([
                ProductOptionWriterStep::KEY_GROUP_NAME,
                ProductOptionWriterStep::KEY_OPTION_NAME,
            ]))
            ->addStep(new ProductOptionWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductOptionPriceImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductOptionPriceDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep(new ProductOptionPriceWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\Availability\Business\AvailabilityFacadeInterface
     */
    public function getAvailabilityFacade()
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_AVAILABILITY);
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createStockImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getStockDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep(new StockWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createShipmentImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getShipmentDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ShipmentWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createTaxSetNameToIdTaxSetStep())
            ->addStep(new ShipmentWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createShipmentPriceImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getShipmentPriceDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ShipmentWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep(new ShipmentPriceWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createTaxImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getTaxDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(TaxWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep(new TaxWriterStep($this->createCountryRepository()));

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\Country\Repository\CountryRepositoryInterface
     */
    protected function createCountryRepository()
    {
        return new CountryRepository();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createNavigationImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getNavigationDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(NavigationWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep(new NavigationWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createNavigationNodeImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getNavigationNodeDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(NavigationNodeWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createNavigationKeyToIdNavigationStep(NavigationNodeWriterStep::KEY_NAVIGATION_KEY))
            ->addStep($this->createLocalizedAttributesExtractorStep([
                NavigationNodeWriterStep::KEY_TITLE,
                NavigationNodeWriterStep::KEY_URL,
                NavigationNodeWriterStep::KEY_CSS_CLASS,
            ]))
            ->addStep($this->createNavigationNodeValidityDatesStep(
                NavigationNodeWriterStep::KEY_VALID_FROM,
                NavigationNodeWriterStep::KEY_VALID_TO
            ))
            ->addStep(new NavigationNodeWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @param string $source
     * @param string $target
     *
     * @return \Pyz\Zed\DataImport\Business\Model\Navigation\NavigationKeyToIdNavigationStep
     */
    protected function createNavigationKeyToIdNavigationStep(
        $source = NavigationKeyToIdNavigationStep::KEY_SOURCE,
        $target = NavigationKeyToIdNavigationStep::KEY_TARGET
    ) {
        return new NavigationKeyToIdNavigationStep($source, $target);
    }

    /**
     * @param string $keyValidFrom
     * @param string $keyValidTo
     *
     * @return \Pyz\Zed\DataImport\Business\Model\NavigationNode\NavigationNodeValidityDatesStep
     */
    protected function createNavigationNodeValidityDatesStep($keyValidFrom, $keyValidTo)
    {
        return new NavigationNodeValidityDatesStep($keyValidFrom, $keyValidTo);
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository
     */
    protected function createProductRepository()
    {
        return new ProductRepository();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductAttributeKeyImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductAttributeKeyDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep(new ProductAttributeKeyWriter());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductLabelImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductLabelDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createAddProductAbstractSkusStep())
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createLocalizedAttributesExtractorStep(['name']))
            ->addStep(new ProductLabelWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);
        $dataImporter->addAfterImportHook($this->createProductLabelAfterImportPublishHook());

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductLabel\Hook\ProductLabelAfterImportPublishHook
     */
    protected function createProductLabelAfterImportPublishHook()
    {
        return new ProductLabelAfterImportPublishHook();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductSearchAttributeMapImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductSearchAttributeMapDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createAddProductAttributeKeysStep())
            ->addStep(new ProductSearchAttributeMapWriter());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createProductSearchAttributeImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getProductSearchAttributeDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createAddProductAttributeKeysStep())
            ->addStep($this->createLocalizedAttributesExtractorStep([ProductSearchAttributeWriter::KEY]))
            ->addStep(new ProductSearchAttributeWriter(
                $this->createSearchGlossaryKeyBuilder()
            ));

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);
        $dataImporter->addAfterImportHook($this->createProductSearchAfterImportHook());

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function getMerchantDeliveryPostalCodeImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getMerchantDeliveryPostalCodeImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep($this->createMerchantDeliveryPostalCodeWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function getMerchantUserImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getMerchantUserImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep($this->createMerchantReferenceToIdMerchantStep());
        $dataSetStepBroker->addStep($this->createGroupToIdGroupStep());
        $dataSetStepBroker->addStep($this->createLocaleNameToIdStep(MerchantUserWriterStep::KEY_LOCALE_NAME, MerchantUserWriterStep::KEY_FK_LOCALE));
        $dataSetStepBroker->addStep($this->createMerchantUserWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\MerchantUser\MerchantUserWriterStep
     */
    public function createMerchantUserWriterStep(): MerchantUserWriterStep
    {
        return new MerchantUserWriterStep($this->getUserFacade(), $this->getAclFacade());
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\MerchantUser\MerchantReferenceToIdMerchantStep
     */
    public function createMerchantReferenceToIdMerchantStep(): MerchantReferenceToIdMerchantStep
    {
        return new MerchantReferenceToIdMerchantStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\MerchantUser\GroupToIdGroupStep
     */
    public function createGroupToIdGroupStep(): GroupToIdGroupStep
    {
        return new GroupToIdGroupStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\MerchantDeliveryPostalCode\MerchantDeliveryPostalCodeWriterStep
     */
    protected function createMerchantDeliveryPostalCodeWriterStep()
    {
        return new MerchantDeliveryPostalCodeWriterStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductSearchAttribute\Hook\ProductSearchAfterImportHook
     */
    protected function createProductSearchAfterImportHook()
    {
        return new ProductSearchAfterImportHook();
    }

    /**
     * @return \Spryker\Shared\ProductSearch\Code\KeyBuilder\FilterGlossaryKeyBuilder
     */
    protected function createSearchGlossaryKeyBuilder()
    {
        return new FilterGlossaryKeyBuilder();
    }

    /**
     * @param array $defaultAttributes
     *
     * @return \Pyz\Zed\DataImport\Business\Model\Product\ProductLocalizedAttributesExtractorStep
     */
    protected function createProductLocalizedAttributesExtractorStep(array $defaultAttributes = [])
    {
        return new ProductLocalizedAttributesExtractorStep($defaultAttributes);
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductAbstract\AddProductAbstractSkusStep
     */
    protected function createAddProductAbstractSkusStep()
    {
        return new AddProductAbstractSkusStep();
    }

    /**
     * @param string $source
     * @param string $target
     *
     * @return \Pyz\Zed\DataImport\Business\Model\Locale\LocaleNameToIdLocaleStep
     */
    protected function createLocaleNameToIdStep(
        $source = LocaleNameToIdLocaleStep::KEY_SOURCE,
        $target = LocaleNameToIdLocaleStep::KEY_TARGET
    ) {
        return new LocaleNameToIdLocaleStep($source, $target);
    }

    /**
     * @param string $source
     * @param string $target
     *
     * @return \Pyz\Zed\DataImport\Business\Model\Tax\TaxSetNameToIdTaxSetStep
     */
    protected function createTaxSetNameToIdTaxSetStep(
        $source = TaxSetNameToIdTaxSetStep::KEY_SOURCE,
        $target = TaxSetNameToIdTaxSetStep::KEY_TARGET
    ) {
        return new TaxSetNameToIdTaxSetStep($source, $target);
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductAttributeKey\AddProductAttributeKeysStep
     */
    protected function createAddProductAttributeKeysStep()
    {
        return new AddProductAttributeKeysStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductStock\Hook\UpdateAvailabilityAfterImportInterface
     */
    public function createUpdateAvailabilityAfterImport(): UpdateAvailabilityAfterImportInterface
    {
        return new UpdateAvailabilityAfterImport($this->getAvailabilityFacade());
    }

    /**
     * @return \Spryker\Zed\Event\Business\EventFacadeInterface
     */
    protected function getEventFacade()
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_EVENT);
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    protected function createAddLocalesStep(): DataImportStepInterface
    {
        return new AddLocalesStep($this->getStore());
    }

    /**
     * @return \NumberFormatter
     */
    protected function createNumberFormatter(): NumberFormatter
    {
        return new NumberFormatter(
            $this->getStore()->getCurrentLocale(),
            NumberFormatter::DECIMAL
        );
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\BaseProduct\ProductDepositOptionStep
     */
    private function createProductDepositOptionStep(): ProductDepositOptionStep
    {
        return new ProductDepositOptionStep();
    }

    /**
     * @return \Spryker\Service\UtilText\UtilTextServiceInterface
     */
    private function getUtilTextService(): UtilTextServiceInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::SERVICE_UTIL_TEXT);
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getStore(): Store
    {
        return $this->getProvidedDependency(ProductUpdateDependencyProvider::STORE);
    }

    /**
     * @return \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    public function getMoneyFacade(): MoneyFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_MONEY);
    }

    /**
     * @return \Spryker\Zed\User\Business\UserFacadeInterface
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface
     */
    public function getProductUpdateFacade(): ProductUpdateFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_PRODUCT_UPDATE);
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep
     */
    protected function createProductAbstractWriterStep(): ProductAbstractWriterStep
    {
        return new ProductAbstractWriterStep(
            $this->createProductRepository(),
            $this->getUtilTextService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createPostalCodeImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getPostalCodeDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(PostalCodeWriterStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep(new PostalCodeWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createPickingRouteImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getPickingRouteDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep($this->createPickingRouteWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    protected function createPickingZoneImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getPickingZoneDataImporterConfiguration());

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep($this->createPickingZoneWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\PickingRoute\PickingRouteWriterStep
     */
    protected function createPickingRouteWriterStep(): PickingRouteWriterStep
    {
        return new PickingRouteWriterStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\PickingZone\PickingZoneWriterStep
     */
    protected function createPickingZoneWriterStep(): PickingZoneWriterStep
    {
        return new PickingZoneWriterStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface
     */
    private function getMerchantImporter(): DataImportPluginInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::PLUGIN_MERCHANT_IMPORTER);
    }

    /**
     * @return \Pyz\Zed\MerchantRegion\Communication\Plugin\DataImport\MerchantRegionDataImportPlugin
     */
    private function getMerchantRegionImporter(): MerchantRegionDataImportPlugin
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::PLUGIN_MERCHANT_REGION_IMPORTER);
    }
}
