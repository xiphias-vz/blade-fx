<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Calculation\Communication\Plugin;

use Generated\Shared\Transfer\CalculableObjectTransfer;
use Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface;

class SumDiscountAmountAggregationCalculationPlugin implements CalculationPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return void
     */
    public function recalculate(CalculableObjectTransfer $calculableObjectTransfer)
    {
        foreach ($calculableObjectTransfer->getItems() as $item) {
            $item->setUnitDiscountAmountAggregation(0);
            $item->setSumDiscountAmountAggregation(0);
            $item->setUnitDiscountAmountFullAggregation(0);
            $item->setSumDiscountAmountFullAggregation(0);

            foreach ($item->getProductOptions() as $productOptionTransfer) {
                $productOptionTransfer->setSumDiscountAmountAggregation(0);
            }
        }
    }
}
