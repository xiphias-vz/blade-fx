<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityStorage\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\ProductQuantityStorage\Communication\Plugin\Event\Listener\ProductQuantityStorageListener;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\ProductQuantity\Dependency\ProductQuantityEvents;
use Spryker\Zed\ProductQuantityStorage\Communication\Plugin\Event\Subscriber\ProductQuantityStorageEventSubscriber as SprykerProductQuantityStorageEventSubscriber;

class ProductQuantityStorageEventSubscriber extends SprykerProductQuantityStorageEventSubscriber
{
    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        parent::getSubscribedEvents($eventCollection);

        $this->addProductQuantityCreateStorageListener($eventCollection);
        $this->addProductQuantityUpdateStorageListener($eventCollection);

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return void
     */
    protected function addProductQuantityCreateStorageListener(EventCollectionInterface $eventCollection): void
    {
        $eventCollection->addListenerQueued(
            ProductQuantityEvents::ENTITY_SPY_PRODUCT_QUANTITY_CREATE,
            new ProductQuantityStorageListener()
        );
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return void
     */
    protected function addProductQuantityUpdateStorageListener(EventCollectionInterface $eventCollection): void
    {
        $eventCollection->addListenerQueued(
            ProductQuantityEvents::ENTITY_SPY_PRODUCT_QUANTITY_UPDATE,
            new ProductQuantityStorageListener()
        );
    }
}
