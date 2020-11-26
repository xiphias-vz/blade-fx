<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 */
class CustomerPageApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const CUSTOMER_PROFILE_URL = 'customerProfileUrl';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->getCustomerProfileUrl($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCustomerProfileUrl(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CUSTOMER_PROFILE_URL, function () {
            return $this->getConfig()->getCustomerProfileUrl();
        });

        return $container;
    }
}
