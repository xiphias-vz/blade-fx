<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\TimeSlotStorage;

use Spryker\Service\Kernel\AbstractService;

class TimeSlotStorageService extends AbstractService implements TimeSlotStorageServiceInterface
{
    /**
     * {@inheritDoc}
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
    ): string {
        return strtolower(sprintf("%s_%s_%s", $merchantReference, $shipmentMethodKey, $deliverySlot));
    }
}
