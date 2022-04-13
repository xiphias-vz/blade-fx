<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations;

use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Client\Recommendations\Zed\RecommendationsStubInterface;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method getFactory()
 */
class RecommendationsClient extends AbstractClient implements RecommendationsClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return mixed|void
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getZedStub()->insertRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return void
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getZedStub()->clearRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getZedStub()->getExistingRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ScenarioTransfer $scenarioTransfer
     *
     * @return string
     */
    public function getActiveScenarioName(ScenarioTransfer $scenarioTransfer): ScenarioTransfer
    {
        return $this->getZedStub()->getActiveScenarioName($scenarioTransfer);
    }

    /**
     * @return \Pyz\Client\Recommendations\Zed\RecommendationsStubInterface
     */
    protected function getZedStub(): RecommendationsStubInterface
    {
        return $this->getFactory()->createZedStub();
    }
}
