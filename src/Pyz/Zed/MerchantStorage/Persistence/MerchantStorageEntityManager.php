<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Orm\Zed\Merchant\Persistence\Base\SpyMerchantQuery;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStoragePersistenceFactory getFactory()
 */
class MerchantStorageEntityManager extends AbstractEntityManager implements MerchantStorageEntityManagerInterface
{
    protected const ID_MERCHANT = 'idMerchant';
    protected const MERCHANT_SHORT_NAME = 'merchant_short_name';
    protected const MERCHANT_IS_AVAILABLE = 'is_shop_visible';
    protected const MERCHANT_IS_PASSWORD_PROTECTED = 'isPasswordProtected';
    protected const MERCHANT_PASSWORD = 'shop_password';
    protected const FILIAL_NUMBER = 'fillialNumber';

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

        $availableMerchants = $this->getAvailableMerchants();

        $merchantsListStorageMapper
            ->mapMerchantCollectionTransferToMerchantsListStorageEntity($merchantCollectionTransfer, $currentMerchantsList, $availableMerchants)
            ->save();
    }

    /**
     * @return array
     */
    public function getAvailableMerchants(): array
    {
          $storageData = [];
          $query = SpyMerchantQuery::create()
            ->filterByIsShopVisible(true)
            ->find();
          $visibleStores = $query->getData();
        foreach ($visibleStores as $store) {
            $storageData[$store->getMerchantShortName()][static::MERCHANT_IS_AVAILABLE] = $store->getIsShopVisible();
            $storageData[$store->getMerchantShortName()][static::MERCHANT_IS_PASSWORD_PROTECTED] = $store->getIsPasswordProtected();
            $storageData[$store->getMerchantShortName()][static::MERCHANT_PASSWORD] = $store->getShopPassword();
            $storageData[$store->getMerchantShortName()][static::FILIAL_NUMBER] = $store->getMerchantReference();
            $storageData[$store->getMerchantShortName()][static::ID_MERCHANT] = $store->getIdMerchant();
        }

          return $storageData;
    }
}
