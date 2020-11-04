<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class ProductQuantityGuiDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_PRODUCT_QUANTITY = 'FACADE_PRODUCT_QUANTITY';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);
        $container = $this->addProductQuantityFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductQuantityFacade(Container $container): Container
    {
        $container->set(static::FACADE_PRODUCT_QUANTITY, function (Container $container) {
            return $container->getLocator()->productQuantity()->facade();
        });

        return $container;
    }
}
