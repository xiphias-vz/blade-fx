<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios;
use Pyz\Zed\Recommendations\Business\Model\Exception\ResourceNotFoundException;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class ScenarioWriter implements ScenarioWriterInterface
{
    /**
     * @var RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @param RecommendationsQueryContainerInterface $recommendationsQueryContainer
     */
    public function __construct(RecommendationsQueryContainerInterface $recommendationsQueryContainer)
    {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
    }

    /**
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return ScenarioTransfer
     */
    public function createScenario(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        $scenarioEntity = $this->createScenarioEntity($scenarioTransfer);

        $scenarioTransfer->setIdRecommendationScenarios($scenarioEntity->getIdRecommendationScenarios());

        return $scenarioTransfer;
    }

    /**
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return int
     */
    public function updateScenario(ScenarioTransfer $scenarioTransfer): int
    {
        $scenarioEntity = $this->recommendationsQueryContainer
            ->queryScenarioWithIdRecommendationScenarios(
                $scenarioTransfer->getIdRecommendationScenarios())
            ->findOne();

        if ($scenarioEntity === null) {
            throw new ResourceNotFoundException();
        }

        $scenarioEntity->fromArray($scenarioTransfer->toArray());

        return $scenarioEntity->save();
    }

    /**
     * @param $id
     *
     * @return void
     */
    public function deleteScenario($id): void
    {
        $scenarioEntity = $this->recommendationsQueryContainer
            ->queryScenarioWithIdRecommendationScenarios($id)
            ->findOne();

        if ($scenarioEntity) {
            $scenarioEntity->delete();
        }
    }

    /**
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return PyzRecommendationScenarios
     */
    protected function createScenarioEntity(ScenarioTransfer $scenarioTransfer): PyzRecommendationScenarios
    {
        $scenarioEntity = new PyzRecommendationScenarios();
        $scenarioEntity->fromArray($scenarioTransfer->toArray());

        $scenarioEntity->save();

        return $scenarioEntity;
    }
}
