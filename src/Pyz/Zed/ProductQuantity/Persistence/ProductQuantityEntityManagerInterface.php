<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Persistence;

use Generated\Shared\Transfer\ProductQuantityTransfer;
use Spryker\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface as SprykerProductQuantityEntityManagerInterface;

interface ProductQuantityEntityManagerInterface extends SprykerProductQuantityEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return void
     */
    public function saveProductQuantity(ProductQuantityTransfer $productQuantityTransfer): void;
}
