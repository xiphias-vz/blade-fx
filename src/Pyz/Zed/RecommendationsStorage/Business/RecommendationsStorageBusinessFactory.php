<?php

namespace Pyz\Zed\RecommendationsStorage\Business;

use Pyz\Zed\RecommendationsStorage\Business\Storage\RecommendationsStorageWriter;
use Pyz\Zed\RecommendationsStorage\Business\Storage\RecommendationsStorageWriterInterface;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface;
use Pyz\Zed\RecommendationsStorage\RecommendationsStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method RecommendationsStorageRepositoryInterface getRepository()
 * @method RecommendationsStorageEntityManagerInterface getEntityManager()
 */
class RecommendationsStorageBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return RecommendationsStorageWriterInterface
     */
    public function createRecommendationsStorageWriter(): RecommendationsStorageWriterInterface
    {
        return new RecommendationsStorageWriter(
            $this->getRepository(),
            $this->getEntityManager(),
            $this->getEventBehaviorFacade()
        );
    }

    /**
     * @return mixed
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }
}
