<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainer;
use Pyz\Zed\Recommendations\RecommendationsConfig;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method RecommendationsBusinessFactory getFactory()
 */
class RecommendationsFacade extends AbstractFacade implements RecommendationsFacadeInterface
{
    /**
     * @param RecoTransfer $recoTransfer
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
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecoWriter()
            ->clearRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecoWriter()
            ->getExistingRecoData($recoTransfer);
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
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getRedisKeys(RecoTransfer $recoTransfer): RecoTransfer
    {
        $query = new RecommendationsQueryContainer();
        $keysDb = $query->getRedisKeys();

        return $recoTransfer;
    }

    /**
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return ScenarioTransfer
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
     * @return ScenarioTransfer
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer
    {
        return $this->getFactory()
            ->createScenarioReader()
            ->findScenario($idRecommendationsScenario);
    }

    /**
     * @param ScenarioTransfer $scenarioTransfer
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
     * @return RecommendationDefinitionTransfer|null
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
     * @return ScenarioTransfer
     */
    public function updateDefinitions(RecommendationDefinitionTransfer $definitionTransfer): int
    {
        return $this->getFactory()
            ->createDefinitionWriter()
            ->updateDefinition($definitionTransfer);
    }
}
