<?php

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method RecommendationsStoragePersistenceFactory getFactory()
 */
class RecommendationsStorageEntityManager extends AbstractEntityManager implements RecommendationsStorageEntityManagerInterface
{
    /**
     * @param RecommendationDefinitionCollectionTransfer $collectionTransfer
     *
     * @return void
     */
    public function saveRecommendationDefinition(RecommendationDefinitionCollectionTransfer $collectionTransfer)
    {
        $recommendationDefinitionStorageMapper = $this->getFactory()
            ->createRecommendationsStorageMapper();

        $currentRecommendationDefinitions = $this->getFactory()
            ->queryRecommendationDefinitionStorageByStore($collectionTransfer->getStore())
            ->findOneOrCreate();

        if ($currentRecommendationDefinitions->getStore() === null || strlen($currentRecommendationDefinitions->getStore()) < 1) {
            $currentRecommendationDefinitions->setStore($collectionTransfer->getStore());
        }

        $recommendationDefinitionStorageMapper
            ->mapRecommendationDefinitionCollectionToRecommendationDefinitionEntity($collectionTransfer, $currentRecommendationDefinitions)
            ->save();
    }
}
