<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Reader;

use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;

class TimeSlotReader implements TimeSlotReaderInterface
{
    public function __construct()
    {
    }

    /**
     * @param string $currentDate
     * @param string $timeSlot
     *
     * @return array
     */
    public function getDateTimeSlotCapacityForNextDays(string $currentDate, string $timeSlot): array
    {
        $query = new PyzTimeSlotQuery();
        $calcutedDate = strtotime("+5 days", strtotime($currentDate));
        $calcutedDate = date("Y-m-d", $calcutedDate);
        $betweenDates = [ 'min' => $currentDate, 'max' => $calcutedDate ];

        return $query
        ->filterByDate_Between($betweenDates)
        ->find()
        ->toArray();
    }
}
