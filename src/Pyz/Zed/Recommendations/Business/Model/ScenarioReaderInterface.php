<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;

interface ScenarioReaderInterface
{
    /**
     * @param int $idRecommendationsScenario
     *
     * @return ScenarioTransfer
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer;
}
