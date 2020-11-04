<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryPageSearch\Business\Search\DataMapper;

use Generated\Shared\Search\PageIndexMap;
use Generated\Shared\Transfer\LocaleTransfer;
use Pyz\Zed\Navigation\Business\Tree\NavigationTreeReader;
use Spryker\Zed\CategoryPageSearch\Business\Search\DataMapper\CategoryNodePageSearchDataMapper as SprykerCategoryNodePageSearchDataMapper;

class CategoryNodePageSearchDataMapper extends SprykerCategoryNodePageSearchDataMapper
{
    /**
     * @param array $data
     * @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
     *
     * @return array
     */
    public function mapCategoryNodeDataToSearchData(array $data, LocaleTransfer $localeTransfer): array
    {
        $originalData = $data;

        $data = parent::mapCategoryNodeDataToSearchData($data, $localeTransfer);

        $data[PageIndexMap::IS_ACTIVE] = (int)$originalData[NavigationTreeReader::PRODUCTS_COUNT] > 0 && $data[PageIndexMap::IS_ACTIVE];

        return $data;
    }
}
