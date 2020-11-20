<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CountryStorage;

use Pyz\Client\CountryStorage\CountryStorage\CountryStorageReader;
use Pyz\Client\CountryStorage\CountryStorage\CountryStorageReaderInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class CountryStorageFactory extends AbstractFactory
{
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(CountryStorageDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    public function getSynchronizationService(): SynchronizationServiceInterface
    {
        return $this->getProvidedDependency(CountryStorageDependencyProvider::SERVICE_SYNCHRONIZATION);
    }

    /**
     * @return \Spryker\Client\Store\StoreClientInterface
     */
    public function getStoreClient(): StoreClientInterface
    {
        return $this->getProvidedDependency(CountryStorageDependencyProvider::CLIENT_STORE);
    }

    /**
     * @return \Pyz\Client\MerchantStorage\MerchantStorage\MerchantStorageReaderInterface
     */
    public function createCountryStorageReader(): CountryStorageReaderInterface
    {
        return new CountryStorageReader(
            $this->getSynchronizationService(),
            $this->getStorageClient(),
            $this->getStoreClient()
        );
    }
}
