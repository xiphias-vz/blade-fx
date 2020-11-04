<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentDataImport\ShipmentDataImportDependencyProvider as SprykerShipmentDataImportDependencyProvider;

/**
 * @method \Pyz\Zed\ShipmentDataImport\ShipmentDataImportConfig getConfig()
 */
class ShipmentDataImportDependencyProvider extends SprykerShipmentDataImportDependencyProvider
{
    public const FACADE_SHIPMENT = 'FACADE_SHIPMENT';
    public const FACADE_EVENT = 'FACADE_EVENT';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        parent::provideBusinessLayerDependencies($container);
        $container = $this->addShipmentFacade($container);
        $container = $this->addEventFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addShipmentFacade(Container $container): Container
    {
        $container->set(static::FACADE_SHIPMENT, function () use ($container) {
            return $container->getLocator()->shipment()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addEventFacade(Container $container): Container
    {
        $container->set(static::FACADE_EVENT, function () use ($container) {
            return $container->getLocator()->event()->facade();
        });

        return $container;
    }
}
