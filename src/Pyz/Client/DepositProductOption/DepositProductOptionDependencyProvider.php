<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption;

use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class DepositProductOptionDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_PRODUCT_OPTION_STORAGE = 'CLIENT_PRODUCT_OPTION_STORAGE';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = parent::provideServiceLayerDependencies($container);
        $container = $this->addProductOptionStorageClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addProductOptionStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_PRODUCT_OPTION_STORAGE, function (Container $container) {
            return $container->getLocator()->productOptionStorage()->client();
        });

        return $container;
    }
}
