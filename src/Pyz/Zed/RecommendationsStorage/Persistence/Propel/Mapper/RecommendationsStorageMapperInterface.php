<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage;

interface RecommendationsStorageMapperInterface
{
    /**
     * @param \Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition $recommendationDefinitionEntity
     * @param \Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer $criteriaTransfer
     * @param \Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer
     */
    public function mapRecommendationDefinitionEntityToRecommendationDefinitionCollection(
        PyzRecommendationDefinition $recommendationDefinitionEntity,
        RecommendationDefinitionCriteriaTransfer $criteriaTransfer,
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
    ): RecommendationDefinitionCollectionTransfer;

    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer
     * @param \Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage $definitionStorage
     *
     * @return \Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorage
     */
    public function mapRecommendationDefinitionCollectionToRecommendationDefinitionEntity(
        RecommendationDefinitionCollectionTransfer $definitionCollectionTransfer,
        PyzRecommendationDefinitionStorage $definitionStorage
    ): PyzRecommendationDefinitionStorage;
}
