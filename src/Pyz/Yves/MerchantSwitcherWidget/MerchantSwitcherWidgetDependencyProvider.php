<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget;

use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetDependencyProvider as SprykerMerchantSwitcherWidgetDependencyProvider;

class MerchantSwitcherWidgetDependencyProvider extends SprykerMerchantSwitcherWidgetDependencyProvider
{
    public const CLIENT_CUSTOMER = 'CLIENT_CUSTOMER';
    public const CLIENT_MERCHANT_STORAGE = 'CLIENT_MERCHANT_STORAGE';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addCustomerClient($container);
        $container = $this->addMerchantStorageClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addCustomerClient(Container $container): Container
    {
        $container->set(static::CLIENT_CUSTOMER, function (Container $container): CustomerClientInterface {
            return $container->getLocator()->customer()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    private function addMerchantStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_MERCHANT_STORAGE, function (Container $container): MerchantStorageClientInterface {
            return $container->getLocator()->merchantStorage()->client();
        });

        return $container;
    }
}
