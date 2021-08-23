<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use ArrayObject;
use Exception;
use Generated\Shared\Transfer\CollectOrderItemTransfer;
use Generated\Shared\Transfer\CollectOrderTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceGlobalSalesOrderReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderReportItemQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderReportQuery;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Shared\Log\LoggerTrait;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use StoreApp\Zed\Picker\Communication\Form\OrderItemSelectionForm;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class CollectByCustomerController extends AbstractController
{
    use LoggerTrait;

    protected const ITEM_STATUS_PICKED = 'ITEM_STATUS_PICKED';
    protected const ITEM_STATUS_NOT_FOUND = 'ITEM_STATUS_NOT_FOUND';

    protected const COLLECT_BY_CUSTOMER_INFO_MESSAGE_NO_ORDERS_TO_COLLECT = 'storeapp.collect-by-customer.message.info.no-orders-to-collect';

    protected const PRODUCT_TYPE_AMBIENT = 'ambient';
    protected const PRODUCT_TYPE_CHILLED = 'chilled';
    protected const PRODUCT_TYPE_FROZEN = 'frozen';

    protected const PRODUCT_TYPE_ORDER = [
        self::PRODUCT_TYPE_AMBIENT => 1,
        self::PRODUCT_TYPE_CHILLED => 2,
        self::PRODUCT_TYPE_FROZEN => 3,
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request): array
    {
        $userTransfer = $this->getCurrentUser($request);

        $newArray = [];
        $allBeforeReadyToCollectMerchantOrderTransfers = $this->findAllBeforeReadyToCollectMerchantSalesOrders($userTransfer);
        foreach ($allBeforeReadyToCollectMerchantOrderTransfers as $order) {
            array_push($newArray, ["collectNumber" => $order[SpySalesOrderTableMap::COL_COLLECT_NUMBER], "orderReference" => $order[SpySalesOrderTableMap::COL_ORDER_REFERENCE]]);
        }

        $readyForCollectionMerchantSalesOrderTransfers = $this->findReadyForCollectionMerchantSalesOrders($userTransfer);

        $collectionMerchantSalesOrders = $readyForCollectionMerchantSalesOrderTransfers;

        $idSalesOrdersForCollection = array_keys($collectionMerchantSalesOrders);

        $requestedDeliveryDatesByIdSalesOrders = [];
        $collectionOrders = [];

        if (empty($idSalesOrdersForCollection)) {
            $this->addInfoMessage(
                static::COLLECT_BY_CUSTOMER_INFO_MESSAGE_NO_ORDERS_TO_COLLECT
            );

            return $this->getIndexResponseData($request, $collectionOrders, $requestedDeliveryDatesByIdSalesOrders);
        }

        $requestedDeliveryDatesByIdSalesOrders = $this->getFormattedDeliveryDates($idSalesOrdersForCollection);

        $qryOrdersInStatus = $this->getFactory()
            ->queryOrdersForPickingZone()
            ->withColumn("(select count(*) from spy_sales_order_item i inner join spy_oms_order_item_state s on i.fk_oms_order_item_state = s.id_oms_order_item_state where i.fk_sales_order = spy_sales_order.id_sales_order and s.name = 'ready for collection')", "pickedProductCount")
            ->withColumn("(select requested_delivery_date from spy_sales_shipment ss where ss.fk_sales_order = spy_sales_order.id_sales_order)", "requestedDeliveryDate")
            ->withColumn("(select count(*) from pyz_picking_sales_order pso where pso.fk_sales_order = spy_sales_order.id_sales_order)", "numberOfContainersInOrder")
            ->where("spy_sales_order.id_sales_order in(" . implode(',', $idSalesOrdersForCollection) . ")")
            ->orderBy('requestedDeliveryDate')
            ->find()
            ->toArray();

        $order = new OrderTransfer();
        foreach ($qryOrdersInStatus as $item) {
            $order->fromArray($item, true);
            $collectionMerchantSalesOrder = $collectionMerchantSalesOrders[$order->getIdSalesOrder()];

            $daysInTheWeek = $this->getFactory()->getConfig()->getDaysInTheWeek();

            $fullDeliveryDate = str_replace('_', ' ', $item["requestedDeliveryDate"]);
            $deliveryDate = str_split($fullDeliveryDate, 10);
            $dayInTheWeek = date('w', strtotime($deliveryDate[0]));
            $dayOfTheWeek = $daysInTheWeek[$dayInTheWeek];
            $decodedCartNote = json_decode($order->getCartNote());

            $collectionOrders[] = [
                'idSalesOrder' => $order->getIdSalesOrder(),
                'reference' => $order->getOrderReference(),
                'deliveryMinimumAge' => $order->getDeliveryMinimumAge(),
                'collectedAt' => $collectionMerchantSalesOrder->getCollectedAt(),
                'collected' => $this->getIsOrderCollected($collectionMerchantSalesOrder),
                'cancelled' => $this->getIsOrderCancelled($collectionMerchantSalesOrder),
                'collectNumber' => $order->getCollectNumber(),
                'requestedDeliveryDate' => $fullDeliveryDate,
                'pickedProductCount' => $item["pickedProductCount"],
                'numberOfContainersInOrder' => $item["numberOfContainersInOrder"],
                'cartNote' => $decodedCartNote,
                'dayOfTheWeek' => $dayOfTheWeek,
                'fullName' => $order->getFirstName() . " " . $order->getLastName(),
                'pickupStatus' => $collectionMerchantSalesOrder->getStoreStatus(),
                'ordersBeforeReadyToCollectStatus' => json_encode($newArray),
            ];
        }

        return $this->getIndexResponseData($request, $collectionOrders, $requestedDeliveryDatesByIdSalesOrders);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param array $collectionOrders
     * @param string[] $requestedDeliveryDatesByIdSalesOrders
     *
     * @return array
     */
    protected function getIndexResponseData(
        Request $request,
        array $collectionOrders,
        array $requestedDeliveryDatesByIdSalesOrders
    ): array {
        return [
            'merchant' => $this->getMerchantFromRequest($request),
            'activities' => PickerConfig::ACTIVITIES,
            'collectionOrders' => $collectionOrders,
            'requestedDeliveryDates' => $this->getUniqueTimeslots($requestedDeliveryDatesByIdSalesOrders),
            'paramIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'urlCollectByCustomerDetails' => PickerConfig::URL_COLLECT_BY_CUSTOMER_DETAILS,
            'urlCollectByCustomerCancellation' => PickerConfig::URL_COLLECT_BY_CUSTOMER_CANCELLATION,
            'urlCollectByCustomerConfirmation' => PickerConfig::URL_COLLECT_BY_CUSTOMER_CONFIRMATION,
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function detailsAction(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
            $salesOrderTransfer,
            $userTransfer,
            [OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER]
        )) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
        }

        $groupedAggregatedItemTransfers = $this->groupItemTransfersByStatus(
            $salesOrderTransfer->getItems()->getArrayCopy()
        );

        $orderItemSelectionFormDataProvider = $this->getFactory()->createOrderItemSelectionFormDataProvider();
        $orderItemSelectionForm = $this->getFactory()->createOrderItemSelectionForm(
            $orderItemSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
            $orderItemSelectionFormDataProvider->getOptions(
                $groupedAggregatedItemTransfers[self::ITEM_STATUS_PICKED],
                $salesOrderTransfer->getStore()
            )
        );

        $orderItemSelectionForm->handleRequest($request);

        if ($orderItemSelectionForm->isSubmitted() && $orderItemSelectionForm->isValid()) {
            return $this->processCollectDetailsForm(
                $orderItemSelectionForm,
                $salesOrderTransfer,
                $userTransfer
            );
        }

        $collectOrderTransfer = $this->mapSalesOrderToCollectOrder($salesOrderTransfer);

        $concreteAttributes = $this->getFactory()->getProductFacade()
            ->getConcreteSkuToAttributesMap(
                array_merge(
                    array_keys($groupedAggregatedItemTransfers[self::ITEM_STATUS_PICKED]),
                    array_keys($groupedAggregatedItemTransfers[self::ITEM_STATUS_NOT_FOUND])
                ),
                $salesOrderTransfer->getStore()
            );

        $collectOrderTransfer = $this->hydrateCollectOrderWithAggregatedItems(
            $collectOrderTransfer,
            $groupedAggregatedItemTransfers,
            $concreteAttributes
        );

        $collectOrderTransfer = $this->hydrateCollectOrderWithProductInfo($collectOrderTransfer);
        $pickedProductCount = $this->getPickedProductCount($salesOrderTransfer);

        $requestedDeliveryDatesByIdSalesOrders = $this->getFormattedDeliveryDates([$idSalesOrder]);
        $daysInTheWeek = $this->getFactory()->getConfig()->getDaysInTheWeek();
        $deliveryDate = str_split($requestedDeliveryDatesByIdSalesOrders[$idSalesOrder], 10);
        $dayInTheWeek = date('w', strtotime($deliveryDate[0]));
        $dayOfTheWeek = $daysInTheWeek[$dayInTheWeek];

        $pickingSalesOrderCriteria = new PickingSalesOrderCriteriaTransfer();
        $pickingSalesOrderCriteria->setIdSalesOrder($idSalesOrder);
        $pickingSalesOrders = $this->getFactory()
            ->getPickingSalesOrderFacade()
            ->getPickingSalesOrderCollection($pickingSalesOrderCriteria)
            ->getPickingSalesOrders();

        $notFound = [];
        foreach ($collectOrderTransfer->getNotFoundItems() as $item1 => $value1) {
             $value1["imageUrl"] = 0;
             array_push($notFound, $value1);
        }
        $containerInfo = $this->getFactory()->getPickerBusinessFactory()->createContainerReader()->getContainersByOrderId($idSalesOrder);
        $containerInfo = $containerInfo['picking_sales_orders'];
        $containerNumber = count($containerInfo);
        $pickedItems = [];
        foreach ($collectOrderTransfer->getPickedItems() as $item2 => $value2) {
            array_push($pickedItems, $value2);
        }

        foreach ($pickedItems as $value3) {
            foreach ($notFound as $valueNotFound) {
                if ($valueNotFound["sku"] == $value3["sku"]) {
                    foreach ($notFound as $key => $val) {
                        if ($val["sku"] === $value3["sku"]) {
                            $notFound[$key]["imageUrl"] = $value3["quantity"] + $valueNotFound["quantity"];
                            break;
                        }
                    }
                }
            }
        }

        foreach ($notFound as $item4) {
            if ($item4["imageUrl"] == 0) {
                $item4["imageUrl"] = $item4["quantity"];
                $item4["quantity"] = 0;
            } else {
                $item4["quantity"] = $item4["imageUrl"] - $item4["quantity"];
            }
            $item4['name'] = str_replace($item4["sku"] . ' - ', "", $item4["name"]);
            $item4['name'] = substr($item4["name"], 0, 25);
        }

        $decodedCartNote = json_decode($salesOrderTransfer->getCartNote());

        $this->updatePerformanceOrderReportPickupStart($idSalesOrder, $containerNumber);

        return [
            'merchant' => $this->getMerchantFromRequest($request),
            'collectDetailsForm' => $orderItemSelectionForm->createView(),
            'collectOrder' => $collectOrderTransfer,
            'paramIdSalesOrder' => PickerConfig::REQUEST_PARAM_ID_ORDER,
            'idSalesOrder' => $salesOrderTransfer->getIdSalesOrder(),
            'orderReference' => $salesOrderTransfer->getOrderReference(),
            'collectNumber' => $salesOrderTransfer->getCollectNumber(),
            'collected' => $this->getIsOrderCollected($salesOrderTransfer->getMerchantSalesOrder()),
            'cancelled' => $this->getIsOrderCancelled($salesOrderTransfer->getMerchantSalesOrder()),
            'urlCollectByCustomerCancellation' => PickerConfig::URL_COLLECT_BY_CUSTOMER_CANCELLATION,
            'urlCollectByCustomerConfirmation' => PickerConfig::URL_COLLECT_BY_CUSTOMER_CONFIRMATION,
            'requestedDeliveryDate' => $requestedDeliveryDatesByIdSalesOrders[$idSalesOrder],
            'pickedProductCount' => $pickedProductCount,
            'dayOfTheWeek' => $dayOfTheWeek,
            'fullName' => $salesOrderTransfer->getFirstName() . " " . $salesOrderTransfer->getLastName(),
            'cartNote' => $decodedCartNote,
            'collectedAt' => $salesOrderTransfer->getMerchantSalesOrder()->getCollectedAt(),
            'pickingSalesOrders' => $pickingSalesOrders,
            'pickedAndNotFoundItems' => $notFound,
            'containerInfo' => $containerInfo,
            'containerNumber' => $containerNumber,
            'encodedBarcode' => $this->getFactory()->getBarcodeGenerator()->getEncodedBarcode($salesOrderTransfer->getOrderReference()),
            'barcodeNumber' => '97400' . $salesOrderTransfer->getOrderReference(),
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function confirmAction(Request $request): RedirectResponse
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
        $userTransfer = $this->getCurrentUser($request);

        try {
            $isAccessAllowed = $this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
                $salesOrderTransfer,
                $userTransfer,
                [OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER]
            );
        } catch (Exception $e) {
            $this->addErrorMessage($e->getMessage());

            return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
        }

        if (!$isAccessAllowed) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
        }

        try {
            $idSalesOrderItems = $this->getIdOrderItems($salesOrderTransfer);
            $this->getFacade()->markOrderItemsAsCollectedByCustomer(
                $idSalesOrderItems,
                $userTransfer->getIdUser()
            );

            $this->updatePerformanceOrderReportPickupEnd($idSalesOrder);
        } catch (Exception $e) {
            $this->addErrorMessage($e->getMessage());
        }

        return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function cancelAction(Request $request): RedirectResponse
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
            $salesOrderTransfer,
            $userTransfer,
            [OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER]
        )) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
        }

        $idSalesOrderItems = $this->getIdOrderItems($salesOrderTransfer);
        $this->getFacade()->markOrderItemsAsCanceledByCustomer($idSalesOrderItems);

        return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return int[]
     */
    private function getIdOrderItems(OrderTransfer $orderTransfer): array
    {
        $ids = [];

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            $idSalesOrderItem = $itemTransfer->getIdSalesOrderItem();
            $ids[$idSalesOrderItem] = $idSalesOrderItem;
        }

        return $ids;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrder
     *
     * @return bool
     */
    protected function getIsOrderCollected(MerchantSalesOrderTransfer $merchantSalesOrder): bool
    {
        return $merchantSalesOrder->getStoreStatus() === OmsConfig::STORE_STATE_COLLECTED_BY_CUSTOMER;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantSalesOrderTransfer $merchantSalesOrder
     *
     * @return bool
     */
    protected function getIsOrderCancelled(MerchantSalesOrderTransfer $merchantSalesOrder): bool
    {
        return in_array(
            $merchantSalesOrder->getStoreStatus(),
            [
                OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_STORE,
                OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_CUSTOMER,
            ]
        );
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\CollectOrderTransfer
     */
    protected function mapSalesOrderToCollectOrder(OrderTransfer $orderTransfer): CollectOrderTransfer
    {
        return (new CollectOrderTransfer())
            ->setPickedItemsCount(0)
            ->setNotFoundItemsCount(0)
            ->setBagsCount($orderTransfer->getPickingBagsCount())
            ->setDeliveryMinimumAge($orderTransfer->getDeliveryMinimumAge());
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     * @param array $concreteAttributes
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\CollectOrderItemTransfer[]
     */
    protected function mapItemsToCollectOrderItems(array $itemTransfers, array $concreteAttributes): ArrayObject
    {
        $collectOrderItems = new ArrayObject();

        foreach ($itemTransfers as $itemTransfer) {
            $productAttributes = $concreteAttributes[$itemTransfer->getSku()];

            $collectOrderItemTransfer = $this->mapOrderItemToCollectOrderItem($itemTransfer, $productAttributes);

            $this->aggregateCollectOrderItemToCollection($collectOrderItemTransfer, $collectOrderItems);
        }

        return $collectOrderItems;
    }

    /**
     * @param string[] $idSalesOrdersForPicking
     *
     * @return string[]
     */
    protected function getFormattedDeliveryDates($idSalesOrdersForPicking): array
    {
        $requestedDeliveryDatesByIdSalesOrders = $this->getFactory()->getSalesFacade()
            ->findRequestedDeliveryDatesByIdSalesOrders($idSalesOrdersForPicking);

        $requestedDeliveryDatesByIdSalesOrders = array_map(
            function (string $requestedDate): string {
                return str_replace('_', ' ', $requestedDate);
            },
            $requestedDeliveryDatesByIdSalesOrders
        );

        return $requestedDeliveryDatesByIdSalesOrders;
    }

    /**
     * @param string[] $requestedDeliveryDatesByIdSalesOrders
     *
     * @return string[]
     */
    protected function getUniqueTimeslots(array $requestedDeliveryDatesByIdSalesOrders): array
    {
        $requestedDeliveryDatesByIdSalesOrders = array_map(
            function (string $requestedDate): string {
                return explode(' ', $requestedDate)[1];
            },
            $requestedDeliveryDatesByIdSalesOrders
        );

        return array_unique($requestedDeliveryDatesByIdSalesOrders);
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
     * @param \Generated\Shared\Transfer\CollectOrderItemTransfer $collectOrderItemTransfer
     * @param \ArrayObject|\Generated\Shared\Transfer\CollectOrderItemTransfer[] $items
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\CollectOrderItemTransfer[]
     */
    protected function aggregateCollectOrderItemToCollection(
        CollectOrderItemTransfer $collectOrderItemTransfer,
        ArrayObject $items
    ): ArrayObject {
        if ($items->offsetExists($collectOrderItemTransfer->getSku())) {
            $aggregatedCollectOrderItemTransfer = $items[$collectOrderItemTransfer->getSku()];
            $aggregatedCollectOrderItemTransfer->setQuantity(
                $aggregatedCollectOrderItemTransfer->getQuantity() + $collectOrderItemTransfer->getQuantity()
            );

            return $items;
        }

        $items[$collectOrderItemTransfer->getSku()] = $collectOrderItemTransfer;

        return $items;
    }

    /**
     * @param array $productAttributes
     *
     * @return string
     */
    protected function getProductName(array $productAttributes): string
    {
        return sprintf(
            PickerConfig::FORMAT_ORDER_ITEM_NAME,
            $productAttributes[ProductConfig::KEY_PRODUCT_NUMBER],
            $productAttributes[ProductConfig::KEY_ARTIKELNAME_SPRYKER]
        );
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param array $productAttributes
     *
     * @return \Generated\Shared\Transfer\CollectOrderItemTransfer
     */
    protected function mapOrderItemToCollectOrderItem(ItemTransfer $itemTransfer, array $productAttributes): CollectOrderItemTransfer
    {
        return (new CollectOrderItemTransfer())
            ->setSku(
                $itemTransfer->getSku()
            )
            ->setName(
                $this->getProductName($productAttributes)
            )
            ->setProductType(
                $this->getProductType($productAttributes)
            )
            ->setQuantity($itemTransfer->getQuantity())
            ->setImageUrl($itemTransfer->getMetadata()->getImage() ?? '');
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[][]
     */
    protected function groupItemTransfersByStatus(array $itemTransfers): array
    {
        $groupedItemTransfers = [
            self::ITEM_STATUS_PICKED => [],
            self::ITEM_STATUS_NOT_FOUND => [],
        ];

        foreach ($itemTransfers as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount() > 0) {
                $groupedItemTransfers[self::ITEM_STATUS_NOT_FOUND][] = $itemTransfer;

                continue;
            }

            $groupedItemTransfers[self::ITEM_STATUS_PICKED][] = $itemTransfer;
        }

        $groupedItemTransfers[self::ITEM_STATUS_NOT_FOUND] = $this->getFactory()->getItemAggregator()
            ->aggregateOrderItemsQuantities(
                $groupedItemTransfers[self::ITEM_STATUS_NOT_FOUND]
            );

        $groupedItemTransfers[self::ITEM_STATUS_PICKED] = $this->getFactory()->getItemAggregator()
            ->aggregateOrderItemsQuantities(
                $groupedItemTransfers[self::ITEM_STATUS_PICKED]
            );

        return $groupedItemTransfers;
    }

    /**
     * @param array $productAttributes
     *
     * @return string
     */
    protected function getProductType(array $productAttributes): string
    {
        $result = "";
        if (isset($productAttributes[ProductConfig::PRODUCT_ATTRIBUTE_KEY_PICKING_AREA])) {
            $result = $productAttributes[ProductConfig::PRODUCT_ATTRIBUTE_KEY_PICKING_AREA];
        } elseif (isset($productAttributes[ProductConfig::PRODUCT_ATTRIBUTE_KEY_PICKING_ZONE])) {
            $result = $productAttributes[ProductConfig::PRODUCT_ATTRIBUTE_KEY_PICKING_ZONE];
        }

        return strtolower(
            $result
        );
    }

    /**
     * @param \Generated\Shared\Transfer\CollectOrderTransfer $collectOrderTransfer
     *
     * @return \Generated\Shared\Transfer\CollectOrderTransfer
     */
    protected function hydrateCollectOrderWithProductInfo(
        CollectOrderTransfer $collectOrderTransfer
    ): CollectOrderTransfer {
        [$pickedItemsCount, $pickedProductTypes] = $this->getProductCountAndTypes($collectOrderTransfer->getPickedItems());

        $collectOrderTransfer->setPickedItemsCount($pickedItemsCount);
        $collectOrderTransfer->setPickedProductTypes($pickedProductTypes);

        [$notFoundItemsCount] = $this->getProductCountAndTypes($collectOrderTransfer->getNotFoundItems());
        $collectOrderTransfer->setNotFoundItemsCount($notFoundItemsCount);

        return $collectOrderTransfer;
    }

    /**
     * @param \ArrayObject|\Generated\Shared\Transfer\CollectOrderItemTransfer[] $collectOrderItemTransfers
     *
     * @return array
     */
    protected function getProductCountAndTypes(ArrayObject $collectOrderItemTransfers): array
    {
        return array_reduce(
            $collectOrderItemTransfers->getArrayCopy(),
            function (array $countAndTypes, CollectOrderItemTransfer $collectOrderItemTransfer): array {
                [$count, $orderProductTypes] = $countAndTypes;

                $count += $collectOrderItemTransfer->getQuantity();

                $itemProductType = $collectOrderItemTransfer->getProductType();

                if (isset(static::PRODUCT_TYPE_ORDER[$itemProductType])
                    && !isset($orderProductTypes[static::PRODUCT_TYPE_ORDER[$itemProductType]])
                ) {
                    $orderProductTypes[static::PRODUCT_TYPE_ORDER[$itemProductType]] = $itemProductType;
                    ksort($orderProductTypes);
                }

                return [$count, $orderProductTypes];
            },
            [0, []]
        );
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $collectDetailsForm
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function processCollectDetailsForm(
        FormInterface $collectDetailsForm,
        OrderTransfer $salesOrderTransfer,
        UserTransfer $userTransfer
    ): RedirectResponse {
        $formData = $collectDetailsForm->getData();

        $skuToSelectedQuantityMap = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToSelectedQuantityMap(
                $formData,
                OrderItemSelectionForm::PREFIX_FIELD_SALES_ORDER_ITEM_SKU
            );

        $orderItemStatusesTransfer = $this->getFactory()->getOrderItemsMapper()
            ->mapOrderItemsToOrderItemStatuses(
                $salesOrderTransfer,
                $skuToSelectedQuantityMap
            );

        $this->getFacade()->markOrderItemsAsCanceledByCustomer(
            $orderItemStatusesTransfer->getNotSelectedOrderItemIds()
        );

        $selectedIdSalesOrderItems = $orderItemStatusesTransfer->getSelectedOrderItemIds();

        $idSalesOrder = (int)$formData[OrderItemSelectionForm::FIELD_ID_SALES_ORDER];
        if (count($selectedIdSalesOrderItems) === 0) {
            $this->markCollectionCancelledByCustomer($idSalesOrder);

            return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
        }

        $this->getFacade()->markOrderItemsAsCollectedByCustomer(
            $selectedIdSalesOrderItems,
            $userTransfer->getIdUser()
        );

        return $this->redirectResponse(PickerConfig::URL_COLLECT_BY_CUSTOMER_LIST);
    }

    /**
     * @param \Generated\Shared\Transfer\CollectOrderTransfer $collectOrderTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer[][] $groupedAggregatedItemTransfers
     * @param string[] $concreteAttributes
     *
     * @return \Generated\Shared\Transfer\CollectOrderTransfer
     */
    protected function hydrateCollectOrderWithAggregatedItems(
        CollectOrderTransfer $collectOrderTransfer,
        array $groupedAggregatedItemTransfers,
        array $concreteAttributes
    ): CollectOrderTransfer {
        $collectOrderTransfer->setPickedItems(
            $this->mapItemsToCollectOrderItems(
                $groupedAggregatedItemTransfers[self::ITEM_STATUS_PICKED],
                $concreteAttributes
            )
        );

        $collectOrderTransfer->setNotFoundItems(
            $this->mapItemsToCollectOrderItems(
                $groupedAggregatedItemTransfers[self::ITEM_STATUS_NOT_FOUND],
                $concreteAttributes
            )
        );

        return $collectOrderTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return int
     */
    protected function getPickedProductCount(OrderTransfer $salesOrderTransfer): int
    {
        $aggregatedItemTransfers = $this->getFactory()->getItemAggregator()
            ->aggregateOrderItemsQuantities($salesOrderTransfer->getItems()->getArrayCopy());

        $pickedProductsCount = 0;

        foreach ($salesOrderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount() > 0) {
                continue;
            }

            $pickedProductsCount += $itemTransfer->getQuantity();
        }

        return $pickedProductsCount;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function getCurrentUser(Request $request): UserTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_USER);
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findReadyForCollectionMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setMerchantReferences([
                $userTransfer->getMerchantReference(),
            ])
            ->setStoreStatuses([
                OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER,
            ])
            ->setOrderCountLimit(
                $this->getFactory()->getConfig()->getMaxOrdersCountToDisplay()
            );

        return $merchantSalesOrderCollectionTransfer = $this->getFactory()->getMerchantSalesOrderFacade()
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findAllBeforeReadyToCollectMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setMerchantReferences([
                $userTransfer->getMerchantReference(),
            ])
            ->setItemStatuses([
                OmsConfig::STATE_TYPE_FLAG_CANCELLABLE_BY_CUSTOMER,
                OmsConfig::STATE_TYPE_FLAG_CANCELLED,
                OmsConfig::STATE_TYPE_FLAG_SHIPPED_MAIL_AWAITS,
                OmsConfig::EVENT_ORDER_CANCEL_BY_CUSTOMER,
                OmsConfig::STORE_STATE_READY_FOR_PICKING,
                OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES,
                OmsConfig::STORE_STATE_READY_FOR_CASHIER_ORDER_EXPORT,
                OmsConfig::STORE_STATE_PICKED,
                OmsConfig::STORE_STATE_CANCELLED_NOT_IN_STOCK,
                OmsConfig::STORE_STATE_CASHIER_ORDER_EXPORTING_FAIL,
                OmsConfig::STORE_STATE_CASHIER_EXPORT_PROCESS,
                OmsConfig::STORE_EVENT_CONFIRM_PICKING,
                OmsConfig::STORE_EVENT_CONFIRM_SELECTING_CONTAINERS,
                OmsConfig::STORE_EVENT_CANCEL_NOT_IN_STOCK,
            ]);

        return $this->getFactory()
            ->getSalesFacade()
            ->findSalesOrdersReferenceByOrderFilterCriteria($orderCriteriaFilterTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findCollectedOrCancelledMerchantSalesOrders(UserTransfer $userTransfer): array
    {
        $currentDateTime = $this->getFactory()->getDateTimeWithZoneService()
            ->getDateTimeInStoreTimeZone('now');

        $orderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setMerchantReferences([
                $userTransfer->getMerchantReference(),
            ])
            ->setStoreStatuses([
                OmsConfig::STORE_STATE_COLLECTED_BY_CUSTOMER,
                OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_CUSTOMER,
                OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_STORE,
            ])
            ->setDeliveryDate($currentDateTime->format('c'))
            ->setOrderCountLimit(
                $this->getFactory()->getConfig()->getMaxOrdersCountToDisplay()
            );

        return $this->getFactory()->getMerchantSalesOrderFacade()
            ->findMerchantSalesOrdersByOrderFilterCriteria($orderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param int $idSalesOrder
     *
     * @return void
     */
    protected function markCollectionCancelledByCustomer(int $idSalesOrder): void
    {
        $orderUpdateRequestTransfer = (new OrderUpdateRequestTransfer())
            ->setStoreStatus(OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_CUSTOMER);

        $this->getFactory()->getMerchantSalesOrderFacade()->updateOrderWithOrderUpdateRequest(
            $idSalesOrder,
            $orderUpdateRequestTransfer
        );
    }

    /**
     * @param int $IdSalesOrder
     * @param int $containerCount
     *
     * @return int|null
     */
    protected function updatePerformanceOrderReportPickupStart(int $IdSalesOrder, int $containerCount): ?int
    {
        $orderPerformanceOrderTransfer = (new PerformanceSalesOrderReportTransfer())
            ->setIdSalesOrder($IdSalesOrder)
            ->setContainersUsed($containerCount)
            ->setPickupDate(date("Y-m-d H:i:s"))
            ->setPickupStart(date("Y-m-d H:i:s"));

        try {
            $orderPerformanceOrderTransferEntity = PyzPerformanceSalesOrderReportQuery::create()
                ->filterByIdSalesOrder($orderPerformanceOrderTransfer->getIdSalesOrder())
                ->findOneOrCreate();

            $orderPerformanceOrderTransferEntity->setContainersUsed($orderPerformanceOrderTransfer->getContainersUsed());
            $orderPerformanceOrderTransferEntity->setPickupDate($orderPerformanceOrderTransfer->getPickupDate());
            $orderPerformanceOrderTransferEntity->setPickupStart($orderPerformanceOrderTransfer->getPickupStart());

            if ($orderPerformanceOrderTransferEntity->isModified()) {
                $orderPerformanceOrderTransferEntity->save();
            }

            return $orderPerformanceOrderTransferEntity->getFkGlobalPickReport();
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }

        return null;
    }

    /**
     * @param string $message
     * @param array $trace
     *
     * @return void
     */
    protected function logError(string $message, array $trace = [])
    {
        $this->getLogger()->error($message, $trace);
    }

    /**
     * @param int $IdSalesOrder
     *
     * @return int|null
     */
    protected function updatePerformanceOrderReportPickupEnd(int $IdSalesOrder): ?int
    {
        $orderPerformanceOrderTransfer = (new PerformanceSalesOrderReportTransfer())
            ->setIdSalesOrder($IdSalesOrder)
            ->setPickupEnd(date("Y-m-d H:i:s"));

        try {
            $orderPerformanceOrderTransferEntity = PyzPerformanceSalesOrderReportQuery::create()
                ->filterByIdSalesOrder($orderPerformanceOrderTransfer->getIdSalesOrder())
                ->findOneOrCreate();

            $orderPerformanceOrderTransferEntity->setIdSalesOrder(null);
            $orderPerformanceOrderTransferEntity->setPickupEnd($orderPerformanceOrderTransfer->getPickupEnd());
            if ($orderPerformanceOrderTransferEntity->getFkGlobalPickReport()) {
                $this->deleteIdPickerGlobalPerformanceReport($orderPerformanceOrderTransferEntity->getFkGlobalPickReport());
            }
            $this->deleteIdSalesOrderItemPerformanceOrderItem($orderPerformanceOrderTransferEntity->getIdPerformanceSalesOrderReport());

            if ($orderPerformanceOrderTransferEntity->isModified()) {
                $orderPerformanceOrderTransferEntity->save();
            }

            return $orderPerformanceOrderTransferEntity->getFkGlobalPickReport();
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }

        return null;
    }

    /**
     * @param int $IdGlobalPickReport
     *
     * @return void
     */
    protected function deleteIdPickerGlobalPerformanceReport(int $IdGlobalPickReport)
    {
        $orderGlobalPerformanceOrderTransfer = (new PerformanceGlobalSalesOrderReportTransfer())
            ->setIdGlobalPickReport($IdGlobalPickReport);

        try {
            $orderPerformanceGlobalOrderTransferEntity = PyzPerformanceGlobalSalesOrderReportQuery::create()
                ->filterByIdGlobalPickReport($orderGlobalPerformanceOrderTransfer->getIdGlobalPickReport())
                ->findOneOrCreate();

            $orderPerformanceGlobalOrderTransferEntity->setIdPicker(null);

            if ($orderPerformanceGlobalOrderTransferEntity->isModified()) {
                $orderPerformanceGlobalOrderTransferEntity->save();
            }
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }
    }

    /**
     * @param string $idPerformanceSalesOrderReport
     *
     * @return void
     */
    protected function deleteIdSalesOrderItemPerformanceOrderItem(string $idPerformanceSalesOrderReport)
    {
        $orderItemPickerReportTransfer = (new PerformanceSalesOrderReportItemTransfer())
            ->setFkPerformanceSalesOrderReport($idPerformanceSalesOrderReport);

        try {
            $orderPerformanceOrderItemTransferEntity = PyzPerformanceSalesOrderReportItemQuery::create()
                ->filterByFkPerformanceSalesOrderReport($orderItemPickerReportTransfer->getFkPerformanceSalesOrderReport())
                ->findByFkPerformanceSalesOrderReport($orderItemPickerReportTransfer->getFkPerformanceSalesOrderReport());

            foreach ($orderPerformanceOrderItemTransferEntity->getData() as $orderItem) {
                $deleteOrderItemPerformanceEntity = PyzPerformanceSalesOrderReportItemQuery::create()
                    ->filterByIdPerformanceSalesOrderItemReport($orderItem->getIdPerformanceSalesOrderItemReport())
                    ->findOne();

                $deleteOrderItemPerformanceEntity->setIdSalesOrderItem(null);

                if ($deleteOrderItemPerformanceEntity->isModified()) {
                    $deleteOrderItemPerformanceEntity->save();
                }
            }
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }
    }
}
