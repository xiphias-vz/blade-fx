<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios;

class ScenarioMapper implements ScenarioMapperInterface
{
    /**
     * @param \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios $scenarioEntity
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function mapScenarioEntityToScenarioTransfer(
        PyzRecommendationScenarios $scenarioEntity,
        ScenarioTransfer $scenarioTransfer
    ): ScenarioTransfer {
        return $scenarioTransfer->fromArray($scenarioEntity->toArray(), true);
    }

    /**
     * @param \Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinition $definitionEntity
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer $definitionTransfer
     *
     * @return \Generated\Shared\Transfer\RecommendationDefinitionTransfer
     */
    public function mapDefinitionEntityToRecommendationDefinitionTransfer(
        PyzRecommendationDefinition $definitionEntity,
        RecommendationDefinitionTransfer $definitionTransfer
    ): RecommendationDefinitionTransfer {
        return $definitionTransfer->fromArray($definitionEntity->toArray(), true);
    }
}
