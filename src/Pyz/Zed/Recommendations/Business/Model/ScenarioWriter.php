<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios;
use Pyz\Zed\Recommendations\Business\Model\Exception\ResourceNotFoundException;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class ScenarioWriter implements ScenarioWriterInterface
{
    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface $recommendationsQueryContainer
     */
    public function __construct(RecommendationsQueryContainerInterface $recommendationsQueryContainer)
    {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function createScenario(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        $scenarioEntity = $this->createScenarioEntity($scenarioTransfer);

        $scenarioTransfer->setIdRecommendationScenarios($scenarioEntity->getIdRecommendationScenarios());

        return $scenarioTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @throws \Pyz\Zed\Recommendations\Business\Model\Exception\ResourceNotFoundException
     *
     * @return int
     */
    public function updateScenario(ScenarioTransfer $scenarioTransfer): int
    {
        $scenarioEntity = $this->recommendationsQueryContainer
            ->queryScenarioWithIdRecommendationScenarios(
                $scenarioTransfer->getIdRecommendationScenarios()
            )
            ->findOne();

        if ($scenarioEntity === null) {
            throw new ResourceNotFoundException();
        }

        $scenarioEntity->fromArray($scenarioTransfer->toArray());

        return $scenarioEntity->save();
    }

    /**
     * @param int $id
     *
     * @return void
     */
    public function deleteScenario(int $id): void
    {
        $scenarioEntity = $this->recommendationsQueryContainer
            ->queryScenarioWithIdRecommendationScenarios($id)
            ->findOne();

        if ($scenarioEntity) {
            $scenarioEntity->delete();
        }
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios
     */
    protected function createScenarioEntity(ScenarioTransfer $scenarioTransfer): PyzRecommendationScenarios
    {
        $scenarioEntity = new PyzRecommendationScenarios();
        $scenarioEntity->fromArray($scenarioTransfer->toArray());

        $scenarioEntity->save();

        return $scenarioEntity;
    }
}
