<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceCartConnector;

use Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityBridge;
use Spryker\Zed\Cart\Dependency\Facade\CartToMessengerBridge;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\PriceCartConnector\PriceCartConnectorDependencyProvider as SpyPriceCartConnectorDependencyProvider;

class PriceCartConnectorDependencyProvider extends SpyPriceCartConnectorDependencyProvider
{
    public const FACADE_AVAILABILITY = 'FACADE_AVAILABILITY';
    public const FACADE_CART_MESSENGER = 'FACADE_CART_MESSENGER';
    public const PLUGINS_CART_ITEM_QUANTITY_COUNTER_STRATEGY = 'PLUGINS_CART_ITEM_QUANTITY_COUNTER_STRATEGY';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        parent::provideBusinessLayerDependencies($container);
        $container = $this->addAvailabilityFacade($container);
        $container = $this->addCartMessengerFacade($container);

        return $container;
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

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addCartMessengerFacade(Container $container): Container
    {
        $container[static::FACADE_CART_MESSENGER] = function (Container $container) {
            return new CartToMessengerBridge($container->getLocator()->messenger()->facade());
        };

        return $container;
    }

    /**
     * @return \Spryker\Zed\AvailabilityCartConnectorExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface[]
     */
    public function getCartItemQuantityCounterStrategyPlugins(): array
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addCartItemQuantityCounterStrategyPlugins(Container $container): Container
    {
        $container->set(static::PLUGINS_CART_ITEM_QUANTITY_COUNTER_STRATEGY, function () {
            return $this->getCartItemQuantityCounterStrategyPlugins();
        });

        return $container;
    }
}
