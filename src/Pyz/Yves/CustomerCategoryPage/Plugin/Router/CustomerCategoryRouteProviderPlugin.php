<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerCategoryPage\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class CustomerCategoryRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    public const ROUTE_CUSTOMER_CATEGORY = 'customerCategoryRoute';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/my-products', 'CustomerCategoryPage', 'CustomerCategory', 'indexAction');

        $routeCollection->add(static::ROUTE_CUSTOMER_CATEGORY, $route);

        return $routeCollection;
    }
}