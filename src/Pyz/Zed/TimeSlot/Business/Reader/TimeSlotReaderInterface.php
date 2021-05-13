<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Reader;

use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

interface TimeSlotReaderInterface
{
    /**
     * @param string $currentStore
     *
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getDateTimeSlotCapacityForNextDays(string $currentStore): WeekDayTimeSlotsTransfer;

    /**
     * @param string $currentStore
     * @param string $date
     *
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlotsForSpecificDay(string $currentStore, string $date): WeekDayTimeSlotsTransfer;

    /**
     * @param string $store
     *
     * @return array
     */
    public function getTimeSlotsFilteredByStore(string $store): array;

    /**
     * @param string $currentStore
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotsFilteredByDate(string $currentStore, string $dateFrom, string $dateTo): array;

    /**
     * @param string $currentStore
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotCapacityCountByDate(string $currentStore, string $dateFrom, string $dateTo): array;

    /**
     * @param string $currentStore
     *
     * @return int
     */
    public function getMerchantReferenceByStoreName(string $currentStore): int;
}
