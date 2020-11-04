<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Wishlist;

use Generated\Shared\Transfer\WishlistItemTransfer;
use Pyz\Client\Wishlist\Zed\WishlistStubInterface;
use Spryker\Client\Wishlist\WishlistClient as SprykerWishlistClient;

/**
 * @method \Pyz\Client\Wishlist\WishlistFactory getFactory()
 */
class WishlistClient extends SprykerWishlistClient implements WishlistClientInterface
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
        return $this->getZedStub()->changeQuantity($wishlistItemTransfer);
    }

    /**
     * @return \Pyz\Client\Wishlist\Zed\WishlistStubInterface
     */
    protected function getZedStub(): WishlistStubInterface
    {
        return $this->getFactory()->createZedStub();
    }
}
