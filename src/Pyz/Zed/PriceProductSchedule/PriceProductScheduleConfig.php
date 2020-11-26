<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule;

use Spryker\Zed\PriceProductSchedule\PriceProductScheduleConfig as SprykerPriceProductScheduleConfig;

class PriceProductScheduleConfig extends SprykerPriceProductScheduleConfig
{
    protected const APPLY_BATCH_SIZE = 10000;
}
