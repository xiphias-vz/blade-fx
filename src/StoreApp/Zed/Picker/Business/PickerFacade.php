<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Generated\Shared\Transfer\PickingOrderTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
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
}
