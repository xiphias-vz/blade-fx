<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProduct\Business\Model\Product;

use Generated\Shared\Transfer\PriceProductTransfer;
use Spryker\Zed\PriceProduct\Business\Model\Product\PriceProductExpander as SprykerPriceProductExpander;

class PriceProductExpander extends SprykerPriceProductExpander
{
    /**
     * @param \Generated\Shared\Transfer\PriceProductTransfer $priceProductTransfer
     *
     * @return \Generated\Shared\Transfer\PriceProductTransfer
     */
    protected function expandPriceProductTransfer(PriceProductTransfer $priceProductTransfer): PriceProductTransfer
    {
        /** @var \Generated\Shared\Transfer\PriceProductDimensionTransfer $priceDimensionTransfer */
        $priceDimensionTransfer = $priceProductTransfer->requirePriceDimension()->getPriceDimension();
        $priceProductTransfer->setPriceDimension($this->expandPriceProductDimensionTransfer($priceDimensionTransfer));
        $priceProductTransfer->setGroupKey($this->priceProductService->buildPriceProductGroupKey($priceProductTransfer));

        return $priceProductTransfer;
    }
}
