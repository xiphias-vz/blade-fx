<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\TimeSlot\TimeSlotServiceInterface;
use Pyz\Zed\AlternativeEan\Communication\Plugin\OrderItemAlternativeEanExpanderPreSavePlugin;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\Merchant\Communication\Plugin\MerchantOrderExpanderPreSavePlugin;
use Pyz\Zed\MerchantRegion\Communication\Plugin\Sales\MerchantRegionOrderExpanderPlugin;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Communication\Plugin\Sales\MerchantSalesOrderExpanderPlugin;
use Pyz\Zed\MerchantSalesOrder\Communication\Plugin\Sales\MerchantSalesOrderPostSavePlugin;
use Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Pyz\Zed\Sales\Communication\Plugin\MinimumAgeOrderExpanderPlugin;
use Pyz\Zed\Sales\Communication\Plugin\OrderItemAttributesExpanderPreSavePlugin;
use Pyz\Zed\Sales\Communication\Plugin\OrderItemPickZoneExpanderPreSavePlugin;
use Pyz\Zed\Sales\Communication\Plugin\OrderItemStockProductExpanderPreSavePlugin;
use Pyz\Zed\Sales\Communication\Plugin\OrderStatusHydratorOrderPlugin;
use Pyz\Zed\Sales\Communication\Plugin\ProductNumberOrderItemExpanderPreSavePlugin;
use Pyz\Zed\Sales\Dependency\Facade\SalesToOmsBridge;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Pyz\Zed\TimeSlot\Communication\Plugin\TimeSlotStorageWriterPostSavePlugin;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Customer\Communication\Plugin\Sales\CustomerOrderHydratePlugin;
use Spryker\Zed\Discount\Communication\Plugin\Sales\DiscountOrderHydratePlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Communication\Plugin\Sales\IsCancellableOrderExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\IsCancellableSearchOrderExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\ItemStateOrderItemExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\OrderAggregatedItemStateSearchOrderExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\StateHistoryOrderItemExpanderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Sales\QuantitySalesUnitOrderItemExpanderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\SalesExtension\QuantitySalesUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionGroupIdHydratorPlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionsOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout\PackagingUnitSplittableItemTransformerStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountLeadProductOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Sales\AmountSalesUnitOrderItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension\AmountSalesUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\SalesExtension\ProductPackagingUnitOrderItemExpanderPreSavePlugin;
use Spryker\Zed\Sales\Communication\Plugin\Sales\CurrencyIsoCodeOrderItemExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesPayment\Communication\Plugin\Sales\SalesPaymentOrderExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ItemMetadataHydratorPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ProductIdHydratorPlugin;
use Spryker\Zed\SalesQuantity\Communication\Plugin\SalesExtension\IsQuantitySplittableOrderItemExpanderPreSavePlugin;
use Spryker\Zed\SalesQuantity\Communication\Plugin\SalesExtension\NonSplittableItemTransformerStrategyPlugin;
use Spryker\Zed\Shipment\Business\ShipmentFacadeInterface;
use Spryker\Zed\Shipment\Communication\Plugin\ShipmentOrderHydratePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    public const BLADE_FX_FACADE = 'BLADE_FX_FACADE';
    public const FACADE_SHIPMENT = 'FACADE_SHIPMENT';
    public const BASE_FACADE_OMS = 'BASE_FACADE_OMS';
    public const FACADE_PICKING_ZONE = 'FACADE_PICKING_ZONE';
    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';
    public const FACADE_PRODUCT = 'FACADE_PRODUCT';
    public const FACADE_ACL = 'FACADE_ACL';
    public const FACADE_MERCHANT = 'FACADE_MERCHANT';
    public const FACADE_TIME_SLOTS_ORDER_OVERVIEW = 'FACADE_TIME_SLOTS';
    public const SERVICE_TIME_SLOTS = 'SERVICE_TIME_SLOTS';
    public const CLIENT_STORAGE = 'CLIENT_STORAGE';
    public const MERCHANT_STORAGE_FACADE = 'MERCHANT_STORAGE_FACADE';

    public const PLUGINS_OMS_ORDER_MAIL_EXPANDER = 'PLUGINS_OMS_ORDER_MAIL_EXPANDER';
    public const FACADE_MAIL = 'FACADE_MAIL';
    public const FACADE_SALES = 'FACADE_SALES';
    public const OMS_FACTORY = 'OMS_FACTORY';
    public const NEW_FACADE_OMS = 'NEW_FACADE_OMS';

    public const FACADE_MERCHANT_SALES_ORDER = 'FACADE_MERCHANT_SALES_ORDER';
    public const HYDRATE_ORDER_PLUGINS_FOR_STORE_APP = 'HYDRATE_ORDER_PLUGINS_FOR_STORE_APP';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container = $this->addShipmentFacade($container);
        $container = $this->addBaseOmsFacade($container);
        $container = $this->addDateTimeWithZoneService($container);
        $container = $this->addProductFacade($container);
        $container = $this->addHydrateOrderForStoreAppPlugins($container);
        $container = $this->addAclFacade($container);
        $container = $this->addStorageClient($container);
        $container = $this->addOmsFacade($container);
        $container = $this->addNewOmsFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);

        $container = $this->addDateTimeWithZoneService($container);
        $container = $this->addMerchantSalesOrderFacade($container);
        $container = $this->addMerchantStorageFacade($container);
        $container = $this->addBaseOmsFacade($container);
        $container = $this->addAclFacade($container);
        $container = $this->addPickingZoneFacade($container);
        $container = $this->addTimeSlotFacade($container);
        $container = $this->addTimeSlotService($container);
        $container = $this->addMerchantFacade($container);

        return $this->addBladeFxFacade($container);
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addBladeFxFacade(Container $container): Container
    {
        $container->set(static::BLADE_FX_FACADE, function (Container $container) {
            return $container->getLocator()->bladeFx()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addPickingZoneFacade(Container $container): Container
    {
        $container->set(static::FACADE_PICKING_ZONE, function (Container $container) {
            return $container->getLocator()->pickingZone()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotFacade(Container $container): Container
    {
        $container->set(static::FACADE_TIME_SLOTS_ORDER_OVERVIEW, function (Container $container): TimeSlotFacadeInterface {
            return $container->getLocator()->timeSlot()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotService(Container $container): Container
    {
        $container->set(static::SERVICE_TIME_SLOTS, function (Container $container): TimeSlotServiceInterface {
            return $container->getLocator()->timeSlot()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addBaseOmsFacade(Container $container): Container
    {
        $container->set(static::BASE_FACADE_OMS, function (Container $container) {
            return $container->getLocator()->oms()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductFacade(Container $container): Container
    {
        $container->set(static::FACADE_PRODUCT, function (Container $container): ProductFacadeInterface {
            return $container->getLocator()->product()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addAclFacade(Container $container): Container
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
    protected function addMerchantFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT, function (Container $container): MerchantFacadeInterface {
            return $container->getLocator()->merchant()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMerchantSalesOrderFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT_SALES_ORDER, function (Container $container): MerchantSalesOrderFacadeInterface {
            return $container->getLocator()->merchantSalesOrder()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addShipmentFacade(Container $container): Container
    {
        $container->set(static::FACADE_SHIPMENT, function (Container $container): ShipmentFacadeInterface {
            return $container->getLocator()->shipment()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDateTimeWithZoneService(Container $container): Container
    {
        $container->set(self::SERVICE_DATE_TIME_WITH_ZONE, function (Container $container): DateTimeWithZoneServiceInterface {
            return $container->getLocator()->dateTimeWithZone()->service();
        });

        return $container;
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new ProductIdHydratorPlugin(),
            new DiscountOrderHydratePlugin(),
            new ShipmentOrderHydratePlugin(),
            new SalesPaymentOrderExpanderPlugin(),
            new CustomerOrderHydratePlugin(),
            new ItemMetadataHydratorPlugin(),
            new ProductOptionGroupIdHydratorPlugin(),
            new OrderStatusHydratorOrderPlugin(),
            new MerchantRegionOrderExpanderPlugin(),
            new IsCancellableOrderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface[]
     */
    protected function getOrderItemExpanderPreSavePlugins(): array
    {
        return [
            new ProductNumberOrderItemExpanderPreSavePlugin(),
            new QuantitySalesUnitOrderItemExpanderPreSavePlugin(),
            new ProductPackagingUnitOrderItemExpanderPreSavePlugin(),
            new AmountSalesUnitOrderItemExpanderPreSavePlugin(),
            new IsQuantitySplittableOrderItemExpanderPreSavePlugin(),
            new OrderItemPickZoneExpanderPreSavePlugin(),
            new OrderItemAttributesExpanderPreSavePlugin(),
            new OrderItemStockProductExpanderPreSavePlugin(),
            new OrderItemAlternativeEanExpanderPreSavePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\ItemTransformerStrategyPluginInterface[]
     */
    public function getItemTransformerStrategyPlugins(): array
    {
        return [
            new PackagingUnitSplittableItemTransformerStrategyPlugin(), #ProductPackagingUnit
            new NonSplittableItemTransformerStrategyPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SalesTablePluginInterface[]
     */
    protected function getSalesTablePlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\UniqueOrderItemsExpanderPluginInterface[]
     */
    protected function getUniqueOrderItemsExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Plugin\OrderExpanderPreSavePluginInterface[]
     */
    protected function getOrderExpanderPreSavePlugins(): array
    {
        return [
            new MerchantOrderExpanderPreSavePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface[]
     */
    protected function getOrderPostSavePlugins(): array
    {
        return [
            new TimeSlotStorageWriterPostSavePlugin(),
            new MerchantSalesOrderPostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addHydrateOrderForStoreAppPlugins(Container $container): Container
    {
        $container[static::HYDRATE_ORDER_PLUGINS_FOR_STORE_APP] = function (Container $container) {
            return $this->getOrderHydrationForStoreAppPlugins();
        };

        return $container;
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    protected function getOrderHydrationForStoreAppPlugins(): array
    {
        return [
            new ProductIdHydratorPlugin(),
            new DiscountOrderHydratePlugin(),
            new ShipmentOrderHydratePlugin(),
            new SalesPaymentOrderExpanderPlugin(),
            new CustomerOrderHydratePlugin(),
            new ItemMetadataHydratorPlugin(),
            new ProductOptionGroupIdHydratorPlugin(),
            new OrderStatusHydratorOrderPlugin(),
            new MinimumAgeOrderExpanderPlugin(),
            new MerchantRegionOrderExpanderPlugin(),
            new MerchantSalesOrderExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_STORAGE, function (Container $container) {
            return $container->getLocator()->storage()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addNewOmsFacade(Container $container): Container
    {
        $container->set(static::NEW_FACADE_OMS, function (Container $container) {
            return new SalesToOmsBridge($container->getLocator()->oms()->facade());
        });

        return $container;
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new CurrencyIsoCodeOrderItemExpanderPlugin(),
            new StateHistoryOrderItemExpanderPlugin(),
            new ItemStateOrderItemExpanderPlugin(),
            new AmountLeadProductOrderItemExpanderPlugin(),
            new AmountSalesUnitOrderItemExpanderPlugin(),
            new ProductOptionsOrderItemExpanderPlugin(),
            new QuantitySalesUnitOrderItemExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface[]
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new OrderAggregatedItemStateSearchOrderExpanderPlugin(),
            new IsCancellableSearchOrderExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMerchantStorageFacade(Container $container): Container
    {
        $container->set(static::MERCHANT_STORAGE_FACADE, function (Container $container): MerchantStorageFacadeInterface {
            return $container->getLocator()->merchantStorage()->facade();
        });

        return $container;
    }
}
