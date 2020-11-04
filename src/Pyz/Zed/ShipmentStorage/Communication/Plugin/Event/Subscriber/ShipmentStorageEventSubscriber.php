<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\Shipment\Dependency\ShipmentEvents;
use Pyz\Zed\ShipmentStorage\Communication\Plugin\Event\Listener\ShipmentCarriersPublishListener;
use Pyz\Zed\ShipmentStorage\Communication\Plugin\Event\Listener\ShipmentMethodPricesPublishListener;
use Pyz\Zed\ShipmentStorage\Communication\Plugin\Event\Listener\ShipmentMethodsPublishListener;
use Pyz\Zed\ShipmentStorage\Communication\Plugin\Event\Listener\ShipmentMethodStorePublishListener;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageBusinessFactory getFactory()
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageFacade getFacade()
 */
class ShipmentStorageEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection = $this->addShipmentMethodsPublishListeners($eventCollection);
        $eventCollection = $this->addShipmentMethodCreateListeners($eventCollection);
        $eventCollection = $this->addShipmentMethodUpdateListeners($eventCollection);
        $eventCollection = $this->addShipmentCarrierUpdateListeners($eventCollection);
        $eventCollection = $this->addShipmentMethodStoreCreateListeners($eventCollection);
        $eventCollection = $this->addShipmentMethodStoreUpdateListeners($eventCollection);
        $eventCollection = $this->addShipmentMethodPriceCreateListeners($eventCollection);
        $eventCollection = $this->addShipmentMethodPriceUpdateListeners($eventCollection);

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodsPublishListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::SHIPMENT_METHODS_PUBLISH, new ShipmentMethodsPublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodCreateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_METHOD_CREATE, new ShipmentMethodsPublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodUpdateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_METHOD_UPDATE, new ShipmentMethodsPublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentCarrierUpdateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_CARRIER_UPDATE, new ShipmentCarriersPublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodStoreCreateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_STORE_CREATE, new ShipmentMethodStorePublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodStoreUpdateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_STORE_UPDATE, new ShipmentMethodStorePublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodPriceCreateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_STORE_UPDATE, new ShipmentMethodPricesPublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addShipmentMethodPriceUpdateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(ShipmentEvents::ENTITY_SPY_SHIPMENT_STORE_UPDATE, new ShipmentMethodPricesPublishListener());

        return $eventCollection;
    }
}
