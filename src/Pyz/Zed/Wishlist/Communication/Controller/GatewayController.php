<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Communication\Controller;

use Generated\Shared\Transfer\WishlistItemTransfer;
use Spryker\Zed\Wishlist\Communication\Controller\GatewayController as SprykerGatewayController;

/**
 * @method \Pyz\Zed\Wishlist\Business\WishlistFacadeInterface getFacade()
 */
class GatewayController extends SprykerGatewayController
{
    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemUpdateRequestTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    public function changeQuantityAction(WishlistItemTransfer $wishlistItemUpdateRequestTransfer): WishlistItemTransfer
    {
        return $this->getFacade()->changeQuantity($wishlistItemUpdateRequestTransfer);
    }
}
