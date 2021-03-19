<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CurrentStoreCookieCheck\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

class CurrentStoreCookieCheckApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const CURRENT_STORE_COOKIE = 'currentStoreCookie';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->getCurrentStoreCookie($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCurrentStoreCookie(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CURRENT_STORE_COOKIE, function () {
            return $_COOKIE['current_store'] ?? null;
        });

        return $container;
    }
}
