<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business;

use Generated\Shared\Transfer\OrderTransfer;

interface CashierOrderExportFacadeInterface
{
    /**
     * Specification:
     * - Exports orders to the file on appropriate for cashier format.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function exportOrders(OrderTransfer $orderTransfer): void;
}
