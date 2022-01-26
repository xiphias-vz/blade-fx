<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Writer;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Orm\Zed\TimeSlot\Persistence\Map\PyzTimeSlotTableMap;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotHistory;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
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

    /**
     * @param string $store
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function saveTimeSlotsDataForStore(string $store, string $day, string $time, string $capacity): int
    {
        $query = new PyzTimeSlotQuery();

        $result = $query->filterByMerchantReference_Like($store)
            ->filterByDay_Like($day)
            ->filterByTimeSlot_Like($time)
            ->where(PyzTimeSlotTableMap::COL_DATE . ' is null or ' . PyzTimeSlotTableMap::COL_DATE . ' = ""')
            ->findOne()
            ->setCapacity($capacity)
            ->save();

        return $result;
    }

    /**
     * @param string $merchantReference
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function saveTimeSlotsDataForDate(string $merchantReference, string $date, string $day, string $time, string $capacity): int
    {
        $query = new PyzTimeSlotQuery();

        $result = $query->filterByMerchantReference($merchantReference)
            ->filterByDate($date)
            ->filterByTimeSlot($time)
            ->findOneOrCreate()
            ->setDay($day)
            ->setCapacity($capacity)
            ->save();

        return $result;
    }

    /**
     * @param string $merchantReference
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function saveDefaultTimeSlotsDataForDate(string $merchantReference, string $date, string $day, string $time, string $capacity): int
    {
        $query = new PyzTimeSlotQuery();
        $entity = $query->filterByMerchantReference($merchantReference)
            ->filterByDate($date)
            ->filterByTimeSlot($time)
            ->findOneOrCreate();
        $entity->setMerchantReference($merchantReference)
            ->setDay($day)
            ->setCapacity($capacity);
        $result = $entity->save();

        return $result;
    }

    /**
     * @param \Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer $timeSlotHistoryTransfer
     *
     * @return int
     */
    public function saveTimeSlotHistory(PyzTimeSlotHistoryTransfer $timeSlotHistoryTransfer): int
    {
        $entity = new PyzTimeSlotHistory();
        $entity->setCreatedAt($timeSlotHistoryTransfer->getCreatedAt())
            ->setMerchantReference($timeSlotHistoryTransfer->getMerchantReference())
            ->setFkUser($timeSlotHistoryTransfer->getFkUser())
            ->setTimeSlotChanged($timeSlotHistoryTransfer->getTimeSlotChanged())
            ->setDayChanged($timeSlotHistoryTransfer->getDayChanged())
            ->setDateChanged($timeSlotHistoryTransfer->getDateChanged())
            ->setCapacitySetFrom($timeSlotHistoryTransfer->getCapacitySetFrom())
            ->setCapacitySetTo($timeSlotHistoryTransfer->getCapacitySetTo())
            ->setActionPerformed($timeSlotHistoryTransfer->getActionPerformed())
            ->setIsTrigger($timeSlotHistoryTransfer->getIsTrigger());
        $result = $entity->save();

        return $result;
    }
}
