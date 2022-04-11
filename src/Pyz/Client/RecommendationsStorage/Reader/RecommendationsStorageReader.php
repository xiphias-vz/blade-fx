<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RecommendationsStorage\Reader;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

class RecommendationsStorageReader implements RecommendationsStorageReaderInterface
{
    private const IS_RECOMMENDATIONS_ENABLED = 'is_recommendations_enabled';
    private const MY_CUSTOME_RECOMMENDATIONS_KEY = 'my_recommendations_key';
    private const RECOMMENDATIONS_ENABLED = 'recommendations:ein';

    /**
     * @var StorageClientInterface
     */
    protected $storageClient;

    /**
     * @param StorageClientInterface $storageClient
     */
    public function __construct(StorageClientInterface $storageClient)
    {
        $this->storageClient = $storageClient;
    }

    /**
     * @param TransferInterface $recommendationsTransfer
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
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getIsRecommendationsEnabled(RecoTransfer $recoTransfer): RecoTransfer
    {
        $result = $this->storageClient->get(self::MY_CUSTOME_RECOMMENDATIONS_KEY);

        if (is_array($result)) {
            $result = $result[0];
        }

        if (isset($result['recommendationsEnabled'])) {
            $recoTransfer->setRecommendationsEnabled($result['recommendationsEnabled']);
        }

        return $recoTransfer;
    }

    /**
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
     */
    public function getIsFfSnippetEnabled(RecoTransfer $recoTransfer): RecoTransfer
    {
        $result = $this->storageClient->get(self::MY_CUSTOME_RECOMMENDATIONS_KEY);

        if (is_array($result)) {
            $result = $result[0];
        }

        if (isset($result['recommendationsFfSnippetEnabled'])) {
            $recoTransfer->setRecommendationsFfSnippetEnabled($result['recommendationsFfSnippetEnabled']);
        }

        return $recoTransfer;
    }
}
