<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Calculation\Communication\Plugin;

use Generated\Shared\Transfer\CalculableObjectTransfer;
use Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface;

class SubtotalWithOptionsCalculationPlugin implements CalculationPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return void
     */
    public function recalculate(CalculableObjectTransfer $calculableObjectTransfer)
    {
        $subtotalWithoutOptions = 0;
        $sumOptions = 0;

        foreach ($calculableObjectTransfer->getItems() as $item) {
            $subtotalWithoutOptions += $item->getSumPrice();
            $sumOptions += $item->getSumProductOptionPriceAggregation();
        }

        $calculableObjectTransfer->getTotals()
            ->setSumOptions($sumOptions)
            ->setSubtotalWithoutOptions($subtotalWithoutOptions);
    }
}
