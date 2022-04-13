<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface;

class DefinitionReader implements DefinitionReaderInterface
{
    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface
     */
    protected $recommendationsRepository;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface $recommendationsRepository
     */
    public function __construct(
        RecommendationsRepositoryInterface $recommendationsRepository
    ) {
        $this->recommendationsRepository = $recommendationsRepository;
    }

    public function getRecommendationsDefinition(): ?RecommendationDefinitionTransfer
    {
        return $this->recommendationsRepository->getRecommendationsDefinition();
    }
}
