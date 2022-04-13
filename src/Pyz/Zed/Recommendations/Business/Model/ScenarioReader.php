<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface;

class ScenarioReader implements ScenarioReaderInterface
{
    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface
     */
    protected $recommendationsRepository;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface $recommendationsQueryContainer
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface $recommendationsRepository
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
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer
    {
        return $this->recommendationsRepository->findScenario($idRecommendationsScenario);
    }
}
