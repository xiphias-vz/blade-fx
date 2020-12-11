<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Business\Publisher;

use Generated\Shared\Transfer\ProductPageLoadTransfer;
use Generated\Shared\Transfer\ProductPayloadTransfer;
use Orm\Zed\ProductPageSearch\Persistence\SpyProductAbstractPageSearch;
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

    /**
     * @param int[] $productAbstractIds
     * @param string[] $pageDataExpanderPluginNames
     * @param bool $isRefresh
     *
     * @return void
     */
    protected function publishEntities(array $productAbstractIds, array $pageDataExpanderPluginNames, $isRefresh = false)
    {
        $pageDataExpanderPlugins = $this->getPageDataExpanderPlugins($pageDataExpanderPluginNames);

        $payloadTransfers = [];
        foreach ($productAbstractIds as $productAbstractId) {
            $payloadTransfers[$productAbstractId] = (new ProductPayloadTransfer())->setIdProductAbstract($productAbstractId);
        }

        $productPageLoadTransfer = (new ProductPageLoadTransfer())
            ->setProductAbstractIds($productAbstractIds)
            ->setPayloadTransfers($payloadTransfers);

        foreach ($this->productPageDataLoaderPlugins as $productPageDataLoaderPlugin) {
            $productPageLoadTransfer = $productPageDataLoaderPlugin->expandProductPageDataTransfer($productPageLoadTransfer);
        }

        $productAbstractLocalizedEntities = $this->findProductAbstractLocalizedEntities($productAbstractIds);
        $productCategories = $this->getProductCategoriesByProductAbstractIds($productAbstractIds);
        $productAbstractLocalizedEntities = $this->hydrateProductAbstractLocalizedEntitiesWithProductCategories($productCategories, $productAbstractLocalizedEntities);

        $productAbstractPageSearchEntities = $this->findProductAbstractPageSearchEntities($productAbstractIds);

        if (!$productAbstractLocalizedEntities) {
            $this->deleteProductAbstractPageSearchEntities($productAbstractPageSearchEntities);

            return;
        }

        // Project modification to remove out of stock products from search.
        $this->deleteFilteredOutProductPageSearchEntity($productAbstractPageSearchEntities, $productAbstractLocalizedEntities);

        $this->storeData($productAbstractLocalizedEntities, $productAbstractPageSearchEntities, $pageDataExpanderPlugins, $productPageLoadTransfer, $isRefresh);
    }

    /**
     * @param array $productAbstractPageSearchEntities
     * @param array $productAbstractLocalizedEntities
     *
     * @return void
     */
    protected function deleteFilteredOutProductPageSearchEntity(array $productAbstractPageSearchEntities, array $productAbstractLocalizedEntities): void
    {
        if (count($productAbstractPageSearchEntities) === count($productAbstractLocalizedEntities)) {
            return;
        }

        $this->deleteProductAbstractPageSearchEntities(
            $this->getFilterProductAbstractPageSearchEntities($productAbstractPageSearchEntities, $productAbstractLocalizedEntities)
        );
    }

    /**
     * @param array $productAbstractPageSearchEntities
     * @param array $productAbstractLocalizedEntities
     *
     * @return array
     */
    protected function getFilterProductAbstractPageSearchEntities(
        array $productAbstractPageSearchEntities,
        array $productAbstractLocalizedEntities
    ): array {
        $productAbstractPageSearchEntitiesToDelete = [];

        /** @var \Orm\Zed\ProductPageSearch\Persistence\SpyProductAbstractPageSearch $productAbstractPageSearchEntity */
        foreach ($productAbstractPageSearchEntities as $productAbstractPageSearchEntity) {
            $productAbstractPageSearchEntitiesToDelete[$productAbstractPageSearchEntity->getKey()] = $productAbstractPageSearchEntity;

            foreach ($productAbstractLocalizedEntities as $productAbstractLocalizedEntity) {
                if ($this->isProductAbstractPageSearchValid($productAbstractPageSearchEntity, $productAbstractLocalizedEntity)) {
                    unset($productAbstractPageSearchEntitiesToDelete[$productAbstractPageSearchEntity->getKey()]);
                }
            }
        }

        return $productAbstractPageSearchEntitiesToDelete;
    }

    /**
     * @param \Orm\Zed\ProductPageSearch\Persistence\SpyProductAbstractPageSearch $productAbstractPageSearchEntity
     * @param array $productAbstractLocalizedEntity
     *
     * @return bool
     */
    protected function isProductAbstractPageSearchValid(
        SpyProductAbstractPageSearch $productAbstractPageSearchEntity,
        array $productAbstractLocalizedEntity
    ): bool {
        return $productAbstractPageSearchEntity->getFkProductAbstract() === $productAbstractLocalizedEntity['fk_product_abstract'] &&
            $productAbstractPageSearchEntity->getStore() === $productAbstractLocalizedEntity['SpyProductAbstract']['SpyProductAbstractStores'][0]['SpyStore']['name'];
    }
}
