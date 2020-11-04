<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\Shipment\DeliveryDate\Parser;
use Spryker\Service\Shipment\ShipmentServiceFactory as SprykerShipmentServiceFactory;

class ShipmentServiceFactory extends SprykerShipmentServiceFactory
{
    /**
     * @return \Pyz\Service\Shipment\DeliveryDate\Parser
     */
    public function createDeliveryDateParser(): Parser
    {
        return new Parser(
            $this->getDateTimeWithZoneService()
        );
    }

    /**
     * @return \Spryker\Service\Shipment\Dependency\Service\ShipmentToCustomerServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(ShipmentDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }
}
