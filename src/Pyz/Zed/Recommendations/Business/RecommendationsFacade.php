<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\Recommendations\Business\RecommendationsBusinessFactory getFactory()
 * @method \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface getRepository()
 */
class RecommendationsFacade extends AbstractFacade implements RecommendationsFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return mixed
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecoWriter()
            ->insertRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecoWriter()
            ->clearRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecoWriter()
            ->getExistingRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        return $this->getFactory()
            ->createRecoWriter()
            ->getActiveScenarioName($scenarioTransfer);
    }

    /**
     * @return array
     */
    public function getRecommendationsAvailableTypes(): array
    {
        return $this->getFactory()
            ->getConfig()
            ->getRecommendationsAvailableTypes();
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getRedisKeys(RecoTransfer $recoTransfer): RecoTransfer
    {
        $query = new RecommendationsQueryContainer();
        $keysDb = $query->getRedisKeys();

        return $recoTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function createScenario(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        return $this->getFactory()
            ->createScenarioWriter()
            ->createScenario($scenarioTransfer);
    }

    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer
    {
        return $this->getFactory()
            ->createScenarioReader()
            ->findScenario($idRecommendationsScenario);
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return int
     */
    public function updateScenario(ScenarioTransfer $scenarioTransfer): int
    {
        return $this->getFactory()
            ->createScenarioWriter()
            ->updateScenario($scenarioTransfer);
    }

    /**
     * @param $id
     *
     * @return void
     */
    public function deleteScenario($id): void
    {
        $this->getFactory()
            ->createScenarioWriter()
            ->deleteScenario($id);
    }

    /**
     * @return \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null
     */
    public function getRecommendationsDefinition(): ?RecommendationDefinitionTransfer
    {
        return $this->getFactory()
            ->createDefinitionReader()
            ->getRecommendationsDefinition();
    }

    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function updateDefinitions(RecommendationDefinitionTransfer $definitionTransfer): int
    {
        return $this->getFactory()
            ->createDefinitionWriter()
            ->updateDefinition($definitionTransfer);
    }
}
