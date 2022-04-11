<?php

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method RecommendationsStoragePersistenceFactory getFactory()
 */
class RecommendationsStorageRepository extends AbstractRepository implements RecommendationsStorageRepositoryInterface
{
    /**
     * @param RecommendationDefinitionCriteriaTransfer $criteriaTransfer
     *
     * @return RecommendationDefinitionCollectionTransfer
     */
    public function getRecommendationDefinition(RecommendationDefinitionCriteriaTransfer $criteriaTransfer): RecommendationDefinitionCollectionTransfer
    {
        $definitionEntity = $this->getFactory()
            ->createRecommendationDefinitionQuery()
            ->findOne();

        return $this->getFactory()
            ->createRecommendationsStorageMapper()
            ->mapRecommendationDefinitionEntityToRecommendationDefinitionCollection($definitionEntity, $criteriaTransfer, new RecommendationDefinitionCollectionTransfer());
    }

    /**
     * @return RecommendationDefinitionCollectionTransfer|null
     */
    public function findRecommendationDefinitionStorage(): ?RecommendationDefinitionCollectionTransfer
    {
        $definitionStorageEntity = $this->getFactory()
            ->createRecommendationDefinitionStorageQuery()
            ->findOne();

        if ($definitionStorageEntity === null) {
            return null;
        }

        return $this->getFactory()
            ->createRecommendationsStorageMapper()
            ->mapRecommendationDefinitionStorageEntityToRecommendationDefinitionCollection($definitionEntity, new RecommendationDefinitionCollectionTransfer());

    }
}
