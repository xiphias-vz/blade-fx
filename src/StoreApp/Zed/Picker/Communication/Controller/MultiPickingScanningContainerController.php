<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class MultiPickingScanningContainerController extends AbstractController
{
    public const NEXT_ORDER_POSITION = 'nextOrderPosition';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $listOfExistingContainers = $this->getFactory()
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $dataWithContainers = $transfer->getOrderList();
        $totalQuantity = count($dataWithContainers);
        $lastOrder = false;

        $transfer->setParents(true);

        $nextOrderPosition = $request->get(static::NEXT_ORDER_POSITION) == null ?
            0 : (int)$request->get(static::NEXT_ORDER_POSITION);

        $orderForScanningContainer = $transfer->getOrder($nextOrderPosition);
        $containersShelf = [];
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $submittedData = $request->request->all();
            $containersShelf = json_decode($request->get('containersShelf'));
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);

            if ($orderForScanningContainer == null) {
                return $this->redirectResponse($this->getFactory()->getConfig()->getDiffSectionsUri());
            }
        } else {
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
        }

        if ($totalQuantity == $nextOrderPosition + 1) {
            $lastOrder = true;
        }

        return [
            'orderForScanningContainer' => $orderForScanningContainer,
            'containersShelf' => $containersShelf,
            'listOfExistingContainers' => json_encode($listOfExistingContainers),
            'nextOrderPosition' => $nextOrderPosition,
            'lastOrder' => $lastOrder,
        ];
    }
}
