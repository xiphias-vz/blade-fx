<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Persistence;

use Spryker\Zed\Product\Persistence\ProductQueryContainerInterface as SprykerProductQueryContainerInterface;

interface ProductQueryContainerInterface extends SprykerProductQueryContainerInterface
{
    /**
     * Specification:
     * - TODO: Add method specification.
     *
     * @api
     *
     * @param int $idProductAbstract
     *
     * @return \Orm\Zed\Product\Persistence\SpyProductAbstractStoreQuery
     */
    public function queryProductAbstractPyzStoreWithStoresByFkProductAbstract($idProductAbstract);
}
