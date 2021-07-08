<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Xiphias\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class XiphiasRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    protected const ROUTE_API_TEST = 'xiphias';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/xiphias', 'Xiphias', 'Xiphias', 'indexAction');
        $routeCollection->add(static::ROUTE_API_TEST, $route);

        return $routeCollection;
    }
}
