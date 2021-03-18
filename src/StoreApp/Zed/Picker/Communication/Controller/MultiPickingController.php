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

    protected const OMS_ORDER_STATUSES_FOR_PICKING_PROCESS = [
        OmsConfig::STORE_STATE_READY_FOR_PICKING,
        OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES,
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $factory = $this->getFactory();

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $idOrders = json_decode($request->get(static::ID_ORDERS));
            $userTransfer = $this->getCurrentUser($request);
            $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();

            $orderCount = count($idOrders);
            for ($indexOfOrder = 0; $indexOfOrder < $orderCount; $indexOfOrder++) {
                if (!$this->isOrderPickingBlockAvailableForUser($idOrders[$indexOfOrder], $userTransfer, $pickingZoneTransfer)) {
                    $this->addErrorMessage(
                        static::ORDER_IS_BEING_PROCESSED_MESSAGE
                    );

                    return $this->redirectResponse(PickerConfig::URL_ORDER_MULTI_PICKING);
                }
            }

            $pickingHeaderTransfer = $this->getFacade()->setOrdersToPick($idOrders);
            if ($pickingHeaderTransfer->getErrorMessage() == null) {
                return $this->redirectResponse($factory->getConfig()->getScanningContainerUri());
            }
        }

        $transfer = $this->getFacade()->getAllOrdersInStateReadyForPickingByZone();
        $orderByTimeSlot = $transfer->getOrdersByTimeSlot();

        return [
            'orderByTimeSlot' => $orderByTimeSlot,
            'merchant' => $this->getMerchantFromRequest($request),
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function multiOrderPickingAction(Request $request)
    {
        if ($request->request->count() > 0) {
            if ($request->request->has('saveAndGoToNext')) {
                if ($request->request->get("saveAndGoToNext") == true) {
                    $position = (int)$request->request->get("position");
                    $quantity = (int)$request->request->get("quantity");
                    $weight = (int)$request->request->get("weight");
                    $status = $request->request->get("status");
                    switch ($status) {
                        case "accepted":
                            $this->getFacade()->setCurrentOrderItemPicked($quantity, $weight);
                            break;
                        case "paused":
                            $currentItemResponse = $this->getFacade()->setCurrentOrderItemPaused(true);
                            break;
                        case "declined":
                            $currentItemResponse = $this->getFacade()->setCurrentOrderItemCanceled(true);
                            break;
                    }
                }
            }
        }

        $transfer = $this->getFacade()->getPickingHeaderTransfer();

        $productToDisplay = $_REQUEST['sku'] ?? '';
        $positionToDisplay = $_REQUEST['position'] ?? '';
        $openModal = $_REQUEST['fromModal'] ?? 'false';
        if ($productToDisplay != '' && $positionToDisplay != '') {
            $nextOIData = $transfer->getOrderItem($positionToDisplay);
            $transfer->setLastPickingItemPosition($nextOIData->getPickingItemPosition());
        } else {
            $nextOIData = $transfer->getNextOrderItem(0);
        }
        $orderPosition = $nextOIData['pickingPosition'];
        $orderItemPosition = $nextOIData['pickingItemPosition'];

        $positionsData = $transfer->getOrderItems($nextOIData->getPickingItemPosition());

        $isLastPosition = "false";
        if ($transfer->isLastItem() || $openModal == 'true') {
            $isLastPosition = "true";
        }
        $this->getFacade()->setTransferToSession($transfer);

        $urlOverview = PickerConfig::URL_MULTI_PICKING_OVERVIEW;
        $urlOverview .= '?skipToken=' . static::REDIRECT_SKIP_TOKEN . '&sku=' . $nextOIData->getEan() . '&position=' . $nextOIData->getPickingItemPosition();

        return [
            'currentPositionData' => $nextOIData,
            'orderPosition' => $orderPosition,
            'orderItemPosition' => $orderItemPosition,
            'pickingOrderItemsData' => $positionsData,
            'itemsCount' => 0,
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'orderReference' => $nextOIData->getOrderReference(),
            'urlContainerSelect' => PickerConfig::URL_MULTI_PICKING_SELECT_CONTAINERS,
            'urlMultiPickingOverview' => $urlOverview,
            'urlPosListe' => PickerConfig::URL_POS_LISTE,
            'urlScanShelves' => PickerConfig::URL_MULTI_PICKING_SCAN_SHELVES,
            'isLastPosition' => $isLastPosition,
            'openModal' => $openModal,
        ];
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

            $response = $this->getFacade()->checkContainerForCurrentItem($containerID);

            $transfer = $this->getFacade()->getPickingHeaderTransfer();
            if ($response) {
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
        $this->getFacade()->setCurrentOrderItemPicked(1, 0);
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
}
