<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCategory\Business;

use Pyz\Zed\Navigation\Business\NavigationFacade;
use Pyz\Zed\ProductCategory\Business\Manager\ProductCategoryManager;
use Pyz\Zed\ProductCategory\ProductCategoryDependencyProvider;
use Spryker\Zed\Category\Business\CategoryFacadeInterface;
use Spryker\Zed\ProductCategory\Business\ProductCategoryBusinessFactory as SprykerProductCategoryBusinessFactory;

class ProductCategoryBusinessFactory extends SprykerProductCategoryBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductCategory\Business\Manager\ProductCategoryManagerInterface
     */
    public function createProductCategoryManager()
    {
        return new ProductCategoryManager(
            $this->getQueryContainer(),
            $this->getCategoryFacade(),
            $this->getProductFacade(),
            $this->getNavigationFacade(),
            $this->getBaseCategoryFacade(),
            $this->getEventFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Navigation\Business\NavigationFacade
     */
    public function getNavigationFacade(): NavigationFacade
    {
        return $this->getProvidedDependency(ProductCategoryDependencyProvider::FACADE_NAVIGATION);
    }

    /**
     * @return \Spryker\Zed\Category\Business\CategoryFacadeInterface
     */
    public function getBaseCategoryFacade(): CategoryFacadeInterface
    {
        return $this->getProvidedDependency(ProductCategoryDependencyProvider::FACADE_BASE_CATEGORY);
    }
}
