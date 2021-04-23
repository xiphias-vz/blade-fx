<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication;

use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Shared\Oms\OmsConfig;
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
            $this->getPickingZoneFacade(),
            $this->getFacade(),
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

    /**
     * @return \Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery
     */
    public function getPickingZoneQuery(): PyzPickingZoneQuery
    {
        return PyzPickingZoneQuery::create();
    }

    /**
     * @param string $containerCode
     *
     * @return bool
     */
    public function checkUsedContainer(string $containerCode): bool
    {
        $result = PyzPickingSalesOrderQuery::create()
            ->joinSpySalesOrder()
            ->where(SpySalesOrderTableMap::COL_INVOICE_REFERENCE . " is null
                and (select count(*)
                from spy_sales_order_item ssoi
                inner join spy_oms_order_item_state soois on ssoi.fk_oms_order_item_state = soois.id_oms_order_item_state
                where ssoi.fk_sales_order = spy_sales_order.id_sales_order
                group by ssoi.fk_sales_order
                having count(*) > sum(case when soois.name = '" . OmsConfig::STATE_CANCELLED . "' then 1 else 0 end)
                ) > 0 and container_code = '" . $containerCode . "' ")
            ->find()
            ->toArray();

        return count($result) > 0;
    }

    /**
     * @param int $idOrder
     * @param int $idZone
     * @param string $containerId
     * @param string $shelfId
     *
     * @return \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrder
     */
    public function setZoneContainerShelf(int $idOrder, int $idZone, string $containerId, string $shelfId)
    {
        $containerEntity = PyzPickingSalesOrderQuery::create()
            ->filterByFkSalesOrder($idOrder)
            ->filterByContainerCode($containerId)
            ->findOneOrCreate();
        $containerEntity->setFkPickingZone($idZone);
        if (!empty($shelfId)) {
            $containerEntity->setShelfCode($shelfId);
        }

        if ($containerEntity->isModified() || $containerEntity->isNew()) {
            $containerEntity->save();
        }

        return $containerEntity;
    }
}
