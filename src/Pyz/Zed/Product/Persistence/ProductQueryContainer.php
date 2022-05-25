<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Persistence;

use Spryker\Zed\Product\Persistence\ProductQueryContainer as SprykerProductQueryContainer;

/**
 * @method \Pyz\Zed\Product\Persistence\ProductPersistenceFactory getFactory()
 */
class ProductQueryContainer extends SprykerProductQueryContainer implements ProductQueryContainerInterface
{
    public function queryProductAbstractPyzStoreWithStoresByFkProductAbstract($idProductAbstract)
    {
        // TODO: Implement queryProductAbstractPyzStoreWithStoresByFkProductAbstract() method.
        return $this->getFactory()
            ->createPyzProductAbstractStoreQuery()
            ->filterByFkProductAbstract($idProductAbstract)
            ->leftJoinWithSpyStore();
    }
}
