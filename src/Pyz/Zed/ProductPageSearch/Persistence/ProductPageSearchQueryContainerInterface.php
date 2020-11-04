<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Persistence;

use Orm\Zed\ProductPageSearch\Persistence\SpyProductConcretePageSearchQuery;
use Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchQueryContainerInterface as SprykerProductPageSearchQueryContainerInterface;

interface ProductPageSearchQueryContainerInterface extends SprykerProductPageSearchQueryContainerInterface
{
    /**
     * @api
     *
     * @return \Orm\Zed\ProductPageSearch\Persistence\SpyProductConcretePageSearchQuery
     */
    public function queryProductConcretePageSearchJoinProduct(): SpyProductConcretePageSearchQuery;
}
