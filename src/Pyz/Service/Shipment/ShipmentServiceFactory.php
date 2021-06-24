<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\Shipment\DeliveryDate\Parser;
use Pyz\Service\Shipment\Resolver\ClickAndCollectShipmentPriceResolver;
use Pyz\Service\Shipment\ShipmentHash\ShipmentHashGenerator;
use Spryker\Service\Shipment\Dependency\Service\ShipmentToCustomerServiceInterface;
use Spryker\Service\Shipment\Dependency\Service\ShipmentToUtilEncodingServiceInterface;
use Spryker\Service\Shipment\Items\ItemsGrouper;
use Spryker\Service\Shipment\Items\ItemsGrouperInterface;
use Spryker\Service\Shipment\ShipmentHash\ShipmentHashGeneratorInterface;
use Spryker\Service\Shipment\ShipmentServiceFactory as SprykerShipmentServiceFactory;

/**
 * @method \Pyz\Service\Shipment\ShipmentConfig getConfig()
 */
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
     * @return \Pyz\Service\Shipment\Resolver\ClickAndCollectShipmentPriceResolver
     */
    public function createClickAndCollectShipmentPriceResolver(): ClickAndCollectShipmentPriceResolver
    {
        return new ClickAndCollectShipmentPriceResolver($this->getConfig());
    }

    /**
     * @return \Spryker\Service\Shipment\Dependency\Service\ShipmentToCustomerServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(ShipmentDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Spryker\Service\Shipment\Items\ItemsGrouperInterface
     */
    public function createItemsGrouper(): ItemsGrouperInterface
    {
        return new ItemsGrouper($this->createShipmentHashGenerator());
    }

    /**
     * @return \Spryker\Service\Shipment\ShipmentHash\ShipmentHashGeneratorInterface
     */
    public function createShipmentHashGenerator(): ShipmentHashGeneratorInterface
    {
        return new ShipmentHashGenerator(
            $this->getCustomerService(),
            $this->getConfig(),
            $this->getUtilEncodingService()
        );
    }

    /**
     * @return \Spryker\Service\Shipment\Dependency\Service\ShipmentToCustomerServiceInterface
     */
    public function getCustomerService(): ShipmentToCustomerServiceInterface
    {
        return $this->getProvidedDependency(ShipmentDependencyProvider::SERVICE_CUSTOMER);
    }

    /**
     * @return \Spryker\Service\Shipment\Dependency\Service\ShipmentToUtilEncodingServiceInterface
     */
    public function getUtilEncodingService(): ShipmentToUtilEncodingServiceInterface
    {
        return $this->getProvidedDependency(ShipmentDependencyProvider::SERVICE_UTIL_ENCODING);
    }
}
