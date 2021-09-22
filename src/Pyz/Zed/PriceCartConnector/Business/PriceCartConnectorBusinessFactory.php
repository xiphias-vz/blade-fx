<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceCartConnector\Business;

use Pyz\Zed\PriceCartConnector\Business\Filter\AvailableItemsForStoreFilter;
use Pyz\Zed\PriceCartConnector\PriceCartConnectorDependencyProvider;
use Spryker\Zed\PriceCartConnector\Business\PriceCartConnectorBusinessFactory as SpyPriceCartConnectorBusinessFactory;

class PriceCartConnectorBusinessFactory extends SpyPriceCartConnectorBusinessFactory
{
    public const FACADE_AVAILABILITY = 'FACADE_AVAILABILITY';

    /**
     * @return \Spryker\Zed\PriceCartConnector\Business\Filter\ItemFilterInterface
     */
    public function createItemsAvailableForStore()
    {
        return new AvailableItemsForStoreFilter(
            $this->getAvailabilityFacade(),
            $this->getCartItemQuantityCounterStrategyPlugins(),
            $this->addCartMessengerFacade()
        );
    }

    /**
     * @return mixed
     */
    public function getAvailabilityFacade()
    {
        return $this->getProvidedDependency(PriceCartConnectorDependencyProvider::FACADE_AVAILABILITY);
    }

    /**
     * @return mixed
     */
    public function addCartMessengerFacade()
    {
        return $this->getProvidedDependency(PriceCartConnectorDependencyProvider::FACADE_CART_MESSENGER);
    }

    /**
     * @return \Spryker\Zed\AvailabilityCartConnectorExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface[]
     */
    public function getCartItemQuantityCounterStrategyPlugins(): array
    {
        return $this->getProvidedDependency(PriceCartConnectorDependencyProvider::PLUGINS_CART_ITEM_QUANTITY_COUNTER_STRATEGY);
    }
}
