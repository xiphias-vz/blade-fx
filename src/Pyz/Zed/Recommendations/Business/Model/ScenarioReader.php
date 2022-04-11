<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface;

class ScenarioReader implements ScenarioReaderInterface
{
    /**
     * @var RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @var RecommendationsRepositoryInterface
     */
    protected $recommendationsRepository;

    /**
     * @param RecommendationsQueryContainerInterface $recommendationsQueryContainer
     * @param RecommendationsRepositoryInterface $recommendationsRepository
     */
    public function __construct(
        RecommendationsQueryContainerInterface $recommendationsQueryContainer,
        RecommendationsRepositoryInterface $recommendationsRepository
    ) {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
        $this->recommendationsRepository = $recommendationsRepository;
    }

    /**
     * @param int $idRecommendationsScenario
     *
     * @return ScenarioTransfer
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer
    {
        return $this->recommendationsRepository->findScenario($idRecommendationsScenario);
    }
}
