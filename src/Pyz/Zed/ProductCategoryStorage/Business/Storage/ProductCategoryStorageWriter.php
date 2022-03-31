<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCategoryStorage\Business\Storage;

use Spryker\Zed\ProductCategoryStorage\Business\Storage\ProductCategoryStorageWriter as ExtendProductCategoryStorageWriter;
use Spryker\Zed\ProductCategoryStorage\Business\Storage\ProductCategoryStorageWriterInterface;

class ProductCategoryStorageWriter extends ExtendProductCategoryStorageWriter implements ProductCategoryStorageWriterInterface
{
    /**
     * @param array $productAbstractIds
     *
     * @return void
     */
    public function publish(array $productAbstractIds)
    {
        $spyProductAbstractLocalizedEntities = $this->findProductAbstractLocalizedEntities($productAbstractIds);
        $productCategories = $this->findProductAbstractCategories($productAbstractIds);
        $categories = [];

        foreach ($spyProductAbstractLocalizedEntities as $productAbstractLocalizedEntity) {
            if (!isset($productCategories[$productAbstractLocalizedEntity->getFkProductAbstract()])) {
                continue;
            }

            $mappings = $productCategories[$productAbstractLocalizedEntity->getFkProductAbstract()];
            $localizedCategories = [];
            foreach ($mappings as $mapping) {
                $localizedCategories = array_merge($localizedCategories, $this->generateProductCategoryLocalizedData($mapping, $productAbstractLocalizedEntity->getFkLocale()));
                //added break for taking only first one for the import in spy_product_abstract_category_storage
                break;
            }

            $categories[$productAbstractLocalizedEntity->getFkProductAbstract()][$productAbstractLocalizedEntity->getFkLocale()] = $localizedCategories;
        }

        $spyProductAbstractStorageEntities = $this->findProductAbstractCategoryStorageEntitiesByProductAbstractIds($productAbstractIds);
        $this->storeData($spyProductAbstractLocalizedEntities, $spyProductAbstractStorageEntities, $categories);
    }
}
