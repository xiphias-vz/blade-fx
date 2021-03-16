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
                        static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
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
                    $status = $request->request->get("status");
                    if ($status == "pause") {
                        $currentItemPausedResponse = $this->getFacade()->setCurrentOrderItemPaused(true);
                    } else {
                        $this->getFacade()->setCurrentOrderItemPicked($quantity);
                    }
                    // Save
                }
            }
        }

        $transfer = $this->getFacade()->getPickingHeaderTransfer();

        $productToDisplay = $_REQUEST['sku'] ?? '';
        $positionToDisplay = $_REQUEST['position'] ?? '';
        $openModal = $_REQUEST['fromModal'] ?? 'false';
        if ($productToDisplay != '' && $positionToDisplay != '') {
            $nextOIData = $transfer->getOrderItem($positionToDisplay);
        } else {
            $nextOIData = $transfer->getNextOrderItem(0);
        }
        $orderPosition = $nextOIData['pickingPosition'];
        $positionsData = $transfer->getOrderItems($nextOIData->getPickingItemPosition());

        $isLastPosition = "false";
        if ($transfer->getLastPickingItemPosition() == $transfer->getMaxPickingItemPosition() || $openModal == 'true') {
            $isLastPosition = "true";
        }

        return [
            'currentPositionData' => $nextOIData,
            'orderPosition' => $orderPosition,
            'pickingOrderItemsData' => $positionsData,
            'itemsCount' => 0,
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'orderReference' => $nextOIData->getOrderReference(),
            'urlContainerSelect' => PickerConfig::URL_MULTI_PICKING_SELECT_CONTAINERS,
            'urlMultiPickingOverview' => PickerConfig::URL_MULTI_PICKING_OVERVIEW,
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
        if ($request->request->has('scannedContainerID')) {
            $position = $request->request->get("position");
            $containerID = $request->request->get("scannedContainerID");
            $response = $this->getFacade()->checkContainerForCurrentItem($containerID);
        }

        return new JsonResponse($response);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return void
     */
    public function multiOrderPickingActionPost(Request $request)
    {
        $this->getFacade()->setCurrentOrderItemPicked(1);
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
