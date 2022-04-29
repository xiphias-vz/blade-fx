<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer;
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
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return bool
     */
    public function unLockAndClearAddedContainers(PickingHeaderTransfer $transfer): bool;

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
     * @param bool $isSubstituteContainer
     *
     * @return bool
     */
    public function setContainerToOrder(PickingOrderTransfer $order, string $containerId, string $shelfId, bool $isSubstituteContainer): bool;

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param string $containerId
     *
     * @return void
     */
    public function updateContainerPickZone(PickingOrderTransfer $order, string $containerId);

    /**
     * @param string $containerID
     * @param string $merchantReference
     * @param int $idSalesOrder
     *
     * @return string|null
     */
    public function checkContainerUsage(string $containerID, string $merchantReference, int $idSalesOrder): ?string;

    /**
     * @param string $isContainerInUseMessage
     * @param string $containerCode
     *
     * @return string
     */
    public function formatErrorMessage(string $isContainerInUseMessage, string $containerCode): string;

    /**
     * @param int $quantityPicked
     * @param int $weight
     * @param string $containerCode
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked, int $weight, string $containerCode): void;


    /**
     * @param int $orderId
     * @param int $itemEan
     * @return void
     */
    public function removeCanceledAmountForRepickedItems(int $orderId, int $itemEan, int $itemPrice): void;

    /**
     * @param bool $isPaused
     *
     * @return bool
     */
    public function setCurrentOrderItemPaused(bool $isPaused): bool;

    /**
     * @param bool $isCanceled
     * @param bool $isSubstitutionPicked
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled, bool $isSubstitutionPicked): bool;

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

    /**
     * @param \Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer
     */
    public function setGlobalPickerReport(PerformanceGlobalSalesOrderReportTransfer $transfer): PerformanceGlobalSalesOrderReportTransfer;

    /**
     * @param \Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer
     */
    public function setOrderPickerReport(PerformanceSalesOrderReportTransfer $transfer): PerformanceSalesOrderReportTransfer;

    /**
     * @param \Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer
     */
    public function setOrderItemPickerReport(PerformanceSalesOrderReportItemTransfer $transfer): PerformanceSalesOrderReportItemTransfer;

    /**
     * @return array
     */
    public function getDaysInTheWeek(): array;

    /**
     * @param int $IdGlobalPickReport
     *
     * @return void
     */
    public function updateGlobalPerformanceOrder(int $IdGlobalPickReport): void;

    /**
     * @param int $IdPerformanceSalesOrderReport
     * @param int $containerCount
     *
     * @return int
     */
    public function updatePerformanceOrder(int $IdPerformanceSalesOrderReport, int $containerCount): int;

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param string $containerToMove
     * @param string $containerToFill
     *
     * @return string
     */
    public function moveContainerToContainer(PickingHeaderTransfer $transfer, string $containerToMove, string $containerToFill): string;

    /**
     * @return \StoreApp\Zed\Picker\Business\PickerBusinessFactory
     */
    public function getBusinessFactory(): PickerBusinessFactory;
}
