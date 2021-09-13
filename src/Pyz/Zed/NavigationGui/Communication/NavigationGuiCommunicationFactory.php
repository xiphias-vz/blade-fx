<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\NavigationGui\Communication;

use Pyz\Zed\NavigationGui\NavigationGuiDependencyProvider;
use Spryker\Zed\NavigationGui\Communication\NavigationGuiCommunicationFactory as SpryNavigationGuiCommunicationFactory;

/**
 * @method \Spryker\Zed\NavigationGui\NavigationGuiConfig getConfig()
 * @method \Spryker\Zed\NavigationGui\Persistence\NavigationGuiQueryContainerInterface getQueryContainer()
 */
class NavigationGuiCommunicationFactory extends SpryNavigationGuiCommunicationFactory
{
    /**
     * @return \Spryker\Zed\NavigationGui\Dependency\Facade\NavigationGuiToUrlInterface
     */
    public function getUrlFacade()
    {
        return $this->getProvidedDependency(NavigationGuiDependencyProvider::FACADE_URL);
    }

    /**
     * @return \Pyz\Zed\NavigationGui\Dependency\Facade\NavigationGuiToTwigInterface
     */
    public function getTwigFacade()
    {
        return $this->getProvidedDependency(NavigationGuiDependencyProvider::FACADE_TWIG);
    }
}
