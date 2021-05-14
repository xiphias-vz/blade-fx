<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotBusinessFactory getFactory()
 * @method \Pyz\Zed\TimeSlot\TimeSlotConfig getConfig()
 */
class TimeSlotFacade extends AbstractFacade implements TimeSlotFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function updateTimeSlotStorage(QuoteTransfer $quoteTransfer): void
    {
        $this->getFactory()->createTimeSlotWriter()->updateTimeSlotByQuote($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return bool
     */
    public function checkTimeSlotAvailability(
        QuoteTransfer $quoteTransfer,
        CheckoutResponseTransfer $checkoutResponseTransfer
    ): bool {
        return $this->getFactory()->createTimeSlotAvailabilityValidator()->hasTimeSlotAvailability($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     *
     * @return void
     */
    public function releaseTimeSlotForShipment(ShipmentTransfer $shipmentTransfer): void
    {
        $this->getFactory()
            ->createTimeSlotCapacityReleaser()
            ->releaseTimeSlotByShipment($shipmentTransfer);
    }

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();

        return $this->getFactory()->createTimeSlotReader()->getDateTimeSlotCapacityForNextDays($currentStore);
    }

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlotsForSpecificDate(): WeekDayTimeSlotsTransfer
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();

        return $this->getFactory()->createTimeSlotReader()->getTimeSlotsForSpecificDay($currentStore, "26-03-2021");
    }

    /**
     * @param string $store
     *
     * @return array
     */
    public function getTimeSlotsFilteredByStore(string $store): array
    {
        return $this->getFactory()->createTimeSlotReader()->getTimeSlotsFilteredByStore($store);
    }

    /**
     * @param string $store
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function setTimeSlotsForSelectedStore(string $store, string $day, string $time, string $capacity): int
    {
        return $this->getFactory()->createTimeSlotWriter()->saveTimeSlotsDataForStore($store, $day, $time, $capacity);
    }

    /**
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotsFilteredByDate(string $dateFrom, string $dateTo): array
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();

        return $this->getFactory()->createTimeSlotReader()->getTimeSlotsFilteredByDate($currentStore, $dateFrom, $dateTo);
    }

    /**
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotCapacityCountByDate(string $dateFrom, string $dateTo): array
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();

        return $this->getFactory()->createTimeSlotReader()->getTimeSlotCapacityCountByDate($currentStore, $dateFrom, $dateTo);
    }

    /**
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function setTimeSlotsForSelectedDate(string $date, string $day, string $time, string $capacity): int
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();
        $merchantReference = $this->getFactory()->createTimeSlotReader()->getMerchantReferenceByStoreName($currentStore);

        return $this->getFactory()->createTimeSlotWriter()->saveTimeSlotsDataForDate($merchantReference, $date, $day, $time, $capacity);
    }

    /**
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function setDefaultTimeSlotsForSelectedDate(string $date, string $day, string $time, string $capacity): int
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();
        $merchantReference = $this->getFactory()->createTimeSlotReader()->getMerchantReferenceByStoreName($currentStore);

        return $this->getFactory()->createTimeSlotWriter()->saveDefaultTimeSlotsDataForDate($merchantReference, $date, $day, $time, $capacity);
    }

    /**
     * @return int
     */
    public function getMerchantByStoreName(): int
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();
        $merchantReference = $this->getFactory()->createTimeSlotReader()->getMerchantReferenceByStoreName($currentStore);

        return $merchantReference;
    }

    /**
     * @param string $date
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotsForSpecificDateAndDay(string $date, string $day): array
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();
        $result = $this->getFactory()->createTimeSlotReader()->getTimeSlotsForSpecificDateAndDay($currentStore, $date, $day);

        return $result;
    }

    /**
     * @param string $store
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotCapacityForDefaultDay(string $store, string $day): array
    {
        $currentStore = $this->getFactory()->getStoreClient()->getCurrentStore()->getName();
        $merchantReference = $this->getFactory()->createTimeSlotReader()->getMerchantReferenceByStoreName($currentStore);

        return $this->getFactory()->createTimeSlotReader()->getTimeSlotCapacityForDefaultDay($merchantReference, $day);
    }
}
