<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Form\DataProvider;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface;

class RecommendationFormDataProvider
{
    /**
     * @var \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface
     */
    protected $recommendationsFacade;

    /**
     * @var \Generated\Shared\Transfer\ScenarioTransfer
     */
    protected $definitionTransfer;

    /**
     * @param \Pyz\Zed\Recommendations\Business\RecommendationsFacadeInterface $recommendationsFacade
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null $definitionTransfer
     */
    public function __construct(
        RecommendationsFacadeInterface $recommendationsFacade,
        ?RecommendationDefinitionTransfer $definitionTransfer = null
    ) {
        $this->recommendationsFacade = $recommendationsFacade;
        $this->definitionTransfer = $definitionTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\RecommendationDefinitionTransfer|null
     */
    public function getData(): ?RecommendationDefinitionTransfer
    {
        return $this->recommendationsFacade->getRecommendationsDefinition();
    }
}
