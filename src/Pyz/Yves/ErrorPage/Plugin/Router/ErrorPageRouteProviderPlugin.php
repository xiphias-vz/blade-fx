<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Yves\ErrorPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\ErrorPage\Plugin\Router\ErrorPageRouteProviderPlugin as SprykerErrorPageRouteProviderPlugin;

class ErrorPageRouteProviderPlugin extends SprykerErrorPageRouteProviderPlugin
{
    protected const ROUTE_ERROR_503 = 'error/503';
    protected const ROUTE_ERROR_503_PATH = '/error/503';

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
        $routeCollection = $this->addError503Route($routeCollection);

        return $routeCollection;
    }

    /**
     * @uses \SprykerShop\Yves\ErrorPage\Controller\Error404Controller::indexAction()
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addError503Route(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/error/503', 'ErrorPage', 'Error503', 'indexAction');
        $routeCollection->add(static::ROUTE_ERROR_503, $route);

        return $routeCollection;
    }
}
