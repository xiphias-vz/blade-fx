<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderItemReportTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceGlobalSalesOrderReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderItemReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderReportQuery;
use Spryker\Zed\Kernel\Business\AbstractFacade;
use StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer;
use StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransferData;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerBusinessFactory getFactory()
 */
class PickerFacade extends AbstractFacade implements PickerFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function markOrderItemsAsPicked(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsPicked($idSalesOrderItems);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsContainerSelected(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsContainerSelected($idSalesOrderItems);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsNotPicked(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsNotPicked($idSalesOrderItems);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsCollectedByCustomer(array $idSalesOrderItems, int $idUser): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsCollectedByCustomer($idSalesOrderItems, $idUser);
    }

    /**
     * @inheritDoc
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): void
    {
        $this->getFactory()->createOrderUpdater()
            ->updateOrderPickingBagsCount($idSalesOrder, $pickingBagsCount);
    }

    /**
     * @inheritDoc
     */
    public function markOrderItemsAsCanceledByCustomer(array $idSalesOrderItems): void
    {
        $this->getFactory()->createOrderUpdater()
            ->markOrderItemsAsCanceledByCustomer($idSalesOrderItems);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneInSession(): ?PickingZoneTransfer
    {
        return $this->getFactory()->createPickingZoneReader()
            ->findInSession();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $idPickingZone
     *
     * @return void
     */
    public function savePickingZoneInSession(int $idPickingZone): void
    {
        $this->getFactory()->createPickingZoneWriter()
            ->saveInSession($idPickingZone);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getAllOrdersInStateReadyForPickingByZone(): PickingHeaderTransfer
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->getAllOrdersInStateReadyForPickingByZone($this->findPickingZoneInSession()->getIdPickingZone());
    }

    /**
     * @param array $idOrderList
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function setOrdersToPick(array $idOrderList): PickingHeaderTransfer
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setOrdersToPick($idOrderList);
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return bool
     */
    public function unLockAndClearAddedContainers(PickingHeaderTransfer $transfer): bool
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->unLockAndClearAddedContainers($transfer);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getPickingHeaderTransfer(): PickingHeaderTransfer
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->getTransferFromSession();
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return void
     */
    public function setTransferToSession(PickingHeaderTransfer $transfer): void
    {
        $transfer->setParents(true);
        $this->getFactory()->getSessionService()->set(PickingHeaderTransferData::PICKING_TRANSFER_SESSION_NAME, $transfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param string $containerId
     * @param string $shelfId
     *
     * @return bool
     */
    public function setContainerToOrder(PickingOrderTransfer $order, string $containerId, string $shelfId): bool
    {
        return $this
            ->getFactory()
            ->createPickingHeaderTransferData()
            ->setContainerToOrder($order, $containerId, $shelfId);
    }

    /**
     * @param string $containerID
     * @param string $merchantReference
     * @param int $idSalesOrder
     *
     * @return string|null
     */
    public function checkContainerUsage(string $containerID, string $merchantReference, int $idSalesOrder): ?string
    {
        return $this
            ->getFactory()
            ->createPickingHeaderTransferData()
            ->checkContainerUsage($containerID, $merchantReference, $idSalesOrder);
    }

    /**
     * @param string $isContainerInUseMessage
     * @param string $containerCode
     *
     * @return string
     */
    public function formatErrorMessage(string $isContainerInUseMessage, string $containerCode): string
    {
        $isContainerInUseMessage = $containerCode . ',' . $isContainerInUseMessage;
        $isContainerInUseMessageToArray = explode(',', $isContainerInUseMessage);

        return $isContainerInUseMessageToArray[0] . ' ist bereits für Kunde ' . $isContainerInUseMessageToArray[2] .
            ' bestellung ' . $isContainerInUseMessageToArray[1] . ' aktiviert';
    }

    /**
     * @param int $quantityPicked
     * @param int $weight
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked, int $weight): void
    {
        $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setCurrentOrderItemPicked($quantityPicked, $weight);
    }

    /**
     * @param bool $isPaused
     *
     * @return bool
     */
    public function setCurrentOrderItemPaused(bool $isPaused): bool
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setCurrentOrderItemPaused($isPaused);
    }

    /**
     * @param bool $isCanceled
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled): bool
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setCurrentOrderItemCanceled($isCanceled);
    }

    /**
     * @param string $containerID
     *
     * @return bool
     */
    public function checkContainerForCurrentItem(string $containerID): bool
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->checkContainerForCurrentItem($containerID);
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return void
     */
    public function clearLockForPausedOrders(PickingHeaderTransfer $transfer): void
    {
        $this->getFactory()
            ->createPickingHeaderTransferData()
            ->clearLockForPausedOrders($transfer);
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param array $idOrders
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function clearLockOrders(PickingHeaderTransfer $transfer, array $idOrders): PickingHeaderTransfer
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->clearLockOrders($transfer, $idOrders);
    }

    /**
     * @param \Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer
     */
    public function setGlobalPickerReport(PerformanceGlobalSalesOrderReportTransfer $transfer): PerformanceGlobalSalesOrderReportTransfer
    {
        $pyzGlobalPerformaceEntity = PyzPerformanceGlobalSalesOrderReportQuery::create()
            ->filterByIdPicker($transfer->getIdPicker())
            ->filterByPickZone($transfer->getPickZone())
            ->filterByIsMultiPick($transfer->getIsMultiPick())
            ->filterByPickTimeBegin($transfer->getPickTimeBegin())
            ->filterByNumberRelatedOrders($transfer->getNumberRelatedOrders())
            ->findOneOrCreate();

        if ($pyzGlobalPerformaceEntity->isNew() || $pyzGlobalPerformaceEntity->isModified()) {
            $pyzGlobalPerformaceEntity->save();
        }

        $globalPickerReportTransfer = (new PerformanceGlobalSalesOrderReportTransfer())
            ->setIdGlobalPickReport($pyzGlobalPerformaceEntity->getIdGlobalPickReport())
            ->setIdPicker($pyzGlobalPerformaceEntity->getIdPicker())
            ->setPickZone($pyzGlobalPerformaceEntity->getPickZone())
            ->setIsMultiPick($pyzGlobalPerformaceEntity->getIsMultiPick())
            ->setPickTimeBegin(date("Y-m-d H:i:s", $pyzGlobalPerformaceEntity->getPickTimeBegin()->getTimestamp()))
            ->setNumberRelatedOrders($pyzGlobalPerformaceEntity->getNumberRelatedOrders());

        return $globalPickerReportTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer
     */
    public function setOrderPickerReport(PerformanceSalesOrderReportTransfer $transfer): PerformanceSalesOrderReportTransfer
    {
        $pyzPerformaceOrderEntity = PyzPerformanceSalesOrderReportQuery::create()
            ->filterByFkGlobalPickReport($transfer->getFkGlobalPickReport())
            ->filterByIdSalesOrder($transfer->getIdSalesOrder())
            ->filterByOrderDate($transfer->getOrderDate())
            ->filterByContainersUsed($transfer->getContainersUsed())
            ->filterByPositionsUsed($transfer->getPositionsUsed())
            ->filterByPieces($transfer->getPieces())
            ->filterByPickingStart($transfer->getPickingStart())
            ->findOneOrCreate();

        if ($pyzPerformaceOrderEntity->isNew() || $pyzPerformaceOrderEntity->isModified()) {
            $pyzPerformaceOrderEntity->save();
        }

        $orderPerformanceReportTransfer = (new PerformanceSalesOrderReportTransfer())
            ->setIdPerformanceSalesOrderReport($pyzPerformaceOrderEntity->getIdPerformanceSalesOrderReport())
            ->setFkGlobalPickReport($pyzPerformaceOrderEntity->getFkGlobalPickReport())
            ->setIdSalesOrder($pyzPerformaceOrderEntity->getIdSalesOrder())
            ->setOrderDate(date("Y-m-d", $pyzPerformaceOrderEntity->getOrderDate()->getTimestamp()))
            ->setContainersUsed($pyzPerformaceOrderEntity->getContainersUsed())
            ->setPositionsUsed($pyzPerformaceOrderEntity->getPositionsUsed())
            ->setPieces($pyzPerformaceOrderEntity->getPieces())
            ->setPickingStart(date("Y-m-d H:i:s", $pyzPerformaceOrderEntity->getPickingStart()->getTimestamp()));

        return $orderPerformanceReportTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PerformanceSalesOrderItemReportTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceSalesOrderItemReportTransfer
     */
    public function setOrderItemPickerReport(PerformanceSalesOrderItemReportTransfer $transfer): PerformanceSalesOrderItemReportTransfer
    {
        $pyzPerformaceOrderItemEntity = PyzPerformanceSalesOrderItemReportQuery::create()
            ->filterByFkPerformanceSalesOrderReport($transfer->getFkPerformanceSalesOrderReport())
            ->filterByIdSalesOrderItem($transfer->getIdSalesOrderItem())
            ->filterByPickupStartPosition($transfer->getPickupStartPosition())
            ->filterByPickupEndPosition($transfer->getPickupEndPosition())
            ->filterByPickupEndStatus($transfer->getPickupEndStatus())
            ->filterByDurationPickTime($transfer->getDurationPickingTime())
            ->findOneOrCreate();

        if ($pyzPerformaceOrderItemEntity->isNew() || $pyzPerformaceOrderItemEntity->isModified()) {
            $pyzPerformaceOrderItemEntity->save();
        }

        $orderItemPerformanceReportTransfer = (new PerformanceSalesOrderItemReportTransfer())
            ->setIdPerformanceSalesOrderItemReport($pyzPerformaceOrderItemEntity->getIdPerformanceSalesOrderItemReport())
            ->setFkPerformanceSalesOrderReport($pyzPerformaceOrderItemEntity->getFkPerformanceSalesOrderReport())
            ->setIdSalesOrderItem($pyzPerformaceOrderItemEntity->getIdSalesOrderItem())
            ->setPickupStartPosition(date("Y-m-d", $pyzPerformaceOrderItemEntity->getPickupStartPosition()->getTimestamp()))
            ->setPickupEndPosition(date("Y-m-d", $pyzPerformaceOrderItemEntity->getPickupEndPosition()->getTimestamp()))
            ->setPickupEndStatus($transfer->getPickupEndStatus())
            ->setDurationPickingTime($pyzPerformaceOrderItemEntity->getDurationPickTime());

        return $orderItemPerformanceReportTransfer;
    }
}
