<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MonitoringStorage;

use Pyz\Client\MonitoringStorage\Reader\MonitoringStorageReader;
use Pyz\Client\MonitoringStorage\Reader\MonitoringStorageReaderInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Storage\StorageClientInterface;

class MonitoringStorageFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(MonitoringStorageDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Pyz\Client\MonitoringStorage\Reader\MonitoringStorageReaderInterface
     */
    public function createMonitoringStorageReader(): MonitoringStorageReaderInterface
    {
        return new MonitoringStorageReader(
            $this->getStorageClient()
        );
    }
}
