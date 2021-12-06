<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\FactFinderGui\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class FactFinderGuiRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    public const ROUTE_NAME_FACT_FINDER = 'fact-finder';
    public const ROUTE_NAME_FACT_FINDER_SEARCH = 'fact-finder-search';
    public const ROUTE_NAME_FACT_FINDER_TRACK = 'fact-finder-track';
    public const ROUTE_FACT_FINDER_RECOMMENDATIONS = 'fact-finder-recommendations';

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
        $route = $this->buildRoute('/factfinder', 'FactFinder', 'Search', 'index');
        $routeCollection->add(static::ROUTE_NAME_FACT_FINDER, $route);

        $route = $this->buildRoute('/factfinder/suggestions', 'FactFinder', 'Suggestions', 'index');
        $routeCollection->add(static::ROUTE_NAME_FACT_FINDER_SEARCH, $route);

        $route = $this->buildRoute('/factfinder/track', 'FactFinder', 'Track', 'index');
        $routeCollection->add(static::ROUTE_NAME_FACT_FINDER_TRACK, $route);

        $route = $this->buildRoute('/factfinder/recommendations', 'FactFinder', 'Recommendations', 'index');
        $routeCollection->add(static::ROUTE_FACT_FINDER_RECOMMENDATIONS, $route);

        return $routeCollection;
    }
}
