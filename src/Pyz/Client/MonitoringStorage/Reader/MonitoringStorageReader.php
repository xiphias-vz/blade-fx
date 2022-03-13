<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MonitoringStorage\Reader;

use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

class MonitoringStorageReader implements MonitoringStorageReaderInterface
{
    /**
     * @var \Spryker\Client\Storage\StorageClientInterface
     */
    protected $storageClient;

    /**
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     */
    public function __construct(StorageClientInterface $storageClient)
    {
        $this->storageClient = $storageClient;
    }

    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return mixed
     */
    public function getKeysFromRedis(TransferInterface $monitoringTransfer)
    {
        $redisResponse = [];

        foreach ($monitoringTransfer->getRedisKeys() as $index => $key) {
            $redisResponse[$key['key']] = $this->storageClient->get($key['key']);
        }
        $monitoringTransfer->setRedisResponse($redisResponse);

        return $monitoringTransfer;
    }
}
