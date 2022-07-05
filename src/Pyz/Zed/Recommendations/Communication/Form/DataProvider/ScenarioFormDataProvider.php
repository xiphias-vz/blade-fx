<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Form\DataProvider;

use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios;
use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;
use Pyz\Zed\Recommendations\Communication\Form\ScenarioForm;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class ScenarioFormDataProvider
{
    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @var \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface
     */
    protected $recommendationsFacade;

    /**
     * @var \Generated\Shared\Transfer\ScenarioTransfer
     */
    protected $scenarioTransfer;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface $recommendationsQueryContainer
     * @param \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface $recommendationsFacade
     * @param \Generated\Shared\Transfer\ScenarioTransfer|null $scenarioTransfer
     */
    public function __construct(
        RecommendationsQueryContainerInterface $recommendationsQueryContainer,
        RecommendationsFacadeInterface $recommendationsFacade,
        ?ScenarioTransfer $scenarioTransfer = null
    ) {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
        $this->recommendationsFacade = $recommendationsFacade;
        $this->scenarioTransfer = $scenarioTransfer;
    }

    /**
     * @param int|null $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function getData(?int $idRecommendationsScenario = null): ?ScenarioTransfer
    {
        if (!$idRecommendationsScenario) {
            return $this->scenarioTransfer;
        }

        return $this->recommendationsFacade->findScenario($idRecommendationsScenario);
    }

    /**
     * @param int|null $idScenario
     *
     * @return array
     */
    public function getOptions(?int $idScenario = null): array
    {
        $options = [
            ScenarioForm::OPTION_RECOMMENDATIONS_TYPE_CHOICES => $this->recommendationsFacade->getRecommendationsAvailableTypes(),
        ];

        return $options;

        // if ($idScenario === null) {
            // return $options;
        // }

        // $scenarioEntity = $this->getScenarioEntity($idScenario);
    }

    // public function getValues(PyzRecommendationScenarios $recommendationScenarios)
    // {
       //  $values = [];

        // foreach($recommendationScenarios->get)
    // }

    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios
     */
    protected function getScenarioEntity(int $idRecommendationsScenario): PyzRecommendationScenarios
    {
        return $this->recommendationsQueryContainer
            ->getPyzRecommendationsScenarioQuery()
            ->findOneByIdRecommendationScenarios($idRecommendationsScenario);
    }
}
