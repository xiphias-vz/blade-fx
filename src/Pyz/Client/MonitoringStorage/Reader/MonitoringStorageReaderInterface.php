<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MonitoringStorage\Reader;

use Spryker\Shared\Kernel\Transfer\TransferInterface;

interface MonitoringStorageReaderInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return mixed
     */
    public function getKeysFromRedis(TransferInterface $monitoringTransfer);
}
