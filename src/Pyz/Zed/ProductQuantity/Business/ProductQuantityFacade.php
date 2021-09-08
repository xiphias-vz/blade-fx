<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\CartPreCheckResponseTransfer;
use Spryker\Zed\ProductQuantity\Business\ProductQuantityFacade as SprykerProductQuantityFacade;

/**
 * @method \Pyz\Zed\ProductQuantity\Business\ProductQuantityBusinessFactory getFactory()
 * @method \Pyz\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\ProductQuantity\Persistence\ProductQuantityRepositoryInterface getRepository()
 */
class ProductQuantityFacade extends SprykerProductQuantityFacade
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartPreCheckResponseTransfer
     */
    public function validateItemAddProductQuantityRestrictions(CartChangeTransfer $cartChangeTransfer): CartPreCheckResponseTransfer
    {
        return $this->getFactory()
            ->createProductQuantityRestrictionValidator()
            ->validateItemAddition($cartChangeTransfer);
    }
}
