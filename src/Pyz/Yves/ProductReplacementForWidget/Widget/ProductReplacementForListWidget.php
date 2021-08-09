<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductReplacementForWidget\Widget;

use SprykerShop\Yves\ProductReplacementForWidget\Widget\ProductReplacementForListWidget as SprykerProductReplacementForListWidget;

/**
 * @method \SprykerShop\Yves\ProductReplacementForWidget\ProductReplacementForWidgetFactory getFactory()
 * @method \SprykerShop\Yves\ProductReplacementForWidget\ProductReplacementForWidgetConfig getConfig()
 */
class ProductReplacementForListWidget extends SprykerProductReplacementForListWidget
{
    /**
     * @param string $sku
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer[]
     */
    public function findReplacementForProducts(string $sku): array
    {
        $productViewTransferList = [];
        $productReplacementStorageTransfer = $this->getFactory()->getProductAlternativeStorageClient()
            ->findProductReplacementForStorage($sku);
        if (!$productReplacementStorageTransfer) {
            return $productViewTransferList;
        }

        $productViewTransferList = $this->getFactory()
            ->getProductStorageClient()
            ->getProductConcreteViewTransfers($productReplacementStorageTransfer->getProductConcreteIds(), $this->getLocale());

        $filteredProductViewTransferList = [];
        foreach ($productViewTransferList as $productViewTransfer) {
            if ($this->canShowProductReplacementFor($productViewTransfer)) {
                $filteredProductViewTransferList[] = $productViewTransfer;
            }
        }

        return $filteredProductViewTransferList;
    }
}
