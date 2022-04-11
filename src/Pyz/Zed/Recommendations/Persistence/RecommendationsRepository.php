<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method RecommendationsPersistenceFactory getFactory()
 */
class RecommendationsRepository extends AbstractRepository implements RecommendationsRepositoryInterface
{
    private const ID_RECOMMENDATIONS_DEFINITION = 1;

    /**
     * @param int $idRecommendationsScenario
     *
     * @return ScenarioTransfer|null
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer
    {
        $scenarioEntity = $this->getFactory()
            ->createPyzRecommendationsScenariosQuery()
            ->findOneByIdRecommendationScenarios($idRecommendationsScenario);

        if ($scenarioEntity === null) {
            return $scenarioEntity;
        }

        return $this->getFactory()
            ->createScenarioMapper()
            ->mapScenarioEntityToScenarioTransfer(
                $scenarioEntity,
                new ScenarioTransfer()
            );
    }

    /**
     * @return ScenarioTransfer|null
     */
    public function getRecommendationsDefinition(): ?RecommendationDefinitionTransfer
    {
        $definitionEntity = $this->getFactory()
            ->createPyzRecommendationsDefinitionQuery()
            ->findOneByIdRecommendationDefinition(static::ID_RECOMMENDATIONS_DEFINITION);

        if ($definitionEntity === null) {
            return $definitionEntity;
        }

        return $this->getFactory()
            ->createScenarioMapper()
            ->mapDefinitionEntityToRecommendationDefinitionTransfer(
                $definitionEntity,
                new RecommendationDefinitionTransfer()
            );
    }
}
