<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Persistence;

use Orm\Zed\ProductPageSearch\Persistence\SpyProductConcretePageSearchQuery;
use Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchPersistenceFactory as SprykerProductPageSearchPersistenceFactory;

/**
 * @method \Spryker\Zed\ProductPageSearch\ProductPageSearchConfig getConfig()
 * @method \Pyz\Zed\ProductPageSearch\Persistence\ProductPageSearchQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchRepositoryInterface getRepository()
 */
class ProductPageSearchPersistenceFactory extends SprykerProductPageSearchPersistenceFactory
{
    /**
     * @return \Orm\Zed\ProductPageSearch\Persistence\SpyProductConcretePageSearchQuery
     */
    public function getProductConcretePageSearchJoinProductQuery(): SpyProductConcretePageSearchQuery
    {
        return $this->getQueryContainer()
            ->queryProductConcretePageSearchJoinProduct();
    }
}
