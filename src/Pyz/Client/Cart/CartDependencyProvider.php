<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Cart;

use Pyz\Client\Cart\Plugin\ItemQtyCountPlugin;
use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\Cart\Dependency\Plugin\ItemCountPluginInterface;
use Spryker\Client\DiscountPromotion\Plugin\AddDiscountPromotionCartRequestExpandPlugin;
use Spryker\Client\PersistentCart\Plugin\DatabaseQuoteStorageStrategy;
use Spryker\Client\ProductMeasurementUnit\Plugin\Cart\SingleItemQuantitySalesUnitCartChangeRequestExpanderPlugin;
use Spryker\Client\ProductPackagingUnit\Plugin\CartExtension\ProductPackagingUnitAmountCartChangeRequestExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Client\CartExtension\Dependency\Plugin\QuoteStorageStrategyPluginInterface[]
     */
    protected function getQuoteStorageStrategyPlugins(): array
    {
        $quoteStorageStrategyPlugins = parent::getQuoteStorageStrategyPlugins();
        $quoteStorageStrategyPlugins[] = new DatabaseQuoteStorageStrategy(); #PersistentCartFeature

        return $quoteStorageStrategyPlugins;
    }

    /**
     * @return \Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface[]
     */
    protected function getAddItemsRequestExpanderPlugins(): array
    {
        return [
            new AddDiscountPromotionCartRequestExpandPlugin(),
            new SingleItemQuantitySalesUnitCartChangeRequestExpanderPlugin(),
            new ProductPackagingUnitAmountCartChangeRequestExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Cart\Dependency\Plugin\ItemCountPluginInterface
     */
    protected function getItemCountPlugin(): ItemCountPluginInterface
    {
        return new ItemQtyCountPlugin();
    }
}
