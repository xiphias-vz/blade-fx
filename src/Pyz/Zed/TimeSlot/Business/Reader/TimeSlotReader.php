<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Reader;

use ArrayObject;
use Generated\Shared\Transfer\TimeSlotCapacityTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;

class TimeSlotReader implements TimeSlotReaderInterface
{
    public function __construct()
    {
    }

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getDateTimeSlotCapacityForNextDays(): WeekDayTimeSlotsTransfer
    {
        $currentDate = date("Y-m-d");

        $query = new PyzTimeSlotQuery();
        $startingDate = strtotime("+1 days", strtotime($currentDate));
        $calcutedDate = strtotime("+5 days", strtotime($currentDate));

        $calcutedDate = date("Y-m-d", $calcutedDate);
        $betweenDates = [ 'min' => $startingDate, 'max' => $calcutedDate ];
        $queryArray = $query->filterByDate_Between($betweenDates)
                    ->orderByDate()
                    ->orderByTimeSlot()
                    ->find()
                    ->toArray();

        $transferObject = new WeekDayTimeSlotsTransfer();
        $fullArray = new ArrayObject();
        $queryCount = count($queryArray);

        for ($i = 0; $i < $queryCount; $i++) {
            $tscObject = new TimeSlotCapacityTransfer();
            $tscObject->fromArray($queryArray[$i], true);
            $fullArray->append($tscObject);
        }

        $transferObject->setTimeSlotsCapacity($fullArray);

        return $transferObject;
    }
}
