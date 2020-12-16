<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\TimeSlot;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;

interface TimeSlotServiceInterface
{
    /**
     * Specification:
     *  - Returns merchant capacity
     *
     * @api
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
    ): ?int;
}
