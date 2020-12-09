<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Validator;

use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use Pyz\Service\TimeSlot\TimeSlotServiceInterface;
use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\TimeSlot\TimeSlotConfig;

class TimeSlotAvailabilityValidator implements TimeSlotAvailabilityValidatorInterface
{
    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    protected $merchantFacade;

    /**
     * @var \Pyz\Service\TimeSlot\TimeSlotServiceInterface
     */
    protected $timeSlotService;

    /**
     * @var \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    protected $timeSlotClient;

    /**
     * @var \Pyz\Zed\TimeSlot\TimeSlotConfig
     */
    protected $timeSlotConfig;

    /**
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     * @param \Pyz\Service\TimeSlot\TimeSlotServiceInterface $timeSlotService
     * @param \Pyz\Client\TimeSlot\TimeSlotClientInterface $timeSlotClient
     * @param \Pyz\Zed\TimeSlot\TimeSlotConfig $timeSlotConfig
     */
    public function __construct(
        SalesFacadeInterface $salesFacade,
        MerchantFacadeInterface $merchantFacade,
        TimeSlotServiceInterface $timeSlotService,
        TimeSlotClientInterface $timeSlotClient,
        TimeSlotConfig $timeSlotConfig
    ) {

        $this->salesFacade = $salesFacade;
        $this->merchantFacade = $merchantFacade;
        $this->timeSlotService = $timeSlotService;
        $this->timeSlotClient = $timeSlotClient;
        $this->timeSlotConfig = $timeSlotConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function hasTimeSlotAvailability(QuoteTransfer $quoteTransfer): bool
    {
        $currentShipmentTransfer = $quoteTransfer->getShipment();
        if ($currentShipmentTransfer === null || $currentShipmentTransfer->getMethod() === null) {
            return false;
        }

        $currentShipmentMethodTransfer = $currentShipmentTransfer->getMethod();

        if ($this->isTestOrder($currentShipmentTransfer)) {
            return true;
        }

        $currentMerchantTransfer = $this->merchantFacade
            ->findOne(
                (new MerchantCriteriaFilterTransfer())
                    ->setWithDeliveryPostalCodes(true)
                    ->setWithTimeSlots(true)
                    ->setMerchantReference($quoteTransfer->getMerchantReference())
            );

        if (!$currentMerchantTransfer) {
            return false;
        }

        if (!$this->hasValidQuoteMerchantZip($currentShipmentTransfer, $currentMerchantTransfer) ||
            !$this->timeSlotClient->isShipmentTimeSlotsValid($currentShipmentTransfer, $currentMerchantTransfer)
        ) {
            return false;
        }

        $timeSlotOrdersCount = count($this->salesFacade
            ->findIdSalesOrdersByOrderFilterCriteria(
                (new OrderCriteriaFilterTransfer())
                    ->setMerchantReferences([$quoteTransfer->getMerchantReference()])
                    ->setRequestedDeliveryDate($currentShipmentTransfer->getRequestedDeliveryDate())
                    ->setShipmentName($currentShipmentMethodTransfer->getName())
                    ->setExcludeCancelledOrders(true)
            ));

        [$currentDate, $timeSlot] = explode('_', $currentShipmentTransfer->getRequestedDeliveryDate());

        $merchantCapacity = $this->timeSlotService->getMerchantTimeSlotCapacity(
            $currentShipmentMethodTransfer,
            $currentMerchantTransfer,
            $currentDate,
            $timeSlot
        );

        return $timeSlotOrdersCount < $merchantCapacity;
    }

    /**
     * todo: Remove Test orders
     *
     * @param \Generated\Shared\Transfer\ShipmentTransfer $currentShipmentTransfer
     *
     * @return bool
     */
    protected function isTestOrder(ShipmentTransfer $currentShipmentTransfer)
    {
        if ($currentShipmentTransfer->getShippingAddress() && $currentShipmentTransfer->getShippingAddress()->getFirstName() === 'test order') {
            return true;
        }

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $currentMerchant
     *
     * @return bool
     */
    public function hasValidQuoteMerchantZip(ShipmentTransfer $shipmentTransfer, MerchantTransfer $currentMerchant): bool
    {
        if ($shipmentTransfer->getMethod()->getShipmentMethodKey() === ShipmentConfig::SHIPMENT_METHOD_DELIVERY
            && !in_array($shipmentTransfer->getShippingAddress()->getZipCode(), $currentMerchant->getDeliveryPostalCodes())
        ) {
            return false;
        }

        return true;
    }
}
