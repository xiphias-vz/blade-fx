<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlotStorage;

use Pyz\Client\TimeSlotStorage\Reader\TimeSlotStorageReader;
use Pyz\Client\TimeSlotStorage\Reader\TimeSlotStorageReaderInterface;
use Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface;
use Pyz\Zed\TimeSlot\TimeSlotDependencyProvider;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class TimeSlotStorageFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(TimeSlotStorageDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    public function getSynchronizationService(): SynchronizationServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotStorageDependencyProvider::SERVICE_SYNCHRONIZATION);
    }

    /**
     * @return \Spryker\Client\Store\StoreClientInterface
     */
    public function getStoreClient(): StoreClientInterface
    {
        return $this->getProvidedDependency(TimeSlotStorageDependencyProvider::CLIENT_STORE);
    }

    /**
     * @return \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface
     */
    public function getMerchantShipmentStorageService(): TimeSlotStorageServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_TIME_SLOT_STORAGE);
    }

    /**
     * @return \Pyz\Client\TimeSlotStorage\Reader\TimeSlotStorageReaderInterface
     */
    public function createTimeSlotStorageReader(): TimeSlotStorageReaderInterface
    {
        return new TimeSlotStorageReader(
            $this->getSynchronizationService(),
            $this->getStorageClient(),
            $this->getStoreClient(),
            $this->getMerchantShipmentStorageService()
        );
    }
}
