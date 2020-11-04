<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\MerchantStorage\Communication\Plugin\Event\Listener\MerchantDeliveryPostalCodeStoragePublishListener;
use Pyz\Zed\MerchantStorage\Communication\Plugin\Event\Listener\MerchantStoragePublishListener;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Merchant\Dependency\MerchantEvents;

/**
 * @method \Pyz\Zed\MerchantStorage\MerchantStorageConfig getConfig()
 * @method \Pyz\Zed\MerchantStorage\Business\MerchantStorageBusinessFactory getFactory()
 * @method \Pyz\Zed\MerchantStorage\Business\MerchantStorageFacade getFacade()
 */
class MerchantStorageEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection = $this->addMerchantPublishListeners($eventCollection);
        $eventCollection = $this->addMerchantUpdateListeners($eventCollection);
        $eventCollection = $this->addMerchantCreateListeners($eventCollection);
        $eventCollection = $this->addMerchantDeliveryPostalCodeCreateListeners($eventCollection);
        $eventCollection = $this->addMerchantDeliveryPostalCodeDeleteListeners($eventCollection);

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addMerchantPublishListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(MerchantEvents::MERCHANT_PUBLISH, new MerchantStoragePublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addMerchantUpdateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(MerchantEvents::ENTITY_SPY_MERCHANT_UPDATE, new MerchantStoragePublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addMerchantCreateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued('Entity.spy_merchant.create', new MerchantStoragePublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addMerchantDeliveryPostalCodeCreateListeners(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued('Entity.pyz_merchant_delivery_postal_code.create', new MerchantDeliveryPostalCodeStoragePublishListener());

        return $eventCollection;
    }

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    protected function addMerchantDeliveryPostalCodeDeleteListeners(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued('Entity.pyz_merchant_delivery_postal_code.delete', new MerchantDeliveryPostalCodeStoragePublishListener());

        return $eventCollection;
    }
}
