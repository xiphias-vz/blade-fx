<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\SalesOrderThreshold;

use Spryker\Shared\SalesOrderThreshold\SalesOrderThresholdConfig as SprykerSalesOrderThresholdConfig;

class SalesOrderThresholdConfig extends SprykerSalesOrderThresholdConfig
{
    public const GROUP_HARD_MAX = 'Hard-max-threshold';
    public const THRESHOLD_STRATEGY_KEY_HARD_MAX = 'hard-maximum-threshold';
}
