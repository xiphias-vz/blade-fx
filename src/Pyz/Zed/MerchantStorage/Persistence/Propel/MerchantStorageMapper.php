<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence\Propel;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchant;
use Orm\Zed\MerchantStorage\Persistence\Base\PyzMerchantsListStorage;
use Propel\Runtime\Collection\ObjectCollection;

class MerchantStorageMapper
{
    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\Merchant\Persistence\SpyMerchant[] $merchantEntities
     * @param \Generated\Shared\Transfer\MerchantCollectionTransfer $merchantCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function mapMerchantEntitiesToMerchantCollectionTransfer(
        ObjectCollection $merchantEntities,
        MerchantCollectionTransfer $merchantCollectionTransfer
    ): MerchantCollectionTransfer {
        foreach ($merchantEntities as $merchantEntity) {
            $merchantTransfer = (new MerchantTransfer())
                ->setName($merchantEntity->getName())
                ->setMerchantReference($merchantEntity->getMerchantReference())
                ->setPickingCapacityPerSlot($merchantEntity->getPickingCapacityPerSlot())
                ->setDeliveryCapacityPerSlot($merchantEntity->getDeliveryCapacityPerSlot());

            $merchantTransfer = $this->mapDeliveryPostalCodesToMerchantTransfer($merchantEntity, $merchantTransfer);

            if ($merchantEntity->getFkStore()) {
                $merchantTransfer->setStoreName($merchantEntity->getSpyStore()->getName());
            }

            $merchantCollectionTransfer->addMerchants($merchantTransfer);
        }

        return $merchantCollectionTransfer;
    }

    /**
     * @param \Orm\Zed\MerchantStorage\Persistence\Base\PyzMerchantsListStorage $merchantsListStorage
     * @param \Generated\Shared\Transfer\MerchantCollectionTransfer $merchantCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function mapMerchantsListStorageEntityToMerchantCollectionTransfer(
        PyzMerchantsListStorage $merchantsListStorage,
        MerchantCollectionTransfer $merchantCollectionTransfer
    ): MerchantCollectionTransfer {
        foreach ($merchantsListStorage->getData() as $merchant) {
            $merchantTransfer = (new MerchantTransfer())
                ->setName($merchant[MerchantTransfer::NAME])
                ->setMerchantReference($merchant[MerchantTransfer::MERCHANT_REFERENCE]);

            $merchantCollectionTransfer->addMerchants($merchantTransfer);
        }

        return $merchantCollectionTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantCollectionTransfer $merchantCollectionTransfer
     * @param \Orm\Zed\MerchantStorage\Persistence\Base\PyzMerchantsListStorage $merchantsListStorage
     *
     * @return \Orm\Zed\MerchantStorage\Persistence\Base\PyzMerchantsListStorage
     */
    public function mapMerchantCollectionTransferToMerchantsListStorageEntity(
        MerchantCollectionTransfer $merchantCollectionTransfer,
        PyzMerchantsListStorage $merchantsListStorage
    ): PyzMerchantsListStorage {
        $merchants = [];

        foreach ($merchantCollectionTransfer->getMerchants() as $merchant) {
            $merchants[] = [
                MerchantTransfer::NAME => $merchant->getName(),
                MerchantTransfer::MERCHANT_REFERENCE => $merchant->getMerchantReference(),
                MerchantTransfer::PICKING_CAPACITY_PER_SLOT => $merchant->getPickingCapacityPerSlot(),
                MerchantTransfer::DELIVERY_CAPACITY_PER_SLOT => $merchant->getDeliveryCapacityPerSlot(),
                MerchantTransfer::DELIVERY_POSTAL_CODES => $merchant->getDeliveryPostalCodes(),
            ];
        }

        return $merchantsListStorage->setData($merchants)->setStore($merchantCollectionTransfer->getStoreName());
    }

    /**
     * @param \Orm\Zed\Merchant\Persistence\SpyMerchant $merchantEntity
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function mapDeliveryPostalCodesToMerchantTransfer(
        SpyMerchant $merchantEntity,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer {
        $deliveryPostalCodes = [];
        foreach ($merchantEntity->getPyzMerchantDeliveryPostalCodes() as $deliveryPostalCodeEntity) {
            $deliveryPostalCodes[] = $deliveryPostalCodeEntity->getPyzPostalCode()->getPostalCode();
        }

        return $merchantTransfer->setDeliveryPostalCodes($deliveryPostalCodes);
    }
}
