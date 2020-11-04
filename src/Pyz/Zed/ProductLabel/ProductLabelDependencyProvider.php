<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductLabel;

use Pyz\Zed\ExampleProductSalePage\Communication\Plugin\ExampleProductSalePageLabelUpdaterPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\ProductAlternativeLabelUpdaterPlugin;
use Spryker\Zed\ProductDiscontinuedProductLabelConnector\Communication\Plugin\ProductDiscontinuedLabelUpdaterPlugin;
use Spryker\Zed\ProductLabel\ProductLabelDependencyProvider as SprykerProductLabelDependencyProvider;
use Spryker\Zed\ProductNew\Communication\Plugin\ProductNewLabelUpdaterPlugin;

class ProductLabelDependencyProvider extends SprykerProductLabelDependencyProvider
{
    public const FACADE_NAVIGATION = 'FACADE_NAVIGATION';
    public const FACADE_NAVIGATION_STORAGE = 'FACADE_NAVIGATION_STORAGE';

    /**
     * @return \Spryker\Zed\ProductLabel\Dependency\Plugin\ProductLabelRelationUpdaterPluginInterface[]
     */
    protected function getProductLabelRelationUpdaterPlugins()
    {
        return [
            new ProductNewLabelUpdaterPlugin(),
            new ExampleProductSalePageLabelUpdaterPlugin(),
            new ProductAlternativeLabelUpdaterPlugin(),
            new ProductDiscontinuedLabelUpdaterPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        parent::provideBusinessLayerDependencies($container);

        $container = $this->addNavigationFacade($container);
        $container = $this->addNavigationStorageFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addNavigationFacade(Container $container)
    {
        $container->set(static::FACADE_NAVIGATION, function (Container $container) {
            return $container->getLocator()->navigation()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addNavigationStorageFacade(Container $container)
    {
        $container->set(static::FACADE_NAVIGATION_STORAGE, function (Container $container) {
            return $container->getLocator()->navigationStorage()->facade();
        });

        return $container;
    }
}
