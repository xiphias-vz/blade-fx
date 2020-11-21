<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlotStorage;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;

interface TimeSlotStorageClientInterface
{
    /**
     * Specification
     *  - Returns count of orders for the given time slot
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param string $timeSlotKey
     *
     * @return int
     */
    public function getTimeSlotOrdersCount(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer,
        string $timeSlotKey
    ): int;
}