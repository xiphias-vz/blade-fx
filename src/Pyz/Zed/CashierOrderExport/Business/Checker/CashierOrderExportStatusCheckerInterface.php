<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Checker;

interface CashierOrderExportStatusCheckerInterface
{
    /**
     * @param int $orderId
     *
     * @return bool
     */
    public function isOrderExportedSuccessfully(int $orderId): bool;
}
