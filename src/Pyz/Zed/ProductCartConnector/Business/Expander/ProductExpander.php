<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business\Expander;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\ProductConcreteTransfer;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpander as SprykerProductExpander;
use Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpanderInterface;

class ProductExpander extends SprykerProductExpander implements ProductExpanderInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return void
     */
    protected function expandItemWithProductConcrete(ProductConcreteTransfer $productConcreteTransfer, ItemTransfer $itemTransfer)
    {
        parent::expandItemWithProductConcrete($productConcreteTransfer, $itemTransfer);

        $itemTransfer
            ->setPickZone($productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE] ?? '')
            ->setProductNumber($productConcreteTransfer->getProductNumber());
    }
}
