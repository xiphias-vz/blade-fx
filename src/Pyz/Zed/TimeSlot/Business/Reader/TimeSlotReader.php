<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Reader;

use ArrayObject;
use Generated\Shared\Transfer\TimeSlotCapacityTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Orm\Zed\TimeSlot\Persistence\Map\PyzTimeSlotTableMap;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;

class TimeSlotReader implements TimeSlotReaderInterface
{
    public function __construct()
    {
    }

    /**
     * @param string $currentStore
     *
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getDateTimeSlotCapacityForNextDays(string $currentStore): WeekDayTimeSlotsTransfer
    {
        $currentDate = date("Y-m-d");

        $query = new PyzTimeSlotQuery();
        $startingDate = strtotime("+1 days", strtotime($currentDate));
        $calcutedDate = strtotime("+5 days", strtotime($currentDate));

        $calcutedDate = date("Y-m-d", $calcutedDate);
        $betweenDates = [ 'min' => $startingDate, 'max' => $calcutedDate ];
        $currentDay = date('l');

        $storeFkQuery = new SpyStoreQuery();
        $storeFkId = $storeFkQuery->findByName($currentStore)->getFirst()->getIdStore();

        $storeQuery = new SpyMerchantQuery();
        $storeData = $storeQuery->findByFkStore($storeFkId);
        $merchantReference = $storeData->toArray()[0]["MerchantReference"];

        $queryByDatesArray = $query->filterByMerchantReference_Like($merchantReference)
                            ->filterByDate_Between($betweenDates)
                            ->orderByDate()
                            ->orderByTimeSlot()
                            ->find()
                            ->toArray();

        $query2 = new PyzTimeSlotQuery();
        $query2 = $query2->filterByMerchantReference_Like($merchantReference)
                            ->where(PyzTimeSlotTableMap::COL_DATE . " is null AND " . PyzTimeSlotTableMap::COL_DAY . "<> ''");

        $dates = [];
        foreach ($queryByDatesArray as $item) {
            array_push($dates, date('l', strtotime($item["Date"])));
        }

        $queryByDayArray = $query2
            ->orderByDay()
            ->orderByTimeSlot()
            ->find()
            ->toArray();

        $completeData = [];

        $timeSlots = ["10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00"];

        for ($dayOfWeek = 0; $dayOfWeek < 5; $dayOfWeek++) {
            $numberOfAddedDays = 1 + $dayOfWeek;
            $date = date("Y-m-d", strtotime("+" . $numberOfAddedDays . " days", strtotime($currentDate)));
            $dayName = date('l', strtotime($date));
            if ($dayName == "Sunday") {
                $numberOfAddedDays += 1;
                $date = date("Y-m-d", strtotime("+" . $numberOfAddedDays . " days", strtotime($currentDate)));
                $dayName = date('l', strtotime($date));
            }

            for ($timeSlot = 0; $timeSlot < 5; $timeSlot++) {
                $tsct = new TimeSlotCapacityTransfer();
                $tsct->setDay($dayName);
                $tsct->setTimeSlot($timeSlots[$timeSlot]);
                $tsct->setDate($date);
                $tsct->setCapacity(null);

                array_push($completeData, $tsct);
            }
        }

        foreach ($completeData as $data) {
            foreach ($queryByDatesArray as $dateData) {
                $dayName = date('l', strtotime($dateData["Date"]));
                if ($dayName == $data->getDay() && $dateData["TimeSlot"] == $data->getTimeSlot()) {
                    $data->setTimeSlot($dateData["TimeSlot"]);
                    $data->setMerchantReference($dateData["MerchantReference"]);
                    $data->setDay($dayName);
                    $data->setDate($dateData["Date"]);
                    $data->setCapacity($dateData["Capacity"]);
                }
            }
        }

        $fullArray = new ArrayObject();
        foreach ($completeData as $data) {
            foreach ($queryByDayArray as $dayData) {
                if ($dayData["Day"] == $data->getDay() && $dayData["TimeSlot"] == $data->getTimeSlot() && $data->getCapacity() == 0 && $data->getMerchantReference() == 0) {
                    $data->setTimeSlot($dayData["TimeSlot"]);
                    $data->setMerchantReference($dayData["MerchantReference"]);
                    $data->setDay($dayData["Day"]);
                    $data->setCapacity($dayData["Capacity"]);
                }
            }
            $fullArray->append($data);
        }

        $transferObject = new WeekDayTimeSlotsTransfer();

        $transferObject->setTimeSlotsCapacity($fullArray);

        return $transferObject;
    }
}
