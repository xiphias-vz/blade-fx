<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Shared\Oms\OmsConfig;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class MultiPickingController extends BaseOrderPickingController
{
    public const ID_ORDERS = 'idOrders';
    public const ORDER_IS_BEING_PROCESSED_MESSAGE = 'storeapp.picking.message.error.order-is-being-processed';
    public const REDIRECT_SKIP_TOKEN = 'backToItem';
    public const IS_ANY_ORDER_LOCKED = 'isAnyOrderLocked';
    protected const OMS_ORDER_STATUSES_FOR_PICKING_PROCESS = [
        OmsConfig::STORE_STATE_READY_FOR_PICKING,
        OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES,
    ];

    protected const YES_CHOSEN_IN_SUBSTITUTE_MODAL = 'isYesInSubstitutionModalChosen';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $factory = $this->getFactory();
        $facade = $this->getFacade();

        $unlockProducts = (bool)isset($_REQUEST['unlock']) ?? false;

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $idOrders = json_decode($request->get(static::ID_ORDERS));
            $isAnyOrderLocked = json_decode($request->get(static::IS_ANY_ORDER_LOCKED));
            $userTransfer = $this->getCurrentUser($request);
            $pickingZoneTransfer = $facade->findPickingZoneInSession();

            $orderCount = count($idOrders);
            for ($indexOfOrder = 0; $indexOfOrder < $orderCount; $indexOfOrder++) {
                if (!$this->isOrderPickingBlockAvailableForUser($idOrders[$indexOfOrder], $userTransfer, $pickingZoneTransfer)) {
                    $this->addErrorMessage(
                        static::ORDER_IS_BEING_PROCESSED_MESSAGE
                    );

                    return $this->redirectResponse(PickerConfig::URL_ORDER_MULTI_PICKING);
                }
            }

            if ($isAnyOrderLocked) {
                $transfer = $facade->getPickingHeaderTransfer();
                $facade->clearLockOrders($transfer, $idOrders);
                $orderByTimeSlot = $transfer->getOrdersByTimeSlot();
                $facade->setTransferToSession($transfer);
                $this->redirectResponse($factory->getConfig()->getMultiPickingUri());

                $this->returnOrderByTimeSlotAndMerchant($orderByTimeSlot, $request);
            }

            $pickingHeaderTransfer = $facade->setOrdersToPick($idOrders);
            if ($pickingHeaderTransfer->getErrorMessage() == null) {
                return $this->redirectResponse($factory->getConfig()->getScanningContainerUri());
            } else {
                $this->addErrorMessage($pickingHeaderTransfer->getErrorMessage());
            }
        }

        if ($unlockProducts) {
            $transfer = $facade->getPickingHeaderTransfer();

            $facade->unLockAndClearAddedContainers($transfer);
            $transfer = $facade->getPickingHeaderTransfer();
            $orderByTimeSlot = $transfer->getOrdersByTimeSlot();
            $facade->setTransferToSession($transfer);
            $this->redirectResponse($factory->getConfig()->getMultiPickingUri());

            $this->returnOrderByTimeSlotAndMerchant($orderByTimeSlot, $request);
        }

        $idPickingZone = $request->getSession()->getBag('attributes')->all()['picking_zone'] ?? "";
        if ($idPickingZone === null || $idPickingZone === "") {
            return $this->redirectResponse(PickerConfig::URL_DIFF_SECTIONS);
        }

        $transfer = $facade->getAllOrdersInStateReadyForPickingByZone();
        $orderByTimeSlot = $transfer->getOrdersByTimeSlot();

        return $this->returnOrderByTimeSlotAndMerchant($orderByTimeSlot, $request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function multiOrderPickingAction(Request $request)
    {
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $redirectToScanningContainers = false;
        $setItemDeclined = false;
        $productToDisplay = $_REQUEST['sku'] ?? '';
        $positionToDisplay = $_REQUEST['position'] ?? '';
        $openModal = $_REQUEST['fromModal'] ?? 'false';
        $fromPosListeAndModal = $_REQUEST['fromPosListeAndModal'] ?? 'false';
        $isSubstitutionPicked = $_REQUEST['isSubstitutionPicked'] ?? 'false';
        $isYesPressedInSubstitutionModal = $request->get(static::YES_CHOSEN_IN_SUBSTITUTE_MODAL) ?? 'false';
        $status = $request->request->get("status");
        if ($status === "declined" && ($isYesPressedInSubstitutionModal === "true")) {
            $isSubstitutionFoundOnItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition());
            if ($isSubstitutionFoundOnItem === null) {
                $isSubstitutionFoundOnItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition() + 1)->getIsSubstitutionFound();
            } else {
                $isSubstitutionFoundOnItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition())->getIsSubstitutionFound();
            }

            $quantityPicked = $transfer->getOrderItem($transfer->getLastPickingItemPosition())->getQuantityPicked();
            if ($quantityPicked > 0) {
                $transfer->getOrderItem($transfer->getLastPickingItemPosition())->setQuantityPicked(0);
            }

            $factory = $this->getFactory();
            $urlScan = $factory->getConfig()->getScanningContainerUri();
            $urlScan .= '?flag=substitution';

            return $this->redirectResponse($urlScan);
        }
        $pickingItem = $transfer->getOrderItemExtended($transfer->getLastPickingItemPosition() == null ? 0 : $transfer->getLastPickingItemPosition());
        if ($pickingItem === null) {
            $pickingItem = $transfer->getOrderItemExtended($transfer->getLastPickingItemPosition() + 1);
        }
        $pickingItemHasBeenSubstituted = false;
        if ($pickingItem !== null) {
            $pickingItemHasBeenSubstituted = $pickingItem->getIsSubstitutionFound();
        }
        if ($status === null && $isSubstitutionPicked === "false" && ($pickingItemHasBeenSubstituted === true && ($pickingItem !== null))) {
            if ($pickingItem->getIsSubstitutionFound()) {
                $setItemDeclined = true;
                $redirectToScanningContainers = true;
            }
        }

        if ($request->request->count() > 0) {
            if ($request->request->has('saveAndGoToNext')) {
                $keyValue = $request->request->get("saveAndGoToNext");
                if ($keyValue == "true" || $keyValue == "End") {
                    $position = (int)$request->request->get("position");
                    $quantity = (int)$request->request->get("quantity");
                    $weight = (int)$request->request->get("weight");
                    $status = $request->request->get("status");
                    switch ($status) {
                        case "accepted":
                            $currentOrderItem = $this->getFacade()->getPickingHeaderTransfer()->getOrderItems($position);
                            $isCanceled = $currentOrderItem[0]->getIsCancelled();
                            $groupedOrderItems = unserialize(serialize($this->getFacade()->getPickingHeaderTransfer()->getGroupedOrderItems()));
                            $containerId = $request->request->get("containerID");
                            if (isset($containerId)) {
                                $this->getFacade()->setCurrentOrderItemPicked($quantity, $weight, $containerId);
                            }
                            if ($isCanceled) {
                                foreach ($groupedOrderItems as $item) {
                                    if ($item['isCancelled'] == true) {
                                        $this->getFacade()->removeCanceledAmountForRepickedItems($item['idOrder'], $item['ean'], $item['priceAgg']);
                                    }
                                }
                            }
                            if ($containerId) {
                                $this->getFacade()->updateContainerPickZone($transfer->getOrderById($currentOrderItem[0]->getIdOrder()), $containerId);
                            }
                            break;
                        case "declined":
                            if ($transfer->getLastPickingItemPosition() === 0) {
                                $transfer->setLastPickingItemPosition(1);
                            }
                            $currentItemResponse = $this->getFacade()->setCurrentOrderItemCanceled(true, strtolower($isSubstitutionPicked) == 'true' ? true : false);
                            $transfer = $this->getFacade()->getPickingHeaderTransfer();
                            break;
                    }
                    if ($keyValue == "End") {
                        $positionToDisplay = $transfer->getLastPickingItemPosition();
                        $productToDisplay = 'x';
                        $openModal = 'true';
                    }
                }
            }

            if ($request->request->has('resetWeight')) {
                $position = (int)$request->request->get("position");
                $currentItemResponse = $this->getFacade()->setCurrentOrderItemWeightReset($position);
            }
        }

        if ($productToDisplay != '' && $positionToDisplay != '') {
            $nextOIData = $transfer->getOrderItemExtended($positionToDisplay);
            $transfer->setLastPickingItemPosition($nextOIData->getPickingItemPosition());
        } else {
            if ($redirectToScanningContainers) {
                $nextOIData = $transfer->getOrderItemExtended($transfer->getLastPickingItemPosition());
                if ($nextOIData === null) {
                    $nextOIData = $transfer->getOrderItemExtended($transfer->getLastPickingItemPosition() + 1);
                    $nextOIData->setPickingItemPosition(1);
                }
            } else {
                $nextOIData = $transfer->getNextOrderItemExtended(0);
            }
            if ($nextOIData == null) {
                $nextOIData = $transfer->getOrderItemExtended($transfer->getLastPickingItemPosition());
                $openModal = 'true';
            } elseif ($nextOIData->getQuantityPicked() > 0) {
                $next = $transfer->getFirstNonPickedOrderItem();
                if ($next != null) {
                    $nextOIData = $next;
                } else {
                    $nextOIData = $transfer->getOrderItemExtended($transfer->getLastPickingItemPosition());
                    $openModal = 'true';
                }
                $transfer->setLastPickingItemPosition($nextOIData->getPickingItemPosition());
            }
        }
        $orderPosition = $nextOIData['pickingPosition'];
        $orderItemPosition = $nextOIData['pickingItemPosition'];
        $quantityProcessed = 0;
        $orderList = $transfer->getOrderList();
        $articlesTotalForZone = 0;
        foreach ($orderList as $order) {
            $articlesTotalForZone += $order['articlesQuantity'];
            $pickingOrderItems = $order['pickingOrderItems'];
            foreach ($pickingOrderItems as $orderItem) {
                $quantityProcessed += $orderItem->getQuantityPicked();
                if (($orderItem->getIsCancelled() || $orderItem->getIsPaused())) {
                    $quantityProcessed += $orderItem->getQuantity();
                }
            }
        }

        $openedItems = $articlesTotalForZone - $quantityProcessed < 0 ? 0 : $articlesTotalForZone - $quantityProcessed;
        $editedItems = $quantityProcessed;

        $positionsData = $transfer->getOrderItemsExtended($nextOIData->getPickingItemPosition());
        $orderItemStatus = '';
        foreach ($positionsData as $positionData) {
            $orderItemStatus = $positionData['status'];
        }

        $isLastPosition = "false";

        $this->getFacade()->setTransferToSession($transfer);

        $urlOverview = PickerConfig::URL_MULTI_PICKING_OVERVIEW;
        $urlOverview .= '?skipToken=' . static::REDIRECT_SKIP_TOKEN . '&sku=' . $nextOIData->getEan() . '&position=' . $nextOIData->getPickingItemPosition();

        $listOfContainers = $this->getFactory()
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();

        $itemPickingStartTime = date("Y-m-d H:i:s");

        $isSubstitutionAllowedOnOrder = $nextOIData->getIsSubstitutionAllowedOnOrder();
        if ($nextOIData->getIsSubstitutionAllowedOnOrder() === null) {
            $isSubstitutionAllowedOnOrder = "0";
        }

        $pickUpDate = $transfer->getOrder($orderPosition)->getRequestedDeliveryDate();
        $remainingDays = $transfer->getOrderItem($orderItemPosition)->getRlzRegal();
        $remainingDate = date('d.m.y', strtotime($pickUpDate . ' + ' . $remainingDays . ' days'));

        return [
            'currentPositionData' => $nextOIData,
            'orderPosition' => $orderPosition,
            'listOfContainers' => json_encode($listOfContainers),
            'orderItemPosition' => $orderItemPosition,
            'pickingOrderItemsData' => $positionsData,
            'itemsCount' => 0,
            'editedItems' => $editedItems,
            'openedItems' => $openedItems,
            'isMultiPickingProcess' => 1,
            'orderItemStatus' => $orderItemStatus,
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'orderReference' => $nextOIData->getOrderReference(),
            'urlContainerSelect' => PickerConfig::URL_MULTI_PICKING_SELECT_CONTAINERS,
            'urlMultiPickingOverview' => $urlOverview,
            'urlPosListe' => PickerConfig::URL_POS_LISTE,
            'urlScanShelves' => PickerConfig::URL_MULTI_PICKING_SCAN_SHELVES,
            'isLastPosition' => $isLastPosition,
            'setItemDeclined' => $setItemDeclined,
            'openModal' => $openModal,
            'fromPosListeAndModal' => $fromPosListeAndModal,
            'itemPickingStartTime' => $itemPickingStartTime,
            'isSubstitutionAllowed' => $isSubstitutionAllowedOnOrder,
            'isSubstitutionFound' => $nextOIData->getIsSubstitutionFound() ?? '0',
            'pickUpDate' => $pickUpDate,
            'remainingDate' => $remainingDate,
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function setPauseStateAction(Request $request)
    {
        $errorMessage = "";
        $isLastPosition = "false";

        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $orderItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition());

        if ($this->getFacade()->setCurrentOrderItemPaused(true)) {
            $orderItem->setIsSubstitutionFound(false);
            $transfer->setParents(true);
            $this->getFacade()->setTransferToSession($transfer);
        } else {
            $errorMessage = $transfer->getErrorMessage();
        }

        if ($transfer->isLastItem()) {
            $isLastPosition = "true";
        }

        $responseArray = [
            "errorMessage" => $errorMessage,
            "isLastPosition" => $isLastPosition,
        ];

        return new JsonResponse($responseArray);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function checkContainerIdAction(Request $request)
    {
        $response = false;
        $errorMessage = "";
        $isLastPosition = "false";

        if ($request->request->has('scannedContainerID')) {
            $position = $request->request->get("position");
            $containerID = $request->request->get("scannedContainerID");
            $status = $request->request->get("status");
            $containerIDWithOutPrefix = strtr($containerID, [
                '/x11' => '',
                '/X11' => '',
            ]);

            $response = $this->getFacade()->checkContainerForCurrentItem($containerIDWithOutPrefix);

            $transfer = $this->getFacade()->getPickingHeaderTransfer();
            if ($response) {
                if ($status == "paused") {
                    $currentItemResponse = $this->getFacade()->setCurrentOrderItemPaused(true);
                    if ($currentItemResponse == false) {
                        $errorMessage = $transfer->getErrorMessage();
                    }
                }

                if ($transfer->isLastItem()) {
                    $isLastPosition = "true";
                }
            } else {
                $errorMessage = $transfer->getErrorMessage();
            }
        }

        $responseArray = [
            "containerCheck" => $response,
            "errorMessage" => $errorMessage,
            "isLastPosition" => $isLastPosition,
        ];

        return new JsonResponse($responseArray);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return void
     */
    public function multiOrderPickingActionPost(Request $request)
    {
        $this->getFacade()->setCurrentOrderItemPicked(1, 0, "");
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return void
     */
    public function multiOrderPickingActionPaused(Request $request)
    {
        $this->getFacade()->setCurrentOrderItemPaused(true);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function getMerchantFromRequest(Request $request): MerchantTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_MERCHANT);
    }

    /**
     * @param array $aggregatedItemTransfers
     *
     * @return array
     */
    protected function sortAggregatedItemTransfersByPickingOrder(array $aggregatedItemTransfers): array
    {
        $skuToProductPickingOrderMap = [];
        foreach ($aggregatedItemTransfers as $sku => $aggregatedItemTransfer) {
            $skuToProductPickingOrderMap[$sku] = (int)$aggregatedItemTransfer->getSequence();
        }

        uksort(
            $aggregatedItemTransfers,
            function (string $sku1, string $sku2) use ($skuToProductPickingOrderMap): int {
                return $skuToProductPickingOrderMap[$sku1] - $skuToProductPickingOrderMap[$sku2];
            }
        );

        return $aggregatedItemTransfers;
    }

    /**
     * @param mixed $orderByTimeSlot
     * @param mixed $request
     *
     * @return array
     */
    protected function returnOrderByTimeSlotAndMerchant($orderByTimeSlot, $request): array
    {
        return [
            'orderByTimeSlot' => $orderByTimeSlot,
            'merchant' => $this->getMerchantFromRequest($request),
        ];
    }
}
