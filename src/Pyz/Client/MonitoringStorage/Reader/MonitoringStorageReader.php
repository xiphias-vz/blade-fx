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
        $storeCookie = 'EIN';
        if (isset($_COOKIE['current_store'])) {
            $storeCookie = $_COOKIE['current_store'];
        }

        $redisKeys = $monitoringTransfer->getRedisKeys();
        for ($i = 0; $i < count($redisKeys); $i += 2) {
            $store = $redisKeys[$i]['store'];
            if ($storeCookie == $store) {
                $redisResponse[0] = $this->storageClient->get($redisKeys[$i]['key']);
                $redisResponse[1] = $this->storageClient->get($redisKeys[$i + 1]['key']);
                if (isset($redisKeys[$i + 2])) {
                    $monitoringTransfer->setNextStore($redisKeys[$i + 2]['store']);
                    $monitoringTransfer->setLastStore(false);
                } else {
                    $monitoringTransfer->setNextStore('EIN');
                    $monitoringTransfer->setLastStore(true);
                }
                break;
            }
        }

        $monitoringTransfer->setRedisResponse($redisResponse);

        return $monitoringTransfer;
    }
}
