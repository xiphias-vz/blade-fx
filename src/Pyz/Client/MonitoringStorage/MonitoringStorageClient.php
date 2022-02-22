<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MonitoringStorage;

use Spryker\Client\Kernel\AbstractClient;
use Spryker\Shared\Kernel\Transfer\TransferInterface;

/**
 * @method \Pyz\Client\MonitoringStorage\MonitoringStorageFactory getFactory()
 */
class MonitoringStorageClient extends AbstractClient implements MonitoringStorageClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return mixed
     */
    public function getKeysFromRedis(TransferInterface $monitoringTransfer)
    {
        return $this->getFactory()
            ->createMonitoringStorageReader()
            ->getKeysFromRedis($monitoringTransfer);
    }
}
