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
            $containersShelf = json_decode($request->get('containersShelf'));
            foreach ($containersShelf as $key => $containerWithShelf) {
                $this->getFacade()->setContainerToOrder($orderForScanningContainer, $containerWithShelf->ContainerCode, $containerWithShelf->ShelfCode);
            }
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);

            if ($orderForScanningContainer == null) {
                return $this->redirectResponse($this->getFactory()->getConfig()->getDiffSectionsUri());
            }
        } else {
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
        }

        $containersWithoutShelf = $transfer->getOnlyCurrentUserAndZonePickingContainers($orderForScanningContainer, true);
        while ($totalQuantity > $nextOrderPosition + 1 && count($containersWithoutShelf) == 0) {
            $nextOrderPosition++;
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
            $containersWithoutShelf = $transfer->getOnlyCurrentUserAndZonePickingContainers($orderForScanningContainer, true);
        }

        if ($totalQuantity == $nextOrderPosition + 1) {
            $lastOrder = true;
        }

        $listOfExistingContainers = $this->getFactory()
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();

        return [
            'orderForScanningContainer' => $orderForScanningContainer,
            'containersShelf' => $containersShelf,
            'listOfExistingContainers' => json_encode($listOfExistingContainers),
            'nextOrderPosition' => $nextOrderPosition,
            'lastOrder' => $lastOrder,
            'containersWithoutShelf' => $containersWithoutShelf,
        ];
    }
}
