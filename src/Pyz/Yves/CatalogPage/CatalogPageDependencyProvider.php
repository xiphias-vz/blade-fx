<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPage;

use Pyz\Service\DataDog\DataDogServiceInterface;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\CatalogPage\CatalogPageDependencyProvider as SprykerCatalogPageDependencyProvider;

class CatalogPageDependencyProvider extends SprykerCatalogPageDependencyProvider
{
    public const SERVICE_UTIL_TEXT = 'SERVICE_UTIL_TEXT';
    public const SERVICE_DATA_DOG = 'SERVICE_DATA_DOG';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container);

        $container = $this->addUtilTextService($container);
        $container = $this->addDataDogService($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addUtilTextService(Container $container)
    {
        $container[self::SERVICE_UTIL_TEXT] = function (Container $container) {
            return $container->getLocator()->utilText()->service();
        };

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addDataDogService(Container $container): Container
    {
        $container->set(self::SERVICE_DATA_DOG, function (Container $container): DataDogServiceInterface {
            return $container->getLocator()->dataDog()->service();
        });

        return $container;
    }
}
