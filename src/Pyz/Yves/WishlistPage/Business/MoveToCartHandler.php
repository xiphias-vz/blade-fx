<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\WishlistPage\Business;

use Generated\Shared\Transfer\WishlistItemMetaTransfer;
use Generated\Shared\Transfer\WishlistItemTransfer;
use Generated\Shared\Transfer\WishlistMoveToCartRequestTransfer;
use SprykerShop\Yves\WishlistPage\Business\MoveToCartHandler as SprykerShopMoveToCartHandler;

class MoveToCartHandler extends SprykerShopMoveToCartHandler
{
    /**
     * @param string $wishlistName
     * @param \Generated\Shared\Transfer\WishlistItemMetaTransfer $wishlistItemMetaTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistMoveToCartRequestTransfer
     */
    protected function createWishlistMoveToCartRequestTransfer($wishlistName, WishlistItemMetaTransfer $wishlistItemMetaTransfer): WishlistMoveToCartRequestTransfer
    {
        $wishlistItemTransfer = new WishlistItemTransfer();
        $wishlistItemTransfer
            ->setSku($wishlistItemMetaTransfer->getSku())
            ->setWishlistName($wishlistName)
            ->setFkCustomer($this->getIdCustomer())
            ->setQuantity($wishlistItemMetaTransfer->getQuantity())
            ->setProductOptions($wishlistItemMetaTransfer->getProductOptions());

        $wishlistMoveToCartRequestTransfer = (new WishlistMoveToCartRequestTransfer())
            ->setSku($wishlistItemMetaTransfer->getSku())
            ->setWishlistItem($wishlistItemTransfer);

        return $wishlistMoveToCartRequestTransfer;
    }
}
