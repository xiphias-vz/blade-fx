<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Checker;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Shared\Oms\OmsConfig;

class CashierOrderExportReadinessChecker implements CashierOrderExportReadinessCheckerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    public function checkIsAllItemsReadyForExport(OrderTransfer $orderTransfer): bool
    {
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if (!$this->isItemReadyForExport($itemTransfer)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return bool
     */
    protected function isItemReadyForExport(ItemTransfer $itemTransfer): bool
    {
        $itemStateName = $itemTransfer->getState()->getName();

        if ($itemStateName === OmsConfig::STORE_STATE_PICKED || $itemStateName === OmsConfig::STATE_CANCELLED) {
            return true;
        }

        return false;
    }
}
