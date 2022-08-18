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
    public const ROUTE_NAME_CART_CHANGE_AJAX = 'cart/change-ajax';
    public const ROUTE_NAME_CART_CLEAR = 'cart/clear';
    public const ROUTE_NAME_CART_CLEAR_IF_EXISTS = 'cart/clear-if-exists';
    public const ROUTE_NAME_CART_GET_ITEMS = 'cart/get-cart-items';

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
        $routeCollection = $this->addChangeAjaxRoute($routeCollection);
        $routeCollection = $this->addCartClearIfExistsRoute($routeCollection);
        $routeCollection = $this->addGetCartItemsRoute($routeCollection);

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
    protected function addChangeAjaxRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/cart/change-ajax/{productAbstractId}', 'CartPage', 'Cart', 'changeAjaxAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::ROUTE_NAME_CART_CHANGE_AJAX, $route);

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

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addCartClearIfExistsRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/cart/clear-if-exists', 'CartPage', 'Cart', 'clearIfExistsAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::ROUTE_NAME_CART_CLEAR_IF_EXISTS, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addGetCartItemsRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/cart/get-cart-items', 'CartPage', 'Cart', 'getCartItemsAction');
        $route = $route->setMethods(['GET']);
        $routeCollection->add(static::ROUTE_NAME_CART_GET_ITEMS, $route);

        return $routeCollection;
    }
}
