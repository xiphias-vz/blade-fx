<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog;

use DataDog\DogStatsd;
use Spryker\Service\Kernel\AbstractBundleDependencyProvider;
use Spryker\Service\Kernel\Container;

/**
 * @method \Pyz\Service\DataDog\DataDogConfig getConfig()
 */
class DataDogDependencyProvider extends AbstractBundleDependencyProvider
{
    public const SERVICE_DATA_DOG_STATS = 'SERVICE_DATA_DOG_STATS';

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    public function provideServiceDependencies(Container $container)
    {
        $container = parent::provideServiceDependencies($container);
        $container = $this->addDataDogStats($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addDataDogStats($container): Container
    {
        $container[static::SERVICE_DATA_DOG_STATS] = function (Container $container) {
            return new DogStatsd([
                'host' => $this->getConfig()->getDataDogHost(),
                'port' => $this->getConfig()->getDataDogPort(),
            ]);
        };

        return $container;
    }
}
