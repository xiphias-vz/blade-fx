<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\PyzRecommendationDefinitionEntityTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationsStorage;
use Propel\Runtime\Collection\ObjectCollection;

interface RecommendationsStorageMapperInterface
{
    public function mapRecommendationDefinitionStorageEntityToRecommendationDefinitionCollection(
        PyzRecommendationDefinitionStorage $pyzRecommendationDefinitionStorage,
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
    ): RecommendationDefinitionCollectionTransfer;

    public function mapRecommendationDefinitionEntityToRecommendationDefinitionCollection(
        PyzRecommendationDefinition $recommendationDefinitionEntity,
        RecommendationDefinitionCriteriaTransfer $criteriaTransfer,
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
    ): RecommendationDefinitionCollectionTransfer;

    public function mapRecommendationDefinitionCollectionToRecommendationDefinitionEntity(
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer,
        PyzRecommendationDefinitionStorage $definitionStorage
    ): PyzRecommendationDefinitionStorage;
}
