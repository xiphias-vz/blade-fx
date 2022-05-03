<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

use DateTime;
use Generated\Shared\Transfer\PyzTimeSlotHistoryTransfer;
use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class CapacitiesController extends AbstractController
{
    protected const TIMESLOT_COLUMN = 'TimeSlot';
    protected const IS_DEFAULT_COLUMN = 'IsDefault';
    protected const USED_CAPACITY_COLUMN = 'UsedCapacity';
    protected const CAPACITY_LEFT_COLUMN = 'CapacityLeft';
    protected const CAPACITY_COLUMN = 'Capacity';
    protected const DATE_COLUMN = 'Date';
    protected const DAY_COLUMN = 'Day';
    protected const DEFAULT_CAPACITY = 'DefaultCapacity';
    protected const COUNT_DATE = 'date';
    protected const COUNT_TIMESLOT = 'timeSlot';
    protected const COUNT_ORDER_COUNT = 'orderCount';

    /**
     * @return array
     */
    public function indexAction()
    {
        $table = $this->getFactory()->createOrdersTable();
        $stores = $table->getStoresByUser();
        $isAdmin = $table->getIsUserAdmin();
        $datetime = new DateTime('tomorrow');
        $merchantsToShow = $this->getMerchantsToShow($stores);
        $capacitiesHistoryTable = $this->getFactory()
            ->createCapacitiesHistoryTable($merchantsToShow);

        return [
            'storesData' => $stores,
            'tommorowMinDate' => $datetime,
            'isUserAdmin' => $isAdmin,
            'capacitiesHistoryTable' => $capacitiesHistoryTable->render(),
        ];
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
            $oldCapacityValue = $pieces[4];

            $timeSlot = $this->getTimeSlotByIndex($timeIndex, $selectedStore);
            $actionPerformed = "";

            if ($formToSave == "ByDate") {
                if ($isDefault == "defaultTable") {
                    $tsForDate = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsForSpecificDateAndDay($selectedStore, $date, $day);
                    if (count($tsForDate) > 0) {
                        $actionPerformed = "UPDATE";
                        $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedDate($selectedStore, $date, $day, $timeSlot, $capacityToSave);
                        if ($response == 1) {
                            $result = $this->saveTimeSlotsHistoryData($timeSlot, $day, $date, $oldCapacityValue, $capacityToSave, $actionPerformed, $selectedStore);
                        }
                    } else {
                        $capacitiesFromDefaultDay = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotCapacityForDefaultDay($selectedStore, $day);
                        $actionPerformed = "INSERT";
                        for ($timeId = 0; $timeId < 5; $timeId++) {
                            $time = $this->getTimeSlotByIndex($timeId, $selectedStore);
                            if ($timeSlot == $time) {
                                $capacity = $capacityToSave;
                                $capacityOld = $capacitiesFromDefaultDay[$timeId]["Capacity"];
                            } else {
                                $capacity = $capacitiesFromDefaultDay[$timeId]["Capacity"];
                                $capacityOld = $capacity;
                            }

                            $response = $this->getFactory()->getTimeSlotsFacade()->setDefaultTimeSlotsForSelectedDate($selectedStore, $date, $day, $time, $capacity);
                            if ($response == 1) {
                                $result = $this->saveTimeSlotsHistoryData($time, $day, $date, $capacityOld, $capacity, $actionPerformed, $selectedStore);
                            }
                        }
                    }
                } else {
                    $actionPerformed = "UPDATE";
                    $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedDate($selectedStore, $date, $day, $timeSlot, $capacityToSave);
                    if ($response == 1) {
                        $result = $this->saveTimeSlotsHistoryData($timeSlot, $day, $date, $oldCapacityValue, $capacityToSave, $actionPerformed, $selectedStore);
                    }
                }
            } elseif ($formToSave == "DefaultByStore") {
                $actionPerformed = "UPDATE";
                $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedStore($selectedStore, $day, $timeSlot, $capacityToSave);
                if ($response == 1) {
                    $result = $this->saveTimeSlotsHistoryData($timeSlot, $day, $date, $oldCapacityValue, $capacityToSave, $actionPerformed, $selectedStore);
                }
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
     * @param string $timeSlot
     * @param string $day
     * @param string $date
     * @param int|null $oldCapacityValue
     * @param int $newCapacityValue
     * @param string $actionPerformed
     * @param string $selectedStore
     *
     * @return int
     */
    private function saveTimeSlotsHistoryData(string $timeSlot, string $day, string $date, ?int $oldCapacityValue, int $newCapacityValue, string $actionPerformed, string $selectedStore)
    {
        $userFacade = $this->getFactory()->getUserFacade();
        $currentUser = $userFacade->getCurrentUser();
        $idUser = $currentUser->getIdUser();
        $merchantReference = $selectedStore;
        date_default_timezone_set("Europe/Berlin");
        $dateAndTime = date("Y-m-d G:i:s");

        $timeSlotHistoryTransfer = new PyzTimeSlotHistoryTransfer();
        $timeSlotHistoryTransfer->setCreatedAt($dateAndTime)
            ->setMerchantReference($merchantReference)
            ->setFkUser($idUser)
            ->setTimeSlotChanged($timeSlot)
            ->setDayChanged($day)
            ->setDateChanged($date)
            ->setCapacitySetFrom($oldCapacityValue)
            ->setCapacitySetTo($newCapacityValue)
            ->setActionPerformed($actionPerformed)
            ->setIsTrigger(0);

        $res = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsHistory($timeSlotHistoryTransfer);

        return $res;
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

        $tsCapacityByDay = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByStore($store);
        $tsCapacitiesDef = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotsFilteredByDate($store, $dateFrom, $dateTo);
        $tsCapacitiesCount = $this->getFactory()->getTimeSlotsFacade()->getTimeSlotCapacityCountByDate($store, $dateFrom, $dateTo);

        $begin = new DateTime($dateFrom);
        $end = new DateTime($dateTo);

        $newArray = [];
        for ($i = $begin; $i <= $end; $i->modify('+1 day')) {
            $date = $i->format("Y-m-d");
            $day = $i->format('l');
            $newArray[$date] = [];
            foreach ($tsCapacityByDay as $def) {
                if ($def[static::DAY_COLUMN] === $day) {
                    $timeSlot = [
                        static::TIMESLOT_COLUMN => $def[static::TIMESLOT_COLUMN],
                        static::DAY_COLUMN => $def[static::DAY_COLUMN],
                        static::DATE_COLUMN => $date,
                        static::CAPACITY_COLUMN => $def[static::CAPACITY_COLUMN],
                        static::USED_CAPACITY_COLUMN => 0,
                        static::CAPACITY_LEFT_COLUMN => $def[static::CAPACITY_COLUMN],
                        static::IS_DEFAULT_COLUMN => true,
                        static::DEFAULT_CAPACITY => $def[static::CAPACITY_COLUMN],
                        ];
                    foreach ($tsCapacitiesDef as $defDay) {
                        if ($defDay[static::DATE_COLUMN] === $date) {
                            if ($defDay[static::TIMESLOT_COLUMN] === $timeSlot[static::TIMESLOT_COLUMN]) {
                                $timeSlot[static::CAPACITY_COLUMN] = $defDay[static::CAPACITY_COLUMN];
                                $timeSlot[static::CAPACITY_LEFT_COLUMN] = $defDay[static::CAPACITY_COLUMN];
                                $timeSlot[static::IS_DEFAULT_COLUMN] = false;
                                break;
                            }
                        }
                    }
                    foreach ($tsCapacitiesCount as $capCount) {
                        if ($capCount[static::COUNT_DATE] === $date) {
                            if ($capCount[static::COUNT_TIMESLOT] === $timeSlot[static::TIMESLOT_COLUMN]) {
                                $timeSlot[static::USED_CAPACITY_COLUMN] = (int)$capCount[static::COUNT_ORDER_COUNT];
                                $timeSlot[static::CAPACITY_LEFT_COLUMN] = $timeSlot[static::CAPACITY_COLUMN] - $timeSlot[static::USED_CAPACITY_COLUMN];
                                if ($timeSlot[static::CAPACITY_LEFT_COLUMN] < 0) {
                                    $timeSlot[static::CAPACITY_LEFT_COLUMN] = 0;
                                }
                                break;
                            }
                        } else {
                            $timeSlot[static::CAPACITY_LEFT_COLUMN] = $timeSlot[static::CAPACITY_COLUMN] - $timeSlot[static::USED_CAPACITY_COLUMN];
                        }
                    }
                    $newArray[$date][$def[static::TIMESLOT_COLUMN]] = $timeSlot;
                }
            }
        }

        return new JsonResponse($newArray);
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
     * @param string $indexOfTime
     *
     * @return string
     */
    public function getTimeSlotByIndex(string $indexOfTime, string $merchantReference): string
    {
        $timeslotDefinitionTransfer = new TimeSlotsDefinitionTransfer();
        $timeslotDefinitionTransfer->setMerchantReference($merchantReference);
        $timeSlotsArr = $this->getFactory()
            ->getTimeSlotsFacade()
            ->getTimeslotDefinition($timeslotDefinitionTransfer);

        return $timeSlotsArr[$indexOfTime]["time_slot"];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function tableAction(Request $request): JsonResponse
    {
        $table = $this->getFactory()->createOrdersTable();
        $stores = $table->getStoresByUser();
        $table = $this->getFactory()->createCapacitiesHistoryTable(
            $this->getMerchantsToShow($stores)
        );

        return $this->jsonResponse(
            $table->fetchData()
        );
    }

    /**
     * @param array $stores
     *
     * @return string[]
     */
    protected function getMerchantsToShow(array $stores): array
    {
        if (count($stores) >> 0) {
            $merchantsToShow = array_keys($stores);
        } else {
            $merchantsToShow = ['0'];
        }

        return $merchantsToShow;
    }
}
