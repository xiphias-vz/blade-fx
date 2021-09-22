<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Persistence;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantCriteriaTransfer;
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
     * @param \Generated\Shared\Transfer\MerchantCriteriaTransfer $merchantCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getMerchants(MerchantCriteriaTransfer $merchantCriteriaTransfer): MerchantCollectionTransfer
    {
        $merchantQuery = $this->getFactory()->createMerchantQuery()->leftJoinSpyStore();
        $merchantQuery
            ->leftJoinWithPyzMerchantDeliveryPostalCode()
            ->usePyzMerchantDeliveryPostalCodeQuery(null, Criteria::LEFT_JOIN)
                ->leftJoinWithPyzPostalCode()
            ->endUse();

        $merchantQuery = $this->applyFilters($merchantQuery, $merchantCriteriaTransfer);

        $merchantEntities = $merchantQuery->find();

        $merchantCollectionTransfer = $this->getFactory()->createMerchantStorageMapper()
            ->mapMerchantEntitiesToMerchantCollectionTransfer($merchantEntities, new MerchantCollectionTransfer());

        if ($merchantCriteriaTransfer->getIdStore() && $merchantCollectionTransfer->getMerchants()->count()) {
            $merchantTransfer = $merchantCollectionTransfer->getMerchants()[0];
            $merchantCollectionTransfer->setStoreName($merchantTransfer->getStoreName());
        }

        if ($merchantCriteriaTransfer->getWithTimeSlots()) {
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
     * @param \Generated\Shared\Transfer\MerchantCriteriaTransfer $merchantCriteriaTransfer
     *
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchantQuery
     */
    protected function applyFilters(SpyMerchantQuery $merchantQuery, MerchantCriteriaTransfer $merchantCriteriaTransfer)
    {
        if ($merchantCriteriaTransfer->getIdStore()) {
            $merchantQuery->filterByFkStore($merchantCriteriaTransfer->getIdStore());
        }

        return $merchantQuery;
    }
}
