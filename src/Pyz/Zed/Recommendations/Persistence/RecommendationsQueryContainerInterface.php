<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Customer\Persistence\SpyCustomerQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;

interface RecommendationsQueryContainerInterface
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
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function getPyzRecommendationsScenarioQuery(): PyzRecommendationScenariosQuery;

    /**
     * @return \Orm\Zed\Customer\Persistence\SpyCustomerQuery
     */
    public function getSpyCustomerQuery(): SpyCustomerQuery;

    /**
     * @param string $scenarioId
     * @param string $hashId
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithScenarioIdAndHashId(string $scenarioId, string $hashId): PyzRecommendationScenariosQuery;

    /**
     * @param string $scenarioId
     * @param bool $isActive
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithScenarioIdAndActiveField(string $scenarioId, bool $isActive): PyzRecommendationScenariosQuery;

    /**
     * @param string $scenarioId
     * @param bool $isActive
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenariosWithNotEqualScenarioIdAndActiveField(string $scenarioId, bool $isActive): PyzRecommendationScenariosQuery;

    /**
     * @param int $id
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenarioWithIdRecommendationScenarios(int $id): PyzRecommendationScenariosQuery;

    /**
     * @param int $id
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryScenarioWithNotEqualIdRecommendationScenarios(int $id): PyzRecommendationScenariosQuery;

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery
     */
    public function queryAllScenarios(): PyzRecommendationScenariosQuery;

    /**
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery
     */
    public function queryDefinitions(): PyzRecommendationDefinitionQuery;
}
