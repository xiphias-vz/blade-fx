<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantStorage\Mapper;

use ArrayObject;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\TimeSlotCapacityTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

class MerchantStorageMapper implements MerchantStorageMapperInterface
{
    /**
     * @param array $merchantStorageData
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function mapMerchantStorageDataToMerchantTransfer(
        array $merchantStorageData,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer {
        $merchantTransfer = $merchantTransfer->fromArray($merchantStorageData, true);
        $merchantTransfer = $this->mapShipmentTimeSlotsCapacity($merchantStorageData, $merchantTransfer);

        return $merchantTransfer;
    }

    /**
     * @param array $merchantStorageData
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function mapShipmentTimeSlotsCapacity(
        array $merchantStorageData,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer {
        $merchantTransfer->setWeekDaysTimeSlots(new ArrayObject());
        $weekDaysTimeSlots = $merchantStorageData[MerchantTransfer::WEEK_DAYS_TIME_SLOTS] ?? [];

        foreach ($weekDaysTimeSlots as $dayName => $weekDayTimeSlots) {
            $weekDayTimeSlotsTransfer = (new WeekDayTimeSlotsTransfer())->setWeekDayName($dayName);

            foreach ($weekDayTimeSlots as $timeSlot => $capacity) {
                    $weekDayTimeSlotsTransfer->addTimeSlotsCapacity(
                        (new TimeSlotCapacityTransfer())->setTimeSlot($timeSlot)->setCapacity($capacity)
                    );
            }

            $merchantTransfer->addWeekDaysTimeSlots($weekDayTimeSlotsTransfer);
        }

        return $merchantTransfer;
    }
}
