<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Communication;

use Pyz\Service\Shipment\ShipmentServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Communication\Mapper\MerchantSalesOrderMapper;
use Pyz\Zed\MerchantSalesOrder\Communication\Mapper\MerchantSalesOrderMapperInterface;
use Pyz\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider;
use Pyz\Zed\MerchantStorage\MerchantStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderConfig getConfig()
 * @method \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface getFacade()
 * @method \Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderRepositoryInterface getRepository()
 */
class MerchantSalesOrderCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(MerchantStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Communication\Mapper\MerchantSalesOrderMapperInterface
     */
    public function getMerchantSalesOrderMapper(): MerchantSalesOrderMapperInterface
    {
        return new MerchantSalesOrderMapper(
            $this->getMerchantFacade(),
            $this->getShipmentService()
        );
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(MerchantSalesOrderDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @return \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    public function getShipmentService(): ShipmentServiceInterface
    {
        return $this->getProvidedDependency(MerchantSalesOrderDependencyProvider::SERVICE_SHIPMENT);
    }
}
