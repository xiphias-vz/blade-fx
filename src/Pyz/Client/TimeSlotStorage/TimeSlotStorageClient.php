<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlotStorage;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\TimeSlotStorage\TimeSlotStorageFactory getFactory()
 */
class TimeSlotStorageClient extends AbstractClient implements TimeSlotStorageClientInterface
{
    /**
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
    ): int {
        return $this->getFactory()->createTimeSlotStorageReader()
            ->getTimeSlotOrdersCount($shipmentMethodTransfer, $merchantTransfer, $timeSlotKey);
    }
}
