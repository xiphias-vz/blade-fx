<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStoragePersistenceFactory getFactory()
 */
class RecommendationsStorageRepository extends AbstractRepository implements RecommendationsStorageRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionCriteriaTransfer $criteriaTransfer
     *
     * @return \Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer
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
}
