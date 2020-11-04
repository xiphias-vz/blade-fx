<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Business;

use Generated\Shared\Transfer\WishlistItemTransfer;
use Spryker\Zed\Wishlist\Business\WishlistFacade as SprykerWishlistFacade;

/**
 * @method \Pyz\Zed\Wishlist\Business\WishlistBusinessFactory getFactory()
 */
class WishlistFacade extends SprykerWishlistFacade implements WishlistFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    public function changeQuantity(WishlistItemTransfer $wishlistItemTransfer): WishlistItemTransfer
    {
        return $this->getFactory()
            ->createWriter()
            ->changeQuantity($wishlistItemTransfer);
    }
}
