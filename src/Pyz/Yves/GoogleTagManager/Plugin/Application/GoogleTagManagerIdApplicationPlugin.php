<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GoogleTagManager\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\GoogleTagManager\GoogleTagManagerConfig getConfig()
 */
class GoogleTagManagerIdApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const GOOGLE_TAG_MANAGER_ID = 'googleTagManagerId';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->addGoogleTagManagerId($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function addGoogleTagManagerId(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::GOOGLE_TAG_MANAGER_ID, function () {

            return $this->getConfig()->getGoogleTagManagerId();
        });

        return $container;
    }
}
