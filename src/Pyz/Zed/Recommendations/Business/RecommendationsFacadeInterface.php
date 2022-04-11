<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;

interface RecommendationsFacadeInterface
{
    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return mixed
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @return array
     */
    public function getRecommendationsAvailableTypes(): array;

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getRedisKeys(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return ScenarioTransfer
     */
    public function createScenario(ScenarioTransfer $scenarioTransfer): ScenarioTransfer;

    /**
     * @param int $idRecommendationsScenario
     *
     * @return ScenarioTransfer
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer;

    /**
     * @param ScenarioTransfer $scenarioTransfer
     *
     * @return int
     */
    public function updateScenario(ScenarioTransfer $scenarioTransfer): int;

    /**
     * @param $id
     *
     * @return void
     */
    public function deleteScenario($id): void;


    public function getRecommendationsDefinition();

    public function updateDefinitions(RecommendationDefinitionTransfer $definitionTransfer): int;
}
