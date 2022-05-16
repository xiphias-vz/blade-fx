<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport;

use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Shared\TimeSlot\TimeSlotConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class PickingZoneOrderExportConfig extends AbstractBundleConfig
{
    public const DATE_FORMAT = 'd.m.Y';
    public const FILE_NAME_DELIMITER = '-';

    /**
     * @return mixed
     */
    public function getTimeSlotConstants()
    {
        $timeSlotConstants = $this->get(TimeSlotConstants::SHIPMENT_TIME_SLOTS);

        return $timeSlotConstants[ShipmentConfig::DEFAULT_TIMESLOT_ARRAY_FOR_BO];
    }
}
