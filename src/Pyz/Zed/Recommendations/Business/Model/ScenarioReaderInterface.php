<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;

interface ScenarioReaderInterface
{
    /**
     * @param int $idRecommendationsScenario
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer|null
     */
    public function findScenario(int $idRecommendationsScenario): ?ScenarioTransfer;
}
