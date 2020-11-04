<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Persistence;

use Generated\Shared\Transfer\ProductConcretePageSearchTransfer;
use Orm\Zed\Product\Persistence\Map\SpyProductTableMap;
use Orm\Zed\ProductPageSearch\Persistence\Map\SpyProductConcretePageSearchTableMap;
use Orm\Zed\ProductPageSearch\Persistence\SpyProductConcretePageSearchQuery;
use Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchQueryContainer as SprykerProductPageSearchQueryContainer;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria;

/**
 * @method \Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchPersistenceFactory getFactory()
 */
class ProductPageSearchQueryContainer extends SprykerProductPageSearchQueryContainer implements ProductPageSearchQueryContainerInterface
{
    /**
     * @api
     *
     * @return \Orm\Zed\ProductPageSearch\Persistence\SpyProductConcretePageSearchQuery
     */
    public function queryProductConcretePageSearchJoinProduct(): SpyProductConcretePageSearchQuery
    {
        $query = $this->getFactory()
            ->createProductConcretePageSearchQuery()
            ->addJoin(SpyProductConcretePageSearchTableMap::COL_FK_PRODUCT, SpyProductTableMap::COL_ID_PRODUCT, Criteria::INNER_JOIN)
            ->withColumn(SpyProductTableMap::COL_FK_PRODUCT_ABSTRACT, ProductConcretePageSearchTransfer::FK_PRODUCT_ABSTRACT);

        return $query;
    }
}
