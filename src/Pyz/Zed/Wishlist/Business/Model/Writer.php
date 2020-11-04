<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Business\Model;

use Generated\Shared\Transfer\ProductConcreteTransfer;
use Generated\Shared\Transfer\WishlistItemTransfer;
use Generated\Shared\Transfer\WishlistTransfer;
use Spryker\Zed\Wishlist\Business\Model\Writer as SprykerWriter;

class Writer extends SprykerWriter implements WriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    public function addItem(WishlistItemTransfer $wishlistItemTransfer): WishlistItemTransfer
    {
        $this->assertWishlistItemUpdateRequest($wishlistItemTransfer);

        if ($this->isWishListNameInItemValid($wishlistItemTransfer) === false) {
            return $wishlistItemTransfer;
        }

        $productConcreteTransfer = (new ProductConcreteTransfer())->setSku($wishlistItemTransfer->getSku());

        if ($this->productFacade
            && (!$this->productFacade->hasProductConcrete($wishlistItemTransfer->getSku())
                || !$this->productFacade->isProductConcreteActive($productConcreteTransfer))) {
            return $wishlistItemTransfer;
        }

        if (!$this->preAddItemCheck($wishlistItemTransfer)) {
            return $wishlistItemTransfer;
        }

        $idWishlist = $this->getDefaultWishlistIdByName(
            $wishlistItemTransfer->getWishlistName(),
            $wishlistItemTransfer->getFkCustomer()
        );

        $wishlistItemEntity = $this->queryContainer->queryWishlistItem()
            ->filterByFkWishlist($idWishlist)
            ->filterBySku($wishlistItemTransfer->getSku())
            ->findOneOrCreate();

        $originalQuantity = $wishlistItemEntity->isNew() ? 0 : $wishlistItemEntity->getQuantity();
        $wishlistItemEntity->setQuantity($originalQuantity + ($wishlistItemTransfer->getQuantity() ?: 1));

        $wishlistItemEntity->save();

        $wishlistItemTransfer->setIdWishlistItem($wishlistItemEntity->getIdWishlistItem());

        return $wishlistItemTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    public function changeQuantity(WishlistItemTransfer $wishlistItemTransfer): WishlistItemTransfer
    {
        $this->assertWishlistItemUpdateRequest($wishlistItemTransfer);

        if ($this->isWishListNameInItemValid($wishlistItemTransfer) === false) {
            return $wishlistItemTransfer;
        }

        $idWishlist = $this->getDefaultWishlistIdByName(
            $wishlistItemTransfer->getWishlistName(),
            $wishlistItemTransfer->getFkCustomer()
        );

        $wishlistItemEntity = $this->queryContainer->queryWishlistItem()
            ->filterByFkWishlist($idWishlist)
            ->filterBySku($wishlistItemTransfer->getSku())
            ->findOne();

        if ($wishlistItemEntity) {
            $wishlistItemEntity->setQuantity($this->getWishlistItemQuantity($wishlistItemTransfer));
            $wishlistItemEntity->save();
        }

        return $wishlistItemTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return int
     */
    protected function getWishlistItemQuantity(WishlistItemTransfer $wishlistItemTransfer): int
    {
        return $wishlistItemTransfer->getQuantity() > 0 ? $wishlistItemTransfer->getQuantity() : 1;
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return bool
     */
    protected function isWishListNameInItemValid(WishlistItemTransfer $wishlistItemTransfer): bool
    {
        $wishlistTransfer = (new WishlistTransfer())
            ->setName($wishlistItemTransfer->getWishlistName())
            ->setFkCustomer($wishlistItemTransfer->getFkCustomer());

        return $this->isWishListNameValid($wishlistTransfer);
    }
}
