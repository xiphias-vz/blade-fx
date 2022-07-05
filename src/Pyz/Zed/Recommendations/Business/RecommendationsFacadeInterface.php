<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;

interface RecommendationsFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): ScenarioTransfer;

    /**
     * @return array
     */
    public function getRecommendationsAvailableTypes(): array;

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getRedisKeys(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function createScenario(ScenarioTransfer $scenarioTransfer): ScenarioTransfer;

    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer;

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return int
     */
    public function updateScenario(ScenarioTransfer $scenarioTransfer): int;

    /**
     * @param int $id
     *
     * @return void
     */
    public function deleteScenario(int $id): void;

    /**
     * @return mixed
     */
    public function getRecommendationsDefinition();

    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer $definitionTransfer
     *
     * @return int
     */
    public function updateDefinitions(RecommendationDefinitionTransfer $definitionTransfer): int;
}
