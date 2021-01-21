<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication;

use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\Oms\Communication\Builder\OmsTriggerFormCollectionBuilder;
use Pyz\Zed\Oms\Communication\Builder\OmsTriggerFormCollectionBuilderInterface;
use Pyz\Zed\Oms\Communication\Factory\OmsTriggerFormFactory;
use Pyz\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface;
use Pyz\Zed\Oms\OmsDependencyProvider;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Oms\Communication\OmsCommunicationFactory as PyzOmsCommunicationFactory;

/**
 * @method \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Oms\OmsConfig getConfig()
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 */
class OmsCommunicationFactory extends PyzOmsCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::PYZ_FACADE_SALES);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }

    /**
     * @return \Pyz\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface
     */
    public function createPyzOmsTriggerFormFactory(): OmsTriggerFormFactoryInterface
    {
        return new OmsTriggerFormFactory($this->getFormFactory());
    }

    /**
     * @return \Pyz\Zed\Oms\Communication\Builder\OmsTriggerFormCollectionBuilderInterface
     */
    public function createPyzOmsTriggerFormCollectionBuilder(): OmsTriggerFormCollectionBuilderInterface
    {
        return new OmsTriggerFormCollectionBuilder($this->createOmsTriggerFormFactory(), $this->createPyzOmsTriggerFormFactory());
    }
}
