<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Shipment;

use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Zed\Shipment\Communication\Plugin\Availability\ClickAndCollectShipmentMethodAvailabilityPlugin;
use Pyz\Zed\Shipment\Communication\Plugin\Availability\DeliveryShipmentMethodAvailabilityPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array
     */
    protected function getAvailabilityPlugins(Container $container)
    {
        return [
            ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT => new ClickAndCollectShipmentMethodAvailabilityPlugin(),
            ShipmentConfig::SHIPMENT_METHOD_DELIVERY => new DeliveryShipmentMethodAvailabilityPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array
     */
    protected function getPricePlugins(Container $container)
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array
     */
    protected function getDeliveryTimePlugins(Container $container)
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodFilterPluginInterface[]
     */
    protected function getMethodFilterPlugins(Container $container)
    {
        return [
        ];
    }
}
