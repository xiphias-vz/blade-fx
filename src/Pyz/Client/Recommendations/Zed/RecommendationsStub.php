<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations\Zed;

use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Spryker\Client\ZedRequest\Stub\ZedRequestStub;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

class RecommendationsStub extends ZedRequestStub implements RecommendationsStubInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function insertRecoData(RecoTransfer $recoTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/insert-reco-data', $recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function clearRecoData(RecoTransfer $recoTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/clear-reco-data', $recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/get-existing-reco-data', $recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/get-active-scenario-name', $scenarioTransfer);
    }
}
