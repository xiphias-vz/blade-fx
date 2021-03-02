<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotBusinessFactory getFactory()
 * @method \Pyz\Zed\TimeSlot\TimeSlotConfig getConfig()
 */
class TimeSlotFacade extends AbstractFacade implements TimeSlotFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function updateTimeSlotStorage(QuoteTransfer $quoteTransfer): void
    {
        $this->getFactory()->createTimeSlotWriter()->updateTimeSlotByQuote($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return bool
     */
    public function checkTimeSlotAvailability(
        QuoteTransfer $quoteTransfer,
        CheckoutResponseTransfer $checkoutResponseTransfer
    ): bool {
        return $this->getFactory()->createTimeSlotAvailabilityValidator()->hasTimeSlotAvailability($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     *
     * @return void
     */
    public function releaseTimeSlotForShipment(ShipmentTransfer $shipmentTransfer): void
    {
        $this->getFactory()
            ->createTimeSlotCapacityReleaser()
            ->releaseTimeSlotByShipment($shipmentTransfer);
    }

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer
    {
        return $this->getFactory()->createTimeSlotReader()->getDateTimeSlotCapacityForNextDays();
    }
}
