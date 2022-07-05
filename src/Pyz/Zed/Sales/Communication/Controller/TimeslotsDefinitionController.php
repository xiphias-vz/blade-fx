<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

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
class TimeslotsDefinitionController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function saveTimeslotDefinitionAction(Request $request)
    {
        $dataJson = $request->request->get("data");
        $fkUser = $this->getFactory()->getUserFacade()->getCurrentUser()->getIdUser();
        if ($dataJson != null) {
            $data = json_decode($dataJson, true);
            $startTime = $data["startTime"];
            $endTime = $data["endTime"];
            $intervalMinutes = $data["intervalMinutes"];
            $defaultCapacity = $data["defaultCapacity"];
            $merchantReference = $data["merchantReference"];

            $timeslotDefinitionTransfer = new TimeSlotsDefinitionTransfer();
            $timeslotDefinitionTransfer->setMerchantReference($merchantReference)
                ->setStartTime($startTime)
                ->setEndTime($endTime)
                ->setIntervalMinutes($intervalMinutes)
                ->setDefaultCapacity($defaultCapacity)
                ->setFkUser($fkUser);

            $this->getFactory()
                ->getTimeSlotsFacade()
                ->setTimeslotDefinitionForStore($timeslotDefinitionTransfer);

            $this->getFactory()->getMerchantStorageFacade()->synchronizeMerchantToStorage();

            $responseData = 'success';
        } else {
            $responseData = 'error';

            return new JsonResponse($responseData);
        }

        return new JsonResponse($responseData);
    }
}
