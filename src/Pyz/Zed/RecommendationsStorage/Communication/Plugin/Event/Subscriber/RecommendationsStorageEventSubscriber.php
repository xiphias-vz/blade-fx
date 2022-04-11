<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageBusinessFactory;
use Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface;
use Pyz\Zed\RecommendationsStorage\Communication\Plugin\Event\Listener\RecommendationsStoragePublishListener;
use Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method RecommendationsStorageConfig getConfig()
 * @method RecommendationsStorageBusinessFactory getFactory()
 * @method RecommendationsStorageFacadeInterface getFacade()
 */
class RecommendationsStorageEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    /**
     * @param EventCollectionInterface $eventCollection
     *
     * @return EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection = $this->addRecommendationDefinitionPublishListeners($eventCollection);
        $eventCollection = $this->addRecommendationDefinitionUpdateListeners($eventCollection);

        return $eventCollection;
    }

    /**
     * @param EventCollectionInterface $eventCollection
     *
     * @return EventCollectionInterface
     */
    public function addRecommendationDefinitionUpdateListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(RecommendationsEvents::ENTITY_PYZ_RECOMMENDATION_DEFINITION_UPDATE, new RecommendationsStoragePublishListener());

        return $eventCollection;
    }

    /**
     * @param EventCollectionInterface $eventCollection
     *
     * @return EventCollectionInterface
     */
    public function addRecommendationDefinitionPublishListeners(EventCollectionInterface $eventCollection): EventCollectionInterface
    {
        $eventCollection->addListenerQueued(RecommendationsEvents::RECOMMENDATIONS_PUBLISH, new RecommendationsStoragePublishListener());

        return $eventCollection;
    }
}
