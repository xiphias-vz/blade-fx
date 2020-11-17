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
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function exportOrders(OrderTransfer $orderTransfer): OrderTransfer;

    /**
     * Specification:
     * - Finds Order by order id.
     * - Checks for order `cashier_export_success`.
     * - Returns true if success or false otherwise.
     *
     * @param int $orderId
     *
     * @return bool
     */
    public function checkIsOrderExportedToCashierSuccessfully(int $orderId): bool;
}
