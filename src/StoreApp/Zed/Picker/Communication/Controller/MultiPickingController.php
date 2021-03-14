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
        $transfer = $this->getFacade()->getAllOrdersInStateReadyForPickingByZone();
        $orderByTimeSlot = $transfer->getOrdersByTimeSlot();

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
        //  Get data ($idSalesOrder, $productSku) from request
        //        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;
        //        $productSku = $request->get(PickerConfig::REQUEST_PARAM_SKU);

        $transfer = $this->getFacade()->getPickingHeaderTransfer();

        $nextOIData = $transfer->getNextOrderItem(0);
        $positionsData = $transfer->getOrderItems($nextOIData->getPickingItemPosition());

        $isLastPosition = false;
        if ($transfer->getLastPickingItemPosition() == $transfer->getMaxPickingItemPosition()) {
            $isLastPosition = true;
        }
//        $pickingOrderTransferData = self::PICKING_ORDER_TRANSFER;

//        $nextOrderItem = $data->getNextOrderItem(0);

//        $idSalesOrder = $nextOrderItem->getIdOrder();
//       $productSku = $nextOrderItem->getS();
//        $alterativeEan = $nextOrderItem->getA();


//        $idSalesOrder = $pickingOrderTransferData[0]["idOrder"];
//        $productSku = $pickingOrderTransferData[0]["sku"];
//        $alternativeEan = $pickingOrderTransferData[0]["alternativeEan"];
//        $shelf = $pickingOrderTransferData[0]["shelf"];
//        $shelfFloor = $pickingOrderTransferData[0]["shelfFloor"];
//        $shelfField = $pickingOrderTransferData[0]["shelfField"];
//        $imageUrl = $pickingOrderTransferData[0]["imageUrl"];

//        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
//        if($pickingZoneTransfer->getName() == ""){
//            $pickingZoneTransfer->setIdPickingZone(5);
//            $pickingZoneTransfer->setName("Obst+Gemüse");
//        }
//
//        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
//            ->findOrderByIdSalesOrderAndPickingZoneForStoreApp($idSalesOrder, $pickingZoneTransfer->getName());
//
//        $userTransfer = $this->getCurrentUser($request);
//
//        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
//            $salesOrderTransfer,
//            $userTransfer,
//            static::OMS_ORDER_STATUSES_FOR_PICKING_PROCESS
//        )) {
//            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);
//
//            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
//        }
//
//        if (!$this->isOrderPickingBlockAvailableForUser($idSalesOrder, $userTransfer, $pickingZoneTransfer)) {
//            $this->addErrorMessage(
//                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
//            );
//
//            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
//        }

//        $aggregatedItemTransfers = $this->getFactory()->getItemAggregator()
//            ->aggregateOrderItemsQuantities($salesOrderTransfer->getItems()->getArrayCopy());
//
//        $aggregatedItemTransfers = $this->sortAggregatedItemTransfersByPickingOrder($aggregatedItemTransfers);
//
//        $orderItemSelectionFormDataProvider = $this->getFactory()->createOrderItemSelectionFormDataProvider();
//        $orderItemSelectionForm = $this->getFactory()->createOrderItemSelectionForm(
//            $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
//            $orderItemSelectionFormDataProvider->getOptions($aggregatedItemTransfers, $salesOrderTransfer->getStore())
//        );
//
//        $orderItemSelectionForm->handleRequest($request);

        return [
            'currentPositionData' => $nextOIData,
            'pickingOrderItemsData' => $positionsData,
//            'pickingOrderData' => $pickingOrderTransferData,
//            'pickingOrderItemData' => $pickingOrderItemTransferData,
//            'merchant' => $this->getMerchantFromRequest($request),
//            'maxPickingBags' => $this->getFactory()->getConfig()->getMaxPickingBags(),
//            'itemsCount' => $this->getItemsCount($aggregatedItemTransfers),
            'itemsCount' => 0,
//            'itemsToAlternativeEanMap' => $alternativeEan,
//            'itemsToShelfMap' => $this->getItemsToShelfMap($aggregatedItemTransfers),
//            'itemsToProductAttributesMap' => $this->getItemsToProductAttributesMap($aggregatedItemTransfers),
//            'itemImageUrls' => $this->getSkuToImageMapFromItemTransfers($aggregatedItemTransfers),
//            'pickingForm' => $orderItemSelectionForm->createView(),
//            'pickingFormSkuKeys' => $pickingFormSkuKeys,
//            'pickingFormWeightKeys' => $pickingFormWeightKeys,
            'requestParamIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
//            'idSalesOrder' => $idSalesOrder,
            'orderReference' => $nextOIData->getOrderReference(),
//            'orderDeliveryTime' => null,
            'urlContainerSelect' => PickerConfig::URL_SELECT_CONTAINERS,
            'isLastPosition' => $isLastPosition,
//            'multiPickingForm' => $orderItemSelectionForm->createView()
//            'productSku' => $productSku,
        ];
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
