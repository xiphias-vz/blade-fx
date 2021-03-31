<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport;

use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

class PickingZoneOrderExportDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_TRANSLATOR = 'FACADE_TRANSLATOR';
    public const FACADE_PICKING_ZONE = 'FACADE_PICKING_ZONE';
    public const FACADE_TIME_SLOTS = 'FACADE_TIME_SLOTS';
    public const FACADE_MERCHANT_SALES_ORDER = 'FACADE_MERCHANT_SALES_ORDER';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = $this->addPickingZoneFacade($container);
        $container = $this->addTimeSlotsFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = $this->addTranslatorFacade($container);
        $container = $this->addPickingZoneFacade($container);
        $container = $this->addMerchantSalesOrderFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTranslatorFacade(Container $container): Container
    {
        $container->set(static::FACADE_TRANSLATOR, function (Container $container): TranslatorFacadeInterface {
            return $container->getLocator()->translator()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addPickingZoneFacade(Container $container): Container
    {
        $container->set(static::FACADE_PICKING_ZONE, function (Container $container): PickingZoneFacadeInterface {
            return $container->getLocator()->pickingZone()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMerchantSalesOrderFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT_SALES_ORDER, function (Container $container): MerchantSalesOrderFacadeInterface {
            return $container->getLocator()->merchantSalesOrder()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotsFacade(Container $container): Container
    {
        $container->set(static::FACADE_TIME_SLOTS, function (Container $container): TimeSlotFacadeInterface {
            return $container->getLocator()->timeSlot()->facade();
        });

        return $container;
    }
}
