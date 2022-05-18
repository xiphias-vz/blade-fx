<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Tax\Business\Model\Calculator;

use Generated\Shared\Transfer\CalculableObjectTransfer;
use Spryker\Shared\Calculation\CalculationPriceMode;
use Spryker\Zed\Tax\Business\Model\Calculator\TaxAmountAfterCancellationCalculator as SprykerTaxAmountAfterCancellationCalculator;

class TaxAmountAfterCancellationCalculator extends SprykerTaxAmountAfterCancellationCalculator
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return void
     */
    protected function calculateItemTaxAmountAfterCancellation(CalculableObjectTransfer $calculableObjectTransfer)
    {
        foreach ($calculableObjectTransfer->getItems() as $itemTransfer) {
            if (!$itemTransfer->getCanceledAmount()) {
                continue;
            }

            $itemTransfer->requireSumPriceToPayAggregation();
            $itemTransfer->requireSumTaxAmountFullAggregation();

            $canceledTaxableAmount = $itemTransfer->getSumPrice() - $itemTransfer->getCanceledAmount();
            if ($canceledTaxableAmount < 0) {
                $canceledTaxableAmount = 0;
            }

            if (!$canceledTaxableAmount) {
                $itemTransfer->setTaxAmountAfterCancellation($itemTransfer->getSumTaxAmountFullAggregation());
            }

            $taxAmount = $this->calculateTaxAmount(
                $canceledTaxableAmount,
                $itemTransfer->getTaxRateAverageAggregation(),
                CalculationPriceMode::PRICE_MODE_GROSS
            );

            $itemTransfer->setTaxAmountAfterCancellation($itemTransfer->getSumTaxAmountFullAggregation() - $taxAmount);
        }
    }
}
