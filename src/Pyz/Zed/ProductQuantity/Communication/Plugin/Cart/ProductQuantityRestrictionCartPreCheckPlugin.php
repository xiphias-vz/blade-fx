<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Communication\Plugin\Cart;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\CartPreCheckResponseTransfer;
use Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\ProductQuantityRestrictionCartPreCheckPlugin as SpryProductQuantityRestrictionCartPreCheckPlugin;

/**
 * @method \Pyz\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface getFacade()
 * @method \Spryker\Zed\ProductQuantity\Communication\ProductQuantityCommunicationFactory getFactory()
 * @method \Spryker\Zed\ProductQuantity\ProductQuantityConfig getConfig()
 */
class ProductQuantityRestrictionCartPreCheckPlugin extends SpryProductQuantityRestrictionCartPreCheckPlugin
{
    /**
     * {@inheritDoc}
     * - Checks if the quantity is positive.
     * - Validates product quantities if they fulfill all quantity restriction rules during item addition.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartPreCheckResponseTransfer
     */
    public function check(CartChangeTransfer $cartChangeTransfer): CartPreCheckResponseTransfer
    {
        return $this->getFacade()
            ->validateItemAddProductQuantityRestrictions($cartChangeTransfer);
    }
}
