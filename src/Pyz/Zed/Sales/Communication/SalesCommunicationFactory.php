<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\Oms\Business\OmsFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\Sales\Communication\Table\OrdersTable;
use Pyz\Zed\Sales\Communication\Table\OrdersTableQueryBuilder;
use Pyz\Zed\Sales\SalesDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Sales\Communication\SalesCommunicationFactory as SprykerSalesCommunicationFactory;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

/**
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 **/
class SalesCommunicationFactory extends SprykerSalesCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Sales\Communication\Table\OrdersTable
     */
    public function createOrdersTable()
    {
        return new OrdersTable(
            $this->createOrdersTableQueryBuilder(),
            $this->getProvidedDependency(SprykerSalesDependencyProvider::FACADE_MONEY),
            $this->getProvidedDependency(SalesDependencyProvider::SERVICE_UTIL_SANITIZE),
            $this->getProvidedDependency(SalesDependencyProvider::SERVICE_DATE_FORMATTER),
            $this->getProvidedDependency(SalesDependencyProvider::FACADE_CUSTOMER),
            $this->getUserFacade(),
            $this->getAclFacade(),
            $this->getConfig(),
            $this->getSalesTablePlugins()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface
     */
    protected function createOrdersTableQueryBuilder()
    {
        return new OrdersTableQueryBuilder($this->getQueryContainer()->querySalesOrder());
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }

    /**
     * @return \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    public function getPickingZoneFacade(): PickingZoneFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_PICKING_ZONE);
    }

    /**
     * @return \Pyz\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getBaseOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::BASE_FACADE_OMS);
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_ACL);
    }
}
