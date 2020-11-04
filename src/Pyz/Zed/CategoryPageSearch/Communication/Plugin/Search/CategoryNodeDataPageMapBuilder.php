<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryPageSearch\Communication\Plugin\Search;

use Generated\Shared\Transfer\LocaleTransfer;
use Pyz\Zed\Navigation\Business\Tree\NavigationTreeReader;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Search\CategoryNodeDataPageMapBuilder as SprykerCategoryNodeDataPageMapBuilder;
use Spryker\Zed\Search\Business\Model\Elasticsearch\DataMapper\PageMapBuilderInterface;

class CategoryNodeDataPageMapBuilder extends SprykerCategoryNodeDataPageMapBuilder
{
    /**
     * @param \Spryker\Zed\Search\Business\Model\Elasticsearch\DataMapper\PageMapBuilderInterface $pageMapBuilder
     * @param array $categoryData
     * @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
     *
     * @return \Generated\Shared\Transfer\PageMapTransfer
     */
    public function buildPageMap(PageMapBuilderInterface $pageMapBuilder, array $categoryData, LocaleTransfer $localeTransfer)
    {
        $pageMapTransfer = parent::buildPageMap($pageMapBuilder, $categoryData, $localeTransfer);

        if ($categoryData[NavigationTreeReader::PRODUCTS_COUNT] == 0) {
            $pageMapTransfer->setIsActive(false);
        }

        return $pageMapTransfer;
    }
}
