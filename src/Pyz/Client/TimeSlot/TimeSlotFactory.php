<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot;

use Pyz\Client\MerchantStorage\MerchantStorageClient;
use Pyz\Client\TimeSlot\Expander\ShipmentSlotsExpanderInterface;
use Pyz\Client\TimeSlot\Expander\ShipmentTimeSlotsExpander;
use Pyz\Client\TimeSlot\Reader\MerchantReader;
use Pyz\Client\TimeSlot\Reader\MerchantReaderInterface;
use Pyz\Client\TimeSlot\Zed\TimeSlotStub;
use Pyz\Client\TimeSlotStorage\TimeSlotStorageClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\TimeSlot\TimeSlotServiceInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Quote\QuoteClientInterface;

/**
 * @method \Pyz\Client\TimeSlot\TimeSlotConfig getConfig()
 */
class TimeSlotFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\MerchantStorage\MerchantStorageClient
     */
    public function getMerchantStorageClient(): MerchantStorageClient
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_MERCHANT_STORAGE);
    }

    /**
     * @return \Spryker\Client\Quote\QuoteClientInterface
     */
    public function getQuoteClient(): QuoteClientInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_QUOTE);
    }

    /**
     * @return \Pyz\Client\TimeSlotStorage\TimeSlotStorageClientInterface
     */
    public function getTimeSlotStorageClient(): TimeSlotStorageClientInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_TIME_SLOT_STORAGE);
    }

    /**
     * @return \Pyz\Client\TimeSlot\Expander\ShipmentSlotsExpanderInterface
     */
    public function createShipmentTimeSlotsExpander(): ShipmentSlotsExpanderInterface
    {
        return new ShipmentTimeSlotsExpander(
            $this->getConfig(),
            $this->createMerchantReader(),
            $this->getTimeSlotStorageClient(),
            $this->getTimeSlotService(),
            $this->getQuoteClient(),
            $this->getDateTimeWithZoneService()
        );
    }

    /**
     * @return \Pyz\Client\TimeSlot\Reader\MerchantReaderInterface
     */
    public function createMerchantReader(): MerchantReaderInterface
    {
        return new MerchantReader($this->getMerchantStorageClient(), $this->getQuoteClient());
    }

    /**
     * @return \Pyz\Service\TimeSlot\TimeSlotServiceInterface
     */
    public function getTimeSlotService(): TimeSlotServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_TIME_SLOT);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    protected function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Pyz\Client\TimeSlot\Zed\TimeSlotStubInterface
     */
    public function createZedStub()
    {
        return new TimeSlotStub($this->getZedRequestClient());
    }

    /**
     * @return \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected function getZedRequestClient()
    {
        return $this->getProvidedDependency(TimeSlotDependencyProvider::CLIENT_ZED_REQUEST);
    }
}
