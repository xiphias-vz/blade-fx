<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui;

use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\ThresholdGroup\GlobalHardMaxThresholdDataProvider;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\ThresholdGroup\GlobalHardThresholdDataProvider;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\ThresholdGroup\GlobalSoftThresholdDataProvider;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\Mapper\ThresholdGroup\GlobalHardThresholdFormMapper;
use Spryker\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiConfig as SprykerSalesOrderThresholdGuiConfig;

class SalesOrderThresholdGuiConfig extends SprykerSalesOrderThresholdGuiConfig
{
    protected const STRATEGY_GROUP_TO_DATA_PROVIDER_MAP = [
        self::GROUP_HARD => GlobalHardThresholdDataProvider::class,
        self::GROUP_SOFT => GlobalSoftThresholdDataProvider::class,
        SalesOrderThresholdConfig::GROUP_HARD_MAX => GlobalHardMaxThresholdDataProvider::class,
    ];

    /**
     * @phpstan-return class-string<\Spryker\Zed\SalesOrderThresholdGui\Communication\Form\Mapper\ThresholdGroup\GlobalThresholdFormMapperInterface>[]
     *
     * @return string[]
     */
    public function getStrategyGroupToFormTypeMap(): array
    {
        $strategyGroupToFormTypeMap = parent::getStrategyGroupToFormTypeMap();

        $newStrategyGroupToFormTypeMap = [
            SalesOrderThresholdConfig::GROUP_HARD_MAX => GlobalHardThresholdFormMapper::class,
        ];

        return array_merge($strategyGroupToFormTypeMap, $newStrategyGroupToFormTypeMap);
    }
}
