<?php

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;

interface RecommendationsStorageRepositoryInterface
{
    /**
     * @param RecommendationDefinitionCriteriaTransfer $criteriaTransfer
     *
     * @return RecommendationDefinitionCollectionTransfer
     */
    public function getRecommendationDefinition(RecommendationDefinitionCriteriaTransfer $criteriaTransfer): RecommendationDefinitionCollectionTransfer;

    public function findRecommendationDefinitionStorage(): ?RecommendationDefinitionCollectionTransfer;


}
