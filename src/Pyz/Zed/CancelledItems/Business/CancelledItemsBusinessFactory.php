<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CancelledItems\Business;

use Pyz\Zed\CancelledItems\Business\Filter\ItemFilter;
use Pyz\Zed\CancelledItems\Business\SalesOrder\SalesOrderCalculator;
use Pyz\Zed\CancelledItems\CancelledItemsDependencyProvider;
use Pyz\Zed\Payment\Business\PaymentFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Calculation\Business\CalculationFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class CancelledItemsBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Spryker\Zed\Calculation\Business\CalculationFacadeInterface
     */
    private function getCalculationFacade(): CalculationFacadeInterface
    {
        return $this->getProvidedDependency(CancelledItemsDependencyProvider::FACADE_CALCULATION);
    }

    /**
     * @return \Pyz\Zed\CancelledItems\Business\SalesOrder\SalesOrderCalculator
     */
    public function createSalesOrderCalculator(): SalesOrderCalculator
    {
        return new SalesOrderCalculator(
            $this->getCalculationFacade(),
            $this->getSalesFacade(),
            $this->getPaymentFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    private function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(CancelledItemsDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Pyz\Zed\Payment\Business\PaymentFacadeInterface
     */
    private function getPaymentFacade(): PaymentFacadeInterface
    {
        return $this->getProvidedDependency(CancelledItemsDependencyProvider::FACADE_PAYMENT);
    }

    /**
     * @return \Pyz\Zed\CancelledItems\Business\Filter\ItemFilter
     */
    public function createItemFilter(): ItemFilter
    {
        return new ItemFilter();
    }
}
