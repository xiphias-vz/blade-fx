<?php

namespace Pyz\Zed\Recommendations\Communication\Form\DataProvider;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;

class RecommendationFormDataProvider
{
    /**
     * @var RecommendationsFacadeInterface
     */
    protected $recommendationsFacade;

    /**
     * @var ScenarioTransfer
     */
    protected $definitionTransfer;

    /**
     * @param RecommendationsFacadeInterface $recommendationsFacade
     * @param RecommendationDefinitionTransfer|null $definitionTransfer
     */
    public function __construct(
        RecommendationsFacadeInterface $recommendationsFacade,
        ?RecommendationDefinitionTransfer $definitionTransfer = null
    ){
        $this->recommendationsFacade = $recommendationsFacade;
        $this->definitionTransfer = $definitionTransfer;
    }

    /**
     * @return RecommendationDefinitionTransfer|null
     */
    public function getData(): ?RecommendationDefinitionTransfer
    {
        return $this->recommendationsFacade->getRecommendationsDefinition();
    }
}
