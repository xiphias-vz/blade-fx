<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use phpDocumentor\GraphViz\Exception;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Zed\Picker\Communication\Form\PickingZoneSelectionForm;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class SelectPickingZoneController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed[]|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $factory = $this->getFactory();
        $merchantReference = $this->getFactory()->getUserFacade()->getCurrentUser()->getMerchantReference();

        $pickingZoneSelectionFormDataProvider = $factory->createPickingZoneSelectionFormDataProvider();
        $pickingZoneSelectionForm = $factory->createPickingZoneSelectionForm(
            $pickingZoneSelectionFormDataProvider->getData($this->findIdPickingZoneSelected()),
            $pickingZoneSelectionFormDataProvider->getOptions($merchantReference)
        );

        $pickingZoneSelectionForm->handleRequest($request);

        if ($pickingZoneSelectionForm->isSubmitted() && $pickingZoneSelectionForm->isValid()) {
            try {
                $this->getFacade()->savePickingZoneInSession(
                    $pickingZoneSelectionForm->getData()[PickingZoneSelectionForm::FIELD_PICKING_ZONE]
                );
            } catch (Exception $ex) {
            }

            $httpAction = $_SERVER['REQUEST_URI'];
            $splitHttpToGetParam = parse_url($httpAction);
            $queryParams = $splitHttpToGetParam['query'] ?? '';

            if ($queryParams == "multi_picking=1") {
                return $this->redirectResponse($factory->getConfig()->getMultiPickingUri());
            }

            return $this->redirectResponse($factory->getConfig()->getPickingUri());
        }

        return [
            'pickingZoneSelectionForm' => $pickingZoneSelectionForm->createView(),
        ];
    }

    /**
     * @return int|null
     */
    protected function findIdPickingZoneSelected(): ?int
    {
        $selectedPickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();

        if (!$selectedPickingZoneTransfer) {
            return null;
        }

        return $selectedPickingZoneTransfer->getIdPickingZone();
    }
}
