<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\ScenarioTransfer;

interface ScenarioWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function createScenario(ScenarioTransfer $scenarioTransfer): ScenarioTransfer;

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return int
     */
    public function updateScenario(ScenarioTransfer $scenarioTransfer): int;

    /**
     * @param $id
     *
     * @return void
     */
    public function deleteScenario($id): void;
}
