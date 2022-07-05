<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class TimeslotsController extends AbstractController
{
    private const TIMESLOTS_SIZE = [
        '15' => '15 min',
        '30' => '30 min',
        '60' => '1h',
        '120' => '2h',
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request): array
    {
        $locale = $this->getFactory()->getCodeBucket();
        $table = $this->getFactory()->createOrdersTable();
        $stores = $table->getStoresByUser();

        if (isset($_REQUEST['location'])) {
            $storeId = (int)$_REQUEST['location'];
        } else {
            if ($locale === 'DE') {
                $storeId = (int)array_key_first($stores);
            } else {
                $storeId = (int)array_key_first($stores);
            }
        }

        $isAdmin = $table->getIsUserAdmin();
        $isSupervisor = $table->getIsUserSupervisor();
        $currentCutoffs = '';
        if ($isAdmin == true) {
            $currentCutoffs = $this->getFactory()->getCurrentTimeslotCuttoffs($storeId);
        } elseif ($isSupervisor == true) {
            foreach ($stores as $key => $store) {
                $currentCutoffs = $this->getFactory()->getCurrentTimeslotCuttoffs($key);
            }
        }

        $hoursOfTheDay = [];
        for ($h = 0; $h < 24; $h++) {
            if ($h < 10) {
                $hoursOfTheDay[$h] = '0' . $h . ':00';
            } else {
                $hoursOfTheDay[$h] = $h . ':00';
            }
        }

        return [
            'currentStore' => $storeId,
            'storesData' => $stores,
            'isUserAdmin' => $isAdmin,
            'currentCutoffs' => $currentCutoffs,
            'isUserSupervisor' => $isSupervisor,
            'hoursOfTheDay' => $hoursOfTheDay,
            'timeSlotSize' => self::TIMESLOTS_SIZE,
        ];
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function saveTimeslotCutoffsAction(Request $request)
    {
        $response = $request->request->get("data");
        $merchantId = $request->request->get("store");
        if ($response != null) {
            $response = json_decode($response, true);
            $response = $this->cleanUpArray($response);
            foreach ($response as $day => $value) {
                foreach ($value as $slot => $time) {
                    $query = $this->saveTimeSlotsQuery($merchantId, $time, $day, $slot);
                    PropelExtension::execute($query);
                }
            }
            $this->getFactory()->getMerchantStorageFacade()->synchronizeMerchantToStorage();
        } else {
            $responseData = 'error';

//            $responseData["error"] = true;
//            $responseData["message"] = 'MissingParameters';
//            $responseData = json_encode($responseData);
            return new JsonResponse($responseData);
        }
//        $responseData["error"] = false;
//        $responseData["message"] = 'Success';
//        $responseData = json_encode($responseData);
//        $responseData = 'error: false, message: "Success"';
        $responseData = 'success';

        return new JsonResponse($responseData);
    }

    /**
     * @return void
     */
    protected function errorReponse()
    {
        //TODO: Return error response if something is missing of the needed data
    }

    /**
     * @param int $merchantId
     * @param int $data
     * @param string $day
     * @param string $timeslot
     *
     * @return string
     */
    protected function saveTimeSlotsQuery(int $merchantId, int $data, string $day, string $timeslot): string
    {
        $query = 'UPDATE pyz_time_slot
                  SET cut_off_time = ' . $data . '
                  WHERE merchant_reference = ' . $merchantId . '
                    AND day ="' . $day . '"
                    AND time_slot ="' . $timeslot . '"';

        return $query;
    }

    /**
     * @param int|null $currentMerchant
     *
     * @return array
     */
    public function getCutoffsForDefaultMerchant(?int $currentMerchant)
    {
        return $this->getFactory()->getCurrentTimeslotCuttoffs($currentMerchant);
    }

    /**
     * @param array $array
     *
     * @return array
     */
    public function cleanUpArray(array $array): array
    {
        $processed = [];

        foreach ($array as $subarr) {
            foreach ($subarr as $id => $value) {
                if (!isset($processed[$id])) {
                    $processed[$id] = $value;
                }
            }
        }

        return $processed;
    }
}
