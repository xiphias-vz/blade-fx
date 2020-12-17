<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CookieBot\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\CookieBot\CookieBotConfig getConfig()
 */
class CookieBotApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const DOMAIN_GROUP_ID = 'domainGroupId';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->addDomainGroupId($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function addDomainGroupId(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::DOMAIN_GROUP_ID, function () {
            return $this->getConfig()->getCookieBotDomainGroupId();
        });

        return $container;
    }
}
