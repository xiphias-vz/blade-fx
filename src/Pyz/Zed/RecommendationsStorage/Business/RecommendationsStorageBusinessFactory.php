<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Business;

use Pyz\Zed\RecommendationsStorage\Business\Storage\RecommendationsStorageWriter;
use Pyz\Zed\RecommendationsStorage\Business\Storage\RecommendationsStorageWriterInterface;
use Pyz\Zed\RecommendationsStorage\RecommendationsStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageQueryContainerInterface getQueryContainer()
 */
class RecommendationsStorageBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\RecommendationsStorage\Business\Storage\RecommendationsStorageWriterInterface
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
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(RecommendationsStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }
}
