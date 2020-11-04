<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Business;

use Pyz\Zed\SalesOrderThreshold\Business\Expander\ThresholdQuoteExpander;
use Pyz\Zed\SalesOrderThreshold\Business\Expander\ThresholdQuoteExpanderInterface;
use Pyz\Zed\SalesOrderThreshold\Business\Filter\SalesOrderThresholdFilter;
use Pyz\Zed\SalesOrderThreshold\Business\HardThresholdCheck\HardThresholdChecker;
use Spryker\Zed\SalesOrderThreshold\Business\HardThresholdCheck\HardThresholdCheckerInterface;
use Spryker\Zed\SalesOrderThreshold\Business\SalesOrderThresholdBusinessFactory as SprykerSalesOrderThresholdBusinessFactory;

class SalesOrderThresholdBusinessFactory extends SprykerSalesOrderThresholdBusinessFactory
{
    /**
     * @return \Pyz\Zed\SalesOrderThreshold\Business\Expander\ThresholdQuoteExpanderInterface
     */
    public function createThresholdQuoteExpander(): ThresholdQuoteExpanderInterface
    {
        return new ThresholdQuoteExpander(
            $this->createSalesOrderThresholdDataSourceStrategyResolver(),
            $this->createSalesOrderThresholdStrategyResolver(),
            $this->createSalesOrderThresholdFilter(),
            $this->getMessengerFacade(),
            $this->getMoneyFacade(),
        );
    }

    /**
     * @return \Pyz\Zed\SalesOrderThreshold\Business\Filter\SalesOrderThresholdFilter
     */
    public function createSalesOrderThresholdFilter(): SalesOrderThresholdFilter
    {
        return new SalesOrderThresholdFilter();
    }

    /**
     * @return \Spryker\Zed\SalesOrderThreshold\Business\HardThresholdCheck\HardThresholdCheckerInterface
     */
    public function createHardThresholdChecker(): HardThresholdCheckerInterface
    {
        return new HardThresholdChecker(
            $this->createSalesOrderThresholdDataSourceStrategyResolver(),
            $this->createSalesOrderThresholdStrategyResolver(),
            $this->getMessengerFacade(),
            $this->getMoneyFacade()
        );
    }
}
