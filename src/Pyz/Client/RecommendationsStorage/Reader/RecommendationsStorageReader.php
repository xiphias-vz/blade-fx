<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RecommendationsStorage\Reader;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

class RecommendationsStorageReader implements RecommendationsStorageReaderInterface
{
    private const RECOMMENDATIONS_ENABLED = 'recommendations:';

    /**
     * @var \Spryker\Client\Storage\StorageClientInterface
     */
    protected $storageClient;

    /**
     * @var \Spryker\Client\Store\StoreClientInterface
     */
    protected $storeClient;

    /**
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     * @param \Spryker\Client\Store\StoreClientInterface $storeClient
     */
    public function __construct(StorageClientInterface $storageClient, StoreClientInterface $storeClient)
    {
        $this->storageClient = $storageClient;
        $this->storeClient = $storeClient;
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface $recommendationsTransfer
     *
     * @return mixed|void
     */
    public function getKeysFromRedis(TransferInterface $recommendationsTransfer)
    {
        // $redisKeys = $recommendationsTransfer->getRedisKeys();

        $result = $this->storageClient->get('mojkey');

        return $recommendationsTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getIsRecommendationsEnabled(RecoTransfer $recoTransfer): RecoTransfer
    {
        $result = $this->storageClient->get($this->getRedisKeyNameForRecommendations());

        if (is_array($result)) {
            $result = $result[0];
        }

        if (isset($result['recommendationsEnabled'])) {
            $recoTransfer->setRecommendationsEnabled($result['recommendationsEnabled']);
        }

        return $recoTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    public function getIsFfSnippetEnabled(RecoTransfer $recoTransfer): RecoTransfer
    {
        $result = $this->storageClient->get($this->getRedisKeyNameForRecommendations());

        if (is_array($result)) {
            $result = $result[0];
        }

        if (isset($result['recommendationsFfSnippetEnabled'])) {
            $recoTransfer->setRecommendationsFfSnippetEnabled($result['recommendationsFfSnippetEnabled']);
        }

        return $recoTransfer;
    }

    /**
     * @return string
     */
    protected function getRedisKeyNameForRecommendations(): string
    {
        $store = $this->storeClient->getCurrentStore();
        $storeShortName = strtolower($store->getName());

        return self::RECOMMENDATIONS_ENABLED . $storeShortName;
    }
}
