<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business;

use Pyz\Zed\Product\Business\Product\ConcreteAttributesRetriever;
use Pyz\Zed\Product\Business\Product\ConcreteAttributesRetrieverInterface;
use Spryker\Zed\Product\Business\ProductBusinessFactory as SprykerProductBusinessFactory;

/**
 * @method \Spryker\Zed\Product\ProductConfig getConfig()
 * @method \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Product\Persistence\ProductRepositoryInterface getRepository()
 */
class ProductBusinessFactory extends SprykerProductBusinessFactory
{
    /**
     * @return \Pyz\Zed\Product\Business\Product\ConcreteAttributesRetrieverInterface
     */
    public function createConcreteAttributesRetriever(): ConcreteAttributesRetrieverInterface
    {
        return new ConcreteAttributesRetriever($this->createProductConcreteManager());
    }
}
