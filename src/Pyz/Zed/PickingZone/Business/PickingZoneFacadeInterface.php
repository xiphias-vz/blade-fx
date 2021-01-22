<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Business;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;

interface PickingZoneFacadeInterface
{
    /**
     * Specification:
     * - Finds all picking zones.
     * - Returns a collection of found picking zones.
     *
     * @api
     *
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function getPickingZones(string $merchantReference): array;

    /**
     * Specification:
     * - Returns a picking zone found using $idPickingZone.
     * - Returns NULL if picking zone doesn't exist.
     *
     * @api
     *
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneById(int $idPickingZone): ?PickingZoneTransfer;

    /**
     * Specification:
     * - Creates an order picking block found using OrderPickingBlock transfer.
     * - Returns OrderPickingBlock with an actual fields data.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer
     */
    public function createOrderPickingBlock(
        OrderPickingBlockTransfer $orderPickingBlockTransfer
    ): OrderPickingBlockTransfer;

    /**
     * Specification:
     * - Requires OrderPickingBlockTransfer.idSalesOrder.
     * - Requires OrderPickingBlockTransfer.idPickingZone.
     * - Requires OrderPickingBlockTransfer.idUser.
     * - Checks whether sales order picking block is available for given user.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return bool
     */
    public function isOrderPickingBlockAvailableForUser(OrderPickingBlockTransfer $orderPickingBlockTransfer): bool;

    /**
     * Specification:
     * - Deletes an order picking block found using OrderPickingBlock transfer.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return void
     */
    public function deleteOrderPickingBlock(OrderPickingBlockTransfer $orderPickingBlockTransfer): void;
}
