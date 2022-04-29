<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CatalogPage\Plugin\Router\CatalogPageRouteProviderPlugin as SprykerCatalogPageRouteProviderPlugin;

class CatalogPageRouteProviderPlugin extends SprykerCatalogPageRouteProviderPlugin
{
    public const ROUTE_NAME_SEARCH_MY_PRODUCTS = 'search-my-products';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = parent::addRoutes($routeCollection);
        $routeCollection = $this->addFulltextMyProductsSearchRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addFulltextMyProductsSearchRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/my-products/search', 'CatalogPage', 'Catalog', 'fulltextSearchAction');

        $routeCollection->add(static::ROUTE_NAME_SEARCH_MY_PRODUCTS, $route);

        return $routeCollection;
    }
}
