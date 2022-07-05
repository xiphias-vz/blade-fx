<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStoragePersistenceFactory getFactory()
 */
class RecommendationsStorageEntityManager extends AbstractEntityManager implements RecommendationsStorageEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer $collectionTransfer
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

        if ($currentRecommendationDefinitions->getStore() == null || strlen($currentRecommendationDefinitions->getStore()) < 1) {
            $currentRecommendationDefinitions->setStore($collectionTransfer->getStore());
        }

        $recommendationDefinitionStorageMapper
            ->mapRecommendationDefinitionCollectionToRecommendationDefinitionEntity($collectionTransfer, $currentRecommendationDefinitions)
            ->save();
    }
}
