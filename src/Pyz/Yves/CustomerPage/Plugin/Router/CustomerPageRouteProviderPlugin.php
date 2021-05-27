<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Router;

use Pyz\Shared\Invoice\InvoiceConfig;
use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CustomerPage\Plugin\Router\CustomerPageRouteProviderPlugin as SprykerCustomerPageRouteProviderPlugin;

class CustomerPageRouteProviderPlugin extends SprykerCustomerPageRouteProviderPlugin
{
    public const ROUTE_CUSTOMER_OVERVIEW = 'customer/overview';
    protected const ROUTE_CUSTOMER_INVOICE = InvoiceConfig::ROUTE_CUSTOMER_INVOICE;

    protected const ROUTE_CUSTOMER_ORDER_CANCEL = 'customer/order/cancel';
    protected const ROUTE_CUSTOMER_REGISTRATION_CONFIRM = 'register/confirm';
    protected const ROUTE_CUSTOMER_PASSWORD_CHANGE = 'password/change';
    public const CHECKOUT_CHECK_AVAILABILITY = 'checkout-check-availability';
    public const CHECKOUT_GLOBUS_LOGIN = 'checkout-globus-login';
    protected const ROUTE_CUSTOMER_ADDRESS_CHECK = 'register/customer-address-api';
    protected const ROUTE_CUSTOMER_PASSWORD_RESET = 'password/reset';

    /**
     * Specification:
     * - Adds Routes to the RouteCollection.
     *
     * @api
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = parent::addRoutes($routeCollection);

        $routeCollection = $this->addInvoiceRoute($routeCollection);
        $routeCollection = $this->addCustomerOrderCancellationRoute($routeCollection);
        $routeCollection = $this->addCustomerRegisterConfirmRoute($routeCollection);
        $routeCollection = $this->addCustomerPasswordChangeRoute($routeCollection);
        $routeCollection = $this->addAvaliabilityTestRoute($routeCollection);
        $routeCollection = $this->addGlobusLoginRoute($routeCollection);
        $routeCollection = $this->addPasswordResetRoute($routeCollection);
        $routeCollection = $this->addCustomerRegistrationAddressCheckRouter($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addInvoiceRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/customer/order/invoice', 'CustomerPage', 'invoice', 'indexAction');
        $routeCollection->add(static::ROUTE_CUSTOMER_INVOICE, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addCustomerOrderCancellationRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/customer/order/cancel', 'CustomerPage', 'Order', 'cancelAction');
        $routeCollection->add(static::ROUTE_CUSTOMER_ORDER_CANCEL, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addCustomerRegisterConfirmRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/register/confirm', 'CustomerPage', 'Register', 'confirmAction');
        $routeCollection->add(static::ROUTE_CUSTOMER_REGISTRATION_CONFIRM, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addCustomerPasswordChangeRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/password/change', 'CustomerPage', 'Password', 'passwordChange');
        $routeCollection->add(static::ROUTE_CUSTOMER_PASSWORD_CHANGE, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addAvaliabilityTestRoute(RouteCollection $routeCollection)
    {
        $route = $this->buildRoute('/login/check-availability', 'CustomerPage', 'Auth', 'callAvaliabilityTestAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::CHECKOUT_CHECK_AVAILABILITY, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addGlobusLoginRoute(RouteCollection $routeCollection)
    {
        $route = $this->buildRoute('/login/globus-login', 'CustomerPage', 'Auth', 'globusLoginAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::CHECKOUT_GLOBUS_LOGIN, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addPasswordResetRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/password/reset', 'CustomerPage', 'Password', 'passwordReset');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::ROUTE_CUSTOMER_PASSWORD_RESET, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addCustomerRegistrationAddressCheckRouter(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/register/customer-address-api', 'CustomerPage', 'Register', 'getCustomerDataAPIAction');
        $routeCollection->add(static::ROUTE_CUSTOMER_ADDRESS_CHECK, $route);

        return $routeCollection;
    }
}
