<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Business;

use Generated\Shared\Transfer\WishlistItemTransfer;
use Spryker\Zed\Wishlist\Business\WishlistFacadeInterface as SprykerWishlistFacadeInterface;

/**
 * @method \Pyz\Zed\Wishlist\Business\WishlistBusinessFactory getFactory()
 */
interface WishlistFacadeInterface extends SprykerWishlistFacadeInterface
{
    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    public function changeQuantity(WishlistItemTransfer $wishlistItemTransfer): WishlistItemTransfer;
}
