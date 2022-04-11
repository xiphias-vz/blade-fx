<?php

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;

interface RecommendationsStorageEntityManagerInterface
{
    public function saveRecommendationDefinition(RecommendationDefinitionCollectionTransfer $collectionTransfer);
}
