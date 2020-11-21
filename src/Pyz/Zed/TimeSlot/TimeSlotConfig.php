<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot;

use Pyz\Shared\TimeSlot\TimeSlotConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class TimeSlotConfig extends AbstractBundleConfig
{
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
     * Max calendar days list available to deliver on
     *
     * @return int
     */
    public function getMaxShowDays(): int
    {
        return $this->getConfig()->get(TimeSlotConstants::MAX_SHOW_DAYS);
    }
}