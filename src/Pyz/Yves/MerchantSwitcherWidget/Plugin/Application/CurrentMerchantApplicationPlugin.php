<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory getFactory()
 */
class CurrentMerchantApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    protected const MERCHANT_NAME = 'merchant_name';
git
    /**
     * {@inheritDoc}
     * - Adds current `merchant_name` to the application
     *
     * @api
     *
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::MERCHANT_NAME, function () {
            return $this->getFactory()
                ->createMerchantShopContextReader()
                ->getCurrentMerchantName();

        });

        return $container;
    }
}
