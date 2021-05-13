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
 * @method \Spryker\Zed\Sales\Business\SalesFacadeInterface getFacade()
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
        $datetime = new DateTime('tomorrow');

        return [
            'orders' => $table->render(),
            'merchantFilterButtonsData' => $table->getMerchantFilterButtonsData(),
            'pickingZones' => $table->getPickingZones(),
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

        foreach ($timeSlots as $key => $value) {
            $timeSlotTimeDate = key($value);
            $capacityToSave = current($value);

            $pieces = explode("_", $timeSlotTimeDate);
            $date = $pieces[0]; // piece1
            $day = $pieces[1]; // piece1
            $isDefault = $pieces[3]; // piece1

            switch ($pieces[2]) {
                case '0':
                    $timeSlot = '10:00-12:00';
                    break;
                case '1':
                    $timeSlot = '12:00-14:00';
                    break;
                case '2':
                    $timeSlot = '14:00-16:00';
                    break;
                case '3':
                    $timeSlot = '16:00-18:00';
                    break;
                case '4':
                    $timeSlot = '18:00-20:00';
                    break;
                default:
                    $timeSlot = '';
            }

            if ($formToSave == "ByDate") {
                if ($isDefault == "defaultTable") {
                    $response = $this->getFactory()->getTimeSlotsFacade()->setDefaultTimeSlotsForSelectedDate($date, $day, $timeSlot, $capacityToSave);
                } else {
                    $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedDate($date, $timeSlot, $capacityToSave);
                }
            } elseif ($formToSave == "DefaultByStore") {
                $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedStore($selectedStore, $date, $timeSlot, $capacityToSave);
            } else {
                $response = 0;
            }

            if ($response == 1) {
                array_push($isSuccess, true);
            }
        }

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
        $dateFrom = $request->get("dateFrom");
        $dateTo = $request->get("dateTo");

        $response = "";
        $merchantReference = $this->getFactory()->getTimeSlotsFacade()->getMerchantByStoreName();
        $tsCapacityByDay = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByStore($merchantReference);
        $tsCapacitiesDef = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByDate($dateFrom, $dateTo);
        $tsCapacitiesCount = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotCapacityCountByDate($dateFrom, $dateTo);

        $begin = new DateTime($dateFrom);
        $end = new DateTime($dateTo);

        $newArray = [];
        for ($i = $begin; $i <= $end; $i->modify('+1 day')) {
            $date = $i->format("Y-m-d");
            $day = $i->format('l');
            $isInArrFilteredByDate = in_array($date, array_column($tsCapacitiesDef, 'Date'));

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
        }

        $response = $newArray;

        return new JsonResponse($response);
    }
}
