<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Merchant;

use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class MerchantDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_MERCHANT_STORAGE = 'CLIENT_MERCHANT_STORAGE';
    public const CLIENT_MERCHANT_SEARCH = 'CLIENT_MERCHANT_SEARCH';
    public const CLIENT_QUOTE = 'CLIENT_QUOTE';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        parent::provideServiceLayerDependencies($container);
        $container = $this->addMerchantStorageClient($container);
        $container = $this->addQuoteClient($container);
        $container = $this->addMerchantSearchClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addMerchantStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_MERCHANT_STORAGE, function (Container $container) {
            return $container->getLocator()->merchantStorage()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addQuoteClient(Container $container): Container
    {
        $container->set(static::CLIENT_QUOTE, function (Container $container) {
            return $container->getLocator()->quote()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addMerchantSearchClient(Container $container): Container
    {
        $container->set(static::CLIENT_MERCHANT_SEARCH, function (Container $container) {
            return $container->getLocator()->merchantSearch()->client();
        });

        return $container;
    }
}
