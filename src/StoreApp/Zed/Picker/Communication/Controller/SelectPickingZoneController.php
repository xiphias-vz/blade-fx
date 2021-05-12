<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use phpDocumentor\GraphViz\Exception;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class SelectPickingZoneController extends AbstractController
{
    public const ID_PICKING_ZONE = 'idPickingZone';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed[]|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $factory = $this->getFactory();
        $merchantReference = $this->getFactory()->getUserFacade()->getCurrentUser()->getMerchantReference();
        $idPickingZone = $request->get(static::ID_PICKING_ZONE) == null ?
            0 : (int)$request->get(static::ID_PICKING_ZONE);

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            return $this->submitFormWithoutQueryingDataBase($idPickingZone);
        }
        $pickingZoneSelectionFormDataProvider = $factory->createPickingZoneSelectionFormDataProvider();
        $pickingZoneSelectionForm = $factory->createPickingZoneSelectionForm(
            $pickingZoneSelectionFormDataProvider->getData($this->findIdPickingZoneSelected()),
            $pickingZoneSelectionFormDataProvider->getOptions($merchantReference)
        );
        $pickingZoneSelectionForm->handleRequest($request);

        return [
            'pickingZoneSelectionForm' => $pickingZoneSelectionForm->createView(),
        ];
    }

    /**
     * @param int $idPickingZone
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function submitFormWithoutQueryingDataBase(int $idPickingZone): RedirectResponse
    {
        $factory = $this->getFactory();

        try {
            $this->getFacade()->savePickingZoneInSession(
                $idPickingZone
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
