<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Controller;

use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Communication\PickingZoneOrderExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface getFacade()
 */
class IndexController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $pickingZoneOrderExportFormDataProvider = $this->getFactory()->createpickingZoneOrderExportFormDataProvider();
        $pickingZoneOrderExportForm = $this->getFactory()->createPickingZoneOrderExportForm(
            $pickingZoneOrderExportFormDataProvider->getOptions()
        )->handleRequest($request);

        if ($pickingZoneOrderExportForm->isSubmitted() && $pickingZoneOrderExportForm->isValid()) {
            $data = $pickingZoneOrderExportForm->getData();
            $pickingZoneOrderExportContentsTransfer = $this->getFacade()
                ->generatePickingZoneOrderExportContent(
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_ZONE_ID],
                    $data[PickingZoneOrderExportForm::FIELD_PICKING_DATE]
                );

            return $this->getFacade()
                ->buildCsvResponse($pickingZoneOrderExportContentsTransfer);
        }

        return $this->viewResponse([
            'form' => $pickingZoneOrderExportForm->createView(),
        ]);
    }
}
