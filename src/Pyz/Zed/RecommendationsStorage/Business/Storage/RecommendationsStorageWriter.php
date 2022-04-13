<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Business\Storage;

use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;

class RecommendationsStorageWriter implements RecommendationsStorageWriterInterface
{
    /**
     * @var \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface
     */
    protected $recommendationsStorageRepository;

    /**
     * @var \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface
     */
    protected $recommendationsStorageEntityManager;

    /**
     * @var \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    protected $eventBehaviorFacade;

    /**
     * @param \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface $recommendationsStorageRepository
     * @param \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface $recommendationsStorageEntityManager
     * @param \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface $eventBehaviorFacade
     */
    public function __construct(
        RecommendationsStorageRepositoryInterface $recommendationsStorageRepository,
        RecommendationsStorageEntityManagerInterface $recommendationsStorageEntityManager,
        EventBehaviorFacadeInterface $eventBehaviorFacade
    ) {
        $this->recommendationsStorageRepository = $recommendationsStorageRepository;
        $this->recommendationsStorageEntityManager = $recommendationsStorageEntityManager;
        $this->eventBehaviorFacade = $eventBehaviorFacade;
    }

    /**
     * @param array $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void
    {
        $storeNames = array_unique($this->eventBehaviorFacade->getEventTransfersAdditionalValues(
            $eventTransfers,
            'store'
        ));

        $this->storeData($storeNames);
    }

    /**
     * @param int[] $storeIds
     *
     * @return void
     */
    protected function storeData(array $storeIds): void
    {
        foreach ($storeIds as $storeName) {
            $recommendationCollectionTransfer = $this->recommendationsStorageRepository->getRecommendationDefinition(
                (new RecommendationDefinitionCriteriaTransfer())->setStore($storeName)
            );

            $this->recommendationsStorageEntityManager->saveRecommendationDefinition($recommendationCollectionTransfer);
        }
    }
}
