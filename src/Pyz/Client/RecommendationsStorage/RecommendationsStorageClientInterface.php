<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RecommendationsStorage;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

interface RecommendationsStorageClientInterface
{
    /**
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface $recommendationsTransfer
     *
     * @return mixed
     */
    public function getKeysFromRedis(TransferInterface $recommendationsTransfer);

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getIsRecommendationsEnabled(RecoTransfer $recoTransfer): RecoTransfer;

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getIsFfSnippetEnabled(RecoTransfer $recoTransfer): RecoTransfer;
}
