<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryPageSearch\Business;

use Pyz\Zed\CategoryPageSearch\Business\Search\CategoryNodePageSearch;
use Pyz\Zed\CategoryPageSearch\Business\Search\DataMapper\CategoryNodePageSearchDataMapper;
use Pyz\Zed\CategoryPageSearch\CategoryPageSearchDependencyProvider;
use Spryker\Zed\Category\Business\CategoryFacadeInterface;
use Spryker\Zed\CategoryPageSearch\Business\CategoryPageSearchBusinessFactory as SprykerCategoryPageSearchBusinessFactory;
use Spryker\Zed\CategoryPageSearch\Business\CategoryPageSearchFacadeInterface;
use Spryker\Zed\CategoryPageSearch\Business\Search\DataMapper\CategoryNodePageSearchDataMapperInterface;
use Spryker\Zed\Locale\Business\LocaleFacadeInterface;
use Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface;

class CategoryPageSearchBusinessFactory extends SprykerCategoryPageSearchBusinessFactory
{
    /**
     * @return \Pyz\Zed\CategoryPageSearch\Business\Search\CategoryNodePageSearch
     */
    public function createCategoryNodeSearch(): CategoryNodePageSearch
    {
        return new CategoryNodePageSearch(
            $this->getSprykerCategoryFacade(),
            $this->getProductCategoryFacade(),
            $this->getLocaleFacade(),
            $this->getCategoryPageSearchFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Category\Business\CategoryFacadeInterface
     */
    public function getSprykerCategoryFacade(): CategoryFacadeInterface
    {
        return $this->getProvidedDependency(CategoryPageSearchDependencyProvider::FACADE_SPRYKER_CATEGORY);
    }

    /**
     * @return \Spryker\Zed\CategoryPageSearch\Business\CategoryPageSearchFacadeInterface
     */
    public function getCategoryPageSearchFacade(): CategoryPageSearchFacadeInterface
    {
        return $this->getProvidedDependency(CategoryPageSearchDependencyProvider::FACADE_CATEGORY_PAGE_SEARCH);
    }

    /**
     * @return \Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface
     */
    public function getProductCategoryFacade(): ProductCategoryFacadeInterface
    {
        return $this->getProvidedDependency(CategoryPageSearchDependencyProvider::FACADE_PRODUCT_CATEGORY);
    }

    /**
     * @return \Spryker\Zed\Locale\Business\LocaleFacadeInterface
     */
    public function getLocaleFacade(): LocaleFacadeInterface
    {
        return $this->getProvidedDependency(CategoryPageSearchDependencyProvider::FACADE_LOCALE);
    }

    /**
     * @return \Spryker\Zed\CategoryPageSearch\Business\Search\DataMapper\CategoryNodePageSearchDataMapperInterface
     */
    public function createCategoryNodePageSearchDataMapper(): CategoryNodePageSearchDataMapperInterface
    {
        return new CategoryNodePageSearchDataMapper();
    }
}
