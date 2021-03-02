<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

interface TimeSlotClientInterface
{
    /**
     * Specification:
     * - Returns a list of time slots by Shipment Method
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodTransfer
     */
    public function expandWithShipmentTimeSlots(ShipmentMethodTransfer $shipmentMethodTransfer): ShipmentMethodTransfer;

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer|null $merchantTransfer
     *
     * @return bool
     */
    public function isShipmentTimeSlotsValid(ShipmentTransfer $shipmentTransfer, ?MerchantTransfer $merchantTransfer = null): bool;

    /**
     * @param string $currentDate
     * @param string $timeSlot
     *
     * @return array
     */
    public function getDateTimeSlotCapacityForNextDays(string $currentDate, string $timeSlot): array;

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer;
}
