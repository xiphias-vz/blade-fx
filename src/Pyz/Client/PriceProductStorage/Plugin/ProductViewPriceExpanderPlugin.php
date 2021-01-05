<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PriceProductStorage\Plugin;

use Generated\Shared\Transfer\ProductViewTransfer;
use Spryker\Client\PriceProductStorage\Plugin\ProductViewPriceExpanderPlugin as SprykerProductViewPriceExpanderPlugin;

/**
 * @method \Spryker\Client\PriceProductStorage\PriceProductStorageFactory getFactory()
 */
class ProductViewPriceExpanderPlugin extends SprykerProductViewPriceExpanderPlugin
{
    /**
     * {@inheritDoc}
     * - Adds price value based on current store settings.
     * - Adds prices key-value array of available price types (e.g. DEFAULT, ORIGINAL).
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     * @param array $productData
     * @param string $localeName
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    public function expandProductViewTransfer(ProductViewTransfer $productViewTransfer, array $productData, $localeName)
    {
        return $this->getFactory()
            ->createProductViewPriceExpander()
            ->expandProductViewPriceData($productViewTransfer);
    }
}
