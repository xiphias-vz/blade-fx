<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business;

use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\Shipment\ShipmentServiceInterface;
use Pyz\Service\TimeSlot\TimeSlotServiceInterface;
use Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\TimeSlot\Business\Reader\TimeSlotReader;
use Pyz\Zed\TimeSlot\Business\Reader\TimeSlotReaderInterface;
use Pyz\Zed\TimeSlot\Business\Validator\TimeSlotAvailabilityValidator;
use Pyz\Zed\TimeSlot\Business\Validator\TimeSlotAvailabilityValidatorInterface;
use Pyz\Zed\TimeSlot\Business\Writer\TimeSlotCapacityReleaser;
use Pyz\Zed\TimeSlot\Business\Writer\TimeSlotWriter;
use Pyz\Zed\TimeSlot\Business\Writer\TimeSlotWriterInterface;
use Pyz\Zed\TimeSlot\TimeSlotDependencyProvider;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\TimeSlot\Persistence\TimeSlotQueryContainer getQueryContainer()
 * @method \Pyz\Zed\TimeSlot\TimeSlotConfig getConfig()
 */
class TimeSlotBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\TimeSlot\Business\Writer\TimeSlotWriterInterface
     */
    public function createTimeSlotWriter(): TimeSlotWriterInterface
    {
        return new TimeSlotWriter(
            $this->getSynchronizationService(),
            $this->getStorageClient(),
            $this->getStoreClient(),
            $this->getTimeSlotStorageService(),
            $this->getSalesFacade(),
            $this->getQueryContainer()
        );
    }

    /**
     * @return \Pyz\Zed\TimeSlot\Business\Validator\TimeSlotAvailabilityValidatorInterface
     */
    public function createTimeSlotAvailabilityValidator(): TimeSlotAvailabilityValidatorInterface
    {
        return new TimeSlotAvailabilityValidator(
            $this->getSalesFacade(),
            $this->getMerchantFacade(),
            $this->getTimeSlotService(),
            $this->getTimeSlotClient(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\TimeSlot\Business\Writer\TimeSlotCapacityReleaser
     */
    public function createTimeSlotCapacityReleaser(): TimeSlotCapacityReleaser
    {
        return new TimeSlotCapacityReleaser(
            $this->getSynchronizationService(),
            $this->getStorageClient(),
            $this->getTimeSlotStorageService(),
            $this->getDateTimeWithZoneService(),
            $this->getShipmentService()
        );
    }

    /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    public function getTimeSlotClient(): TimeSlotClientInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_TIME_SLOT);
    }

    /**
     * @return \Spryker\Service\Synchronization\SynchronizationServiceInterface
     */
    public function getSynchronizationService(): SynchronizationServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_SYNCHRONIZATION);
    }

    /**
     * @return \Spryker\Client\Store\StoreClientInterface
     */
    public function getStoreClient(): StoreClientInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_STORE);
    }

    /**
     * @return \Pyz\Service\TimeSlotStorage\TimeSlotStorageServiceInterface
     */
    public function getTimeSlotStorageService(): TimeSlotStorageServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_TIME_SLOT_STORAGE);
    }

    /**
     * @return \Pyz\Service\TimeSlot\TimeSlotServiceInterface
     */
    public function getTimeSlotService(): TimeSlotServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_TIME_SLOT);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    private function getShipmentService(): ShipmentServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_SHIPMENT);
    }

    /**
     * @return \Pyz\Zed\TimeSlot\Business\Reader\TimeSlotReaderInterface
     */
    public function createTimeSlotReader(): TimeSlotReaderInterface
    {
        return new TimeSlotReader($this->getQueryContainer());
    }

    /**
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviourFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::FACADE_EVENT_BEHAVIOUR);
    }
}
