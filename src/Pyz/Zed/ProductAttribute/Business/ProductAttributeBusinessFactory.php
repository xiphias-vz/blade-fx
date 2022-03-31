<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductAttribute\Business;

use Pyz\Zed\ProductAttribute\Business\Model\Attribute\AttributeWriter;
use Pyz\Zed\ProductAttribute\ProductAttributeDependencyProvider;
use Spryker\Zed\Product\Persistence\ProductQueryContainerInterface;
use Spryker\Zed\ProductAttribute\Business\ProductAttributeBusinessFactory as SprykerProductAttributeBusinessFactory;

class ProductAttributeBusinessFactory extends SprykerProductAttributeBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductAttribute\Business\Model\Attribute\AttributeWriterInterface
     */
    public function createAttributeWriter()
    {
        return new AttributeWriter(
            $this->getQueryContainer(),
            $this->getProductFacade(),
            $this->getGlossaryFacade(),
            $this->createAttributeValueWriter(),
            $this->createAttributeGlossaryKeyBuilder(),
            $this->getProductQueryContainer()
        );
    }

    /**
     * @return \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface
     */
    protected function getProductQueryContainer(): ProductQueryContainerInterface
    {
        return $this->getProvidedDependency(ProductAttributeDependencyProvider::PRODUCT_QUERY_CONTAINER);
    }
}
