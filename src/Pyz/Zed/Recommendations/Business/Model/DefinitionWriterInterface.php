<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\RecommendationDefinitionTransfer;

interface DefinitionWriterInterface
{
    /**
     * @param RecommendationDefinitionTransfer $definitionTransfer
     *
     * @return int
     */
    public function updateDefinition(RecommendationDefinitionTransfer $definitionTransfer): int;
}
