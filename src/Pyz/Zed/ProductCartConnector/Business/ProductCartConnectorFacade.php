<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business;

use Generated\Shared\Transfer\CartChangeTransfer;
use Spryker\Zed\ProductCartConnector\Business\ProductCartConnectorFacade as SpyProductCartConnectorFacade;

/**
 * @method \Pyz\Zed\ProductCartConnector\Business\ProductCartConnectorBusinessFactory getFactory()
 */
class ProductCartConnectorFacade extends SpyProductCartConnectorFacade
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
    public function validateItems(CartChangeTransfer $cartChangeTransfer)
    {
        return $this->getFactory()
            ->createProductValidator()
            ->validateItems($cartChangeTransfer);
    }
}
