<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Monitoring\Plugin\Provider;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class MonitoringRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    protected const ROUTE_MONITORING = 'monitoring-reporting';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/monitoring-report', 'Monitoring', 'Index', 'indexAction');
        $routeCollection->add(static::ROUTE_MONITORING, $route);

        return $routeCollection;
    }
}
