<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerReorderWidget;

use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\CustomerReorderWidget\CustomerReorderWidgetDependencyProvider as SprykerCustomerReorderWidgetDependencyProvider;

class CustomerReorderWidgetDependencyProvider extends SprykerCustomerReorderWidgetDependencyProvider
{
    public const BASE_CLIENT_MESSENGER = 'BASE_CLIENT_MESSENGER';
    public const PLUGIN_APPLICATION = 'PLUGIN_APPLICATION';

    /**
     * @uses \Spryker\Yves\Form\Plugin\Application\FormApplicationPlugin::SERVICE_FORM_CSRF_PROVIDER
     */
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container);

        $container = $this->addBaseMessengerClient($container);
        $container = $this->addFormCsrfProviderService($container);

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
    protected function addFormCsrfProviderService(Container $container): Container
    {
        $container->set(static::SERVICE_FORM_CSRF_PROVIDER, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_FORM_CSRF_PROVIDER);
        });

        return $container;
    }
}
