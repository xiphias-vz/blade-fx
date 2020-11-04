<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business\Model\Writer;

use Generated\Shared\Transfer\ProductQuantityResponseTransfer;
use Generated\Shared\Transfer\ProductQuantityTransfer;

interface ProductQuantityWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductQuantityResponseTransfer
     */
    public function saveProductQuantity(
        ProductQuantityTransfer $productQuantityTransfer
    ): ProductQuantityResponseTransfer;
}
