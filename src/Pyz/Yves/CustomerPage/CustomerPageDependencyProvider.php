<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage;

use Pyz\Client\MerchantSearch\MerchantSearchClientInterface;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Client\SalesOrderActions\SalesOrderActionsClientInterface;
use Pyz\Service\DataDog\DataDogServiceInterface;
use Pyz\Service\User\UserServiceInterface;
use Pyz\Yves\CustomerPage\Plugin\AuthenticationHandler;
use Pyz\Yves\CustomerPage\Plugin\RegistrationCheckoutAuthenticationHandlerPlugin;
use Pyz\Yves\MerchantSwitcherWidget\Plugin\SelectedMerchantCookiePlugin;
use Spryker\Client\Session\SessionClientInterface;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\CustomerReorderWidget\Plugin\CustomerPage\CustomerReorderWidgetPlugin;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\CustomerPage\MerchantSwitchCartAfterCustomerAuthenticationSuccessPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
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
    public const SERVICE_TWIG = 'twig';

    /**
     * @uses \Spryker\Yves\Form\Plugin\Application\FormApplicationPlugin::SERVICE_FORM_CSRF_PROVIDER
     */
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);

        $container = $this->addBaseCustomerClient($container);
        $container = $this->addPdfClient($container);
        $container = $this->addOrderDetailClient($container);
        $container = $this->addSalesOrderActionsClient($container);
        $container = $this->addMerchantSearchClient($container);
        $container = $this->addSessionClient($container);
        $container = $this->addSelectedMerchantCookiePlugin($container);
        $container = $this->addDataDogService($container);
        $container = $this->addUserService($container);
        $container = $this->addFormCsrfProviderService($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addSalesOrderActionsClient(Container $container): Container
    {
        $container->set(self::CLIENT_SALES_ORDER_ACTIONS, function (Container $container): SalesOrderActionsClientInterface {
            return $container->getLocator()->salesOrderActions()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addBaseCustomerClient(Container $container): Container
    {
        $container[self::CLIENT_BASE_CUSTOMER] = function (Container $container) {
            return $container->getLocator()->customer()->client();
        };

        return $container;
    }

    /**
     * @return string[]
     */
    protected function getCustomerOverviewWidgetPlugins(): array
    {
        return [
            CustomerReorderWidgetPlugin::class,
        ];
    }

    /**
     * @return string[]
     */
    protected function getCustomerOrderListWidgetPlugins(): array
    {
        return [
            CustomerReorderWidgetPlugin::class,
        ];
    }

    /**
     * @return string[]
     */
    protected function getCustomerOrderViewWidgetPlugins(): array
    {
        return [
            CustomerReorderWidgetPlugin::class,
        ];
    }

    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\AfterCustomerAuthenticationSuccessPluginInterface[]
     */
    protected function getAfterCustomerAuthenticationSuccessPlugins(): array
    {
        return [
            new MerchantSwitchCartAfterCustomerAuthenticationSuccessPlugin(),
//            new SetMerchantCookieAfterCustomerAuthenticationSuccessPlugin(),
        ];
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addPdfClient(Container $container): Container
    {
        $container->set(self::CLIENT_PDF, function (Container $container) {
            return $container->getLocator()->pdf()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addOrderDetailClient(Container $container): Container
    {
        $container->set(self::CLIENT_ORDER_DETAIL, function (Container $container): OrderDetailClientInterface {
            return $container->getLocator()->orderDetail()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addMerchantSearchClient(Container $container): Container
    {
        $container->set(self::CLIENT_MERCHANT_SEARCH, function (Container $container): MerchantSearchClientInterface {
            return $container->getLocator()->merchantSearch()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addSessionClient(Container $container): Container
    {
        $container->set(self::CLIENT_SESSION, function (Container $container): SessionClientInterface {
            return $container->getLocator()->session()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addDataDogService(Container $container): Container
    {
        $container->set(self::SERVICE_DATA_DOG, function (Container $container): DataDogServiceInterface {
            return $container->getLocator()->dataDog()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addSelectedMerchantCookiePlugin(Container $container): Container
    {
        $container->set(self::SELECTED_MERCHANT_COOKIE_PLUGIN, function (Container $container): SelectedMerchantCookiePlugin {
            return new SelectedMerchantCookiePlugin();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addUserService(Container $container): Container
    {
        $container->set(self::SERVICE_USER, function (Container $container): UserServiceInterface {
            return $container->getLocator()->user()->service();
        });

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
