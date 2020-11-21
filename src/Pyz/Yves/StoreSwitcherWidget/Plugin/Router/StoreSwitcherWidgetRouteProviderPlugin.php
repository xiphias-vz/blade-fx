<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class StoreSwitcherWidgetRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    protected const ROUTER_SWITCH_STORE = 'switch-store';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = $this->addSwitchStoreRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addSwitchStoreRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/store/switch', 'StoreSwitcherWidget', 'Index', 'switchStore');
        $routeCollection->add(static::ROUTER_SWITCH_STORE, $route);

        return $routeCollection;
    }
}