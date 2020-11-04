<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantStorage\MerchantStorage;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Pyz\Shared\MerchantStorage\MerchantStorageConfig as MerchantStorageMerchantStorageConfig;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class MerchantStorageReader implements MerchantStorageReaderInterface
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
    public function getMerchants(): MerchantCollectionTransfer
    {
        $currentStore = $this->storeClient->getCurrentStore();
        $synchronizationDataTransfer = (new SynchronizationDataTransfer())->setStore($currentStore->getName());
        $key = $this->synchronizationService
            ->getStorageKeyBuilder(MerchantStorageMerchantStorageConfig::MERCHANTS_LIST_RESOURCE_NAME)
            ->generateKey($synchronizationDataTransfer);

        $merchants = $this->storageClient->get($key);
        $merchantCollectionTransfer = new MerchantCollectionTransfer();

        if ($merchants) {
            foreach ($merchants as $merchant) {
                if (is_array($merchant)) {
                    $merchantCollectionTransfer->addMerchants((new MerchantTransfer())->fromArray($merchant));
                }
            }
        }

        return $merchantCollectionTransfer;
    }
}
