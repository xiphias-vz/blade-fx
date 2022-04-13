<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryPageSearch\Business\Search;

use Orm\Zed\Category\Persistence\Base\SpyCategoryNode;
use Orm\Zed\Category\Persistence\SpyCategoryNodeQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Zed\Navigation\Business\Tree\NavigationTreeReader;
use Spryker\Zed\Category\Business\CategoryFacadeInterface;
use Spryker\Zed\CategoryPageSearch\Business\Search\CategoryNodePageSearch as SprykerCategoryNodePageSearch;
use Spryker\Zed\CategoryPageSearch\Business\Search\DataMapper\CategoryNodePageSearchDataMapperInterface;
use Spryker\Zed\CategoryPageSearch\Dependency\Facade\CategoryPageSearchToStoreFacadeInterface;
use Spryker\Zed\CategoryPageSearch\Dependency\Service\CategoryPageSearchToUtilEncodingInterface;
use Spryker\Zed\CategoryPageSearch\Persistence\CategoryPageSearchQueryContainerInterface;
use Spryker\Zed\Locale\Business\LocaleFacadeInterface;
use Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface;

class CategoryNodePageSearch extends SprykerCategoryNodePageSearch
{
    /**
     * @var \Spryker\Zed\Category\Business\CategoryFacadeInterface
     */
    protected $categoryFacade;

    /**
     * @var \Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface
     */
    protected $productCategoryFacade;

    /**
     * @var \Spryker\Zed\Locale\Business\LocaleFacadeInterface
     */
    protected $localeFacade;

    /**
     * @param \Spryker\Zed\CategoryPageSearch\Dependency\Service\CategoryPageSearchToUtilEncodingInterface $utilEncoding
     * @param \Spryker\Zed\CategoryPageSearch\Business\Search\DataMapper\CategoryNodePageSearchDataMapperInterface $categoryNodePageSearchDataMapper
     * @param \Spryker\Zed\CategoryPageSearch\Persistence\CategoryPageSearchQueryContainerInterface $queryContainer
     * @param \Spryker\Zed\CategoryPageSearch\Dependency\Facade\CategoryPageSearchToStoreFacadeInterface $storeFacade
     * @param bool $isSendingToQueue
     * @param \Spryker\Zed\Category\Business\CategoryFacadeInterface $categoryFacade
     * @param \Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface $productCategoryFacade
     * @param \Spryker\Zed\Locale\Business\LocaleFacadeInterface $localeFacade
     */
    public function __construct(
        CategoryPageSearchToUtilEncodingInterface $utilEncoding,
        CategoryNodePageSearchDataMapperInterface $categoryNodePageSearchDataMapper,
        CategoryPageSearchQueryContainerInterface $queryContainer,
        CategoryPageSearchToStoreFacadeInterface $storeFacade,
        bool $isSendingToQueue,
        CategoryFacadeInterface $categoryFacade,
        ProductCategoryFacadeInterface $productCategoryFacade,
        LocaleFacadeInterface $localeFacade
    ) {
        parent::__construct($utilEncoding, $categoryNodePageSearchDataMapper, $queryContainer, $storeFacade, $isSendingToQueue);
        $this->categoryFacade = $categoryFacade;
        $this->productCategoryFacade = $productCategoryFacade;
        $this->localeFacade = $localeFacade;
    }

    /**
     * @param int $productAbstractId
     *
     * @return void
     */
    public function publishForProductAbstract(int $productAbstractId)
    {
        $categoryNodeIds = [];
        $categoryTransferCollection = $this->productCategoryFacade->getCategoryTransferCollectionByIdProductAbstract(
            $productAbstractId,
            $this->localeFacade->getCurrentLocale()
        );
        foreach ($categoryTransferCollection->getCategories() as $categoryTransfer) {
            $categoryNodeTransfers = $this->categoryFacade->getAllNodesByIdCategory($categoryTransfer->getIdCategory());
            foreach ($categoryNodeTransfers as $categoryNodeTransfer) {
                $categoryNodeIds[] = $categoryNodeTransfer->getIdCategoryNode();
            }
        }
        $this->publish(array_unique($categoryNodeIds));
    }

