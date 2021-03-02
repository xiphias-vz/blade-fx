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

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotBusinessFactory getFactory()
 */
interface TimeSlotFacadeInterface
{
    /**
     * Specification:
     *   - Writes time slots with orders count (per slot) to the Storage
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function updateTimeSlotStorage(QuoteTransfer $quoteTransfer): void;

    /**
     * Specification:
     *   - Returns true if order shipment slot available or false otherwise
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return bool
     */
    public function checkTimeSlotAvailability(
        QuoteTransfer $quoteTransfer,
        CheckoutResponseTransfer $checkoutResponseTransfer
    ): bool;

    /**
     * Specification:
     *   - Releases a time slot capacity based on specified order.
     *
     * @param \Generated\Shared\Transfer\ShipmentTransfer $shipmentTransfer
     *
     * @return void
     */
    public function releaseTimeSlotForShipment(ShipmentTransfer $shipmentTransfer): void;

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer;
}
