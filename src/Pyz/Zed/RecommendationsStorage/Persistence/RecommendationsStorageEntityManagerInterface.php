<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer;

interface RecommendationsStorageEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionCollectionTransfer $collectionTransfer
     *
     * @return mixed
     */
    public function saveRecommendationDefinition(RecommendationDefinitionCollectionTransfer $collectionTransfer);
}
