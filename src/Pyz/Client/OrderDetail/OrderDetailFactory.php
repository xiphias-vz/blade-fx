<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail;

use Pyz\Client\OrderDetail\Model\OrderDetailModel;
use Pyz\Client\OrderDetail\Model\OrderDetailModelInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Spryker\Client\Customer\CustomerClientInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Sales\SalesClientInterface;

/**
 * @method \Pyz\Client\OrderDetail\OrderDetailConfig getConfig()
 */
class OrderDetailFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\OrderDetail\Model\OrderDetailModelInterface
     */
    public function createOrderDetailModel(): OrderDetailModelInterface
    {
        return new OrderDetailModel(
            $this->getSalesClient(),
            $this->getCustomerClient(),
            $this->getDateTimeWithZoneService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Client\Sales\SalesClientInterface
     */
    protected function getSalesClient(): SalesClientInterface
    {
        return $this->getProvidedDependency(OrderDetailDependencyProvider::CLIENT_SALES);
    }

    /**
     * @return \Spryker\Client\Customer\CustomerClientInterface
     */
    protected function getCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(OrderDetailDependencyProvider::CLIENT_CUSTOMER);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    protected function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(OrderDetailDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }
}
