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
    protected const IS_TRANSPORT_BOX_ENABLED = 'is_transportbox_enabled';

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
     * @param \Generated\Shared\Transfer\MerchantCollectionTransfer $merchantCollectionTransfer
     *
     * @return void
     */
    public function saveMerchantsToStorage(MerchantCollectionTransfer $merchantCollectionTransfer)
    {
        $merchantsListStorageMapper = $this->getFactory()
            ->createMerchantStorageMapper();

        $currentMerchantsList = $this->getFactory()
            ->createMerchantsListStorageQuery()
            ->findOneOrCreate();

        $merchants = SpyMerchantQuery::create()
            ->find()
            ->getData();

        $storageData = [];

        foreach ($merchants as $store) {
            $storageData[$store->getMerchantShortName()][static::MERCHANT_IS_AVAILABLE] = $store->getIsShopVisible();
            $storageData[$store->getMerchantShortName()][static::MERCHANT_IS_PASSWORD_PROTECTED] = $store->getIsPasswordProtected();
            $storageData[$store->getMerchantShortName()][static::MERCHANT_PASSWORD] = $store->getShopPassword();
            $storageData[$store->getMerchantShortName()][static::FILIAL_NUMBER] = $store->getMerchantReference();
            $storageData[$store->getMerchantShortName()][static::ID_MERCHANT] = $store->getIdMerchant();
            $storageData[$store->getMerchantShortName()][static::IS_TRANSPORT_BOX_ENABLED] = $store->getIsTransportboxEnabled();
        }

        $merchantsListStorageMapper
            ->mapMerchantCollectionTransferToMerchantsListStorageEntity($merchantCollectionTransfer, $currentMerchantsList, $storageData)
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
            $storageData[$store->getMerchantShortName()][static::IS_TRANSPORT_BOX_ENABLED] = $store->getIsTransportboxEnabled();
        }

          return $storageData;
    }
}
