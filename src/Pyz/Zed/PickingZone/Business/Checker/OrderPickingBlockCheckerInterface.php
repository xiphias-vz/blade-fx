<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Business\Checker;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;

interface OrderPickingBlockCheckerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return bool
     */
    public function isOrderPickingBlockAvailableForUser(OrderPickingBlockTransfer $orderPickingBlockTransfer): bool;
}
