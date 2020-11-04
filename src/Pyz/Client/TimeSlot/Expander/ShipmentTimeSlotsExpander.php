<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Expander;

use DateInterval;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Pyz\Client\TimeSlot\Exception\TimeSlotKeyNotFound;
use Pyz\Client\TimeSlot\Reader\MerchantReaderInterface;
use Pyz\Client\TimeSlot\TimeSlotConfig;
use Pyz\Client\TimeSlotStorage\TimeSlotStorageClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\TimeSlot\TimeSlotServiceInterface;
use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Shared\TimeSlot\TimeSlotConfig as SharedTimeSlotConfig;
use Spryker\Client\Quote\QuoteClientInterface;

class ShipmentTimeSlotsExpander implements ShipmentSlotsExpanderInterface
{
    protected const INTERVAL_STEP = 'P1D';
    protected const DATE_FORMAT = 'Y-m-d';
    protected const TODAY_DATE_TIME_FORMAT = 'midnight';
    protected const DAY_OF_WEEK_FORMAT = 'l';
    protected const ZERO_CAPACITY = 0;

    /**
     * @var array
     */
    protected $shipmentTimeSlots;

    /**
     * @var array
     */
    protected $holidays;

    /**
     * @var int
     */
    protected $maxShowDays;

    /**
     * @var \Pyz\Client\TimeSlot\Reader\MerchantReaderInterface
     */
    protected $merchantReader;

    /**
     * @var \Pyz\Client\TimeSlotStorage\TimeSlotStorageClientInterface
     */
    protected $timeSlotStorageClient;

    /**
     * @var \Pyz\Service\TimeSlot\TimeSlotServiceInterface
     */
    protected $timeSlotService;

    /**
     * @var \Spryker\Client\Quote\QuoteClientInterface
     */
    protected $quoteClient;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    protected $dateTimeWithZoneService;

