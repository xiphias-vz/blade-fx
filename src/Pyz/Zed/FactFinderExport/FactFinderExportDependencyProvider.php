<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class FactFinderExportDependencyProvider extends AbstractBundleDependencyProvider
{
    public const SERVICE_FILE_SYSTEM = 'SERVICE_FILE_SYSTEM';

    //su sumnjam da trebamo povezati clienta FactFindera SDK jer je ova
    // cijela logika radila bez toga. ali ću napisati sad samo zato da sam
    // prošao cijele integration guiove.
    // PLUS OVO JE SVE U YVESU A OVAJ EXPORT JE U ZEDU!!!!!!!!!!!!!
    public const FACT_FINDER_SDK_CLIENT = 'FACT_FINDER_SDK_CLIENT';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        return $this->provideClients($container);
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function provideClients(Container $container): Container
    {
        $container[self::FACT_FINDER_SDK_CLIENT] = function () use ($container) {
            return $container->getLocator()
                ->factFinderSdk()
                ->client();
        };

        return $container;
    }

// Stari dio još od tiketa 961 i 1150
// DALEKO BITNIJI DIO OD OVOG IZNAD

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);

        return $this->addFileSystemService($container);
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);

        return $this->addFileSystemService($container);
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addFileSystemService(Container $container): Container
    {
        $container->set(static::SERVICE_FILE_SYSTEM, function (Container $container) {
            return $container->getLocator()->fileSystem()->service();
        });

        return $container;
    }
}
