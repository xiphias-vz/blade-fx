<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Shipment;

use Spryker\Client\Kernel\Container;
use Spryker\Client\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    public const CLIENT_SHIPMENT_STORAGE = 'CLIENT_SHIPMENT_STORAGE';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container|void
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        parent::provideServiceLayerDependencies($container);
        $container = $this->addShipmentStorageClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addShipmentStorageClient(Container $container): Container
    {
        $container->set(self::CLIENT_SHIPMENT_STORAGE, function (Container $container) {
            return $container->getLocator()->shipmentStorage()->client();
        });

        return $container;
    }
}
