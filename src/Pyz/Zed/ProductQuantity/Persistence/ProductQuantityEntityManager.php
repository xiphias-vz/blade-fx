<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Persistence;

use Generated\Shared\Transfer\ProductQuantityTransfer;
use Spryker\Zed\ProductQuantity\Persistence\ProductQuantityEntityManager as SprykerProductQuantityEntityManager;

/**
 * @method \Spryker\Zed\ProductQuantity\Persistence\ProductQuantityPersistenceFactory getFactory()
 */
class ProductQuantityEntityManager extends SprykerProductQuantityEntityManager implements ProductQuantityEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return void
     */
    public function saveProductQuantity(ProductQuantityTransfer $productQuantityTransfer): void
    {
        $productQuantityTransfer
            ->requireFkProduct()
            ->requireQuantityMin()
            ->requireQuantityInterval();

        $productQuantityQuery = $this->getFactory()
            ->createProductQuantityQuery()
            ->filterByFkProduct($productQuantityTransfer->getFkProduct());

        $productQuantityEntity = $productQuantityQuery->findOneOrCreate();

        $productQuantityEntity->fromArray($productQuantityTransfer->modifiedToArray());
        $productQuantityEntity->save();
    }
}
