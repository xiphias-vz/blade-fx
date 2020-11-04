<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCategory;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductCategory\ProductCategoryDependencyProvider as SprykerProductCategoryDependencyProvider;

class ProductCategoryDependencyProvider extends SprykerProductCategoryDependencyProvider
{
    public const FACADE_NAVIGATION = 'navigation facade';
    public const FACADE_BASE_CATEGORY = 'base category facade';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container = $this->addNavigationFacade($container);
        $container = $this->addBaseCategoryFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addBaseCategoryFacade(Container $container): Container
    {
        $container->set(self::FACADE_BASE_CATEGORY, function (Container $container) {
            return $container->getLocator()->category()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addNavigationFacade(Container $container): Container
    {
        $container->set(self::FACADE_NAVIGATION, function (Container $container) {
            return $container->getLocator()->navigation()->facade();
        });

        return $container;
    }
}
