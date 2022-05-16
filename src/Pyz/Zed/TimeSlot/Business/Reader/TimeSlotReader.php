<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Reader;

use ArrayObject;
use Generated\Shared\Transfer\TimeSlotCapacityTransfer;
use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Orm\Zed\Sales\Persistence\SpySalesShipmentQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Orm\Zed\TimeSlot\Persistence\Map\PyzTimeSlotTableMap;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Shared\TimeSlot\TimeSlotConstants;
use Pyz\Zed\TimeSlot\Persistence\TimeSlotQueryContainerInterface;
use Spryker\Shared\Config\Config;

class TimeSlotReader implements TimeSlotReaderInterface
{
    /**
     * @var \Pyz\Zed\TimeSlot\Persistence\TimeSlotQueryContainerInterface
     */
    protected $queryContainer;

    /**
     * @param \Pyz\Zed\TimeSlot\Persistence\TimeSlotQueryContainerInterface $queryContainer
     */
    public function __construct(TimeSlotQueryContainerInterface $queryContainer)
    {
        $this->queryContainer = $queryContainer;
    }

    /**
     * @param string $merchantReference
     *
     * @return array
     */
    public function getTimeSlots(string $merchantReference): array
    {
        if ($merchantReference !== "") {
            $timeslots = PyzTimeSlotQuery::create()
                ->select('time_slot')
                ->where(PyzTimeSlotTableMap::COL_DAY . ' is not NULL AND ' . PyzTimeSlotTableMap::COL_DATE . ' is null')
                ->filterByMerchantReference($merchantReference)
                ->orderByTimeSlot()
                ->distinct()
                ->find();
        } else {
            $timeslots = PyzTimeSlotQuery::create()
                ->select('time_slot')
                ->where(PyzTimeSlotTableMap::COL_DAY . ' is not NULL AND ' . PyzTimeSlotTableMap::COL_DATE . ' is null')
                ->orderByTimeSlot()
                ->distinct()
                ->find();
        }

        $timeslots = $timeslots->getData();

        if (empty($timeslots)) {
            $timeSlotConstants = Config::get(TimeSlotConstants::SHIPMENT_TIME_SLOTS);
            $timeslots = $timeSlotConstants[ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT];
        }

        return $timeslots;
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

        $passedSunday = false;
        for ($dayOfWeek = 0; $dayOfWeek < 5; $dayOfWeek++) {
            $numberOfAddedDays = 1 + $dayOfWeek;
            $date = date("Y-m-d", strtotime("+" . $numberOfAddedDays . " days", strtotime($currentDate)));
            $dayName = date('l', strtotime($date));

            if ($dayName == "Sunday" || $passedSunday == true) {
                $passedSunday = true;
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

    /**
     * @param string $currentStore
     * @param string $date
     *
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlotsForSpecificDay(string $currentStore, string $date): WeekDayTimeSlotsTransfer
    {
        $query = new PyzTimeSlotQuery();
        $queryByDatesArray = $query->filterByMerchantReference_Like($currentStore)
            ->filterByDate_Like($date)
            ->orderByTimeSlot()
            ->find()
            ->toArray();

        $fullArray1 = new ArrayObject();

        foreach ($queryByDatesArray as $timeSlot) {
            $fullArray1->append($timeSlot);
        }

        $transferObject = new WeekDayTimeSlotsTransfer();

        $transferObject->setTimeSlotsCapacity($fullArray1);

        return $transferObject;
    }

    /**
     * @param string $store
     *
     * @return array
     */
    public function getTimeSlotsFilteredByStore(string $store): array
    {
        $query = new PyzTimeSlotQuery();
        $result = $query->filterByMerchantReference_Like($store)
            ->where('(' . PyzTimeSlotTableMap::COL_DAY . ' is not null and ' . PyzTimeSlotTableMap::COL_DAY . ' != "") AND (' . PyzTimeSlotTableMap::COL_DATE . ' is null or ' . PyzTimeSlotTableMap::COL_DATE . ' = "")')
            ->orderByDate()
            ->orderByTimeSlot()
            ->find()
            ->toArray();

        return $result;
    }

    /**
     * @param string $currentStore
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotsFilteredByDate(string $currentStore, string $dateFrom, string $dateTo): array
    {
        $betweenDates = [ 'min' => $dateFrom, 'max' => $dateTo ];

        $query = new PyzTimeSlotQuery();
        $result = $query->filterByMerchantReference_Like($currentStore)
            ->filterByDate_Between($betweenDates)
            ->orderByDate()
            ->orderByTimeSlot()
            ->find()
            ->toArray();

        return $result;
    }

    /**
     * @param string $currentStore
     * @param string $dateFrom
     * @param string $dateTo
     *
     * @return array
     */
    public function getTimeSlotCapacityCountByDate(string $currentStore, string $dateFrom, string $dateTo): array
    {
        $salesShipmentQuery = new SpySalesShipmentQuery();

        $result = $salesShipmentQuery
            ->where(SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE . ">'" . $dateFrom . "_01:00-03:00' AND " . SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE . "< '" . $dateTo . "_22:00-24:00'")
            ->select([SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE])
            ->withColumn("count(*)", "orderCount")
            ->withColumn("SUBSTR(" . SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE . ", 1, 10)", "date")
            ->withColumn("SUBSTR(" . SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE . ", 12, 11)", "timeSlot")
            ->filterByMerchantReference_Like($currentStore)
            ->groupByRequestedDeliveryDate()
            ->find()
            ->toArray();

        return $result;
    }

    /**
     * @param string $currentStore
     *
     * @return int
     */
    public function getMerchantReferenceByStoreName(string $currentStore): int
    {
        $storeFkQuery = new SpyStoreQuery();
        $storeFkId = $storeFkQuery->findByName($currentStore)->getFirst()->getIdStore();

        $storeQuery = new SpyMerchantQuery();
        $storeData = $storeQuery->findByFkStore($storeFkId);
        $merchantReference = $storeData->toArray()[0]["MerchantReference"];

        return $merchantReference;
    }

    /**
     * @param string $currentStore
     * @param string $date
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotsForSpecificDateAndDay(string $currentStore, string $date, string $day): array
    {
        $query = new PyzTimeSlotQuery();
        $result = $query->filterByMerchantReference_Like($currentStore)
            ->filterByDate_Like($date)
            ->filterByDay_Like($day)
            ->orderByTimeSlot()
            ->find()
            ->toArray();

        return $result;
    }

    /**
     * @param string $store
     * @param string $day
     *
     * @return array
     */
    public function getTimeSlotCapacityForDefaultDay(string $store, string $day): array
    {
        $query = new PyzTimeSlotQuery();
        $result = $query
            ->filterByMerchantReference_Like($store)
            ->filterByDay_Like($day)
            ->where(PyzTimeSlotTableMap::COL_DATE . ' is null or ' . PyzTimeSlotTableMap::COL_DATE . ' = ""')
            ->orderByDate()
            ->orderByTimeSlot()
            ->find()
            ->toArray();

        return $result;
    }

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return array
     */
    public function getTimeSlotDefinition(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): array
    {
        return $this->queryContainer->getTimeSlotDefinition($timeslotDefinitionTransfer);
    }
}
