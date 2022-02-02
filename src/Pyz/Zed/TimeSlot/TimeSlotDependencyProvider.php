<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Sales\SalesDependencyProvider;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Spryker\Service\Shipment\ShipmentServiceInterface;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class TimeSlotDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CLIENT_STORAGE = 'CLIENT_STORAGE';
    public const CLIENT_STORE = 'CLIENT_STORE';
    public const SERVICE_SYNCHRONIZATION = 'SERVICE_SYNCHRONIZATION';
    public const SERVICE_TIME_SLOT_STORAGE = 'SERVICE_TIME_SLOT_STORAGE';
    public const FACADE_SALES = 'FACADE_SALES';
    public const FACADE_MERCHANT = 'FACADE_MERCHANT';
    public const FACADE_EVENT_BEHAVIOUR = 'FACADE_EVENT_BEHAVIOUR';
    public const CLIENT_TIME_SLOT = 'CLIENT_TIME_SLOT';
    public const SERVICE_TIME_SLOT = 'SERVICE_TIME_SLOT';
    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';
    public const SERVICE_SHIPMENT = 'SERVICE_SHIPMENT';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addSynchronizationService($container);
        $container = $this->addStoreClient($container);
        $container = $this->addStorageClient($container);
        $container = $this->addTimeSlotClient($container);
        $container = $this->addTimeSlotStorageService($container);
        $container = $this->addTimeSlotService($container);
        $container = $this->addSalesFacade($container);
        $container = $this->addMerchantFacade($container);
        $container = $this->addDateTimeWithZoneService($container);
        $container = $this->addShipmentService($container);
        $container = $this->addEventBehaviourFacade($container);
        $container = $this->addTimeSlotFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addStoreClient(Container $container): Container
    {
        $container->set(static::CLIENT_STORE, function (Container $container) {
            return $container->getLocator()->store()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_STORAGE, function (Container $container) {
            return $container->getLocator()->storage()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotClient(Container $container): Container
    {
        $container->set(static::CLIENT_TIME_SLOT, function (Container $container) {
            return $container->getLocator()->timeSlot()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSynchronizationService(Container $container): Container
    {
        $container->set(static::SERVICE_SYNCHRONIZATION, function (Container $container) {
            return $container->getLocator()->synchronization()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotStorageService(Container $container): Container
    {
        $container->set(static::SERVICE_TIME_SLOT_STORAGE, function (Container $container) {
            return $container->getLocator()->timeSlotStorage()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotService(Container $container): Container
    {
        $container->set(static::SERVICE_TIME_SLOT, function (Container $container) {
            return $container->getLocator()->timeSlot()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSalesFacade(Container $container): Container
    {
        $container->set(static::FACADE_SALES, function (Container $container) {
            return $container->getLocator()->sales()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMerchantFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT, function (Container $container) {
            return $container->getLocator()->merchant()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addDateTimeWithZoneService(Container $container): Container
    {
        $container->set(static::SERVICE_DATE_TIME_WITH_ZONE, function (Container $container): DateTimeWithZoneServiceInterface {
            return $container->getLocator()->dateTimeWithZone()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addShipmentService(Container $container): Container
    {
        $container->set(static::SERVICE_SHIPMENT, function (Container $container): ShipmentServiceInterface {
            return $container->getLocator()->shipment()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addEventBehaviourFacade(Container $container): Container
    {
        $container->set(static::FACADE_EVENT_BEHAVIOUR, function (Container $container) {
            return $container->getLocator()->eventBehavior()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTimeSlotFacade(Container $container): Container
    {
        $container->set(SalesDependencyProvider::FACADE_TIME_SLOTS_ORDER_OVERVIEW, function (Container $container): TimeSlotFacadeInterface {
            return $container->getLocator()->timeSlot()->facade();
        });

        return $container;
    }
}
