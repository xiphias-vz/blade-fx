<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Persistence;

use Generated\Shared\Transfer\RecoTransfer;
use Orm\Zed\Customer\Persistence\SpyCustomerQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationDefinitionQuery;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenariosQuery;

interface RecommendationsQueryContainerInterface
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
     * @return PyzRecommendationScenariosQuery
     */
    public function getPyzRecommendationsScenarioQuery(): PyzRecommendationScenariosQuery;

    /**
     * @return SpyCustomerQuery
     */
    public function getSpyCustomerQuery(): SpyCustomerQuery;

    /**
     * @return mixed
     */
    public function queryScenariosWithScenarioIdAndHashId(string $scenarioId, string $hashId);

    /**
     * @param $id
     *
     * @return PyzRecommendationScenariosQuery
     */
    public function queryScenarioWithIdRecommendationScenarios($id): PyzRecommendationScenariosQuery;

    /**
     * @return PyzRecommendationScenariosQuery
     */
    public function queryAllScenarios(): PyzRecommendationScenariosQuery;

    /**
     * @return PyzRecommendationDefinitionQuery
     */
    public function queryDefinitions(): PyzRecommendationDefinitionQuery;
}
