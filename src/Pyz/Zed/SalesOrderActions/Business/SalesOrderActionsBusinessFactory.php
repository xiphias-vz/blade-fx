<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderActions\Business;

use Pyz\Zed\Oms\Business\OmsFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\SalesOrderActions\Business\Model\SalesOrderActionsExecutor;
use Pyz\Zed\SalesOrderActions\SalesOrderActionsDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class SalesOrderActionsBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\SalesOrderActions\Business\Model\SalesOrderActionsExecutor
     */
    public function createSalesOrderActionsExecutor(): SalesOrderActionsExecutor
    {
        return new SalesOrderActionsExecutor(
            $this->getOmsFacade(),
            $this->getSalesFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(SalesOrderActionsDependencyProvider::FACADE_OMS);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(SalesOrderActionsDependencyProvider::FACADE_SALES);
    }
}
