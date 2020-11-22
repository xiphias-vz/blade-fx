<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Persistence;

use Generated\Shared\Transfer\ProductConcretePageSearchTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Orm\Zed\Availability\Persistence\Map\SpyAvailabilityAbstractTableMap;
use Orm\Zed\Product\Persistence\Map\SpyProductAbstractTableMap;
use Orm\Zed\Product\Persistence\Map\SpyProductTableMap;
use Orm\Zed\Product\Persistence\SpyProductAbstractLocalizedAttributesQuery;
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

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @module Product
     *
     * @param int[] $productAbstractIds
     * @param \Generated\Shared\Transfer\StoreTransfer $storeTransfer
     *
     * @return \Orm\Zed\Product\Persistence\SpyProductAbstractLocalizedAttributesQuery
     */
    public function queryProductAbstractLocalizedEntitiesByProductAbstractIdsAndStore(array $productAbstractIds, StoreTransfer $storeTransfer): SpyProductAbstractLocalizedAttributesQuery
    {
        $query = parent::queryProductAbstractLocalizedEntitiesByProductAbstractIdsAndStore($productAbstractIds, $storeTransfer);
        //TODO: do not consider out of stock, since we do not use this field.
        $query
            ->addJoin(SpyProductAbstractTableMap::COL_SKU, SpyAvailabilityAbstractTableMap::COL_ABSTRACT_SKU, Criteria::INNER_JOIN)
            ->where(SpyAvailabilityAbstractTableMap::COL_FK_STORE . ' = ' . $storeTransfer->getIdStore() . ' AND ' . SpyAvailabilityAbstractTableMap::COL_QUANTITY . '>' . 0);

        return $query;
    }
}
