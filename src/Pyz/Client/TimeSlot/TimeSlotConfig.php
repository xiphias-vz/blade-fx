<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot;

use Pyz\Shared\TimeSlot\TimeSlotConstants;
use Spryker\Client\Kernel\AbstractBundleConfig;

class TimeSlotConfig extends AbstractBundleConfig
{
    /**
     * Max calendar days list available to deliver on
     *
     * @return int
     */
    public function getMaxShowDays(): int
    {
        return $this->getConfig()->get(TimeSlotConstants::MAX_SHOW_DAYS);
    }

    /**
     * Holiday Dates to be excluded from delivery
     *
     * @return array
     */
    public function getHolidayDates(): array
    {
        return $this->getConfig()->get(TimeSlotConstants::HOLIDAYS);
    }

    /**
     * Delivery time slots groped by shipment method
     *
     * @return array
     */
    public function getShipmentTimeSlots(): array
    {
        return $this->getConfig()->get(TimeSlotConstants::SHIPMENT_TIME_SLOTS);
    }

    /**
     * Delivery time slots groped by shipment method
     *
     * @return array
     */
    public function getSameDayShipmentTimeSlots(): array
    {
        return $this->getConfig()->get(TimeSlotConstants::SAME_DAY_SHIPMENT_TIME_SLOTS);
    }
}
