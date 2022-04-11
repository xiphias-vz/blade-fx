<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\PyzRecommendationDefinitionEntityTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationsStorage;
use Propel\Runtime\Collection\ObjectCollection;

class RecommendationsStorageMapper implements RecommendationsStorageMapperInterface
{
    public function mapRecommendationDefinitionStorageEntityToRecommendationDefinitionCollection(
        PyzRecommendationDefinitionStorage $pyzRecommendationDefinitionStorage,
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
    ): RecommendationDefinitionCollectionTransfer {
        return new RecommendationDefinitionCollectionTransfer();
    }

    public function mapRecommendationDefinitionEntityToRecommendationDefinitionCollection(
        PyzRecommendationDefinition $recommendationDefinitionEntity,
        RecommendationDefinitionCriteriaTransfer $criteriaTransfer,
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
    ): RecommendationDefinitionCollectionTransfer {

        $recommendationDefinitionTransfer = (new RecommendationDefinitionTransfer())->fromArray(
            $recommendationDefinitionEntity->toArray()
        );

        $definitionCollectionTransfer->setStore($criteriaTransfer->getStore());

        $definitionCollectionTransfer->addDefinitions($recommendationDefinitionTransfer);
        // foreach ($recommendationDefinitionEntities as $definitionEntity) {}

        return $definitionCollectionTransfer;
    }

    public function mapRecommendationDefinitionCollectionToRecommendationDefinitionEntity(
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer,
        PyzRecommendationDefinitionStorage $definitionStorage
    ): PyzRecommendationDefinitionStorage {
        $recommendationDefinitions = [];

        foreach ($definitionCollectionTransfer->getDefinitions() as $definition) {
            $recommendationDefinitions[] = [
                RecommendationDefinitionTransfer::ID_RECOMMENDATION_DEFINITION => $definition->getIdRecommendationDefinition(),
                RecommendationDefinitionTransfer::RECOMMENDATIONS_ENABLED => $definition->getRecommendationsEnabled(),
                RecommendationDefinitionTransfer::RECOMMENDATIONS_FF_SNIPPET_ENABLED => $definition->getRecommendationsFfSnippetEnabled(),
                RecommendationDefinitionTransfer::STORE => $definitionCollectionTransfer->getStore()
            ];
        }

        return $definitionStorage->setData($recommendationDefinitions);
    }
}
