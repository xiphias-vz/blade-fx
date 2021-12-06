<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\FactFinderGui;

use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class FactFinderGuiDependencyProvider extends AbstractBundleDependencyProvider
{
    // ova cijela klasa najvjerojatnije ne treba
    // piše u dokumentaciji
    // To use the FactFindeSdk module directly in your module, you have to add a client to your dependency provider.
    // znači u tom modulu u kojem bi trebao koristiti FactFinder SDK u dependency provideru tog modula moram ovo upisati.
    public const FACT_FINDER_SDK_CLIENT = 'FACT_FINDER_SDK_CLIENT';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = $this->provideClients($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function provideClients(Container $container)
    {
        $container[self::FACT_FINDER_SDK_CLIENT] = function () use ($container) {
            return $container->getLocator()
                ->factFinderSdk()
                ->client();
        };

        return $container;
    }
}
