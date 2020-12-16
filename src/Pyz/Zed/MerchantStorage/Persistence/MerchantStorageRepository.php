<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStoragePersistenceFactory getFactory()
 */
class MerchantStorageRepository extends AbstractRepository implements MerchantStorageRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCriteriaFilterTransfer $merchantCriteriaFilterTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getMerchants(MerchantCriteriaFilterTransfer $merchantCriteriaFilterTransfer): MerchantCollectionTransfer
    {
        $merchantQuery = $this->getFactory()->createMerchantQuery()->leftJoinSpyStore();
        $merchantQuery
            ->leftJoinWithPyzMerchantDeliveryPostalCode()
            ->usePyzMerchantDeliveryPostalCodeQuery(null, Criteria::LEFT_JOIN)
                ->leftJoinWithPyzPostalCode()
            ->endUse();

        $merchantQuery = $this->applyFilters($merchantQuery, $merchantCriteriaFilterTransfer);

        $merchantEntities = $merchantQuery->find();

        $merchantCollectionTransfer = $this->getFactory()->createMerchantStorageMapper()
            ->mapMerchantEntitiesToMerchantCollectionTransfer($merchantEntities, new MerchantCollectionTransfer());

        if ($merchantCriteriaFilterTransfer->getIdStore() && $merchantCollectionTransfer->getMerchants()->count()) {
            $merchantTransfer = $merchantCollectionTransfer->getMerchants()[0];
            $merchantCollectionTransfer->setStoreName($merchantTransfer->getStoreName());
        }

        if ($merchantCriteriaFilterTransfer->getWithTimeSlots()) {
            foreach ($merchantCollectionTransfer->getMerchants() as $merchantTransfer) {
                $timeslotEntities = PyzTimeSlotQuery::create()->filterByMerchantReference($merchantTransfer->getMerchantReference())->find();

                $weekDaysTimeSlotsRaw = $this->getFactory()
                    ->createMerchantStorageMapper()
                    ->mapTimeslotEntitiesToWeekDaysTimeSlotsTransferRaw($timeslotEntities);

                $dateTimeSlotsRaw = $this->getFactory()
                    ->createMerchantStorageMapper()
                    ->mapTimeslotEntitiesToDateTimeSlotsTransferRaw($timeslotEntities);

                $merchantTransfer->setWeekDaysTimeSlotsRaw($weekDaysTimeSlotsRaw);
                $merchantTransfer->setDateTimeSlotsRaw($dateTimeSlotsRaw);
            }
        }

        return $merchantCollectionTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer|null
     */
    public function findMerchantsListStorage(): ?MerchantCollectionTransfer
    {
        $merchantListStorageEntity = $this->getFactory()->createMerchantsListStorageQuery()->findOne();

        if (!$merchantListStorageEntity) {
            return null;
        }

        return $this->getFactory()
            ->createMerchantStorageMapper()
            ->mapMerchantsListStorageEntityToMerchantCollectionTransfer($merchantListStorageEntity, new MerchantCollectionTransfer());
    }

    /**
     * @param array $merchantIds
     *
     * @return array
     */
    public function getStoreIdsByMerchantIds(array $merchantIds): array
    {
        return $this->getFactory()
            ->createMerchantQuery()
            ->filterByIdMerchant_In($merchantIds)
            ->select([SpyMerchantTableMap::COL_FK_STORE])
            ->groupBy(SpyMerchantTableMap::COL_FK_STORE)
            ->find()
            ->toArray();
    }

    /**
     * @param \Orm\Zed\Merchant\Persistence\SpyMerchantQuery $merchantQuery
     * @param \Generated\Shared\Transfer\MerchantCriteriaFilterTransfer $merchantCriteriaFilterTransfer
     *
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    protected function applyFilters(SpyMerchantQuery $merchantQuery, MerchantCriteriaFilterTransfer $merchantCriteriaFilterTransfer)
    {
        if ($merchantCriteriaFilterTransfer->getIdStore()) {
            $merchantQuery->filterByFkStore($merchantCriteriaFilterTransfer->getIdStore());
        }

        return $merchantQuery;
    }
}
