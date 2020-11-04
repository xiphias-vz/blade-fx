<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business;

use Generated\Shared\Transfer\ProductQuantityResponseTransfer;
use Generated\Shared\Transfer\ProductQuantityTransfer;
use Spryker\Zed\ProductQuantity\Business\ProductQuantityFacadeInterface as SprykerProductQuantityFacadeInterface;

interface ProductQuantityFacadeInterface extends SprykerProductQuantityFacadeInterface
{
    /**
     * Specification:
     * - Save product quantity.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductQuantityResponseTransfer
     */
    public function saveProductQuantity(ProductQuantityTransfer $productQuantityTransfer): ProductQuantityResponseTransfer;
}
