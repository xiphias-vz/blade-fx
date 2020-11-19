<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

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
        $pickingZoneSessionKey = $factory->getConfig()->getPickingZoneSessionKey();
        $idPickingZone = $request->getSession()->get($pickingZoneSessionKey);

        $pickingZoneSelectionFormDataProvider = $factory->createPickingZoneSelectionFormDataProvider();
        $pickingZoneSelectionForm = $factory->createPickingZoneSelectionForm(
            $pickingZoneSelectionFormDataProvider->getData($idPickingZone),
            $pickingZoneSelectionFormDataProvider->getOptions()
        );

        $pickingZoneSelectionForm->handleRequest($request);

        if ($pickingZoneSelectionForm->isSubmitted() && $pickingZoneSelectionForm->isValid()) {
            $request->getSession()->set(
                $pickingZoneSessionKey,
                $pickingZoneSelectionForm->getData()[PickingZoneSelectionForm::FIELD_PICKING_ZONE]
            );

            return $this->redirectResponse($factory->getConfig()->getPickingUri());
        }

        return [
            'pickingZoneSelectionForm' => $pickingZoneSelectionForm->createView(),
        ];
    }
}
