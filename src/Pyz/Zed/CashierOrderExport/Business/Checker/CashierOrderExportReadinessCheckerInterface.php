<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Checker;

use Generated\Shared\Transfer\OrderTransfer;

interface CashierOrderExportReadinessCheckerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function checkIsAllItemsReadyForExport(OrderTransfer $orderTransfer): bool;
}
