<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business\Product;

use Generated\Shared\Transfer\ProductAbstractTransfer;
use Spryker\Zed\Product\Business\Product\ProductAbstractManager as SprykerProductAbstractManager;

class ProductAbstractManager extends SprykerProductAbstractManager
{
    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return int
     */
    protected function executeUpdateProductAbstractTransaction(ProductAbstractTransfer $productAbstractTransfer): int
    {
        $idProductAbstract = $productAbstractTransfer
            ->requireIdProductAbstract()
            ->getIdProductAbstract();

        $this->productAbstractAssertion->assertProductExists($idProductAbstract);
        $this->productAbstractAssertion->assertSkuIsUniqueWhenUpdatingProduct($idProductAbstract, $productAbstractTransfer->getSku());

        $productAbstractTransfer = $this->notifyBeforeUpdateObservers($productAbstractTransfer);

        $this->persistEntity($productAbstractTransfer);
        $this->persistProductAbstractLocalizedAttributes($productAbstractTransfer);
        $this->persistProductAbstractStoreRelation($productAbstractTransfer, $idProductAbstract);

        $this->notifyAfterUpdateObservers($productAbstractTransfer);

        return $idProductAbstract;
    }
}
