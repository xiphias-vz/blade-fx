<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Writer;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class TimeSlotWriter implements TimeSlotWriterInterface
{
    protected const INITIAL_TIME_SLOT_ORDERS_COUNT = 1;

    /**
     * @var \Spryker\Client\Store\StoreClientInterface
     */
    protected $storeClient;

    /**
     * @var \Spryker\Client\Storage\StorageClientInterface
     */
    protected $storageClient;

    /**
     * @var \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    protected $synchronizationService;

    /**
     * @var \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface
     */
    protected $timeSlotStorageService;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @param \Spryker\Service\Synchronization\SynchronizationServiceInterface $synchronizationService
     * @param \Spryker\Client\Storage\StorageClientInterface $storageClient
     * @param \Spryker\Client\Store\StoreClientInterface $storeClient
     * @param \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface $timeSlotStorageService
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     */
    public function __construct(
        SynchronizationServiceInterface $synchronizationService,
        StorageClientInterface $storageClient,
        StoreClientInterface $storeClient,
        TimeSlotStorageServiceInterface $timeSlotStorageService,
        SalesFacadeInterface $salesFacade
    ) {
        $this->synchronizationService = $synchronizationService;
        $this->storageClient = $storageClient;
        $this->storeClient = $storeClient;
        $this->timeSlotStorageService = $timeSlotStorageService;
        $this->salesFacade = $salesFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function updateTimeSlotByQuote(QuoteTransfer $quoteTransfer): void
    {
        $storageKey = $this->buildStorageKey($quoteTransfer);
        $currentShipmentTransfer = $quoteTransfer->getShipment();
        $currentOrdersCount = count($this->salesFacade
            ->findIdSalesOrdersByOrderFilterCriteria(
                (new OrderCriteriaFilterTransfer())
                    ->setMerchantReferences([$quoteTransfer->getMerchantReference()])
                    ->setRequestedDeliveryDate($currentShipmentTransfer->getRequestedDeliveryDate())
                    ->setShipmentName($currentShipmentTransfer->getMethod()->getName())
                    ->setExcludeCancelledOrders(true)
            ));

        if (!$currentOrdersCount || $currentOrdersCount == 0) {
            $this->storageClient->set($storageKey, static::INITIAL_TIME_SLOT_ORDERS_COUNT);

            return;
        }

        $this->storageClient->set($storageKey, ++$currentOrdersCount);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return string
     */
    protected function buildStorageKey(QuoteTransfer $quoteTransfer)
    {
        $currentShipment = $quoteTransfer->getShipment();

        $timeSlotStorageKey = $this->timeSlotStorageService->generateMerchantShipmentTimeSlotKey(
            $quoteTransfer->getMerchantReference(),
            $currentShipment->getMethod()->getShipmentMethodKey(),
            $currentShipment->getRequestedDeliveryDate()
        );

        $currentStore = $this->storeClient->getCurrentStore();
        $synchronizationDataTransfer = (new SynchronizationDataTransfer())->setStore($currentStore->getName());

        return $this->synchronizationService
            ->getStorageKeyBuilder($timeSlotStorageKey)
            ->generateKey($synchronizationDataTransfer);
    }
}
