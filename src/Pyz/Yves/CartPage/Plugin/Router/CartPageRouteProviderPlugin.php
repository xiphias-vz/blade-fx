<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CartPage\Plugin\Router\CartPageRouteProviderPlugin as SprykerCartPageRouteProviderPlugin;

class CartPageRouteProviderPlugin extends SprykerCartPageRouteProviderPlugin
{
    public const ROUTE_NAME_CART = 'cart';
    public const ROUTE_NAME_CART_ADD_AJAX = 'cart/add-ajax';
    public const ROUTE_NAME_CART_CLEAR = 'cart/clear';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = parent::addRoutes($routeCollection);
        $routeCollection = $this->addCartAddAjaxRoute($routeCollection);
        $routeCollection = $this->addCartClearRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addCartAddAjaxRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/cart/add-ajax/{productAbstractId}', 'CartPage', 'Cart', 'addAjaxAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::ROUTE_NAME_CART_ADD_AJAX, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addCartClearRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/cart/clear', 'CartPage', 'Cart', 'clearAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::ROUTE_NAME_CART_CLEAR, $route);

        return $routeCollection;
    }
}
