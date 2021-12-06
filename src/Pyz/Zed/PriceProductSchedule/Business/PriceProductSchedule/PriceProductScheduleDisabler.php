<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule\Business\PriceProductSchedule;

use Pyz\Zed\FactFinderExport\Business\Model\FactFinderEventManager;
use Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleDisabler as SpryPriceProductScheduleDisabler;

class PriceProductScheduleDisabler extends SpryPriceProductScheduleDisabler
{
    /**
     * @param int $idProductAbstract
     *
     * @return void
     */
    public function disableNotActiveScheduledPricesByIdProductAbstract(int $idProductAbstract): void
    {
        $productSchedulePricesForDisable = $this->priceProductScheduleRepository
            ->findPriceProductSchedulesToDisableByIdProductAbstract($idProductAbstract);

        foreach ($productSchedulePricesForDisable as $priceProductScheduleTransfer) {
            $this->getTransactionHandler()->handleTransaction(function () use ($priceProductScheduleTransfer): void {
                $this->executeExitLogicTransaction($priceProductScheduleTransfer);
            });
        }
        FactFinderEventManager::addEvent(FactFinderEventManager::FF_EVENT_GEODATA_UPDATE, $idProductAbstract);
    }
}
