<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport\Business\ShipmentMethodsEventsPublisher;

use Generated\Shared\Transfer\EventEntityTransfer;
use Pyz\Zed\Shipment\Dependency\ShipmentEvents;
use Spryker\Zed\Event\Business\EventFacadeInterface;
use Spryker\Zed\Shipment\Business\ShipmentFacadeInterface;

class ShipmentMethodsEventsPublisher implements ShipmentMethodsEventsPublisherInterface
{
    /**
     * @var \Spryker\Zed\Shipment\Business\ShipmentFacadeInterface
     */
    protected $shipmentFacade;

    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface
     */
    protected $eventFacade;

    /**
     * @param \Spryker\Zed\Shipment\Business\ShipmentFacadeInterface $shipmentFacade
     * @param \Spryker\Zed\Event\Business\EventFacadeInterface $eventFacade
     */
    public function __construct(ShipmentFacadeInterface $shipmentFacade, EventFacadeInterface $eventFacade)
    {
        $this->shipmentFacade = $shipmentFacade;
        $this->eventFacade = $eventFacade;
    }

    /**
     * @return void
     */
    public function triggerShipmentMethodsPublishEvents(): void
    {
        $shipmentMethodTransfers = $this->shipmentFacade->getMethods();
        $eventEntityTransfers = [];

        foreach ($shipmentMethodTransfers as $shipmentMethodTransfer) {
            $eventEntityTransfers[] = (new EventEntityTransfer())->setId($shipmentMethodTransfer->getIdShipmentMethod());
        }

        $this->eventFacade->triggerBulk(ShipmentEvents::SHIPMENT_METHODS_PUBLISH, $eventEntityTransfers);
    }
}
