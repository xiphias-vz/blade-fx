<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlotStorage\Reader;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class TimeSlotStorageReader implements TimeSlotStorageReaderInterface
{
    protected const ZERO_CAPACITY = 0;

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
     * @var \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface
     */
    protected $timeSlotStorageService;

    /**
     * @param \Spryker\Service\Synchronization\SynchronizationServiceInterface $synchronizationService
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     * @param \Spryker\Client\Store\StoreClientInterface $storeClient
     * @param \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface $timeSlotStorageService
     */
    public function __construct(
        SynchronizationServiceInterface $synchronizationService,
        StorageClientInterface $storageClient,
        StoreClientInterface $storeClient,
        TimeSlotStorageServiceInterface $timeSlotStorageService
    ) {
        $this->synchronizationService = $synchronizationService;
        $this->storageClient = $storageClient;
        $this->storeClient = $storeClient;
        $this->timeSlotStorageService = $timeSlotStorageService;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param string $timeSlotKey
     *
     * @return int
     */
    public function getTimeSlotOrdersCount(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer,
        string $timeSlotKey
    ): int {
        $storageKey = $this->buildStorageKey($shipmentMethodTransfer, $merchantTransfer, $timeSlotKey);

        if (!$this->storageClient->get($storageKey)) {
            return static::ZERO_CAPACITY;
        }

        return $this->storageClient->get($storageKey);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param string $timeSlotKey
     *
     * @return string
     */
    protected function buildStorageKey(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer,
        string $timeSlotKey
    ) {
        $timeSlotStorageKey = $this->timeSlotStorageService->generateMerchantShipmentTimeSlotKey(
            $merchantTransfer->getMerchantReference(),
            $shipmentMethodTransfer->getShipmentMethodKey(),
            $timeSlotKey
        );

        $currentStore = $this->storeClient->getCurrentStore();
        $synchronizationDataTransfer = (new SynchronizationDataTransfer())->setStore($currentStore->getName());

        return $this->synchronizationService
            ->getStorageKeyBuilder($timeSlotStorageKey)
            ->generateKey($synchronizationDataTransfer);
    }
}
