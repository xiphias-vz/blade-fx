<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Wishlist\Zed;

use Generated\Shared\Transfer\WishlistItemTransfer;
use Spryker\Client\Wishlist\Zed\WishlistStubInterface as SprykerWishlistStubInterface;

interface WishlistStubInterface extends SprykerWishlistStubInterface
{
    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    public function changeQuantity(WishlistItemTransfer $wishlistItemTransfer): WishlistItemTransfer;
}
