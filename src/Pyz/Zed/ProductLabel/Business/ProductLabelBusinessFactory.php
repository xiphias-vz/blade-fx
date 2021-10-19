<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductLabel\Business;

use Pyz\Zed\Navigation\Business\NavigationFacadeInterface;
use Pyz\Zed\ProductLabel\Business\Touch\ProductAbstractRelationTouchManager;
use Pyz\Zed\ProductLabel\ProductLabelDependencyProvider;
use Spryker\Zed\NavigationStorage\Business\NavigationStorageFacadeInterface;
use Spryker\Zed\ProductLabel\Business\ProductLabelBusinessFactory as SprykerProductLabelBusinessFactory;
use Spryker\Zed\ProductLabel\Business\Touch\ProductAbstractRelationTouchManagerInterface;

class ProductLabelBusinessFactory extends SprykerProductLabelBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductLabel\Business\Touch\ProductAbstractRelationTouchManagerInterface
     */
    protected function createProductAbstractRelationTouchManager(): ProductAbstractRelationTouchManagerInterface
    {
        return new ProductAbstractRelationTouchManager(
            $this->getTouchFacade(),
            $this->getProductFacade(),
            $this->getNavigationFacade(),
            $this->getNavigationStorageFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Navigation\Business\NavigationFacadeInterface
     */
    public function getNavigationFacade(): NavigationFacadeInterface
    {
        return $this->getProvidedDependency(ProductLabelDependencyProvider::FACADE_NAVIGATION);
    }

    /**
     * @return \Spryker\Zed\NavigationStorage\Business\NavigationStorageFacadeInterface
     */
    public function getNavigationStorageFacade(): NavigationStorageFacadeInterface
    {
        return $this->getProvidedDependency(ProductLabelDependencyProvider::FACADE_NAVIGATION_STORAGE);
    }
}
