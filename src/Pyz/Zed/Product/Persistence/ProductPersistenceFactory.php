<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Persistence;

use Orm\Zed\Product\Persistence\PyzProductAbstractStoreQuery;
use Spryker\Zed\Product\Persistence\ProductPersistenceFactory as SprykerProductPersistenceFactory;

class ProductPersistenceFactory extends SprykerProductPersistenceFactory
{
    /**
     * @return \Orm\Zed\Product\Persistence\PyzProductAbstractStoreQuery
     */
    public function createPyzProductAbstractStoreQuery()
    {
        return PyzProductAbstractStoreQuery::create();
    }
}
