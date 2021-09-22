<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence;

use Generated\Shared\Transfer\MerchantCriteriaTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\StoreRelationTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\PostalCode\Persistence\Map\PyzPostalCodeTableMap;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Spryker\Zed\Merchant\Persistence\MerchantRepository as SprykerMerchantRepository;

/**
 * @method \Pyz\Zed\Merchant\Persistence\MerchantPersistenceFactory getFactory()
 */
class MerchantRepository extends SprykerMerchantRepository implements MerchantRepositoryInterface
{
    public const POSTAL_GROUP_VIRTUAL_COLUMN = 'POSTAL_GROUP_VIRTUAL_COLUMN';

    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findMerchantByMerchantReference(string $merchantReference): ?MerchantTransfer
    {
        $merchantEntity = $this->getFactory()->createMerchantQuery()
            ->filterByMerchantReference($merchantReference)
            ->findOne();

        if ($merchantEntity !== null) {
            return (new MerchantTransfer())->fromArray($merchantEntity->toArray(), true);
        }

        return null;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantCriteriaTransfer $merchantCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findOne(MerchantCriteriaTransfer $merchantCriteriaTransfer): ?MerchantTransfer
    {
        $merchantQuery = $this->getFactory()->createMerchantQuery();
        $merchantQuery = $this->applyFilters($merchantQuery, $merchantCriteriaTransfer);

        if ($merchantCriteriaTransfer->getWithDeliveryPostalCodes()) {
            $merchantQuery->usePyzMerchantDeliveryPostalCodeQuery(null, Criteria::LEFT_JOIN)
                    ->usePyzPostalCodeQuery(null, Criteria::LEFT_JOIN)
                        ->withColumn(sprintf('GROUP_CONCAT(%s)', PyzPostalCodeTableMap::COL_POSTAL_CODE), static::POSTAL_GROUP_VIRTUAL_COLUMN)
                    ->endUse()
                ->endUse()
                ->addGroupByColumn(SpyMerchantTableMap::COL_ID_MERCHANT);
        }

        $merchantEntity = $merchantQuery->findOne();

        if (!$merchantEntity) {
            return null;
        }

        $merchantTransfer = $this->getFactory()
            ->pyzCreatePropelMerchantMapper()
            ->mapMerchantEntityToMerchantTransfer($merchantEntity, new MerchantTransfer());

        if ($merchantCriteriaTransfer->getWithTimeSlots()) {
            $timeslotEntities = PyzTimeSlotQuery::create()->filterByMerchantReference($merchantTransfer->getMerchantReference())->find();

            $merchantTransfer->setWeekDaysTimeSlots(
                $this->getFactory()->pyzCreatePropelMerchantMapper()
                    ->mapTimeslotEntitiesToWeekDaysTimeSlotsTransfer($timeslotEntities)
            );

            $merchantTransfer->setDateTimeSlots(
                $this->getFactory()->pyzCreatePropelMerchantMapper()
                    ->mapTimeslotEntitiesToDateTimeSlotsTransfer($timeslotEntities)
            );
        }

        return $merchantTransfer;
    }

    /**
     * @param int[] $merchantIds
     *
     * @return \Generated\Shared\Transfer\StoreRelationTransfer[]
     */
    public function getMerchantStoreRelationMapByMerchantIds(array $merchantIds): array
    {
        $storeRelationTransfers = [];
        $merchants = $this->getFactory()
            ->createMerchantQuery()
            ->joinWithSpyStore()
            ->filterByIdMerchant_In($merchantIds)
            ->find();

        foreach ($merchants as $merchantEntity) {
            $idMerchant = $merchantEntity->getIdMerchant();
            $storeRelationTransfers[$merchantEntity->getIdMerchant()] = (new StoreRelationTransfer())
                ->setIdEntity($idMerchant)
                ->setStores(new \ArrayObject(
                    [(new StoreTransfer)
                        ->setIdStore($merchantEntity->getFkStore())
                        ->setName($merchantEntity->getSpyStore()->getName())
                    ]
                ))
                ->setIdStores([$merchantEntity->getFkStore()])
            ;
        }

        return $storeRelationTransfers;
    }
}
