<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Spryker\Client\Customer\CustomerClientInterface;
use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;
use Spryker\Client\Sales\SalesClientInterface;

class OrderDetailDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_SALES = 'CLIENT_SALES';
    public const CLIENT_CUSTOMER = 'CLIENT_CUSTOMER';
    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = $this->addSalesClient($container);
        $container = $this->addCustomerClient($container);
        $container = $this->addDateTimeWithZoneService($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addSalesClient(Container $container): Container
    {
        $container->set(self::CLIENT_SALES, function (Container $container): SalesClientInterface {
            return $container->getLocator()->sales()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addCustomerClient(Container $container): Container
    {
        $container->set(self::CLIENT_CUSTOMER, function (Container $container): CustomerClientInterface {
            return $container->getLocator()->customer()->client();
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
