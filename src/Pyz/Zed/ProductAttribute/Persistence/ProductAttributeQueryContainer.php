<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductAttribute\Persistence;

use Orm\Zed\Product\Persistence\Map\SpyProductAttributeKeyTableMap;
use PDO;
use Spryker\Zed\ProductAttribute\Persistence\ProductAttributeQueryContainer as SprykerProductAttributeQueryContainer;

/**
 * @method \Spryker\Zed\ProductAttribute\Persistence\ProductAttributePersistenceFactory getFactory()
 */
class ProductAttributeQueryContainer extends SprykerProductAttributeQueryContainer
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $searchText
     * @param int $limit
     *
     * @return \Orm\Zed\Product\Persistence\SpyProductAttributeKeyQuery
     */
    public function querySuggestKeys($searchText, $limit = 10)
    {
        $query = $this->queryProductAttributeKey()
            ->filterByIsSuper(false)
            ->useSpyProductManagementAttributeQuery()
            ->endUse()
            ->limit($limit);

        $searchText = trim($searchText);
        if ($searchText !== '') {
            $term = '%' . $searchText . '%';

            $query->where('UPPER(' . SpyProductAttributeKeyTableMap::COL_KEY . ') LIKE UPPER(?)', $term, PDO::PARAM_STR);
        }

        return $query;
    }
}
