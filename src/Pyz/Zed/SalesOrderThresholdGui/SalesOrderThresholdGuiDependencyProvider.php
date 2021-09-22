<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui;

use Pyz\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander\GlobalHardMaximumThresholdFormExpanderPlugin;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander\GlobalHardThresholdFormExpanderPlugin;
use Spryker\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiDependencyProvider as SprykerSalesOrderThresholdGuiDependencyProvider;

class SalesOrderThresholdGuiDependencyProvider extends SprykerSalesOrderThresholdGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesOrderThresholdGuiExtension\Dependency\Plugin\SalesOrderThresholdFormExpanderPluginInterface[]
     */
    protected function getSalesOrderThresholdFormExpanderPlugins(): array
    {
        return [
            new GlobalHardThresholdFormExpanderPlugin(),
            new GlobalHardMaximumThresholdFormExpanderPlugin(),
        ];
    }
}
