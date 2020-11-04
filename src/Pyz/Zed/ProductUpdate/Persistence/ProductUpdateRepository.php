<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Persistence;

use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\Store\Persistence\Map\SpyStoreTableMap;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

class ProductUpdateRepository extends AbstractRepository implements ProductUpdateRepositoryInterface
{
    /**
     * @return int[]
     */
    public function getRegionToStoreNameMapping(): array
    {
        return SpyMerchantQuery::create()
            ->select([SpyMerchantTableMap::COL_REGION_NUMBER, SpyStoreTableMap::COL_NAME])
            ->innerJoinWithSpyStore()
            ->groupBy([SpyMerchantTableMap::COL_REGION_NUMBER, SpyStoreTableMap::COL_NAME])
            ->find()
            ->toKeyValue(SpyMerchantTableMap::COL_REGION_NUMBER, SpyStoreTableMap::COL_NAME);
    }
}
