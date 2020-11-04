<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business;

use Spryker\Zed\Product\Business\ProductFacade as SprykerProductFacade;

/**
 * @method \Pyz\Zed\Product\Business\ProductBusinessFactory getFactory()
 * @method \Spryker\Zed\Product\Persistence\ProductRepositoryInterface getRepository()
 */
class ProductFacade extends SprykerProductFacade implements ProductFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function getConcreteSkuToAttributesMap(array $skus, string $storeName): array
    {
        return $this->getFactory()->createConcreteAttributesRetriever()
            ->getConcreteSkuToAttributesMap($skus, $storeName);
    }
}
