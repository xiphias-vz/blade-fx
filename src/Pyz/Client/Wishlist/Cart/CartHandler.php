<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Wishlist\Cart;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\WishlistMoveToCartRequestCollectionTransfer;
use Generated\Shared\Transfer\WishlistMoveToCartRequestTransfer;
use Spryker\Client\Wishlist\Cart\CartHandler as SprykerCartHandler;

class CartHandler extends SprykerCartHandler
{
    /**
     * @param \Generated\Shared\Transfer\WishlistMoveToCartRequestCollectionTransfer $wishlistMoveToCartRequestCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistMoveToCartRequestCollectionTransfer
     */
    public function moveCollectionToCart(WishlistMoveToCartRequestCollectionTransfer $wishlistMoveToCartRequestCollectionTransfer): WishlistMoveToCartRequestCollectionTransfer
    {
        $cartChangeTransfer = $this->getCartChangeTransfer();

        foreach ($wishlistMoveToCartRequestCollectionTransfer->getRequests() as $wishlistMoveToCartRequestTransfer) {
            $this->assertRequestTransfer($wishlistMoveToCartRequestTransfer);

            $itemTransfer = $this->createItemTransfer($wishlistMoveToCartRequestTransfer->getSku(), $wishlistMoveToCartRequestTransfer->getWishlistItem()->getQuantity());
            $itemTransfer->setProductOptions($wishlistMoveToCartRequestTransfer->getWishlistItem()->getProductOptions());

            $cartChangeTransfer->addItem($itemTransfer);
        }
        $quoteTransfer = $this->cartClient->addValidItems($cartChangeTransfer);

        $failedToMoveRequestCollectionTransfer = $this->getWishlistRequestCollectionToCartDiff(
            $wishlistMoveToCartRequestCollectionTransfer,
            $quoteTransfer
        );

        return $failedToMoveRequestCollectionTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistMoveToCartRequestTransfer $wishlistMoveToCartRequestTransfer
     *
     * @return void
     */
    protected function assertRequestTransfer(WishlistMoveToCartRequestTransfer $wishlistMoveToCartRequestTransfer): void
    {
        $wishlistMoveToCartRequestTransfer->requireSku();
        $wishlistMoveToCartRequestTransfer->requireWishlistItem()->getWishlistItem()->requireQuantity();
    }

    /**
     * @return \Generated\Shared\Transfer\CartChangeTransfer
     */
    protected function getCartChangeTransfer(): CartChangeTransfer
    {
        $cartChangeTransfer = new CartChangeTransfer();
        $cartChangeTransfer->setQuote($this->cartClient->getQuote());

        return $cartChangeTransfer;
    }
}
