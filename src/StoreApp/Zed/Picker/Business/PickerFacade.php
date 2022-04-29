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
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceGlobalSalesOrderReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderReportItemQuery;
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
     * @param bool $isSubstituteContainer
     *
     * @return bool
     */
    public function setContainerToOrder(PickingOrderTransfer $order, string $containerId, string $shelfId, bool $isSubstituteContainer): bool
    {
        return $this
            ->getFactory()
            ->createPickingHeaderTransferData()
            ->setContainerToOrder($order, $containerId, $shelfId, $isSubstituteContainer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param string $containerId
     *
     * @return void
     */
    public function updateContainerPickZone(PickingOrderTransfer $order, string $containerId)
    {
        $this
            ->getFactory()
            ->createPickingHeaderTransferData()
            ->updateContainerPickZone($order, $containerId);
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
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        $isContainerInUseMessage = $containerCode . ',' . $isContainerInUseMessage;
        $isContainerInUseMessageToArray = explode(',', $isContainerInUseMessage);

        if ($storeCodeBucket == 'DE') {
            return $isContainerInUseMessageToArray[0] . ' ist bereits für Kunde ' . $isContainerInUseMessageToArray[2] .
                ' bestellung ' . $isContainerInUseMessageToArray[1] . ' aktiviert';
        } else {
            return $isContainerInUseMessageToArray[0] . ' je již aktivován u zákazníka ' . $isContainerInUseMessageToArray[2] . ',' .
                ' objednávka ' . $isContainerInUseMessageToArray[1];
        }
    }

    /**
     * @param int $quantityPicked
     * @param int $weight
     * @param string $containerCode
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked, int $weight, string $containerCode): void
    {
        $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setCurrentOrderItemPicked($quantityPicked, $weight, $containerCode);
    }


    /**
     * @param int $orderId
     * @param int $itemEan
     * @param int $itemPrice
     * @return void
     */
    public function removeCanceledAmountForRepickedItems(int $orderId, int $itemEan, int $itemPrice): void
    {
        $this->getFactory()
            ->createPickingHeaderTransferData()
            ->removeCanceledAmountForRepickedItems($orderId, $itemEan, $itemPrice);
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
     * @param bool $isSubstitutionPicked
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled, bool $isSubstitutionPicked): bool
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setCurrentOrderItemCanceled($isCanceled, $isSubstitutionPicked);
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
        $pyzGlobalPerformanceEntity = PyzPerformanceGlobalSalesOrderReportQuery::create()
            ->filterByIdPicker($transfer->getIdPicker())
            ->filterByPickZone($transfer->getPickZone())
            ->filterByIsMultiPick($transfer->getIsMultiPick())
            ->filterByPickTimeBegin($transfer->getPickTimeBegin())
            ->filterByNumberRelatedOrders($transfer->getNumberRelatedOrders())
            ->findOneOrCreate();

        if ($pyzGlobalPerformanceEntity->isNew() || $pyzGlobalPerformanceEntity->isModified() || $pyzGlobalPerformanceEntity->isPrimaryKeyNull()) {
            $pyzGlobalPerformanceEntity->save();
        }

        $globalPickerReportTransfer = (new PerformanceGlobalSalesOrderReportTransfer())
            ->setIdGlobalPickReport($pyzGlobalPerformanceEntity->getIdGlobalPickReport())
            ->setIdPicker($pyzGlobalPerformanceEntity->getIdPicker())
            ->setPickZone($pyzGlobalPerformanceEntity->getPickZone())
            ->setIsMultiPick($pyzGlobalPerformanceEntity->getIsMultiPick())
            ->setPickTimeBegin(date("Y-m-d H:i:s", $pyzGlobalPerformanceEntity->getPickTimeBegin()->getTimestamp()))
            ->setNumberRelatedOrders($pyzGlobalPerformanceEntity->getNumberRelatedOrders());

        return $globalPickerReportTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer
     */
    public function setOrderPickerReport(PerformanceSalesOrderReportTransfer $transfer): PerformanceSalesOrderReportTransfer
    {
        $pyzPerformanceOrderEntity = PyzPerformanceSalesOrderReportQuery::create()
            ->filterByFkGlobalPickReport($transfer->getFkGlobalPickReport())
            ->filterByIdSalesOrder($transfer->getIdSalesOrder())
            ->filterByOrderDate($transfer->getOrderDate())
            ->filterByContainersUsed($transfer->getContainersUsed())
            ->filterByPositionsUsed($transfer->getPositionsUsed())
            ->filterByPieces($transfer->getPieces())
            ->filterByPickingStart($transfer->getPickingStart())
            ->findOneOrCreate();

        if ($pyzPerformanceOrderEntity->isNew() || $pyzPerformanceOrderEntity->isModified() || $pyzPerformanceOrderEntity->isPrimaryKeyNull()) {
            $pyzPerformanceOrderEntity->save();
        }

        $orderPerformanceReportTransfer = (new PerformanceSalesOrderReportTransfer())
            ->setIdPerformanceSalesOrderReport($pyzPerformanceOrderEntity->getIdPerformanceSalesOrderReport())
            ->setFkGlobalPickReport($pyzPerformanceOrderEntity->getFkGlobalPickReport())
            ->setIdSalesOrder($pyzPerformanceOrderEntity->getIdSalesOrder())
            ->setOrderDate(date("Y-m-d", $pyzPerformanceOrderEntity->getOrderDate()->getTimestamp()))
            ->setContainersUsed($pyzPerformanceOrderEntity->getContainersUsed())
            ->setPositionsUsed($pyzPerformanceOrderEntity->getPositionsUsed())
            ->setPieces($pyzPerformanceOrderEntity->getPieces())
            ->setPickingStart(date("Y-m-d H:i:s", $pyzPerformanceOrderEntity->getPickingStart()->getTimestamp()));

        return $orderPerformanceReportTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer
     */
    public function setOrderItemPickerReport(PerformanceSalesOrderReportItemTransfer $transfer): PerformanceSalesOrderReportItemTransfer
    {
        $pyzPerformanceOrderItemEntity = PyzPerformanceSalesOrderReportItemQuery::create()
            ->filterByFkPerformanceSalesOrderReport($transfer->getFkPerformanceSalesOrderReport())
            ->filterByIdSalesOrderItem($transfer->getIdSalesOrderItem())
            ->filterByPickingStartTime($transfer->getPickingStartTime())
            ->filterByPickingEndTime($transfer->getPickingEndTime())
            ->filterByPickupEndStatus($transfer->getPickupEndStatus())
            ->filterByDurationPickTime($transfer->getDurationPickingTime())
            ->findOneOrCreate();

        if ($pyzPerformanceOrderItemEntity->isNew() || $pyzPerformanceOrderItemEntity->isModified() || $pyzPerformanceOrderItemEntity->isPrimaryKeyNull()) {
            $pyzPerformanceOrderItemEntity->save();
        }

        $orderItemPerformanceReportTransfer = (new PerformanceSalesOrderReportItemTransfer())
            ->setIdPerformanceSalesOrderItemReport($pyzPerformanceOrderItemEntity->getIdPerformanceSalesOrderItemReport())
            ->setFkPerformanceSalesOrderReport($pyzPerformanceOrderItemEntity->getFkPerformanceSalesOrderReport())
            ->setIdSalesOrderItem($pyzPerformanceOrderItemEntity->getIdSalesOrderItem())
            ->setPickingStartTime(date("Y-m-d", $pyzPerformanceOrderItemEntity->getPickingStartTime()->getTimestamp()))
            ->setPickingEndTime(date("Y-m-d", $pyzPerformanceOrderItemEntity->getPickingEndTime()->getTimestamp()))
            ->setPickupEndStatus($transfer->getPickupEndStatus())
            ->setDurationPickingTime($pyzPerformanceOrderItemEntity->getDurationPickTime());

        return $orderItemPerformanceReportTransfer;
    }

    /**
     * @return array
     */
    public function getDaysInTheWeek(): array
    {
        return $this->getFactory()->getConfig()->getDaysInTheWeek();
    }

    /**
     * @param int $IdGlobalPickReport
     *
     * @return void
     */
    public function updateGlobalPerformanceOrder(int $IdGlobalPickReport): void
    {
        $this->getFactory()
            ->createPickingHeaderTransferData()
            ->updateGlobalPerformanceOrder($IdGlobalPickReport);
    }

    /**
     * @param int $IdPerformanceSalesOrderReport
     * @param int $containerCount
     *
     * @return int
     */
    public function updatePerformanceOrder(int $IdPerformanceSalesOrderReport, int $containerCount): int
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->updatePerformanceOrder($IdPerformanceSalesOrderReport, $containerCount);
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param string $containerToMove
     * @param string $containerToFill
     *
     * @return string
     */
    public function moveContainerToContainer(PickingHeaderTransfer $transfer, string $containerToMove, string $containerToFill): string
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->moveContainerToContainer($transfer, $containerToMove, $containerToFill);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\PickerBusinessFactory
     */
    public function getBusinessFactory(): PickerBusinessFactory
    {
        return $this->getFactory();
    }

    /**
     * @param int $position
     *
     * @return bool
     */
    public function setCurrentOrderItemWeightReset(int $position): bool
    {
        return $this->getFactory()
            ->createPickingHeaderTransferData()
            ->setCurrentOrderItemWeightReset($position);
    }
}
