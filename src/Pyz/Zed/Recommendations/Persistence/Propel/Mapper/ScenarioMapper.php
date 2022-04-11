<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\ScenarioTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios;

class ScenarioMapper implements ScenarioMapperInterface
{
    /**
     * @param PyzRecommendationScenarios $scenarioEntity
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return ScenarioTransfer
     */
    public function mapScenarioEntityToScenarioTransfer(
        PyzRecommendationScenarios $scenarioEntity,
        ScenarioTransfer $scenarioTransfer
    ): ScenarioTransfer
    {
        return $scenarioTransfer->fromArray($scenarioEntity->toArray(), true);
    }

    /**
     * @param PyzRecommendationDefinition $definitionEntity
     * @param RecommendationDefinitionTransfer $definitionTransfer
     *
     * @return RecommendationDefinitionTransfer
     */
    public function mapDefinitionEntityToRecommendationDefinitionTransfer(
        PyzRecommendationDefinition $definitionEntity,
        RecommendationDefinitionTransfer $definitionTransfer
    ): RecommendationDefinitionTransfer
    {
        return  $definitionTransfer->fromArray($definitionEntity->toArray(), true);
    }
}
