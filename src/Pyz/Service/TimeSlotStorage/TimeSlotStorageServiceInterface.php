<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\TimeSlotStorage;

interface TimeSlotStorageServiceInterface
{
    /**
     * Specification:
     *  - Generates storage key for exact time slot
     *
     * @api
     *
     * @param string $merchantReference
     * @param string $shipmentMethodKey
     * @param string $deliverySlot
     *
     * @return string
     */
    public function generateMerchantShipmentTimeSlotKey(
        string $merchantReference,
        string $shipmentMethodKey,
        string $deliverySlot
    ): string;
}
