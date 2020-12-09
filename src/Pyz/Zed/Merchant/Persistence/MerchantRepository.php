<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence;

use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
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
     * @param \Generated\Shared\Transfer\MerchantCriteriaFilterTransfer $merchantCriteriaFilterTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findOne(MerchantCriteriaFilterTransfer $merchantCriteriaFilterTransfer): ?MerchantTransfer
    {
        $merchantQuery = $this->getFactory()->createMerchantQuery();

        $merchantQuery = $this->applyFilters($merchantQuery, $merchantCriteriaFilterTransfer);

        if ($merchantCriteriaFilterTransfer->getWithDeliveryPostalCodes()) {
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

        if ($merchantCriteriaFilterTransfer->getWithTimeSlots()) {
            $timeslotEntities = PyzTimeSlotQuery::create()->filterByMerchantReference($merchantTransfer->getMerchantReference())->find();

            $weekDaysTimeSlotsTransfer = $this->getFactory()
                ->pyzCreatePropelMerchantMapper()
                ->mapTimeslotEntitiesToWeekDaysTimeSlotsTransfer($timeslotEntities);

            $merchantTransfer->setWeekDaysTimeSlots($weekDaysTimeSlotsTransfer);
        }

        return $merchantTransfer;
    }
}
