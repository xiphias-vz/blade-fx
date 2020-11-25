<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption;

use Generated\Shared\Transfer\ProductViewTransfer;

interface DepositProductOptionClientInterface
{
    /**
     * @param int $idProductAbstract
     * @param \Generated\Shared\Transfer\ProductViewTransfer|null $productViewTransfer
     *
     * @return array
     */
    public function getDepositProductOptionsByIdProductAbstract(int $idProductAbstract, ?ProductViewTransfer $productViewTransfer = null): array;
}
