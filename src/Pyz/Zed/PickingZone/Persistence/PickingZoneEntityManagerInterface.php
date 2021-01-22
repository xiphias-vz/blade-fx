<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;

interface PickingZoneEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer
     */
    public function createOrderPickingBlock(
        OrderPickingBlockTransfer $orderPickingBlockTransfer
    );

    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return void
     */
    public function deleteOrderPickingBlock(OrderPickingBlockTransfer $orderPickingBlockTransfer): void;

    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return void
     */
    public function resetOrderPickingBlock(OrderPickingBlockTransfer $orderPickingBlockTransfer): void;
}
