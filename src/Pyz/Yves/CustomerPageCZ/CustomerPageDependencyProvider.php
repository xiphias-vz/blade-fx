<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPageCZ;

use Pyz\Yves\CustomerPage\CustomerPageDependencyProvider as LocalCustomerPageDependencyProvider;
use Pyz\Yves\CustomerPage\Plugin\RegistrationCheckoutAuthenticationHandlerPlugin;
use Pyz\Yves\CustomerPageCZ\Plugin\AuthenticationHandler;
use Spryker\Yves\Kernel\Container;

class CustomerPageDependencyProvider extends LocalCustomerPageDependencyProvider
{
    public const CLIENT_BASE_CUSTOMER = 'CLIENT_BASE_CUSTOMER';
    public const CLIENT_PDF = 'CLIENT_PDF';
    public const CLIENT_ORDER_DETAIL = 'CLIENT_ORDER_DETAIL';
    public const CLIENT_MERCHANT_SEARCH = 'CLIENT_MERCHANT_SEARCH';
    public const SELECTED_MERCHANT_COOKIE_PLUGIN = 'SELECTED_MERCHANT_COOKIE_PLUGIN';
    public const CLIENT_SALES_ORDER_ACTIONS = 'CLIENT_SALES_ORDER_ACTIONS';
    public const CLIENT_SESSION = 'CLIENT_SESSION';
    public const SERVICE_DATA_DOG = 'SERVICE_DATA_DOG';
    public const SERVICE_USER = 'SERVICE_USER';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);

        $container = $this->addAuthenticationHandlerPlugin($container);

        return $container;
    }

     /**
      * @param \Spryker\Yves\Kernel\Container $container
      *
      * @return \Spryker\Yves\Kernel\Container
      */
    protected function addAuthenticationHandlerPlugin(Container $container): Container
    {
        $container->set(static::PLUGIN_AUTHENTICATION_HANDLER, function () {
            return new AuthenticationHandler();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addRegistrationCheckoutAuthenticationHandlerPlugin(Container $container): Container
    {
        $container->set(static::PLUGIN_REGISTRATION_AUTHENTICATION_HANDLER, function () {
            return new RegistrationCheckoutAuthenticationHandlerPlugin();
        });

        return $container;
    }
}
