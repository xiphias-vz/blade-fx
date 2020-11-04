<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Business\Storage;

use Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;

class ShipmentStorageWriter implements ShipmentStorageWriterInterface
{
    /**
     * @var \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface
     */
    protected $shipmentStorageEntityManager;

    /**
     * @var \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    protected $eventBehaviorFacade;

    /**
     * @param \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface $shipmentStorageEntityManager
     * @param \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface $eventFacade
     */
    public function __construct(
        ShipmentStorageEntityManagerInterface $shipmentStorageEntityManager,
        EventBehaviorFacadeInterface $eventFacade
    ) {
        $this->shipmentStorageEntityManager = $shipmentStorageEntityManager;
        $this->eventBehaviorFacade = $eventFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishByShipmentMethodIds(array $eventTransfers): void
    {
        $shipmentMethodIds = array_unique($this->eventBehaviorFacade->getEventTransferIds($eventTransfers));
        $this->shipmentStorageEntityManager->saveShipmentMethodsListByShipmentMethodIds($shipmentMethodIds);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishByShipmentCarrierIds(array $eventTransfers): void
    {
        $shipmentCarrierIds = array_unique($this->eventBehaviorFacade->getEventTransferIds($eventTransfers));
        $this->shipmentStorageEntityManager->saveShipmentMethodsListByShipmentCarrierIds($shipmentCarrierIds);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishByShipmentMethodStoreIds(array $eventTransfers): void
    {
        $shipmentMethodStoreIds = array_unique($this->eventBehaviorFacade->getEventTransferIds($eventTransfers));
        $this->shipmentStorageEntityManager->saveShipmentMethodsListByShipmentMethodStoreIds($shipmentMethodStoreIds);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishByShipmentMethodPriceIds(array $eventTransfers): void
    {
        $shipmentMethodPriceIds = array_unique($this->eventBehaviorFacade->getEventTransferIds($eventTransfers));
        $this->shipmentStorageEntityManager->saveShipmentMethodsListByShipmentMethodStoreIds($shipmentMethodPriceIds);
    }
}
