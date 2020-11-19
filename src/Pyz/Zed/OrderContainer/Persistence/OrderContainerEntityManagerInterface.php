<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Persistence;

use Generated\Shared\Transfer\OrderContainerTransfer;

interface OrderContainerEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderContainerTransfer $orderContainerTransfer
     *
     * @return void
     */
    public function create(OrderContainerTransfer $orderContainerTransfer): void;
}
