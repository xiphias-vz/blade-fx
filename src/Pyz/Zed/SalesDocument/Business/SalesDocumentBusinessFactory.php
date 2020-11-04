<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Business;

use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\SalesDocument\Business\Model\StorePickingListContentGenerator;
use Pyz\Zed\SalesDocument\SalesDocumentDependencyProvider;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\SalesDocument\SalesDocumentConfig getConfig()
 */
class SalesDocumentBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\SalesDocument\Business\Model\StorePickingListContentGenerator
     */
    public function createStorePickingListContentGenerator(): StorePickingListContentGenerator
    {
        return new StorePickingListContentGenerator(
            $this->getSalesFacade(),
            $this->getMerchantFacade(),
            $this->getProductFacade(),
            $this->getPickingRouteFacade(),
            $this->getMerchantSalesOrderFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    public function getProductFacade(): ProductFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_PRODUCT);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getCurrentStore(): Store
    {
        return Store::getInstance();
    }

    /**
     * @return \Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface
     */
    public function getPickingRouteFacade(): PickingRouteFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_PICKING_ROUTE);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }
}
