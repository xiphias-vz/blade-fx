<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\NewRelic\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \StoreApp\Zed\NewRelic\NewRelicConfig getConfig()
 */
class NewRelicApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const NEW_RELIC_CODE_BUCKET = 'newRelicCodeBucket';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->setNewRelicEnvironment($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function setNewRelicEnvironment(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::NEW_RELIC_CODE_BUCKET, function () {
            return $this->getConfig()->getNewRelicEnvironment();
        });

        return $container;
    }
}
