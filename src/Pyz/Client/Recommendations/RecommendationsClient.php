<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations;

use Generated\Shared\Transfer\RecoTransfer;
use Pyz\Client\Recommendations\Zed\RecommendationsStubInterface;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method getFactory()
 */
class RecommendationsClient extends AbstractClient implements RecommendationsClientInterface
{
    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return mixed|void
     */
    public function insertRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getZedStub()->insertRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return void
     */
    public function clearRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getZedStub()->clearRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getZedStub()->getExistingRecoData($recoTransfer);
    }

    /**
     * @return RecommendationsStubInterface
     */
    protected function getZedStub(): RecommendationsStubInterface
    {
        return $this->getFactory()->createZedStub();
    }
}
