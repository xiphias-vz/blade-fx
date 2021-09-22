<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport;

use Pyz\Zed\DataImport\Communication\Plugin\ProductStock\Hook\UpdateAvailabilityAfterImportPlugin;
use Pyz\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportAfterImportHookPlugin;
use Pyz\Zed\MerchantRegion\Communication\Plugin\DataImport\MerchantRegionDataImportPlugin;
use Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface;
use Pyz\Zed\ShipmentDataImport\Communication\Plugin\ShipmentDataImportAfterImportHookPlugin;
use Spryker\Service\FileSystem\FileSystemServiceInterface;
use Spryker\Service\UtilText\UtilTextServiceInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\CategoryDataImport\Communication\Plugin\CategoryDataImportPlugin;
use Spryker\Zed\CmsPageDataImport\Communication\Plugin\CmsPageDataImportPlugin;
use Spryker\Zed\CmsPageDataImport\Communication\Plugin\CmsPageStoreDataImportPlugin;
use Spryker\Zed\CmsSlotBlockDataImport\Communication\Plugin\CmsSlotBlockDataImportPlugin;
use Spryker\Zed\CmsSlotDataImport\Communication\Plugin\CmsSlotDataImportPlugin;
use Spryker\Zed\CmsSlotDataImport\Communication\Plugin\CmsSlotTemplateDataImportPlugin;
use Spryker\Zed\ContentBannerDataImport\Communication\Plugin\ContentBannerDataImportPlugin;
use Spryker\Zed\ContentNavigationDataImport\Communication\Plugin\DataImport\ContentNavigationDataImportPlugin;
use Spryker\Zed\DataImport\Communication\Plugin\DataImportEventBehaviorPlugin;
use Spryker\Zed\DataImport\Communication\Plugin\DataImportPublisherPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\FileManagerDataImport\Communication\Plugin\FileManagerDataImportPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\PaymentDataImport\Communication\Plugin\PaymentMethodDataImportPlugin;
use Spryker\Zed\PaymentDataImport\Communication\Plugin\PaymentMethodStoreDataImportPlugin;
use Spryker\Zed\PriceProductDataImport\Communication\Plugin\PriceProductDataImportPlugin;
use Spryker\Zed\PriceProductScheduleDataImport\Communication\Plugin\PriceProductScheduleDataImportPlugin;
use Spryker\Zed\ProductLabelDataImport\Communication\Plugin\ProductLabelDataImportPlugin;
use Spryker\Zed\ProductLabelDataImport\Communication\Plugin\ProductLabelStoreDataImportPlugin;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementBaseUnitDataImportPlugin;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementSalesUnitDataImportPlugin;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementSalesUnitStoreDataImportPlugin;
use Spryker\Zed\ProductMeasurementUnitDataImport\Communication\Plugin\ProductMeasurementUnitDataImportPlugin;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitDataImportPlugin;
use Spryker\Zed\ProductPackagingUnitDataImport\Communication\Plugin\DataImport\ProductPackagingUnitTypeDataImportPlugin;
use Spryker\Zed\SalesOrderThresholdDataImport\Communication\Plugin\DataImport\SalesOrderThresholdDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentMethodPriceDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentMethodStoreDataImportPlugin;
use Spryker\Zed\StockDataImport\Communication\Plugin\StockDataImportPlugin;
use Spryker\Zed\StockDataImport\Communication\Plugin\StockStoreDataImportPlugin;
use Spryker\Zed\User\Business\UserFacadeInterface;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    public const FACADE_AVAILABILITY = 'availability facade';
    public const FACADE_CATEGORY = 'category facade';
    public const FACADE_PRODUCT_RELATION = 'product relation facade';
    public const FACADE_PRODUCT_SEARCH = 'product search facade';
    public const SERVICE_UTIL_TEXT = 'util text service';
    public const SERVICE_FLY_SYSTEM_SERVICE = 'SERVICE_FLY_SYSTEM_SERVICE';
    public const STORE = 'STORE';
    public const FACADE_MONEY = 'FACADE_MONEY';
    public const FACADE_USER = 'FACADE_USER';
    public const FACADE_ACL = 'FACADE_ACL';
    public const PLUGIN_MERCHANT_IMPORTER = 'PLUGIN_MERCHANT_IMPORTER';
    public const PLUGIN_MERCHANT_REGION_IMPORTER = 'PLUGIN_MERCHANT_REGION_IMPORTER';
    public const FACADE_PRODUCT_UPDATE = 'FACADE_PRODUCT_UPDATE';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container = $this->addAvailabilityFacade($container);
        $container = $this->addCategoryFacade($container);
        $container = $this->addProductRelationFacade($container);
        $container = $this->addProductSearchFacade($container);
        $container = $this->addServiceUtilText($container);
        $container = $this->addStore($container);
        $container = $this->addMoneyFacade($container);
        $container = $this->addMerchantImporter($container);
        $container = $this->addMerchantRegionImporter($container);
        $container = $this->addUserFacade($container);
        $container = $this->addAclFacade($container);
        $container = $this->addProductUpdateFacade($container);
        $container = $this->addFlySystemService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addAvailabilityFacade(Container $container)
    {
        $container[static::FACADE_AVAILABILITY] = function (Container $container) {
            return $container->getLocator()->availability()->facade();
        };

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addCategoryFacade(Container $container)
    {
        $container[static::FACADE_CATEGORY] = function (Container $container) {
            return $container->getLocator()->category()->facade();
        };

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductSearchFacade(Container $container)
    {
        $container[static::FACADE_PRODUCT_SEARCH] = function (Container $container) {
            return $container->getLocator()->productSearch()->facade();
        };

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductRelationFacade(Container $container)
    {
        $container[static::FACADE_PRODUCT_RELATION] = function (Container $container) {
            return $container->getLocator()->productRelation()->facade();
        };

        return $container;
    }

    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            [new CategoryDataImportPlugin(), DataImportConfig::IMPORT_TYPE_CATEGORY_TEMPLATE],
            new ContentBannerDataImportPlugin(),
            new CmsPageDataImportPlugin(),
            new CmsPageStoreDataImportPlugin(),
            new SalesOrderThresholdDataImportPlugin(),
            new FileManagerDataImportPlugin(),
            new ShipmentMethodStoreDataImportPlugin(),
            new CmsSlotTemplateDataImportPlugin(),
            new CmsSlotDataImportPlugin(),
            new CmsSlotBlockDataImportPlugin(),

            new ProductMeasurementUnitDataImportPlugin(),
            new ProductMeasurementBaseUnitDataImportPlugin(),
            new ProductMeasurementSalesUnitDataImportPlugin(),
            new ProductMeasurementSalesUnitStoreDataImportPlugin(),

            new ProductPackagingUnitTypeDataImportPlugin(),
            new ProductPackagingUnitDataImportPlugin(),
            new ContentNavigationDataImportPlugin(),

            new ProductLabelDataImportPlugin(),
            new ProductLabelStoreDataImportPlugin(),

            new StockDataImportPlugin(),
            new StockStoreDataImportPlugin(),

            /*new PriceProductDataImportPlugin(),*/

            new PaymentMethodDataImportPlugin(),
            new PaymentMethodStoreDataImportPlugin(),

            new ShipmentDataImportPlugin(),
            new ShipmentMethodPriceDataImportPlugin(),
            new ShipmentMethodStoreDataImportPlugin(),

            //new PriceProductScheduleDataImportPlugin(),
        ];
    }

    /**
     * @return array
     */
    protected function getDataImportBeforeImportHookPlugins(): array
    {
        return [
            new DataImportEventBehaviorPlugin(),
        ];
    }

    /**
     * @return array
     */
    protected function getDataImportAfterImportHookPlugins(): array
    {
        return [
            new DataImportEventBehaviorPlugin(),
            new DataImportPublisherPlugin(),
            new MerchantDataImportAfterImportHookPlugin(),
            new ShipmentDataImportAfterImportHookPlugin(),
            new UpdateAvailabilityAfterImportPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addServiceUtilText(Container $container): Container
    {
        $container->set(self::SERVICE_UTIL_TEXT, function (Container $container): UtilTextServiceInterface {
            return $container->getLocator()->utilText()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addStore(Container $container): Container
    {
        $container->set(static::STORE, function () {
            return Store::getInstance();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMoneyFacade(Container $container): Container
    {
        $container->set(static::FACADE_MONEY, function (Container $container): MoneyFacadeInterface {
            return $container->getLocator()->money()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addUserFacade(Container $container): Container
    {
        $container->set(static::FACADE_USER, function (Container $container): UserFacadeInterface {
            return $container->getLocator()->user()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addAclFacade(Container $container): Container
    {
        $container->set(static::FACADE_ACL, function (Container $container): AclFacadeInterface {
            return $container->getLocator()->acl()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addProductUpdateFacade(Container $container): Container
    {
        $container->set(static::FACADE_PRODUCT_UPDATE, function (Container $container): ProductUpdateFacadeInterface {
            return $container->getLocator()->productUpdate()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addFlySystemService(Container $container): Container
    {
        $container->set(static::SERVICE_FLY_SYSTEM_SERVICE, function (Container $container): FileSystemServiceInterface {
            return $container->getLocator()->fileSystem()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMerchantImporter(Container $container): Container
    {
        $container->set(static::PLUGIN_MERCHANT_IMPORTER, function (): DataImportPluginInterface {
            return new MerchantDataImportPlugin();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMerchantRegionImporter(Container $container): Container
    {
        $container->set(static::PLUGIN_MERCHANT_REGION_IMPORTER, function (): DataImportPluginInterface {
            return new MerchantRegionDataImportPlugin();
        });

        return $container;
    }
}
