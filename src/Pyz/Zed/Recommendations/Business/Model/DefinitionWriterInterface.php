<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;

interface DefinitionWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer $definitionTransfer
     *
     * @return int
     */
    public function updateDefinition(RecommendationDefinitionTransfer $definitionTransfer): int;
}
