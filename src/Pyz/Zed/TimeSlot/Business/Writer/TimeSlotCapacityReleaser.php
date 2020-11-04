<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Writer;

use Generated\Shared\Transfer\ShipmentTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\Shipment\ShipmentServiceInterface;
use Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;
use Spryker\Shared\Kernel\Transfer\Exception\RequiredTransferPropertyException;

class TimeSlotCapacityReleaser
{
    private const TODAY_DATE_TIME_FORMAT = 'midnight';

    /**
     * @var \Spryker\Client\Storage\StorageClientInterface
     */
    private $storageClient;

    /**
     * @var \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    private $synchronizationService;

    /**
     * @var \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface
     */
    private $timeSlotStorageService;

    /**
     * @var \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    private $shipmentService;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @param \Spryker\Service\Synchronization\SynchronizationServiceInterface $synchronizationService
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     * @param \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface $timeSlotStorageService
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Pyz\Service\Shipment\ShipmentServiceInterface $shipmentService
     */
    public function __construct(
        SynchronizationServiceInterface $synchronizationService,
        StorageClientInterface $storageClient,
        TimeSlotStorageServiceInterface $timeSlotStorageService,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        ShipmentServiceInterface $shipmentService
    ) {
        $this->synchronizationService = $synchronizationService;
        $this->storageClient = $storageClient;
        $this->timeSlotStorageService = $timeSlotStorageService;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->shipmentService = $shipmentService;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $shipmentTransfer
     *
     * @return void
     */
    public function releaseTimeSlotByShipment(ShipmentTransfer $shipmentTransfer): void
    {
        try {
            $shipmentTransfer->requireMerchantReference()
                ->requireRequestedDeliveryDate()
                ->requireShipmentMethodKey();
        } catch (RequiredTransferPropertyException $exception) {
            // backward compatibility with the existing orders - do nothing.
            return;
        }

        if (!$this->hasReleasableSlot($shipmentTransfer)) {
            return;
        }

        $timeSlotStorageKey = $this->timeSlotStorageService->generateMerchantShipmentTimeSlotKey(
            $shipmentTransfer->getMerchantReference(),
            $shipmentTransfer->getShipmentMethodKey(),
            $shipmentTransfer->getRequestedDeliveryDate()
        );

        $this->releaseTimeSlotForStore(
            $shipmentTransfer->getStoreName(),
            $timeSlotStorageKey
        );
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     *
     * @return bool
     */
    private function hasReleasableSlot(ShipmentTransfer $shipmentTransfer): bool
    {
        if ($this->isRequestedDeliveryDateInFuture($shipmentTransfer)) {
            return true;
        }

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     *
     * @return bool
     */
    private function isRequestedDeliveryDateInFuture(ShipmentTransfer $shipmentTransfer): bool
    {
        $requestedDeliveryDateTime = $this->shipmentService->parseRequestedDeliveryDate(
            $shipmentTransfer->getRequestedDeliveryDate()
        );

        $currentDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone(static::TODAY_DATE_TIME_FORMAT);

        return $requestedDeliveryDateTime > $currentDateTime;
    }

    /**
     * @param string $storeName
     * @param string $timeSlotStorageKey
     *
     * @return void
     */
    private function releaseTimeSlotForStore(string $storeName, string $timeSlotStorageKey): void
    {
        $synchronizationDataTransfer = (new SynchronizationDataTransfer())->setStore($storeName);
        $storageKey = $this->synchronizationService
            ->getStorageKeyBuilder($timeSlotStorageKey)
            ->generateKey($synchronizationDataTransfer);

        $currentOrdersCount = (int)$this->storageClient->get($storageKey);
        if (!$currentOrdersCount) {
            return;
        }

        $this->storageClient->set($storageKey, max(0, --$currentOrdersCount));
    }
}
