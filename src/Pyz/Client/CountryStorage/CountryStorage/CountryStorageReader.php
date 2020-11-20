<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CountryStorage\CountryStorage;

use Generated\Shared\Transfer\CountryCollectionTransfer;
use Generated\Shared\Transfer\CountryTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Pyz\Shared\CountryStorage\CountryStorageConfig as CountryStorageConfig;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class CountryStorageReader implements CountryStorageReaderInterface
{
    /**
     * @var \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    protected $synchronizationService;

    /**
     * @var \Spryker\Client\Storage\StorageClientInterface
     */
    protected $storageClient;

    /**
     * @var \Spryker\Client\Store\StoreClientInterface
     */
    protected $storeClient;

    /**
     * @param \Spryker\Service\Synchronization\SynchronizationServiceInterface $synchronizationService
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     * @param \Spryker\Client\Store\StoreClientInterface $storeClient
     */
    public function __construct(SynchronizationServiceInterface $synchronizationService, StorageClientInterface $storageClient, StoreClientInterface $storeClient)
    {
        $this->synchronizationService = $synchronizationService;
        $this->storageClient = $storageClient;
        $this->storeClient = $storeClient;
    }

    /**
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getCountries(): CountryCollectionTransfer
    {
        $currentStore = $this->storeClient->getCurrentStore();
        $synchronizationDataTransfer = (new SynchronizationDataTransfer())->setStore($currentStore->getName());
        $key = $this->synchronizationService
            ->getStorageKeyBuilder(CountryStorageConfig::COUNTRY_LIST_RESOURCE_NAME)
            ->generateKey($synchronizationDataTransfer);

        $countries = $this->storageClient->get($key);
        $countryCollectionTransfer = new CountryCollectionTransfer();

        if ($countries) {
            foreach ($countries as $country) {
                if (is_array($country)) {
                    $countryCollectionTransfer->addCountries((new CountryTransfer())->fromArray($country));
                }
            }
        }

        return $countryCollectionTransfer;
    }
}
