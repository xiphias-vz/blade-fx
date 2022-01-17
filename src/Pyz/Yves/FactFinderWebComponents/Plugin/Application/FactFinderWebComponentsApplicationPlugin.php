<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\FactFinderWebComponents\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\FactFinderWebComponents\FactFinderWebComponentsConfig getConfig()
 */
class FactFinderWebComponentsApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const FACT_FINDER_CHANNEL = 'factFinderChannel';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->getChannelName($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getChannelName(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::FACT_FINDER_CHANNEL, function () {
            return $this->getConfig()->getFFChannelName();
        });

        return $container;
    }
}
