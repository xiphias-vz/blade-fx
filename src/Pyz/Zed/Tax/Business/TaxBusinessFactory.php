<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Tax\Business;

use Pyz\Zed\Tax\Business\Model\Calculator\TaxAmountAfterCancellationCalculator;
use Spryker\Zed\Tax\Business\TaxBusinessFactory as SprykerTaxBusinessFactory;

class TaxBusinessFactory extends SprykerTaxBusinessFactory
{
    /**
     * @return \Pyz\Zed\Tax\Business\Model\Calculator\TaxAmountAfterCancellationCalculator
     */
    public function createTaxAmountAfterCancellationCalculator()
    {
        return new TaxAmountAfterCancellationCalculator($this->createAccruedTaxCalculator());
    }
}
