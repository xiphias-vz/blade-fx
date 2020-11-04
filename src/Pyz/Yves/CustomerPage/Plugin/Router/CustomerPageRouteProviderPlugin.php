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
}
