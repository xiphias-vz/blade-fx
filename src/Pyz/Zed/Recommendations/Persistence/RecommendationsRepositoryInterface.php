<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;

interface RecommendationsRepositoryInterface
{
    /**
     * @param int $idRecommendationsScenario
     *
     * @return ScenarioTransfer
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer;

    /**
     * @return RecommendationDefinitionTransfer|null
     */
    public function getRecommendationsDefinition(): ?RecommendationDefinitionTransfer;
}
