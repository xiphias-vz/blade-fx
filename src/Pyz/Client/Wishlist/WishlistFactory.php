<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Wishlist;

use Pyz\Client\Wishlist\Cart\CartHandler;
use Pyz\Client\Wishlist\Zed\WishlistStub;
use Pyz\Client\Wishlist\Zed\WishlistStubInterface;
use Spryker\Client\Wishlist\Cart\CartHandlerInterface;
use Spryker\Client\Wishlist\Dependency\Client\WishlistToCartInterface;
use Spryker\Client\Wishlist\WishlistClientInterface;
use Spryker\Client\Wishlist\WishlistDependencyProvider;
use Spryker\Client\Wishlist\WishlistFactory as SprykerWishlistFactory;

class WishlistFactory extends SprykerWishlistFactory
{
    /**
     * @param \Spryker\Client\Wishlist\Dependency\Client\WishlistToCartInterface $cartClient
     * @param \Spryker\Client\Wishlist\WishlistClientInterface $wishlistClient
     *
     * @return \Spryker\Client\Wishlist\Cart\CartHandlerInterface
     */
    public function createCartHandler(WishlistToCartInterface $cartClient, WishlistClientInterface $wishlistClient): CartHandlerInterface
    {
        return new CartHandler(
            $cartClient,
            $wishlistClient,
            $this->getWishlistPostMoveToCartCollectionExpanderPlugins(),
            $this->getWishlistCollectionToRemoveExpanderPlugins()
        );
    }

    /**
     * @return \Pyz\Client\Wishlist\Zed\WishlistStubInterface
     */
    public function createZedStub(): WishlistStubInterface
    {
        return new WishlistStub(
            $this->getProvidedDependency(WishlistDependencyProvider::SERVICE_ZED)
        );
    }
}
