<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class TimeSlotDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_MERCHANT_STORAGE = 'CLIENT_MERCHANT_STORAGE';
    public const CLIENT_QUOTE = 'CLIENT_QUOTE';
    public const CLIENT_TIME_SLOT_STORAGE = 'CLIENT_TIME_SLOT_STORAGE';
    public const SERVICE_TIME_SLOT = 'SERVICE_TIME_SLOT';
    public const TIME_SLOT = 'TIME_SLOT';
    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';
    public const CLIENT_ZED_REQUEST = 'CLIENT_ZED_REQUEST';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        parent::provideServiceLayerDependencies($container);
        $container = $this->addMerchantStorageClient($container);
        $container = $this->addQuoteClient($container);
        $container = $this->addTimeSlotStorageClient($container);
        $container = $this->addTimeSlotService($container);
        $container = $this->addDateTimeWithZoneService($container);
        $container = $this->addZedRequestClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addMerchantStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_MERCHANT_STORAGE, function (Container $container) {
            return $container->getLocator()->merchantStorage()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addTimeSlotStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_TIME_SLOT_STORAGE, function (Container $container) {
            return $container->getLocator()->timeSlotStorage()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addQuoteClient(Container $container): Container
    {
        $container->set(static::CLIENT_QUOTE, function (Container $container) {
            return $container->getLocator()->quote()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addTimeSlotService(Container $container): Container
    {
        $container->set(static::SERVICE_TIME_SLOT, function (Container $container) {
            return $container->getLocator()->timeSlot()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addTimeSlot(Container $container): Container
    {
        $container->set(static::SERVICE_TIME_SLOT, function (Container $container) {
            return $container->getLocator()->timeSlot();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addZedRequestClient(Container $container): Container
    {
        $container->set(static::CLIENT_ZED_REQUEST, function (Container $container) {
            return $container->getLocator()->zedRequest()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addDateTimeWithZoneService(Container $container): Container
    {
        $container->set(self::SERVICE_DATE_TIME_WITH_ZONE, function (Container $container): DateTimeWithZoneServiceInterface {
            return $container->getLocator()->dateTimeWithZone()->service();
        });

        return $container;
    }
}
