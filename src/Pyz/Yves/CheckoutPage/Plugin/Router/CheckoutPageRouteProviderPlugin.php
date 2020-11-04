<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin as SprykerCheckoutPageRouteProviderPluginAlias;

class CheckoutPageRouteProviderPlugin extends SprykerCheckoutPageRouteProviderPluginAlias
{
    public const CHECKOUT_PLACE_ORDER_DEBUG = 'checkout-place-order-debug';
    public const CHECKOUT_INDEX = 'checkout-index';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = parent::addRoutes($routeCollection);
        $routeCollection = $this->addPlaceOrderDebugStepRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addPlaceOrderDebugStepRoute(RouteCollection $routeCollection)
    {
        $route = $this->buildRoute('/checkout/place-order-debug', 'CheckoutPage', 'Checkout', 'placeOrderDebugAction');
        $route = $route->setMethods(['POST']);
        $routeCollection->add(static::CHECKOUT_PLACE_ORDER_DEBUG, $route);

        return $routeCollection;
    }
}
