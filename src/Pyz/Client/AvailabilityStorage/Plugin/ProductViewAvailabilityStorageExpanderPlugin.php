<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\AvailabilityStorage\Plugin;

use Generated\Shared\Transfer\ProductViewTransfer;
use Spryker\Client\AvailabilityStorage\Plugin\ProductViewAvailabilityStorageExpanderPlugin as SprykerProductViewAvailabilityStorageExpanderPlugin;

/**
 * @method \Pyz\Client\AvailabilityStorage\AvailabilityStorageFactory getFactory()
 */
class ProductViewAvailabilityStorageExpanderPlugin extends SprykerProductViewAvailabilityStorageExpanderPlugin
{
    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     * @param array $productData
     * @param string $localeName
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    public function expandProductViewTransfer(ProductViewTransfer $productViewTransfer, array $productData, $localeName)
    {
        return $this->getFactory()
            ->createProductViewAvailabilityExpander()
            ->expandProductViewWithAvailability($productViewTransfer);
    }
}