    /**
     * @param int[] $categoryNodeIds
     *
     * @return array
     */
    protected function getCategoryTrees(array $categoryNodeIds): array
    {
        $localeNames = $this->getSharedPersistenceLocaleNames();
        $locales = $this->queryContainer->queryLocalesWithLocaleNames($localeNames)->find();

        $categoryNodeTree = [];
        $this->disableInstancePooling();
        foreach ($locales as $locale) {
            $categoryNodes = $this->addProductCountToSpyNavigationNodeQuery(
                $this->queryContainer->queryWholeCategoryNodeTree($categoryNodeIds, $locale->getIdLocale())
            )
                ->find()
                ->toKeyIndex();

            foreach ($categoryNodeIds as $categoryNodeId) {
                if (isset($categoryNodes[$categoryNodeId])) {
                    $parentCategoryNodeId = $this->getParentNodeId($categoryNodes[$categoryNodeId]);
                    if ($parentCategoryNodeId && isset($categoryNodes[$parentCategoryNodeId])) {
                        $categoryNodes[$parentCategoryNodeId] = $this->addProductsCountToParentNode(
                            $categoryNodes[$categoryNodeId],
                            $categoryNodes[$parentCategoryNodeId]
                        );
                        $topCategoryNodeId = $this->getParentNodeId($categoryNodes[$parentCategoryNodeId]);
                        if ($topCategoryNodeId && isset($categoryNodes[$topCategoryNodeId])) {
                            $categoryNodes[$topCategoryNodeId] = $this->addProductsCountToParentNode(
                                $categoryNodes[$parentCategoryNodeId],
                                $categoryNodes[$topCategoryNodeId]
                            );
                        }
                    }
                    $categoryNodeTree[$categoryNodeId][$locale->getLocaleName()] = $categoryNodes[$categoryNodeId];
                }
            }
        }
        $this->enableInstancePooling();

        return $categoryNodeTree;
    }

    /**
     * @param \Orm\Zed\Category\Persistence\SpyCategoryNodeQuery $spyCategoryNodeQuery
     *
     * @return \Orm\Zed\Category\Persistence\SpyCategoryNodeQuery
     */
    protected function addProductCountToSpyNavigationNodeQuery(SpyCategoryNodeQuery $spyCategoryNodeQuery): SpyCategoryNodeQuery
    {
        return $spyCategoryNodeQuery
            ->useCategoryQuery(null, Criteria::LEFT_JOIN)
                ->useSpyProductCategoryQuery(null, Criteria::LEFT_JOIN)
                    ->groupByFkCategory()
                    ->useSpyProductAbstractQuery(null, Criteria::LEFT_JOIN)
                        ->useSpyProductQuery(null, Criteria::LEFT_JOIN)
                            ->useSpyProductSearchQuery()
                                ->addAsColumn(NavigationTreeReader::PRODUCTS_COUNT, 'count(case spy_product.is_active and spy_product_search.is_searchable when TRUE then 1 else null end)')
                            ->endUse()
                        ->endUse()
                    ->endUse()
                ->endUse()
            ->endUse();
    }

    /**
     * @param \Orm\Zed\Category\Persistence\Base\SpyCategoryNode $categoryNode
     *
     * @return int|null
     */
    protected function getParentNodeId(SpyCategoryNode $categoryNode): ?int
    {
        return $categoryNode->getFkParentCategoryNode();
    }

    /**
     * @param \Orm\Zed\Category\Persistence\Base\SpyCategoryNode $categoryNode
     * @param \Orm\Zed\Category\Persistence\Base\SpyCategoryNode $parentCategoryNode
     *
     * @return \Orm\Zed\Category\Persistence\Base\SpyCategoryNode
     */
    protected function addProductsCountToParentNode(SpyCategoryNode $categoryNode, SpyCategoryNode $parentCategoryNode): SpyCategoryNode
    {
        $parentCategoryProductsCount = $parentCategoryNode->getVirtualColumn(NavigationTreeReader::PRODUCTS_COUNT);
        $parentCategoryNode->setVirtualColumn(
            NavigationTreeReader::PRODUCTS_COUNT,
            $parentCategoryProductsCount + $categoryNode->getVirtualColumn(NavigationTreeReader::PRODUCTS_COUNT)
        );

        return $parentCategoryNode;
    }
}
