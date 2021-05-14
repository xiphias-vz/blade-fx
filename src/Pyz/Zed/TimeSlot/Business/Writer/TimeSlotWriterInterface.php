<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Writer;

use Generated\Shared\Transfer\QuoteTransfer;

interface TimeSlotWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function updateTimeSlotByQuote(QuoteTransfer $quoteTransfer): void;

    /**
     * @param string $store
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function saveTimeSlotsDataForStore(string $store, string $day, string $time, string $capacity): int;

    /**
     * @param string $merchantReference
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function saveTimeSlotsDataForDate(string $merchantReference, string $date, string $day, string $time, string $capacity): int;

    /**
     * @param string $merchantReference
     * @param string $date
     * @param string $day
     * @param string $time
     * @param string $capacity
     *
     * @return int
     */
    public function saveDefaultTimeSlotsDataForDate(string $merchantReference, string $date, string $day, string $time, string $capacity): int;
}
