<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart;

use Pyz\Zed\PriceCartConnector\Communication\Plugin\FilterAvailableCartItemsPerStorePlugin;
use Pyz\Zed\ProductUrlCartConnector\Communication\Plugin\ProductUrlCartExpanderPlugin;
use Pyz\Zed\SalesOrderThreshold\Communication\Plugin\Cart\HardMaxThresholdReachedQuoteExpanderPlugin;
use Pyz\Zed\SalesOrderThreshold\Communication\Plugin\Cart\HardThresholdReachedQuoteExpanderPlugin;
use Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\CheckAvailabilityPlugin;
use Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityBridge;
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Cart\Communication\Plugin\CleanUpItemsPreReloadPlugin;
use Spryker\Zed\Cart\Communication\Plugin\SkuGroupKeyPlugin;
use Spryker\Zed\Discount\Communication\Plugin\Cart\DiscountQuoteChangeObserverPlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Cart\CartGroupPromotionItems;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Merchant\Communication\Plugin\Cart\MerchantCartPreCheckPlugin;
use Spryker\Zed\PaymentCartConnector\Communication\Plugin\Cart\RemovePaymentCartPostSavePlugin;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePlugin;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePreCheckPlugin;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\FilterItemsWithoutPricePlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\ProductCartPlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\ProductExistsCartPreCheckPlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\RemoveInactiveItemsPreReloadPlugin;
use Spryker\Zed\ProductDiscontinued\Communication\Plugin\Cart\ProductDiscontinuedCartPreCheckPlugin;
use Spryker\Zed\ProductImageCartConnector\Communication\Plugin\ProductImageCartPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\ProductMeasurementSalesUnitCartPreCheckPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\QuantitySalesUnitGroupKeyItemExpanderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\QuantitySalesUnitItemExpanderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\QuantitySalesUnitValuePostSavePlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\Cart\CartItemOptionPreCheckPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\CartItemGroupKeyOptionPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\CartItemProductOptionPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\ChangeProductOptionQuantityPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\ProductOptionValuePriceExistsCartPreCheckPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountAvailabilityCartPreCheckPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountGroupKeyItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountRestrictionCartPreCheckPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountSalesUnitItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountSalesUnitValuePostSavePlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\CustomAmountPriceItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitCartAddItemStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitCartPreCheckPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitCartRemoveItemStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitItemExpanderPlugin;
use Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\CartChangeTransferQuantityNormalizerPlugin;
use Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\ProductQuantityRestrictionCartPreCheckPlugin;
use Spryker\Zed\ProductQuantity\Communication\Plugin\CartExtension\ProductQuantityRestrictionCartRemovalPreCheckPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart\AddThresholdMessagesCartPostReloadItemsPlugin;
use Spryker\Zed\SalesQuantity\Communication\Plugin\Cart\IsQuantitySplittableItemExpanderPlugin;
use Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart\CartShipmentExpanderPlugin;
use Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart\CartShipmentPreCheckPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    public const FACADE_AVAILABILITY = 'FACADE_AVAILABILITY';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addAvailabilityFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new CartItemPricePlugin(),
            new ProductCartPlugin(),
            new IsQuantitySplittableItemExpanderPlugin(),
            new CartItemProductOptionPlugin(),
            new ProductUrlCartExpanderPlugin(),
            new SkuGroupKeyPlugin(),
            new CartItemGroupKeyOptionPlugin(),
            new ProductImageCartPlugin(),
            new CartGroupPromotionItems(),
            new CartShipmentExpanderPlugin(),
            new QuantitySalesUnitItemExpanderPlugin(),
            new QuantitySalesUnitGroupKeyItemExpanderPlugin(),
            new ProductPackagingUnitItemExpanderPlugin(),
            new AmountGroupKeyItemExpanderPlugin(),
            new AmountSalesUnitItemExpanderPlugin(),
            new CustomAmountPriceItemExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        /** @var \Spryker\Zed\Cart\Dependency\CartPreCheckPluginInterface[] $cartPreCheckPlugins */
        $cartPreCheckPlugins = [
            new ProductExistsCartPreCheckPlugin(),
            new CartItemPricePreCheckPlugin(),
            new CartItemOptionPreCheckPlugin(),
            new ProductOptionValuePriceExistsCartPreCheckPlugin(),
            new CartShipmentPreCheckPlugin(),
            new ProductQuantityRestrictionCartPreCheckPlugin(),
            new ProductDiscontinuedCartPreCheckPlugin(),
            new CheckAvailabilityPlugin(),
            new ProductMeasurementSalesUnitCartPreCheckPlugin(),
            new AmountAvailabilityCartPreCheckPlugin(),
            new AmountRestrictionCartPreCheckPlugin(),
            new ProductPackagingUnitCartPreCheckPlugin(),
            new MerchantCartPreCheckPlugin(),
        ];

        return $cartPreCheckPlugins;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\PostSavePluginInterface[]
     */
    protected function getPostSavePlugins(Container $container): array
    {
        return [
            new ChangeProductOptionQuantityPlugin(),
            new RemovePaymentCartPostSavePlugin(),
            new QuantitySalesUnitValuePostSavePlugin(),
            new AmountSalesUnitValuePostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\PreReloadItemsPluginInterface[]
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        /** @var \Spryker\Zed\Cart\Dependency\PreReloadItemsPluginInterface[] $preReloadPlugins */
        $preReloadPlugins = [
            new RemoveInactiveItemsPreReloadPlugin(),
            new CleanUpItemsPreReloadPlugin(),
            new FilterItemsWithoutPricePlugin(),
            new FilterAvailableCartItemsPerStorePlugin(),
        ];

        return $preReloadPlugins;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\PostReloadItemsPluginInterface[]
     */
    protected function getPostReloadItemsPlugins(Container $container): array
    {
        return [
            new HardThresholdReachedQuoteExpanderPlugin(),
            new HardMaxThresholdReachedQuoteExpanderPlugin(),
            new AddThresholdMessagesCartPostReloadItemsPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartRemovalPreCheckPluginInterface[]
     */
    protected function getCartRemovalPreCheckPlugins(Container $container): array
    {
        return [
            new ProductQuantityRestrictionCartRemovalPreCheckPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\QuoteChangeObserverPluginInterface[]
     */
    protected function getQuoteChangeObserverPlugins(Container $container): array
    {
        return [
            new DiscountQuoteChangeObserverPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface[]
     */
    protected function getCartAddItemStrategyPlugins(Container $container): array
    {
        return [
            new ProductPackagingUnitCartAddItemStrategyPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationStrategyPluginInterface[]
     */
    protected function getCartRemoveItemStrategyPlugins(Container $container): array
    {
        return [
            new ProductPackagingUnitCartRemoveItemStrategyPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartChangeTransferNormalizerPluginInterface[]
     */
    protected function getCartBeforePreCheckNormalizerPlugins(Container $container): array
    {
        return [
            new CartChangeTransferQuantityNormalizerPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addAvailabilityFacade(Container $container): Container
    {
        $container->set(static::FACADE_AVAILABILITY, function (Container $container) {
            return new AvailabilityCartConnectorToAvailabilityBridge($container->getLocator()->availability()->facade());
        });

        return $container;
    }
}
