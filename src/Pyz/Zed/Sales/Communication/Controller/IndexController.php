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
        $datetime = new DateTime('tomorrow');

        return [
            'merchantFilterButtonsData' => $stores,
            'tommorowMinDate' => $datetime,
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
        $timeSlots = json_decode($request->request->get("changedData"));
        $formToSave = $request->request->get("formToSave");
        $isSuccess = [];
        $response = 0;

        foreach ($timeSlots as $key => $value) {
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
                            $capacity = "";
                            if ($timeSlot == $time) {
                                $capacity = $capacityToSave;
                            } else {
                                $capacity = $capacitiesFromDefaultDay[$timeId]["Capacity"];
                            }

                            $response = $this->getFactory()->getTimeSlotsFacade()->setDefaultTimeSlotsForSelectedDate($selectedStore, $date, $day, $time, $capacitiesFromDefaultDay[$timeId]["Capacity"]);
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
        $this->getFacade()->checkAndUpdateTimeSlotsCapacity();

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
            $isInArrFilteredByDate = in_array($date, array_column($tsCapacitiesDef, 'Date'));

            if (count($tsCapacitiesDef) > 0) {
                foreach ($tsCapacitiesDef as $key => $value) {
                    if ($date == $value['Date']) {
                        $newArray[$date][$value['TimeSlot']] = $value;
                        $newArray[$date][$value['TimeSlot']]['IsDefault'] = false;

                        if (count($tsCapacitiesCount) > 0) {
                            foreach ($tsCapacitiesCount as $count) {
                                if ($value['Date'] == $count['date'] && $value['TimeSlot'] == $count['timeSlot']) {
                                    $newArray[$value['Date']][$value['TimeSlot']]['UsedCapacity'] = (int)($count['orderCount']);
                                    $leftCapacity = (int)($value['Capacity']) - (int)($count['orderCount']);
                                    if ($leftCapacity < 0) {
                                        $leftCapacity = 0;
                                    }
                                    $newArray[$value['Date']][$value['TimeSlot']]['CapacityLeft'] = $leftCapacity;
                                }
                            }
                        } else {
                            $newArray[$date][$value['TimeSlot']]['UsedCapacity'] = 0;
                            $newArray[$date][$value['TimeSlot']]['CapacityLeft'] = (int)($value['Capacity']);
                        }
                    } else {
                        if ($date != $value['Date'] && array_key_exists($date, $newArray) == false) {
                            foreach ($tsCapacityByDay as $key1 => $value1) {
                                if ($day == $value1['Day']) {
                                    $newArray[$date][$value1['TimeSlot']] = $value1;
                                    $newArray[$date][$value1['TimeSlot']]['Date'] = $date;
                                    $newArray[$date][$value1['TimeSlot']]['IsDefault'] = true;

                                    if (count($tsCapacitiesCount) > 0) {
                                        foreach ($tsCapacitiesCount as $count) {
                                            if ($value1['Date'] == $count['date'] && $value1['TimeSlot'] == $count['timeSlot']) {
                                                $newArray[$value1['Date']][$value1['TimeSlot']]['UsedCapacity'] = (int)($count['orderCount']);
                                                $leftCapacity = (int)($value1['Capacity']) - (int)($count['orderCount']);
                                                if ($leftCapacity < 0) {
                                                    $leftCapacity = 0;
                                                }
                                                $newArray[$date][$value1['TimeSlot']]['CapacityLeft'] = $leftCapacity;
                                            }
                                        }
                                    } else {
                                        $newArray[$date][$value1['TimeSlot']]['UsedCapacity'] = 0;
                                        $newArray[$date][$value1['TimeSlot']]['CapacityLeft'] = (int)($value1['Capacity']);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                foreach ($tsCapacityByDay as $key2 => $value2) {
                    if ($day == $value2['Day']) {
                        $newArray[$date][$value2['TimeSlot']] = $value2;
                        $newArray[$date][$value2['TimeSlot']]['Date'] = $date;
                        $newArray[$date][$value2['TimeSlot']]['IsDefault'] = true;

                        if (count($tsCapacitiesCount) > 0) {
                            foreach ($tsCapacitiesCount as $count) {
                                if ($value2['Date'] == $count['date'] && $value2['TimeSlot'] == $count['timeSlot']) {
                                    $newArray[$value2['Date']][$value2['TimeSlot']]['UsedCapacity'] = (int)($count['orderCount']);
                                    $leftCapacity = (int)($value2['Capacity']) - (int)($count['orderCount']);
                                    if ($leftCapacity < 0) {
                                        $leftCapacity = 0;
                                    }
                                    $newArray[$date][$value2['TimeSlot']]['CapacityLeft'] = $leftCapacity;
                                }
                            }
                        } else {
                            $newArray[$date][$value2['TimeSlot']]['UsedCapacity'] = 0;
                            $newArray[$date][$value2['TimeSlot']]['CapacityLeft'] = (int)($value2['Capacity']);
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
