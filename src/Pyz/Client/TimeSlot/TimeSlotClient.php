<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\TimeSlot\TimeSlotFactory getFactory()
 */
class TimeSlotClient extends AbstractClient implements TimeSlotClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodTransfer
     */
    public function expandWithShipmentTimeSlots(ShipmentMethodTransfer $shipmentMethodTransfer): ShipmentMethodTransfer
    {
        return $this->getFactory()
            ->createShipmentTimeSlotsExpander()
            ->expandWithTimeSlots($shipmentMethodTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer|null $merchantTransfer
     *
     * @return bool
     */
    public function isShipmentTimeSlotsValid(ShipmentTransfer $shipmentTransfer, ?MerchantTransfer $merchantTransfer = null): bool
    {
        return $this->getFactory()
            ->createShipmentTimeSlotsExpander()
            ->isShipmentTimeSlotsValid($shipmentTransfer, $merchantTransfer);
    }
}
