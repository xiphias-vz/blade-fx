<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery;

interface RecommendationsStorageQueryContainerInterface
{
    /**
     * @return \Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery
     */
    public function getPyzRecommendationDefinitionStorageQuery(): PyzRecommendationDefinitionStorageQuery;
}
