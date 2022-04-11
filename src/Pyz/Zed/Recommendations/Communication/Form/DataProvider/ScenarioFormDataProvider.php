<?php

namespace Pyz\Zed\Recommendations\Communication\Form\DataProvider;

use Generated\Shared\Transfer\ScenarioTransfer;
use Orm\Zed\Recommendations\Persistence\PyzRecommendationScenarios;
use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;
use Pyz\Zed\Recommendations\Communication\Form\ScenarioForm;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class ScenarioFormDataProvider
{
    /**
     * @var RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @var RecommendationsFacadeInterface
     */
    protected $recommendationsFacade;

    /**
     * @var ScenarioTransfer
     */
    protected $scenarioTransfer;

    /**
     * @param RecommendationsQueryContainerInterface $recommendationsQueryContainer
     * @param RecommendationsFacadeInterface $recommendationsFacade
     * @param ScenarioTransfer|null $scenarioTransfer
     */
    public function __construct(
        RecommendationsQueryContainerInterface $recommendationsQueryContainer,
        RecommendationsFacadeInterface $recommendationsFacade,
        ?ScenarioTransfer $scenarioTransfer = null
    ){
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
        $this->recommendationsFacade = $recommendationsFacade;
        $this->scenarioTransfer = $scenarioTransfer;
    }

    /**
     * @param int|null $idRecommendationsScenario
     *
     * @return ScenarioTransfer|null
     */
    public function getData(?int $idRecommendationsScenario = null): ?ScenarioTransfer
    {
        if (!$idRecommendationsScenario) {
            return $this->scenarioTransfer;
        }

        return $this->recommendationsFacade->findScenario($idRecommendationsScenario);
    }

    /**
     * @param $idScenario
     *
     * @return array
     */
    public function getOptions($idScenario = null): array
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
     * @param $idRecommendationsScenario
     *
     * @return PyzRecommendationScenarios
     */
    protected function getScenarioEntity($idRecommendationsScenario): PyzRecommendationScenarios
    {
        return $this->recommendationsQueryContainer
            ->getPyzRecommendationsScenarioQuery()
            ->findOneByIdRecommendationScenarios($idRecommendationsScenario);
    }
}
