<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Pyz\Zed\Recommendations\Persistence\RecommendationsRepositoryInterface;

class DefinitionReader implements DefinitionReaderInterface
{
    /**
     * @var RecommendationsRepositoryInterface
     */
    protected $recommendationsRepository;

    /**
     * @param RecommendationsRepositoryInterface $recommendationsRepository
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
