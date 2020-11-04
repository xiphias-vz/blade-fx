<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold;

use Pyz\Zed\SalesOrderThreshold\Communication\Plugin\GlobalThresholdWithoutOptionsTotalStrategyPlugin;
use Pyz\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\HardMaximumThresholdStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\HardMinimumThresholdStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\SalesOrderThresholdDependencyProvider as SprykerSalesOrderThresholdDependencyProvider;

class SalesOrderThresholdDependencyProvider extends SprykerSalesOrderThresholdDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesOrderThresholdExtension\Dependency\Plugin\SalesOrderThresholdDataSourceStrategyPluginInterface[]
     */
    protected function getSalesOrderThresholdDataSourceStrategies(): array
    {
        return [
            new GlobalThresholdWithoutOptionsTotalStrategyPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesOrderThresholdExtension\Dependency\Plugin\SalesOrderThresholdStrategyPluginInterface[]
     */
    protected function getSalesOrderThresholdStrategyPlugins(): array
    {
        return [
            new HardMinimumThresholdStrategyPlugin(),
            new HardMaximumThresholdStrategyPlugin(),
        ];
    }
}
