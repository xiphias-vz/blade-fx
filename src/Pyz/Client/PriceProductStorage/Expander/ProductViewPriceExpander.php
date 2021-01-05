<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PriceProductStorage\Expander;

use Generated\Shared\Transfer\ProductViewTransfer;
use Spryker\Client\PriceProductStorage\Expander\ProductViewPriceExpander as SprykerProductViewPriceExpander;

class ProductViewPriceExpander extends SprykerProductViewPriceExpander
{
    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     * @param \Generated\Shared\Transfer\PriceProductTransfer[] $priceProductTransfers
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    protected function setPrices(ProductViewTransfer $productViewTransfer, array $priceProductTransfers): ProductViewTransfer
    {
        $productViewTransfer = parent::setPrices($productViewTransfer, $priceProductTransfers);
        /**
         * TODO: ADD METHOD INSTEAD OF ARRAY
         */
        $productViewTransfer['pricePerKg'] = $priceProductTransfers[0]['moneyValue']['pricePerKg'] ?? null;

        return $productViewTransfer;
    }
}
