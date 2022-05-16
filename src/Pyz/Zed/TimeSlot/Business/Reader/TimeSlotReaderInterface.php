<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Reader;

use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

interface TimeSlotReaderInterface
{
    /**
     * @param string $merchantReference
     *
     * @throws \Propel\Runtime\Exception\PropelException
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     *
     * @return array
     */
    public function getTimeSlots(string $merchantReference): array;

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

    /**
     * @param string $currentStore
     * @param string $date
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotsForSpecificDateAndDay(string $currentStore, string $date, string $day): array;

    /**
     * @param string $store
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotCapacityForDefaultDay(string $store, string $day): array;

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return array
     */
    public function getTimeSlotDefinition(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): array;
}
