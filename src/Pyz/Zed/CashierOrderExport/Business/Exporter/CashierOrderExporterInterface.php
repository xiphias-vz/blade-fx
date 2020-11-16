<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Exporter;

use Generated\Shared\Transfer\OrderTransfer;

interface CashierOrderExporterInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function exportOrders(OrderTransfer $orderTransfer): void;
}
