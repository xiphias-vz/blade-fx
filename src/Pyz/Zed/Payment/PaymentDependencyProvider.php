<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment;

use Spryker\Shared\Nopayment\NopaymentConfig as SprykerNopaymentConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Nopayment\Communication\Plugin\Checkout\NopaymentPreCheckPlugin;
use Spryker\Zed\Nopayment\Communication\Plugin\Payment\PriceToPayPaymentMethodFilterPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPluginCollectionInterface;
use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;
use SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayonePostSaveHookPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayonePreCheckPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneSaveOrderPlugin;
use SprykerEco\Zed\Payone\PayoneConfig;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->extendPaymentPlugins($container);

        return $container;
    }

    /**
     * @return \Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentMethodFilterPluginInterface[]
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            new PriceToPayPaymentMethodFilterPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendPaymentPlugins(Container $container): Container
    {
        $container->extend(
            PaymentDependencyProvider::CHECKOUT_PLUGINS,
            function (CheckoutPluginCollectionInterface $pluginCollection) {
                $pluginCollection->add(
                    new NopaymentPreCheckPlugin(),
                    SprykerNopaymentConfig::PAYMENT_PROVIDER_NAME,
                    PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS
                );

                $pluginCollection->add(
                    new PayonePreCheckPlugin(),
                    PayoneConfig::PROVIDER_NAME,
                    static::CHECKOUT_PRE_CHECK_PLUGINS
                );

                $pluginCollection->add(
                    new PayoneSaveOrderPlugin(),
                    PayoneConfig::PROVIDER_NAME,
                    static::CHECKOUT_ORDER_SAVER_PLUGINS
                );

                $pluginCollection->add(
                    new PayonePostSaveHookPlugin(),
                    PayoneConfig::PROVIDER_NAME,
                    static::CHECKOUT_POST_SAVE_PLUGINS
                );

                return $pluginCollection;
            }
        );

        return $container;
    }
}
