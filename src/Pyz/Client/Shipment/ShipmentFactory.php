<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Shipment;

use Pyz\Client\ShipmentStorage\ShipmentStorageClientInterface;
use Spryker\Client\Shipment\ShipmentFactory as SprykerShipmentFactory;

class ShipmentFactory extends SprykerShipmentFactory
{
    /**
     * @return \Pyz\Client\ShipmentStorage\ShipmentStorageClientInterface
     */
    public function getShipmentStorageClient(): ShipmentStorageClientInterface
    {
        return $this->getProvidedDependency(ShipmentDependencyProvider::CLIENT_SHIPMENT_STORAGE);
    }
}
