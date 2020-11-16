<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

use Generated\Shared\Transfer\OrderTransfer;

interface CashierOrderWriterInterface
{
    /**
     * @param string $content
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function write(string $content, OrderTransfer $orderTransfer): void;
}
