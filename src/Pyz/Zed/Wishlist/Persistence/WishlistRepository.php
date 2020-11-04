<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Persistence;

use Generated\Shared\Transfer\WishlistCollectionTransfer;
use Generated\Shared\Transfer\WishlistTransfer;
use Orm\Zed\Wishlist\Persistence\Map\SpyWishlistItemTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Wishlist\Persistence\WishlistRepository as SprykerWishlistRepository;

/**
 * @method \Spryker\Zed\Wishlist\Persistence\WishlistPersistenceFactory getFactory()
 */
class WishlistRepository extends SprykerWishlistRepository
{
    /**
     * @param string $customerReference
     *
     * @return \Generated\Shared\Transfer\WishlistCollectionTransfer
     */
    public function getByCustomerReference(string $customerReference): WishlistCollectionTransfer
    {
        $wishlistEntities = $this->getFactory()->createWishlistQuery()
            ->useSpyCustomerQuery()
                ->filterByCustomerReference($customerReference)
            ->endUse()
            ->useSpyWishlistItemQuery(null, Criteria::LEFT_JOIN)
                ->withColumn(
                    sprintf('COUNT(%s)', SpyWishlistItemTableMap::COL_ID_WISHLIST_ITEM),
                    WishlistTransfer::NUMBER_OF_ITEMS
                )
            ->endUse()
            ->groupByIdWishlist()
            ->find();

        if (!$wishlistEntities->count()) {
            return new WishlistCollectionTransfer();
        }

        return $this->getFactory()->createWishlistMapper()
            ->mapWishlistEntitiesToWishlistCollectionTransfer($wishlistEntities, new WishlistCollectionTransfer());
    }
}
