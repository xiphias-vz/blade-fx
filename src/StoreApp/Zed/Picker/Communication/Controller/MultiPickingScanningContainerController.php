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
        if ($this->getFactory()->isOldPickingVersionEnabled()) {
            return $this->getFactory()->getOldMultiPickingScanningContainerController()->indexAction($request);
        }

        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $dataWithContainers = $transfer->getOrderList();

        $transfer->setParents(true);
        $zoneAbbreviation = $transfer->getZoneAbbrevation();

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            foreach ($dataWithContainers as $order) {
                $orderContainers = $order->getPickingContainers();
                $containersShelf = json_decode($request->get('containersShelf'));
                foreach ($orderContainers as $container) {
                    foreach ($containersShelf as $key => $containerWithShelf) {
                        if ($container->getContainerID() === $containerWithShelf->ContainerCode) {
                            $this->getFacade()->setContainerToOrder($order, $container->getContainerID(), $containerWithShelf->ShelfCode, $container->getHasSubstitutedItem());
                            break;
                        }
                    }
                }
            }

            $transfer->updatePausedOrders();
            $this->getFacade()->clearLockForPausedOrders($transfer);

            $orderUpdater = $this->getFacade()->getBusinessFactory()->createOrderUpdater();
            $pickedItems = [];
            $data = $this->getFacade()->getBusinessFactory()->createPickingHeaderTransferData();
            foreach ($transfer->getPickingOrders() as $order) {
                foreach ($order->getPickingOrderItems() as $item) {
                    $counter = 0;
                    if ($item->getQuantityPicked() > 0) {
                        foreach ($data->getOrderItemIdArray($item) as $id) {
                            if ($counter < $item->getQuantityPicked()) {
                                $pickedItems[] = $id;
                            }
                            $counter++;
                        }
                    }
                }
            }
            $orderUpdater->markOrderItemsAsPicked($pickedItems);

            return $this->redirectResponse($this->getFactory()->getConfig()->getDiffSectionsUri());
        }

        $listOfExistingContainers = $this->getFactory()
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();

        $selectedContainersData = [];
        foreach ($dataWithContainers as $containerData) {
            /** @var \Generated\Shared\Transfer\PickingContainerTransfer $container */
            foreach ($containerData["pickingContainers"] as $container) {
                if ($container->getHasItems()) {
                    foreach ($listOfExistingContainers as $existingContainer) {
                        if ($existingContainer["ContainerCode"] === $container->getContainerID()) {
                            $selectedContainersData[] = $existingContainer;
                        }
                    }
                }
            }
        }

        return [
            'listOfExistingContainers' => json_encode($listOfExistingContainers),
            'dataWithContainers' => $dataWithContainers,
            'zoneAbbreviation' => $zoneAbbreviation,
            'selectedContainers' => $selectedContainersData,
        ];
    }
}
