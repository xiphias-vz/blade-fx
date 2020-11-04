<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Client\TimeSlot\TimeSlotClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface;
use SprykerShop\Yves\CheckoutPage\GiftCard\GiftCardItemsCheckerInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep\PostConditionChecker as SprykerPostConditionChecker;

class PostConditionChecker extends SprykerPostConditionChecker
{
    /**
     * @var \Pyz\Client\TimeSlot\TimeSlotClientInterface
     */
    protected $timeSlotClient;

    /**
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface $shipmentService
     * @param \SprykerShop\Yves\CheckoutPage\GiftCard\GiftCardItemsCheckerInterface $giftCardItemsChecker
     * @param \Pyz\Client\TimeSlot\TimeSlotClientInterface $timeSlotClient
     */
    public function __construct(
        CheckoutPageToShipmentServiceInterface $shipmentService,
        GiftCardItemsCheckerInterface $giftCardItemsChecker,
        TimeSlotClientInterface $timeSlotClient
    ) {
        parent::__construct($shipmentService, $giftCardItemsChecker);

        $this->timeSlotClient = $timeSlotClient;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function check(QuoteTransfer $quoteTransfer): bool
    {
        //todo: remove Test guest orders
        if ($quoteTransfer->getCustomer() && $quoteTransfer->getCustomer()->getFirstName() === 'test order') {
            return true;
        }

        if ($quoteTransfer->getOrderReference() === null && !$this->isShipmentTimeSlotsValid($quoteTransfer)) {
            return false;
        }

        return parent::check($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    protected function isShipmentTimeSlotsValid(QuoteTransfer $quoteTransfer)
    {
        $shipmentTransfer = $quoteTransfer->getShipment();

        return $shipmentTransfer !== null &&
            $shipmentTransfer->getMethod() !== null &&
            $this->timeSlotClient->isShipmentTimeSlotsValid($shipmentTransfer);
    }
}
