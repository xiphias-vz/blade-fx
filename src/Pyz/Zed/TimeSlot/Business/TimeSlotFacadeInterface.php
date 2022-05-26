<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotBusinessFactory getFactory()
 */
interface TimeSlotFacadeInterface
{
    /**
     * Specification:
     *   - Writes time slots with orders count (per slot) to the Storage
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function updateTimeSlotStorage(QuoteTransfer $quoteTransfer): void;

    /**
     * Specification:
     *   - Returns true if order shipment slot available or false otherwise
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return bool
     */
    public function checkTimeSlotAvailability(
        QuoteTransfer $quoteTransfer,
        CheckoutResponseTransfer $checkoutResponseTransfer
    ): bool;

    /**
     * Specification:
     *   - Releases a time slot capacity based on specified order.
     *
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     *
     * @return void
     */
    public function releaseTimeSlotForShipment(ShipmentTransfer $shipmentTransfer): void;

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer;

    /**
     * @param string $merchantReference
     *
     * @return array
     */
    public function getTimeSlotsArray(string $merchantReference): array;

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlotsForSpecificDate(): WeekDayTimeSlotsTransfer;

    /**
     * @param string $store
     *
     * @return array
     */
    public function getTimeSlotsFilteredByStore(string $store): array;

    /**
     * @param string $store
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function setTimeSlotsForSelectedStore(string $store, string $day, string $time, string $capacity): int;

    /**
     * @param string $store
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotsFilteredByDate(string $store, string $dateFrom, string $dateTo): array;

    /**
     * @param string $store
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotCapacityCountByDate(string $store, string $dateFrom, string $dateTo): array;

    /**
     * @param string $store
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function setTimeSlotsForSelectedDate(string $store, string $date, string $day, string $time, string $capacity): int;

    /**
     * @param string $store
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function setDefaultTimeSlotsForSelectedDate(string $store, string $date, string $day, string $time, string $capacity): int;

    /**
     * @param string $storeName
     *
     * @return int
     */
    public function getMerchantByStoreName(string $storeName): int;

    /**
     * @param string $store
     * @param string $date
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotsForSpecificDateAndDay(string $store, string $date, string $day): array;

    /**
     * @param string $store
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotCapacityForDefaultDay(string $store, string $day): array;

    /**
     * @param \Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer $timeSlotHistoryTransfer
     *
     * @return int
     */
    public function setTimeSlotsHistory(PyzTimeSlotHistoryTransfer $timeSlotHistoryTransfer): int;

    /**
     * @param array $event
     *
     * @return void
     */
    public function executeEvent(array $event): void;

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return mixed
     */
    public function setTimeslotDefinitionForStore(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer);

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     * @param string $storeName
     *
     * @return mixed
     */
    public function getTimeslotDefinition(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer, string $storeName);

    /**
     * @param string $merchantReference
     * @param string $exactDate
     * @param string $timeSlot
     * @param int $capacity
     * @param int|null $oldCapacity
     * @param int|null $idUser
     *
     * @return array
     */
    public function setTimeSlotExactDateCapacity(string $merchantReference, string $exactDate, string $timeSlot, int $capacity, ?int $oldCapacity, ?int $idUser): array;
}
