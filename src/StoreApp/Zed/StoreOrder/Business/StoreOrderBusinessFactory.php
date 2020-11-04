<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\StoreOrder\Business;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use StoreApp\Zed\StoreOrder\Business\Reader\StoreOrderReader;
use StoreApp\Zed\StoreOrder\Business\Reader\StoreOrderReaderInterface;
use StoreApp\Zed\StoreOrder\StoreOrderDependencyProvider;

/**
 * @method \StoreApp\Zed\StoreOrder\StoreOrderConfig getConfig()
 */
class StoreOrderBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \StoreApp\Zed\StoreOrder\Business\Reader\StoreOrderReaderInterface
     */
    public function createStoreOrderReader(): StoreOrderReaderInterface
    {
        return new StoreOrderReader(
            $this->getMerchantSalesOrderFacade(),
            $this->getDateTimeWithZoneService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(StoreOrderDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(StoreOrderDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }
}
