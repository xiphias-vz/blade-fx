<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Checkout;

use Spryker\Client\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Client\Kernel\Container;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    public const ORDER_HISTORY_BOOSTING_CLIENT = 'ORDER_HISTORY_BOOSTING_CLIENT';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = parent::provideServiceLayerDependencies($container);
        $container->set(static::ORDER_HISTORY_BOOSTING_CLIENT, function (Container $container) {
            return $container->getLocator()->orderHistoryBoosting()->client();
        });

        return $container;
    }
}
