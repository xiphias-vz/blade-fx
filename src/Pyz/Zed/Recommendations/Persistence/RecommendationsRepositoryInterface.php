<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;

interface RecommendationsRepositoryInterface
{
    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer;

    /**
     * @return \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null
     */
    public function getRecommendationsDefinition(): ?RecommendationDefinitionTransfer;
}
