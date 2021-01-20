<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AlternativeEan\Persistence;

use Orm\Zed\AlternativeEan\Persistence\PyzAlternativeEanQuery;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\AlternativeEan\AlternativeEanConfig getConfig()
 */
class AlternativeEanPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\AlternativeEan\Persistence\PyzAlternativeEanQuery
     */
    public function createAlternativeEanQuery(): PyzAlternativeEanQuery
    {
        return PyzAlternativeEanQuery::create();
    }

    /**
     * @return \Orm\Zed\Product\Persistence\SpyProductQuery
     */
    public function createProductQuery(): SpyProductQuery
    {
        return SpyProductQuery::create();
    }
}
