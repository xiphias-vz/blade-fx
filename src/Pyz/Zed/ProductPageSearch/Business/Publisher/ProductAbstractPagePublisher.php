<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Business\Publisher;

use Pyz\Zed\ProductPageSearch\Business\Exception\ProductCategoryNotFoundException;
use Spryker\Zed\ProductPageSearch\Business\Publisher\ProductAbstractPagePublisher as SprykerProductAbstractPagePublisher;

class ProductAbstractPagePublisher extends SprykerProductAbstractPagePublisher
{
    /**
     * @param array $productCategories
     * @param array $productAbstractLocalizedEntities
     *
     * @throws \Pyz\Zed\ProductPageSearch\Business\Exception\ProductCategoryNotFoundException
     *
     * @return array[][]
     */
    protected function hydrateProductAbstractLocalizedEntitiesWithProductCategories(array $productCategories, array $productAbstractLocalizedEntities): array
    {
        $productCategoriesByProductAbstractId = [];

        foreach ($productCategories as $productCategory) {
            $productCategoriesByProductAbstractId[$productCategory['fk_product_abstract']][] = $productCategory;
        }

        foreach ($productAbstractLocalizedEntities as $key => $productAbstractLocalizedEntity) {
            $productAbstractId = (int)$productAbstractLocalizedEntity['fk_product_abstract'];

            if (!isset($productCategoriesByProductAbstractId[$productAbstractId])) {
                throw new ProductCategoryNotFoundException(sprintf('Product #%s is not assigned to any category. It won\'t be published to search storage.', $productAbstractId));
            }

            $productAbstractLocalizedEntities[$key]['SpyProductAbstract']['SpyProductCategories'] = $productCategoriesByProductAbstractId[$productAbstractId];
        }

        return $productAbstractLocalizedEntities;
    }
}
