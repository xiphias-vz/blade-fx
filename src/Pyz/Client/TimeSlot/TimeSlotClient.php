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
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\TimeSlot\TimeSlotFactory getFactory()
 */
class TimeSlotClient extends AbstractClient implements TimeSlotClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodTransfer
     */
    public function expandWithShipmentTimeSlots(ShipmentMethodTransfer $shipmentMethodTransfer): ShipmentMethodTransfer
    {
        return $this->getFactory()
            ->createShipmentTimeSlotsExpander()
            ->expandWithTimeSlots($shipmentMethodTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer|null $merchantTransfer
     *
     * @return bool
     */
    public function isShipmentTimeSlotsValid(ShipmentTransfer $shipmentTransfer, ?MerchantTransfer $merchantTransfer = null): bool
    {
        return $this->getFactory()
            ->createShipmentTimeSlotsExpander()
            ->isShipmentTimeSlotsValid($shipmentTransfer, $merchantTransfer);
    }

    /**
     * @param string $currentDate
     * @param string $timeSlot
     *
     * @return array
     */
    public function getDateTimeSlotCapacityForNextDays(string $currentDate, string $timeSlot): array
    {
        $query = new PyzTimeSlotQuery();
        $calcutedDate = strtotime("+5 days", strtotime($currentDate));
        $calcutedDate = date("Y-m-d", $calcutedDate);
        $betweenDates = [ 'min' => $currentDate, 'max' => $calcutedDate ];

        return $query
            ->filterByDate_Between($betweenDates)
            ->find()
            ->toArray();
    }

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer
    {
        return $this->getFactory()
            ->createZedStub()
            ->getTimeSlot();
    }
}
