<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsPersistenceFactory getFactory()
 */
class RecommendationsRepository extends AbstractRepository implements RecommendationsRepositoryInterface
{
    private const ID_RECOMMENDATIONS_DEFINITION = 1;

    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
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
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
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
