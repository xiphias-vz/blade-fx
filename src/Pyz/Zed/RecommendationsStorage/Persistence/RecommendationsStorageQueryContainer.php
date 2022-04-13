<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStoragePersistenceFactory getFactory()
 */
class RecommendationsStorageQueryContainer extends AbstractQueryContainer implements RecommendationsStorageQueryContainerInterface
{
    /**
     * @return \Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery
     */
    public function getPyzRecommendationDefinitionStorageQuery(): PyzRecommendationDefinitionStorageQuery
    {
        return $this->getFactory()->createRecommendationDefinitionStorageQuery();
    }
}
