<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductComparativePriceWidget\Calculator;

use Generated\Shared\Transfer\ProductComparativePriceTransfer;

interface ProductComparativePriceCalculatorInterface
{
    /**
     * @param string $productPrice
     * @param string|null $productSaleUnit
     * @param string|null $productSaleVolume
     *
     * @return \Generated\Shared\Transfer\ProductComparativePriceTransfer
     */
    public function calculate(
        string $productPrice,
        ?string $productSaleUnit,
        ?string $productSaleVolume
    ): ProductComparativePriceTransfer;
}
