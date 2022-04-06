<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Business;

use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Pyz\Zed\Checkout\Business\Workflow\CheckoutWorkflow;
use Pyz\Zed\Checkout\CheckoutDependencyProvider;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Checkout\Business\CheckoutBusinessFactory as SprykerCheckoutBusinessFactory;

/**
 * @method \Spryker\Zed\Checkout\CheckoutConfig getConfig()
 */
class CheckoutBusinessFactory extends SprykerCheckoutBusinessFactory
{
    /**
     * @return \Pyz\Zed\Checkout\Business\Workflow\CheckoutWorkflowInterface
     */
    public function createCheckoutWorkflow()
    {
        return new CheckoutWorkflow(
            $this->getOmsFacade(),
            $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_CONDITIONS),
            $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_ORDER_SAVERS),
            $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_POST_HOOKS),
            $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_SAVE_HOOKS)
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesOrderFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(CheckoutDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    public function getSalesOrderOuery(): SpySalesOrderQuery
    {
        return new SpySalesOrderQuery();
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function getSalesOrderItemOuery(): SpySalesOrderItemQuery
    {
        return new SpySalesOrderItemQuery();
    }

    /**
     * @return \Spryker\Zed\Checkout\Dependency\Facade\CheckoutToOmsFacadeInterface
     */
    public function getOmsFacade()
    {
        return parent::getOmsFacade();
    }
}
