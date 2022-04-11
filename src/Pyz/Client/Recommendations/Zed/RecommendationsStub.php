<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations\Zed;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Client\ZedRequest\Stub\ZedRequestStub;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

class RecommendationsStub extends ZedRequestStub implements RecommendationsStubInterface
{
    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return TransferInterface
     */
    public function insertRecoData(RecoTransfer $recoTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/insert-reco-data', $recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return TransferInterface
     */
    public function clearRecoData(RecoTransfer $recoTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/clear-reco-data', $recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return TransferInterface
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): TransferInterface
    {
        return $this->zedStub->call('/recommendations/gateway/get-existing-reco-data', $recoTransfer);
    }
}
