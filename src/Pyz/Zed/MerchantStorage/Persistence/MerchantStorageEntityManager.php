<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStoragePersistenceFactory getFactory()
 */
class MerchantStorageEntityManager extends AbstractEntityManager implements MerchantStorageEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCollectionTransfer $merchantCollectionTransfer
     *
     * @return void
     */
    public function saveMerchantsList(MerchantCollectionTransfer $merchantCollectionTransfer)
    {
        $merchantsListStorageMapper = $this->getFactory()
            ->createMerchantStorageMapper();

        $currentMerchantsList = $this->getFactory()
            ->createMerchantsListStorageQuery()
            ->filterByStore($merchantCollectionTransfer->getStoreName())
            ->findOneOrCreate();

        $merchantsListStorageMapper
            ->mapMerchantCollectionTransferToMerchantsListStorageEntity($merchantCollectionTransfer, $currentMerchantsList)
            ->save();
    }
}
