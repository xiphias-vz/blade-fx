<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\PriceProductSchedule;

use Spryker\Zed\PriceProductSchedule\PriceProductScheduleConfig as SprykerPriceProductScheduleConfig;

class PriceProductScheduleConfig extends SprykerPriceProductScheduleConfig
{
    protected const APPLY_BATCH_SIZE = 10000;
}
