<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business\Tree;

use Generated\Shared\Transfer\NavigationNodeTransfer;
use Orm\Zed\Navigation\Persistence\SpyNavigation;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Navigation\Business\Tree\NavigationTreeReader as SprykerNavigationTreeReader;

class NavigationTreeReader extends SprykerNavigationTreeReader
{
    public const PRODUCTS_COUNT = 'products_count';

    /**
     * @param \Generated\Shared\Transfer\NavigationNodeTransfer $navigationNodeTransfer
     *
     * @return \Orm\Zed\Navigation\Persistence\SpyNavigationNode[]|\Propel\Runtime\Collection\ObjectCollection
     */
    protected function findChildrenNavigationNodes(NavigationNodeTransfer $navigationNodeTransfer)
    {
        return $this->addProductCountToSpyNavigationNodeQuery(
            $this->navigationQueryContainer
                ->queryNavigationNodesByFkParentNavigationNode($navigationNodeTransfer->getIdNavigationNode())
        )->find();
    }

    /**
     * @param \Orm\Zed\Navigation\Persistence\SpyNavigation $navigationEntity
     *
     * @return \Orm\Zed\Navigation\Persistence\SpyNavigationNode[]|\Propel\Runtime\Collection\ObjectCollection
     */
    protected function findRootNavigationNodes(SpyNavigation $navigationEntity)
    {
        return $this->addProductCountToSpyNavigationNodeQuery(
            $this->navigationQueryContainer
                ->queryRootNavigationNodesByIdNavigation($navigationEntity->getIdNavigation())
        )->find();
    }

    /**
     * @param \Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery $spyNavigationNodeQuery
     *
     * @return \Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery
     */
    protected function addProductCountToSpyNavigationNodeQuery(SpyNavigationNodeQuery $spyNavigationNodeQuery): SpyNavigationNodeQuery
    {
        return $spyNavigationNodeQuery
            ->groupByNodeKey()
            ->useSpyNavigationNodeLocalizedAttributesQuery()
                ->useSpyProductLabelQuery(null, Criteria::LEFT_JOIN)
                    ->useSpyProductLabelProductAbstractQuery(null, Criteria::LEFT_JOIN)
                        ->groupByFkProductLabel()
                        ->useSpyProductAbstractQuery("spy_product_label_spy_product_abstract", Criteria::LEFT_JOIN)
                            ->useSpyProductQuery("spy_product_label_spy_product", Criteria::LEFT_JOIN)
                                ->useSpyProductSearchQuery("spy_product_label_spy_product_search", Criteria::LEFT_JOIN)
                                ->endUse()
                            ->endUse()
                        ->endUse()
                    ->endUse()
                ->endUse()
                ->useSpyUrlQuery()
                    ->useSpyCategoryNodeQuery()
                        ->useCategoryQuery(null, Criteria::LEFT_JOIN)
                            ->useSpyProductCategoryQuery(null, Criteria::LEFT_JOIN)
                                ->groupByFkCategory()
                                ->useSpyProductAbstractQuery("spy_product_category_spy_product_abstract", Criteria::LEFT_JOIN)
                                    ->useSpyProductQuery("spy_product_category_spy_product", Criteria::LEFT_JOIN)
                                        ->useSpyProductSearchQuery("spy_product_category_spy_product_search", Criteria::LEFT_JOIN)
                                            ->addAsColumn(
                                                'products_count',
                                                'count(case (spy_product_label_spy_product.is_active and spy_product_label_spy_product_search.is_searchable) OR (spy_product_category_spy_product.is_active and spy_product_category_spy_product_search.is_searchable) when TRUE then 1 else null end)'
                                            )
                                        ->endUse()
                                    ->endUse()
                                ->endUse()
                            ->endUse()
                        ->endUse()
                    ->endUse()
                ->endUse()
            ->endUse();
    }
}
