<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerReorderWidget;

use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Kernel\Plugin\Pimple;
use SprykerShop\Yves\CustomerReorderWidget\CustomerReorderWidgetDependencyProvider as SprykerCustomerReorderWidgetDependencyProvider;

class CustomerReorderWidgetDependencyProvider extends SprykerCustomerReorderWidgetDependencyProvider
{
    public const BASE_CLIENT_MESSENGER = 'BASE_CLIENT_MESSENGER';
    public const PLUGIN_APPLICATION = 'PLUGIN_APPLICATION';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container);

        $container = $this->addBaseMessengerClient($container);
        $container = $this->addApplication($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addBaseMessengerClient(Container $container): Container
    {
        $container[static::BASE_CLIENT_MESSENGER] = function (Container $container) {
            return $container->getLocator()->messenger()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addApplication(Container $container): Container
    {
        $container[static::PLUGIN_APPLICATION] = function () {
            $pimplePlugin = new Pimple();

            return $pimplePlugin->getApplication();
        };

        return $container;
    }
}
