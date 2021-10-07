<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CodeBucketPlugin\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\CodeBucketPlugin\CodeBucketPluginConfig getConfig()
 */
class CurrentCodeBucketApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const CURRENT_CODE_BUCKET = 'currentCodeBucket';
    public const CURRENT_CURRENCY_SYMBOL = 'currentCurrencySymbol';
    public const CURRENT_CURRENCY_ISO_CODE = 'currentCurrencyISOCode';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->getCurrentCurrency($container);
        $container = $this->getCurrentCurrencyISOCode($container);

        return $this->getCurrentCodeBucket($container);
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCurrentCodeBucket(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CURRENT_CODE_BUCKET, function () {
            return getenv('SPRYKER_CODE_BUCKET') ?? null;
        });

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCurrentCurrency(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CURRENT_CURRENCY_SYMBOL, function () {
            return $this->getConfig()->getCurrentCurrencySymbol();
        });

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCurrentCurrencyISOCode(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CURRENT_CURRENCY_ISO_CODE, function () {
            return $GLOBALS['template']['currencyIsoCode'] ?? '';
        });

        return $container;
    }
}
