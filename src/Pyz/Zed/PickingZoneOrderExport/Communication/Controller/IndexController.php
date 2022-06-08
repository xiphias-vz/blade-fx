<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Controller;

use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Communication\PickingZoneOrderExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface getFacade()
 */
class IndexController extends AbstractController
{
    public const EXACT_DATE = 'exactDate';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        if ($request->request->get('picking_zone_order_export_form') !== null) {
            $storeName = $request->request->get('picking_zone_order_export_form')['picking_store'];
        } else {
            $stores = $this->getFacade()->getPickingStores();
            asort($stores);
            $storeName = array_key_first($stores);
        }

        $pickingZoneOrderExportFormDataProvider = $this->getFactory()->createpickingZoneOrderExportFormDataProvider($storeName);
        $pickingZoneOrderExportForm = $this->getFactory()->createPickingZoneOrderExportForm(
            $pickingZoneOrderExportFormDataProvider->getOptions()
        )->handleRequest($request);

        if ($pickingZoneOrderExportForm->isSubmitted() && $pickingZoneOrderExportForm->isValid()) {
            $data = $pickingZoneOrderExportForm->getData();
            $pickingZoneOrderExportContentsTransfer = $this->getFacade()
                ->generatePickingZoneOrderExportContent(
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_ZONE_ID],
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_STORE],
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_DATE],
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_TIMESLOTS],
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_STATUS]
                );

            return $this->getFacade()
                ->buildCsvResponse($pickingZoneOrderExportContentsTransfer);
        }

        return $this->viewResponse([
            'form' => $pickingZoneOrderExportForm->createView(),
        ]);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return string|false
     */
    public function changeTimeSlotsByUserSelectAction(Request $request)
    {
        $timeSlotDefinitionTransfer = new TimeSlotsDefinitionTransfer();
        $storeName = $request->request->get('storeName');
        $timeSlotDefinitionTransfer->setExactDate($request->request->get(static::EXACT_DATE));

        $result = $this->getFactory()->getTimeSlotsFacade()->getTimeslotDefinition($timeSlotDefinitionTransfer, $storeName);

        if (empty($result)) {
            $result = $this->getFactory()->getConfig()->getTimeSlotConstants();
        }

        $result[] = ['time_slot' => $this->getFactory()->getConfig()->getExtraTimeslot()];

        return json_encode($result);
    }
}
