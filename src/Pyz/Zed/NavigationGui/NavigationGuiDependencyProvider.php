<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\NavigationGui;

use Pyz\Zed\NavigationGui\Dependency\Facade\NavigationGuiToTwigBridge;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\NavigationGui\NavigationGuiDependencyProvider as SpryNavigationGuiDependencyProvider;

/**
 * @method \Spryker\Zed\NavigationGui\NavigationGuiConfig getConfig()
 */
class NavigationGuiDependencyProvider extends SpryNavigationGuiDependencyProvider
{
    public const FACADE_TWIG = 'FACADE_TWIG';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $this->provideNavigationFacade($container);
        $this->provideLocaleFacade($container);
        $this->provideUrlFacade($container);
        $this->provideTwigFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return void
     */
    protected function provideTwigFacade(Container $container)
    {
        $container[self::FACADE_TWIG] = function (Container $container) {
            return new NavigationGuiToTwigBridge($container->getLocator()->twig()->facade());
        };
    }
}
