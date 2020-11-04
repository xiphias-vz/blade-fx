<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Wishlist\Business;

use Pyz\Zed\Wishlist\Business\Model\Reader;
use Pyz\Zed\Wishlist\Business\Model\Writer;
use Pyz\Zed\Wishlist\Business\Model\WriterInterface;
use Spryker\Zed\Wishlist\Business\Model\ReaderInterface;
use Spryker\Zed\Wishlist\Business\WishlistBusinessFactory as SprykerWishlistBusinessFactory;

/**
 * @method \Pyz\Zed\Wishlist\Persistence\WishlistRepository getRepository()
 */
class WishlistBusinessFactory extends SprykerWishlistBusinessFactory
{
    /**
     * @return \Pyz\Zed\Wishlist\Business\Model\WriterInterface
     */
    public function createWriter(): WriterInterface
    {
        return new Writer(
            $this->getQueryContainer(),
            $this->createReader(),
            $this->getProductFacade(),
            $this->getAddItemPreCheckPlugins()
        );
    }

    /**
     * @return \Spryker\Zed\Wishlist\Business\Model\ReaderInterface
     */
    public function createReader(): ReaderInterface
    {
        return new Reader(
            $this->getQueryContainer(),
            $this->getProductQueryContainer(),
            $this->createTransferMapper(),
            $this->getRepository()
        );
    }
}
