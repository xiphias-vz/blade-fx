<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\TimeSlot;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Pyz\Shared\Shipment\ShipmentConfig;
use Spryker\Service\Kernel\AbstractService;

class TimeSlotService extends AbstractService implements TimeSlotServiceInterface
{
    protected const ZERO_CAPACITY = 0;

    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param string $currentDate
     * @param string $timeSlot
     *
     * @return int|null
     */
    public function getMerchantTimeSlotCapacity(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer,
        string $currentDate,
        string $timeSlot
    ): ?int {
        if ($merchantTransfer->getDeliveryCapacityPerSlot()
            && $shipmentMethodTransfer->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_DELIVERY
        ) {
            return $merchantTransfer->getDeliveryCapacityPerSlot();
        }

        if ($shipmentMethodTransfer->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT) {
            return $this->getClickAndCollectCapacity($merchantTransfer, $currentDate, $timeSlot);
        }

        return static::ZERO_CAPACITY;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param string $currentDate
     * @param string $timeSlot
     *
     * @return int
     */
    protected function getClickAndCollectCapacity(MerchantTransfer $merchantTransfer, string $currentDate, string $timeSlot): int
    {
        $weekDaysTimeSlotsTransfer = $merchantTransfer->getWeekDaysTimeSlots();
        $dayOfWeek = date('l', strtotime($currentDate));

        foreach ($weekDaysTimeSlotsTransfer as $weekDayTimeSlotsTransfer) {
            if ($weekDayTimeSlotsTransfer->getWeekDayName() !== $dayOfWeek) {
                continue;
            }

            foreach ($weekDayTimeSlotsTransfer->getTimeSlotsCapacity() as $timeSlotCapacityTransfer) {
                if ($timeSlotCapacityTransfer->getTimeSlot() !== $timeSlot) {
                    continue;
                }

                return $timeSlotCapacityTransfer->getCapacity();
            }
        }

        return $merchantTransfer->getPickingCapacityPerSlot();
    }
}
