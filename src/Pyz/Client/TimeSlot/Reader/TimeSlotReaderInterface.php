<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Reader;

interface TimeSlotReaderInterface
{
    /**
     * @param string $currentDate
     * @param string $timeSlot
     *
     * @return array
     */
    public function getDateTimeSlotCapacityForNextDays(string $currentDate, string $timeSlot): array;
}
