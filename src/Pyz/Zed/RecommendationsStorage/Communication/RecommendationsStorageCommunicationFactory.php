<?php

namespace Pyz\Zed\RecommendationsStorage\Communication;

use Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig;
use Pyz\Zed\RecommendationsStorage\RecommendationsStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\Store\Business\StoreFacadeInterface;

/**
 * @method RecommendationsStorageConfig getConfig()
 */
class RecommendationsStorageCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }

    /**
     * @return StoreFacadeInterface
     */
    public function getStoreFacade(): StoreFacadeInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::FACADE_STORE);
    }
}
