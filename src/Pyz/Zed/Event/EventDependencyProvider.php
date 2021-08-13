<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getEventListenerCollection()
    {
        return parent::getEventListenerCollection();
    }

    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();

        /**
         * Storage Events
         */
//        $eventSubscriberCollection->add(new GlossaryStorageEventSubscriber());
//        $eventSubscriberCollection->add(new UrlStorageEventSubscriber());
//        $eventSubscriberCollection->add(new AvailabilityStorageEventSubscriber());
//        $eventSubscriberCollection->add(new CategoryStorageEventSubscriber());
//        $eventSubscriberCollection->add(new CmsStorageEventSubscriber());
//        $eventSubscriberCollection->add(new CmsBlockStorageEventSubscriber());
//        $eventSubscriberCollection->add(new NavigationStorageEventSubscriber());
//        $eventSubscriberCollection->add(new PriceProductStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductCategoryStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductCategoryFilterStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductImageStorageEventSubscriber());
//        $eventSubscriberCollection->add(new CategoryImageStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductOptionStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductRelationStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductLabelStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductSetStorageEventSubscriber());
//        $eventSubscriberCollection->add(new FileManagerStorageSubscriber());
//        $eventSubscriberCollection->add(new ProductSearchConfigStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductDiscontinuedStorageEventSubscriber()); #ProductDiscontinuedFeature
//        $eventSubscriberCollection->add(new ProductAlternativeStorageEventSubscriber()); #ProductAlternativeFeature
//        $eventSubscriberCollection->add(new FileManagerStorageSubscriber());
//        $eventSubscriberCollection->add(new CustomerAccessStorageEventSubscriber());
//        $eventSubscriberCollection->add(new TaxStorageSubscriber());
//        $eventSubscriberCollection->add(new TaxProductStorageSubscriber());
//
//        $eventSubscriberCollection->add(new ProductQuantityStorageEventSubscriber());
//        $eventSubscriberCollection->add(new AvailabilityNotificationSubscriber());
//
//        $eventSubscriberCollection->add(new ContentStorageEventSubscriber());
//        $eventSubscriberCollection->add(new CmsSlotStorageEventSubscriber());
//        $eventSubscriberCollection->add(new CmsSlotBlockStorageEventSubscriber());
//
//        $eventSubscriberCollection->add(new MerchantStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ShipmentStorageEventSubscriber());

        /**
         * Search Events
         */
//        $eventSubscriberCollection->add(new CategoryPageSearchEventSubscriber());
//        $eventSubscriberCollection->add(new CmsPageSearchEventSubscriber());
//        $eventSubscriberCollection->add(new ProductSetPageSearchEventSubscriber());
//        $eventSubscriberCollection->add(new ProductPageSearchEventSubscriber());
//        $eventSubscriberCollection->add(new ProductLabelSearchEventSubscriber());
//        $eventSubscriberCollection->add(new ProductConcretePageSearchProductAbstractEventSubscriber());
//        $eventSubscriberCollection->add(new ProductConcretePageSearchProductEventSubscriber());
//        $eventSubscriberCollection->add(new ProductConcretePageSearchProductLocalizedAttributesEventSubscriber());
//        $eventSubscriberCollection->add(new MerchantOpeningHoursStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductMeasurementUnitStorageEventSubscriber());
//        $eventSubscriberCollection->add(new ProductPackagingUnitStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
