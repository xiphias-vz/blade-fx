<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataDog;

use Pyz\Service\DataDog\DataDogServiceInterface;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class DataDogDependencyProvider extends AbstractBundleDependencyProvider
{
    public const SERVICE_DATA_DOG = 'SERVICE_DATA_DOG';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = $this->addDataDogService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDataDogService(Container $container): Container
    {
        $container->set(self::SERVICE_DATA_DOG, function (Container $container): DataDogServiceInterface {
            return $container->getLocator()->dataDog()->service();
        });

        return $container;
    }
}
