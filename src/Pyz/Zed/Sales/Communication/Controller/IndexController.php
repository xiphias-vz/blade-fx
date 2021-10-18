<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

use DateTime;
use Spryker\Zed\Sales\Communication\Controller\IndexController as SprykerIndexController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class IndexController extends SprykerIndexController
{
    protected const TIMESLOT_COLUMN = 'TimeSlot';
    protected const IS_DEFAULT_COLUMN = 'IsDefault';
    protected const USED_CAPACITY_COLUMN = 'UsedCapacity';
    protected const CAPACITY_LEFT_COLUMN = 'CapacityLeft';
    protected const CAPACITY_COLUMN = 'Capacity';
    protected const DATE_COLUMN = 'Date';
    protected const DAY_COLUMN = 'Day';
    protected const COUNT_DATE = 'date';
    protected const COUNT_TIMESLOT = 'timeSlot';
    protected const COUNT_ORDER_COUNT = 'orderCount';

    /**
     * @return array
     */
    public function indexAction()
    {
        $table = $this->getFactory()->createOrdersTable();

        return [
            'orders' => $table->render(),
            'merchantFilterButtonsData' => $table->getMerchantFilterButtonsData(),
            'pickingZones' => $table->getPickingZones(),
        ];
    }

    /**
     * @return array
     */
    public function capacitiesAction()
    {
        $table = $this->getFactory()->createOrdersTable();
        $stores = $table->getStoresByUser();
        $isAdmin = $table->getIsUserAdmin();
        $datetime = new DateTime('tomorrow');

        return [
            'storesData' => $stores,
            'tommorowMinDate' => $datetime,
            'isUserAdmin' => $isAdmin,
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function filterByStoreAction(Request $request)
    {
        $response = "";
        $response = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByStore($request->get("store"));

        return new JsonResponse($response);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function saveTimeSlotsAction(Request $request)
    {
        $selectedStore = $request->request->get("store");
        $timeSlots = json_decode($request->request->get("changedData"), true);
        $formToSave = $request->request->get("formToSave");
        $isSuccess = [];
        $response = 0;
        $storeName = $request->request->get("storeName");

        foreach ($timeSlots as $value) {
            $timeSlotTimeDate = key($value);
            $capacityToSave = current($value);

            $pieces = explode("_", $timeSlotTimeDate);
            $date = $pieces[0];
            $day = $pieces[1];
            $timeIndex = $pieces[2];
            $isDefault = $pieces[3];

            $timeSlot = $this->getTimeSlotByIndex($timeIndex);

            if ($formToSave == "ByDate") {
                if ($isDefault == "defaultTable") {
                    $tsForDate = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsForSpecificDateAndDay($selectedStore, $date, $day);
                    if (count($tsForDate) > 0) {
                        $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedDate($selectedStore, $date, $day, $timeSlot, $capacityToSave);
                    } else {
                        $capacitiesFromDefaultDay = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotCapacityForDefaultDay($selectedStore, $day);

                        for ($timeId = 0; $timeId < 5; $timeId++) {
                            $time = $this->getTimeSlotByIndex($timeId);
                            if ($timeSlot == $time) {
                                $capacity = $capacityToSave;
                            } else {
                                $capacity = $capacitiesFromDefaultDay[$timeId]["Capacity"];
                            }

                            $response = $this->getFactory()->getTimeSlotsFacade()->setDefaultTimeSlotsForSelectedDate($selectedStore, $date, $day, $time, $capacity);
                        }
                    }
                } else {
                    $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedDate($selectedStore, $date, $day, $timeSlot, $capacityToSave);
                }
            } elseif ($formToSave == "DefaultByStore") {
                $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedStore($selectedStore, $day, $timeSlot, $capacityToSave);
            } else {
                $response = 0;
            }

            if ($response == 1) {
                array_push($isSuccess, true);
            }
        }

        $this->getFactory()->getTimeSlotsFacade()->executeEvent(['merchants_list']);
        $this->getFacade()->executeTimeSlotCheckJenkinsJob($storeName);

        if (in_array(false, $isSuccess)) {
            $response = ["isSuccess" => false];
        } else {
            $response = ["isSuccess" => true];
        }

        return new JsonResponse($response);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function filterByDateAction(Request $request)
    {
        $store = $request->get("store");
        $dateFrom = $request->get("dateFrom");
        $dateTo = $request->get("dateTo");
        $response = "";

        $tsCapacityByDay = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByStore($store);
        $tsCapacitiesDef = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByDate($store, $dateFrom, $dateTo);
        $tsCapacitiesCount = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotCapacityCountByDate($store, $dateFrom, $dateTo);

        $begin = new DateTime($dateFrom);
        $end = new DateTime($dateTo);

        $newArray = [];
        for ($i = $begin; $i <= $end; $i->modify('+1 day')) {
            $date = $i->format("Y-m-d");
            $day = $i->format('l');
            $isInArrFilteredByDate = in_array($date, array_column($tsCapacitiesDef, static::DATE_COLUMN));

            if (count($tsCapacitiesDef) > 0) {
                foreach ($tsCapacitiesDef as $key => $value) {
                    if ($date == $value[static::DATE_COLUMN]) {
                        $newArray[$date][$value[static::TIMESLOT_COLUMN]] = $value;
                        $newArray[$date][$value[static::TIMESLOT_COLUMN]][static::IS_DEFAULT_COLUMN] = false;

                        if (count($tsCapacitiesCount) > 0) {
                            foreach ($tsCapacitiesCount as $count) {
                                if ($value[static::DATE_COLUMN] == $count[static::COUNT_DATE] && $value[static::TIMESLOT_COLUMN] == $count[static::COUNT_TIMESLOT]) {
                                    $newArray[$value[static::DATE_COLUMN]][$value[static::TIMESLOT_COLUMN]][static::USED_CAPACITY_COLUMN] = (int)($count[static::COUNT_ORDER_COUNT]);
                                    $leftCapacity = (int)($value[static::CAPACITY_COLUMN]) - (int)($count[static::COUNT_ORDER_COUNT]);
                                    if ($leftCapacity < 0) {
                                        $leftCapacity = 0;
                                    }
                                    $newArray[$value[static::DATE_COLUMN]][$value[static::TIMESLOT_COLUMN]][static::CAPACITY_LEFT_COLUMN] = $leftCapacity;
                                }
                            }
                        } else {
                            $newArray[$date][$value[static::TIMESLOT_COLUMN]][static::USED_CAPACITY_COLUMN] = 0;
                            $newArray[$date][$value[static::TIMESLOT_COLUMN]][static::CAPACITY_LEFT_COLUMN] = (int)($value[static::CAPACITY_COLUMN]);
                        }
                    } else {
                        if ($date != $value[static::DATE_COLUMN] && array_key_exists($date, $newArray) == false) {
                            foreach ($tsCapacityByDay as $key1 => $value1) {
                                if ($day == $value1[static::DAY_COLUMN]) {
                                    $newArray[$date][$value1[static::TIMESLOT_COLUMN]] = $value1;
                                    $newArray[$date][$value1[static::TIMESLOT_COLUMN]][static::DATE_COLUMN] = $date;
                                    $newArray[$date][$value1[static::TIMESLOT_COLUMN]][static::IS_DEFAULT_COLUMN] = true;

                                    if (count($tsCapacitiesCount) > 0) {
                                        foreach ($tsCapacitiesCount as $count) {
                                            if ($value1[static::DATE_COLUMN] == $count[static::COUNT_DATE] && $value1[static::TIMESLOT_COLUMN] == $count[static::COUNT_TIMESLOT]) {
                                                $newArray[$value1[static::DATE_COLUMN]][$value1[static::TIMESLOT_COLUMN]][static::USED_CAPACITY_COLUMN] = (int)($count[static::COUNT_ORDER_COUNT]);
                                                $leftCapacity = (int)($value1[static::CAPACITY_COLUMN]) - (int)($count[static::COUNT_ORDER_COUNT]);
                                                if ($leftCapacity < 0) {
                                                    $leftCapacity = 0;
                                                }
                                                $newArray[$date][$value1[static::TIMESLOT_COLUMN]][static::CAPACITY_LEFT_COLUMN] = $leftCapacity;
                                            }
                                        }
                                    } else {
                                        $newArray[$date][$value1[static::TIMESLOT_COLUMN]][static::USED_CAPACITY_COLUMN] = 0;
                                        $newArray[$date][$value1[static::TIMESLOT_COLUMN]][static::CAPACITY_LEFT_COLUMN] = (int)($value1[static::CAPACITY_COLUMN]);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                foreach ($tsCapacityByDay as $key2 => $value2) {
                    if ($day == $value2[static::DAY_COLUMN]) {
                        $newArray[$date][$value2[static::TIMESLOT_COLUMN]] = $value2;
                        $newArray[$date][$value2[static::TIMESLOT_COLUMN]][static::DATE_COLUMN] = $date;
                        $newArray[$date][$value2[static::TIMESLOT_COLUMN]][static::IS_DEFAULT_COLUMN] = true;

                        if (count($tsCapacitiesCount) > 0) {
                            foreach ($tsCapacitiesCount as $count) {
                                if ($date == $count[static::COUNT_DATE] && $value2[static::TIMESLOT_COLUMN] == $count[static::COUNT_TIMESLOT]) {
                                    $newArray[$count[static::COUNT_DATE]][$value2[static::TIMESLOT_COLUMN]][static::USED_CAPACITY_COLUMN] = (int)($count[static::COUNT_ORDER_COUNT]);
                                    $leftCapacity = (int)($value2[static::CAPACITY_COLUMN]) - (int)($count[static::COUNT_ORDER_COUNT]);
                                    if ($leftCapacity < 0) {
                                        $leftCapacity = 0;
                                    }
                                    $newArray[$date][$value2[static::TIMESLOT_COLUMN]][static::CAPACITY_LEFT_COLUMN] = $leftCapacity;
                                }
                            }
                        } else {
                            $newArray[$date][$value2[static::TIMESLOT_COLUMN]][static::USED_CAPACITY_COLUMN] = 0;
                            $newArray[$date][$value2[static::TIMESLOT_COLUMN]][static::CAPACITY_LEFT_COLUMN] = (int)($value2[static::CAPACITY_COLUMN]);
                        }
                    }
                }
            }
        }

        $response = $newArray;

        return new JsonResponse($response);
    }

    /**
     * @param string $indexOfTime
     *
     * @return string
     */
    public function getTimeSlotByIndex(string $indexOfTime): string
    {
        $timeSlotsArr = ['10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'];

        return $timeSlotsArr[$indexOfTime];
    }
}
