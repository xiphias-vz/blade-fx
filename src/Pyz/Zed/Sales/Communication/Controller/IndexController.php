<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

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

        return [
            'orders' => $table->render(),
            'merchantFilterButtonsData' => $table->getMerchantFilterButtonsData(),
            'pickingZones' => $table->getPickingZones(),
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
        $isSuccess = [];

        foreach ($timeSlots as $key => $value) {
            $timeSlotTimeDate = key($value);
            $capacityToSave = current($value);

            $pieces = explode("_", $timeSlotTimeDate);
            $day = $pieces[0]; // piece1

            switch ($pieces[1]) {
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

            $response = $this->getFactory()->getTimeSlotsFacade()->setTimeSlotsForSelectedStore($selectedStore, $day, $timeSlot, $capacityToSave);
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
}
