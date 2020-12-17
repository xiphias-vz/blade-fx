<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Business;

use Pyz\Zed\ProductPageSearch\Business\DataMapper\ProductAbstractSearchDataMapper;
use Pyz\Zed\ProductPageSearch\Business\Publisher\ProductAbstractPagePublisher;
use Spryker\Zed\ProductPageSearch\Business\DataMapper\AbstractProductSearchDataMapper;
use Spryker\Zed\ProductPageSearch\Business\Mapper\ProductPageSearchMapper;
use Spryker\Zed\ProductPageSearch\Business\ProductPageSearchBusinessFactory as SprykerProductPageSearchBusinessFactory;

class ProductPageSearchBusinessFactory extends SprykerProductPageSearchBusinessFactory
{
    /**
     * @return \Pyz\Zed\ProductPageSearch\Business\Publisher\ProductAbstractPagePublisher
     */
    public function createProductAbstractPagePublisher()
    {
        return new ProductAbstractPagePublisher(
            $this->getQueryContainer(),
            $this->getProductPageDataExpanderPlugins(),
            $this->getProductPageDataLoaderPlugins(),
            $this->createProductPageMapper(),
            $this->createProductPageWriter(),
            $this->getStoreFacade()
        );
    }

    /**
     * @return \Spryker\Zed\ProductPageSearch\Business\Mapper\ProductPageSearchMapper
     */
    protected function createProductPageMapper()
    {
        return new ProductPageSearchMapper(
            $this->createProductPageAttribute(),
            $this->createProductAbstractSearchDataMapper(),
            $this->getUtilEncoding()
        );
    }

    /**
     * @return \Pyz\Zed\ProductPageSearch\Business\DataMapper\ProductAbstractSearchDataMapper
     */
    public function createProductAbstractSearchDataMapper(): AbstractProductSearchDataMapper
    {
        return new ProductAbstractSearchDataMapper(
            $this->createPageMapBuilder(),
            $this->getSearchFacade(),
            $this->getProductSearchFacade(),
            $this->getProductAbstractMapExpanderPlugins()
        );
    }
}
