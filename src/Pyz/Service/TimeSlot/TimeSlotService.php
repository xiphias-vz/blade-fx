<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\TimeSlot;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Pyz\Shared\Shipment\ShipmentConfig;
use Spryker\Service\Kernel\AbstractService;

class TimeSlotService extends AbstractService implements TimeSlotServiceInterface
{
    protected const ZERO_CAPACITY = 0;

    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return int|null
     */
    public function getMerchantCapacityByShipmentMethod(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer
    ): ?int {
        if ($merchantTransfer->getDeliveryCapacityPerSlot()
            && $shipmentMethodTransfer->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_DELIVERY
        ) {
            return $merchantTransfer->getDeliveryCapacityPerSlot();
        }

        if ($merchantTransfer->getPickingCapacityPerSlot()
            && $shipmentMethodTransfer->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT
        ) {
            return $merchantTransfer->getPickingCapacityPerSlot();
        }

        return static::ZERO_CAPACITY;
    }
}
