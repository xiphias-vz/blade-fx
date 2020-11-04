<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Business\Model;

use ArrayObject;
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
            $wishlistItemMetaTransfer = $this->convertProductEntityToWishlistItemMetaTransfer($productEntity);
            $wishlistItemMetaTransfer->setQuantity($wishlistItemEntity->getQuantity());
            $wishlistItemMetaTransfers->append($wishlistItemMetaTransfer);
        }

        return $wishlistItemMetaTransfers;
    }
}
