<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\WishlistPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\WishlistPage\Plugin\Router\WishlistPageRouteProviderPlugin as SprykerWishlistPageRouteProviderPluginAlias;

class WishlistPageRouteProviderPlugin extends SprykerWishlistPageRouteProviderPluginAlias
{
    public const ROUTE_CHANGE_QUANTITY = 'wishlist/change-quantity';

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
        $routeCollection = $this->addWishlistChangeQuantityRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addWishlistChangeQuantityRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/wishlist/change-quantity', 'WishlistPage', 'Wishlist', 'changeQuantityAction');
        $routeCollection->add(static::ROUTE_CHANGE_QUANTITY, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addDeleteWishlistRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/wishlist/delete/{wishlistName}', 'WishlistPage', 'WishlistOverview', 'safeDeleteAction');
        $route = $route->setRequirement('wishlistName', static::WISHLIST_NAME_PATTERN);
        $routeCollection->add(static::ROUTE_WISHLIST_DELETE, $route);

        return $routeCollection;
    }
}
