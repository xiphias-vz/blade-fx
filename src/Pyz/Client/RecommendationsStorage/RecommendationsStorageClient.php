<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RecommendationsStorage;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Client\Kernel\AbstractClient;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

/**
 * @method RecommendationsStorageFactory getFactory()
 */
class RecommendationsStorageClient extends AbstractClient implements RecommendationsStorageClientInterface
{
    /**
     * @param TransferInterface $recommendationsTransfer
     *
     * @return mixed
     */
    public function getKeysFromRedis(TransferInterface $recommendationsTransfer)
    {
        return $this->getFactory()
            ->createRecommendationsStorageReader()
            ->getKeysFromRedis($recommendationsTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getIsRecommendationsEnabled(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecommendationsStorageReader()
            ->getIsRecommendationsEnabled($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getIsFfSnippetEnabled(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()
            ->createRecommendationsStorageReader()
            ->getIsFfSnippetEnabled($recoTransfer);
    }
}
