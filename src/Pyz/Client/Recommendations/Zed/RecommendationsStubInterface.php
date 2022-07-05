<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations\Zed;

use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

interface RecommendationsStubInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function insertRecoData(RecoTransfer $recoTransfer): TransferInterface;

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function clearRecoData(RecoTransfer $recoTransfer): TransferInterface;

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): TransferInterface;

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): TransferInterface;
}
