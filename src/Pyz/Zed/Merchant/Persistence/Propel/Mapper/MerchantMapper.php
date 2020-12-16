<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence\Propel\Mapper;

use ArrayObject;
use Generated\Shared\Transfer\DateTimeSlotsTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\TimeSlotCapacityTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchant;
use Propel\Runtime\Collection\ObjectCollection;
use Pyz\Zed\Merchant\Persistence\MerchantRepository;
use Spryker\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapper as SprykerMerchantMapper;

class MerchantMapper extends SprykerMerchantMapper implements MerchantMapperInterface
{
    protected const TIME_SLOT_DATE_TIME_FORMAT = 'Y-m-d';

    /**
     * @param \Orm\Zed\Merchant\Persistence\SpyMerchant $spyMerchant
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function mapMerchantEntityToMerchantTransfer(
        SpyMerchant $spyMerchant,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer {
        $merchantTransfer = $merchantTransfer->fromArray(
            $spyMerchant->toArray(),
            true
        );

        if ($spyMerchant->hasVirtualColumn(MerchantRepository::POSTAL_GROUP_VIRTUAL_COLUMN)) {
            $merchantTransfer->setDeliveryPostalCodes(
                explode(',', $spyMerchant->getVirtualColumn(MerchantRepository::POSTAL_GROUP_VIRTUAL_COLUMN))
            );
        }

        return $merchantTransfer;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection $timeSlots
     *
     * @return \ArrayObject
     */
    public function mapTimeslotEntitiesToWeekDaysTimeSlotsTransfer(ObjectCollection $timeSlots): ArrayObject
    {
        $weekDaysTimeSlotsTransfer = new ArrayObject();

        foreach ($this->getTimeSlotsIndexedByDay($timeSlots) as $dayName => $weekDayTimeSlots) {
            $weekDayTimeSlotsTransfer = (new WeekDayTimeSlotsTransfer())->setWeekDayName($dayName);

            foreach ($weekDayTimeSlots as $timeSlot => $capacity) {
                $weekDayTimeSlotsTransfer->addTimeSlotsCapacity(
                    (new TimeSlotCapacityTransfer())->setTimeSlot($timeSlot)->setCapacity($capacity)
                );
            }

            $weekDaysTimeSlotsTransfer->append($weekDayTimeSlotsTransfer);
        }

        return $weekDaysTimeSlotsTransfer;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection $timeSlots
     *
     * @return \ArrayObject
     */
    public function mapTimeslotEntitiesToDateTimeSlotsTransfer(ObjectCollection $timeSlots): ArrayObject
    {
        $datesTimeSlotsTransfer = new ArrayObject();

        foreach ($this->getTimeSlotsIndexedByDate($timeSlots) as $date => $dateTimeSlots) {
            $dateTimeSlotsTransfer = (new DateTimeSlotsTransfer())->setDate($date);

            foreach ($dateTimeSlots as $timeSlot => $capacity) {
                $dateTimeSlotsTransfer->addTimeSlotsCapacity(
                    (new TimeSlotCapacityTransfer())->setTimeSlot($timeSlot)->setCapacity($capacity)
                );
            }

            $datesTimeSlotsTransfer->append($dateTimeSlotsTransfer);
        }

        return $datesTimeSlotsTransfer;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection $timeSlots
     *
     * @return array
     */
    protected function getTimeSlotsIndexedByDate(ObjectCollection $timeSlots): array
    {
        $timeSlotsIndexedByDate = [];

        foreach ($timeSlots as $timeSlot) {
            if (!$timeSlot->getDate()) {
                continue;
            }

            /** @var \Orm\Zed\TimeSlot\Persistence\PyzTimeSlot $timeSlot */
            $dateIndex = $timeSlot->getDate()->format(static::TIME_SLOT_DATE_TIME_FORMAT);
            $timeSlotsIndexedByDate[$dateIndex][$timeSlot->getTimeSlot()] = $timeSlot->getCapacity();
        }

        return $timeSlotsIndexedByDate;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection $timeSlots
     *
     * @return array
     */
    protected function getTimeSlotsIndexedByDay(ObjectCollection $timeSlots): array
    {
        $timeSlotsIndexedByDay = [];

        foreach ($timeSlots as $timeSlot) {
            if ($timeSlot->getDate()) {
                continue;
            }

            /** @var \Orm\Zed\TimeSlot\Persistence\PyzTimeSlot $timeSlot */
            $timeSlotsIndexedByDay[$timeSlot->getDay()][$timeSlot->getTimeSlot()] = $timeSlot->getCapacity();
        }

        return $timeSlotsIndexedByDay;
    }
}
