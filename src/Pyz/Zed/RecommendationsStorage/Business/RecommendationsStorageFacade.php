<?php

namespace Pyz\Zed\RecommendationsStorage\Business;

use Generated\Shared\Transfer\EventEntityTransfer;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method RecommendationsStorageBusinessFactory getFactory()
 * @method RecommendationsStorageRepositoryInterface getRepository()
 * @method RecommendationsStorageEntityManagerInterface getEntityManager()
 */
class RecommendationsStorageFacade extends AbstractFacade implements RecommendationsStorageFacadeInterface
{
    /**
     * @param array $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void
    {
        $this->getFactory()->createRecommendationsStorageWriter()->publish($eventTransfers);
    }

    /**
     * @return void
     */
    public function synchronizeMerchantToStorage(): void
    {
        $this->getFactory()->createRecommendationsStorageWriter()->updateRecommendationDefinitionToStorage();
    }
}
