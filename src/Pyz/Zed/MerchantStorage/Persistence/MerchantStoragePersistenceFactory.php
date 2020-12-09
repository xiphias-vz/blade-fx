<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence;

use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\MerchantStorage\Persistence\PyzMerchantsListStorageQuery;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
use Pyz\Zed\MerchantStorage\Persistence\Propel\MerchantStorageMapper;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\MerchantStorage\MerchantStorageConfig getConfig()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface getEntityManager()
 */
class MerchantStoragePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    public function createMerchantQuery(): SpyMerchantQuery
    {
        return SpyMerchantQuery::create();
    }

    /**
     * @return \Pyz\Zed\MerchantStorage\Persistence\Propel\MerchantStorageMapper
     */
    public function createMerchantStorageMapper(): MerchantStorageMapper
    {
        return new MerchantStorageMapper();
    }

    /**
     * @return \Orm\Zed\MerchantStorage\Persistence\PyzMerchantsListStorageQuery
     */
    public function createMerchantsListStorageQuery(): PyzMerchantsListStorageQuery
    {
        return new PyzMerchantsListStorageQuery();
    }

    /**
     * @return \Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery
     */
    public function createTimeSlotQuery(): PyzTimeSlotQuery
    {
        return new PyzTimeSlotQuery();
    }
}
