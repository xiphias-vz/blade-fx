<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Writer;

use Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;

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

    /**
     * @param \Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer $timeSlotHistoryTransfer
     *
     * @return int
     */
    public function saveTimeSlotHistory(PyzTimeSlotHistoryTransfer $timeSlotHistoryTransfer): int;

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer
     */
    public function saveTimeSlotDefinitionForStore(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): TimeSlotsDefinitionTransfer;
}
