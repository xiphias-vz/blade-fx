<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RecommendationsStorage\Reader;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

interface RecommendationsStorageReaderInterface
{
    /**
     * @param TransferInterface $recommendationsTransfer
     *
     * @return mixed
     */
    public function getKeysFromRedis(TransferInterface $recommendationsTransfer);

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getIsRecommendationsEnabled(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getIsFfSnippetEnabled(RecoTransfer $recoTransfer): RecoTransfer;
}
