<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule\Business\PriceProductSchedule;

use Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleApplier as SprykerPriceProductSchedulerApplier;

class PriceProductScheduleApplier extends SprykerPriceProductSchedulerApplier
{
    /**
     * @return void
     */
    public function applyScheduledPrices(): void
    {
        $productSchedulePricesForEnable = $this->findPriceProductSchedulesToEnableForCurrentStore();

        $this->applyScheduledPriceTransactionExecutor->execute($productSchedulePricesForEnable);

        $this->priceProductScheduleDisabler->disableNotActiveScheduledPrices();
    }
}
