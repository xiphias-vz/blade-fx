<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Generated\Shared\Transfer\PickingOrderTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer;

interface PickerFacadeInterface
{
    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsPicked(array $idSalesOrderItems): void;

    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsContainerSelected(array $idSalesOrderItems): void;

    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsNotPicked(array $idSalesOrderItems): void;

    /**
     * @param int[] $idSalesOrderItems
     * @param int $idUser
     *
     * @return void
     */
    public function markOrderItemsAsCollectedByCustomer(array $idSalesOrderItems, int $idUser): void;

    /**
     * @param int $idSalesOrder
     * @param int $pickingBagsCount
     *
     * @return void
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): void;

    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsCanceledByCustomer(array $idSalesOrderItems): void;

    /**
     * Specification:
     * - Returns a selected picking zone from current session.
     * - Returns NULL if a picking zone is not yet selected.
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneInSession(): ?PickingZoneTransfer;

    /**
     * Specification:
     * - Saves the given picking zone ID in current session.
     *
     * @api
     *
     * @param int $idPickingZone
     *
     * @return void
     */
    public function savePickingZoneInSession(int $idPickingZone): void;

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getAllOrdersInStateReadyForPickingByZone(): PickingHeaderTransfer;

    /**
     * @param array $idOrderList
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function setOrdersToPick(array $idOrderList): PickingHeaderTransfer;

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getPickingHeaderTransfer(): PickingHeaderTransfer;

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return void
     */
    public function setTransferToSession(PickingHeaderTransfer $transfer): void;

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param string $containerId
     * @param string $shelfId
     *
     * @return bool
     */
    public function setContainerToOrder(PickingOrderTransfer $order, string $containerId, string $shelfId): bool;

    /**
     * @param int $quantityPicked
     * @param int $weight
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked, int $weight): void;

    /**
     * @param bool $isPaused
     *
     * @return bool
     */
    public function setCurrentOrderItemPaused(bool $isPaused): bool;

    /**
     * @param bool $isCanceled
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled): bool;

    /**
     * @param string $containerID
     *
     * @return bool
     */
    public function checkContainerForCurrentItem(string $containerID): bool;

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return void
     */
    public function clearLockForPausedOrders(PickingHeaderTransfer $transfer): void;

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param array $idOrders
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function clearLockOrders(PickingHeaderTransfer $transfer, array $idOrders): PickingHeaderTransfer;
}
