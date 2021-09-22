<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Business\Model;

use ArrayObject;
use Generated\Shared\Transfer\WishlistItemMetaTransfer;
use Spryker\Zed\Wishlist\Business\Model\Reader as SprykerReader;

class Reader extends SprykerReader
{
    /**
     * @param int $idWishlist
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\WishlistItemMetaTransfer[]
     */
    protected function createWishlistItemMetaCollection($idWishlist): ArrayObject
    {
        $wishlistItemEntities = $this->queryContainer
            ->queryItemsByWishlistId($idWishlist)
            ->find();

        $wishlistItemMetaTransfers = new ArrayObject();
        foreach ($wishlistItemEntities as $wishlistItemEntity) {
            $productEntity = $wishlistItemEntity->getSpyProduct();
            $wishlistItemMetaTransfer = new WishlistItemMetaTransfer();
            $wishlistItemMetaTransfer->fromArray($wishlistItemEntity->toArray(), true);
            $wishlistItemMetaTransfer = $this->transferMapper
                ->mapProductEntityToWishlistItemMetaTransfer($productEntity, $wishlistItemMetaTransfer);
            $wishlistItemMetaTransfer->setQuantity($wishlistItemEntity->getQuantity());
            $wishlistItemMetaTransfers->append($wishlistItemMetaTransfer);
        }

        return $wishlistItemMetaTransfers;
    }
}
