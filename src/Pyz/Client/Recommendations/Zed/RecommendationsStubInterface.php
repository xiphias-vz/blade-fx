<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations\Zed;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

interface RecommendationsStubInterface
{
    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return mixed
     */
    public function insertRecoData(RecoTransfer $recoTransfer): TransferInterface;

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return mixed
     */
    public function clearRecoData(RecoTransfer $recoTransfer): TransferInterface;

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getExistingRecoData(RecoTransfer $recoTransfer): TransferInterface;
}