    /**
     * @param \Pyz\Client\TimeSlot\TimeSlotConfig $timeSlotConfig
     * @param \Pyz\Client\TimeSlot\Reader\MerchantReaderInterface $merchantReader
     * @param \Pyz\Client\TimeSlotStorage\TimeSlotStorageClientInterface $timeSlotStorageClient
     * @param \Pyz\Service\TimeSlot\TimeSlotServiceInterface $timeSlotService
     * @param \Spryker\Client\Quote\QuoteClientInterface $quoteClient
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     */
    public function __construct(
        TimeSlotConfig $timeSlotConfig,
        MerchantReaderInterface $merchantReader,
        TimeSlotStorageClientInterface $timeSlotStorageClient,
        TimeSlotServiceInterface $timeSlotService,
        QuoteClientInterface $quoteClient,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService
    ) {
        $this->maxShowDays = $timeSlotConfig->getMaxShowDays();
        $this->holidays = $timeSlotConfig->getHolidayDates();
        $this->shipmentTimeSlots = $timeSlotConfig->getShipmentTimeSlots();
        $this->merchantReader = $merchantReader;
        $this->timeSlotStorageClient = $timeSlotStorageClient;
        $this->timeSlotService = $timeSlotService;
        $this->quoteClient = $quoteClient;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodTransfer
     */
    public function expandWithTimeSlots(ShipmentMethodTransfer $shipmentMethodTransfer): ShipmentMethodTransfer
    {
        $currentMerchant = $this->merchantReader->getCurrentMerchant();

        $hasMerchantHasCapacityForShipment = $this->hasMerchantCapacityForShipment($shipmentMethodTransfer, $currentMerchant);

        if (!$hasMerchantHasCapacityForShipment) {
            return $shipmentMethodTransfer;
        }

        $shipmentMethodTransfer->setTimeSlots($this->buildTimeSlotsForShipment($shipmentMethodTransfer, $currentMerchant));

        return $shipmentMethodTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer|null $merchantTransfer
     *
     * @return bool
     */
    public function isShipmentTimeSlotsValid(ShipmentTransfer $shipmentTransfer, ?MerchantTransfer $merchantTransfer = null): bool
    {
        if ($merchantTransfer === null) {
            $merchantTransfer = $this->merchantReader->getCurrentMerchant();
            if (!$merchantTransfer) {
                return false;
            }
        }

        $timeSlots = $this->buildTimeSlotsForShipment($shipmentTransfer->getMethod(), $merchantTransfer);
        $shipmentMethodKey = $shipmentTransfer->getMethod()->getShipmentMethodKey();

        if (!isset($timeSlots[$shipmentMethodKey]) || empty($timeSlots[$shipmentMethodKey])) {
            return false;
        }

        $methodTimeSlots = $timeSlots[$shipmentMethodKey];
        [$shipmentDate, $shipmentTime] = explode('_', $shipmentTransfer->getRequestedDeliveryDate());

        if (isset($methodTimeSlots[$shipmentDate]) && isset(array_flip($methodTimeSlots[$shipmentDate])[$shipmentTime])) {
            return true;
        }

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return array
     */
    protected function buildTimeSlotsForShipment(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer
    ): array {
        $shipmentSlots = [];
        $currentDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone(static::TODAY_DATE_TIME_FORMAT);
        $timeSlotTemplate = $this->getTimeSlotTemplateByShipmentMethod($shipmentMethodTransfer);

        // Remove after the demo!
        if ($merchantTransfer->getMerchantReference() === 'Berlin_84_10557') {
            $timeSlotTemplate = array_slice($timeSlotTemplate, 3);
        }

        for ($i = 0; $i < $this->maxShowDays; $i++) {
            $currentDateTime->add(new DateInterval(static::INTERVAL_STEP));
            $currentDate = $currentDateTime->format(static::DATE_FORMAT);
            $dateOfWeek = $currentDateTime->format(static::DAY_OF_WEEK_FORMAT);

            if (in_array($currentDate, $this->holidays) || in_array($dateOfWeek, SharedTimeSlotConfig::TIME_SLOT_WEEK_UNAVAILABILITY_DAYS)) {
                $i--;
                continue;
            }

            $availableTimeSlots = $this->filterTimeSlotTemplateAgainstCapacity(
                $shipmentMethodTransfer,
                $merchantTransfer,
                $currentDate,
                $timeSlotTemplate
            );

            $shipmentSlots[$shipmentMethodTransfer->getShipmentMethodKey()][$currentDate] = $availableTimeSlots;
        }

        return $shipmentSlots;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $currentMerchant
     *
     * @return bool
     */
    protected function hasMerchantCapacityForShipment(ShipmentMethodTransfer $shipmentMethodTransfer, MerchantTransfer $currentMerchant): bool
    {
        $currentShipmentAddressZipCode = $this->quoteClient->getQuote()->getShippingAddress()->getZipCode();

        if ($shipmentMethodTransfer->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_DELIVERY
            && !in_array($currentShipmentAddressZipCode, $currentMerchant->getDeliveryPostalCodes())
        ) {
            return false;
        }

        return $this->timeSlotService->getMerchantCapacityByShipmentMethod($shipmentMethodTransfer, $currentMerchant) > static::ZERO_CAPACITY;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param string $currentDate
     * @param array $timeSlotTemplate
     *
     * @return array
     */
    protected function filterTimeSlotTemplateAgainstCapacity(
        ShipmentMethodTransfer $shipmentMethodTransfer,
        MerchantTransfer $merchantTransfer,
        string $currentDate,
        array $timeSlotTemplate
    ): array {
        foreach ($timeSlotTemplate as $key => $timeSlot) {
            $timeSlotOrdersCount = $this->timeSlotStorageClient->getTimeSlotOrdersCount(
                $shipmentMethodTransfer,
                $merchantTransfer,
                sprintf(SharedTimeSlotConfig::TIME_SLOT_DATE_TIME_CONC_FORMAT, $currentDate, $timeSlot)
            );

            if ($this->timeSlotService->getMerchantCapacityByShipmentMethod($shipmentMethodTransfer, $merchantTransfer) <= $timeSlotOrdersCount) {
                unset($timeSlotTemplate[$key]);
            }
        }

        return array_values($timeSlotTemplate);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentMethodTransfer $shipmentMethodTransfer
     *
     * @throws \Pyz\Client\TimeSlot\Exception\TimeSlotKeyNotFound
     *
     * @return array
     */
    protected function getTimeSlotTemplateByShipmentMethod(ShipmentMethodTransfer $shipmentMethodTransfer): array
    {
        $shipmentMethodKey = $shipmentMethodTransfer->getShipmentMethodKey();

        if (!isset($this->shipmentTimeSlots[$shipmentMethodKey])) {
            throw new TimeSlotKeyNotFound(
                "Delivery Time slot with the key: $shipmentMethodKey doesn't exist in config file"
            );
        }

        return $this->shipmentTimeSlots[$shipmentMethodKey];
    }
}
