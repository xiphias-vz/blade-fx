<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Transfer;

use ArrayObject;
use DateTime;
use Exception;
use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderItemChangeRequestTransfer;
use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportItemTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer;
use Generated\Shared\Transfer\PickingColorTransfer;
use Generated\Shared\Transfer\PickingContainerTransfer;
use Generated\Shared\Transfer\PickingOrderItemTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;
use Orm\Zed\Oms\Persistence\SpyOmsTransitionLog;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceGlobalSalesOrderReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderReportQuery;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Shared\Log\LoggerTrait;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\Oms\Dependency\Service\OmsToUtilNetworkInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use StoreApp\Zed\Picker\Business\PickerFacadeInterface;
use StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface;
use Symfony\Component\HttpFoundation\Session\Session;

class PickingHeaderTransferData
{
    use LoggerTrait;

    public const PICKING_TRANSFER_SESSION_NAME = 'PickingTransfer';
    public const GLOBAL_PICKER_REPORT_IS_MULTIPICK = true;
    public const PERFORMANCE_ORDER_ITEM_REPORT_PICKED = 'picked';
    public const PERFORMANCE_ORDER_ITEM_REPORT_CANCELLED = 'cancelled';
    public const PERFORMANCE_ORDER_ITEM_REPORT_PAUSED = 'paused';
    /**
     * @var \Spryker\Zed\Oms\Business\OmsFacadeInterface
     */
    protected $omsFacade;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @var \Symfony\Component\HttpFoundation\Session\Session
     */
    protected $sessionService;

    /**
     * @var \Spryker\Zed\User\Business\UserFacadeInterface
     */
    protected $userFacade;

    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @var \StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface
     */
    protected $orderUpdater;

    /**
     * @var \StoreApp\Zed\Picker\Business\PickerFacadeInterface
     */
    protected $pickerFacade;

    /**
     * @var \Spryker\Zed\Oms\Dependency\Service\OmsToUtilNetworkInterface
     */
    protected $networkService;

    /**
     * @param \Spryker\Zed\Oms\Business\OmsFacadeInterface $omsFacade
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Symfony\Component\HttpFoundation\Session\Session $sessionService
     * @param \Spryker\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface $orderUpdater
     * @param \StoreApp\Zed\Picker\Business\PickerFacadeInterface $pickerFacade
     * @param \Spryker\Zed\Oms\Dependency\Service\OmsToUtilNetworkInterface $networkService
     */
    public function __construct(
        OmsFacadeInterface $omsFacade,
        SalesFacadeInterface $salesFacade,
        Session $sessionService,
        UserFacadeInterface $userFacade,
        PickingZoneFacadeInterface $pickingZoneFacade,
        OrderUpdaterInterface $orderUpdater,
        PickerFacadeInterface $pickerFacade,
        OmsToUtilNetworkInterface $networkService
    ) {
        $this->omsFacade = $omsFacade;
        $this->salesFacade = $salesFacade;
        $this->sessionService = $sessionService;
        $this->userFacade = $userFacade;
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->orderUpdater = $orderUpdater;
        $this->pickerFacade = $pickerFacade;
        $this->networkService = $networkService;
    }

    /**
     * @param int $idZone
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getAllOrdersInStateReadyForPickingByZone(int $idZone): PickingHeaderTransfer
    {
        $merchantReference = $this->userFacade->getCurrentUser()->getMerchantReference();
        $sql = "select sso.id_sales_order as id_order,
           sso.order_reference,
           CONCAT_WS(' ', sso.first_name, sso.last_name) as customer_name,
           substring(sss.requested_delivery_date, 1, 10) as requested_delivery_date,
           CONCAT(DATE_FORMAT(substring(requested_delivery_date, 1, 10), '%w %d.%m.%y'), ' ', substring(requested_delivery_date, 12, 11)) as time_slot,
           sss.requested_delivery_date as time_slot_sort,
           0 as is_checked,
           sso.cart_note as note,
           sso.store,
           so.articles_count,
           so.articles_quantity,
           so.is_paused,
           sso.created_at as performance_order_date,
           case when popb.fk_user is null then 0 else 1 end as isLocked,
           IFNULL(sso.is_substitution_allowed, 0) as is_substitution_allowed,
           sm.is_transportbox_enabled,
           sso.is_deposit_allowed,
           so.zone_abbreviation
    from spy_sales_order sso
        inner join
         (
             select ssoi.fk_sales_order,
                count(distinct ssoi.product_number) as articles_count,
                sum(ssoi.quantity) as articles_quantity,
                max(IFNULL(ssoi.item_paused, 0)) as is_paused,
                ppz.abbreviation as zone_abbreviation
             from spy_sales_order_item ssoi
                      inner join spy_oms_order_item_state soois
                                 on ssoi.fk_oms_order_item_state = soois.id_oms_order_item_state
                inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
             where (
                    soois.name like '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "'
                    or soois.name like '" . OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES . "')
                and ppz.id_picking_zone = " . $idZone . "
             group by ssoi.fk_sales_order, ppz.abbreviation
         ) so on sso.id_sales_order = so.fk_sales_order
        inner join spy_merchant sm on sso.merchant_reference = sm.merchant_reference
        left outer join spy_customer sc on sso.customer_reference = sc.customer_reference
        left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
        left outer join pyz_order_picking_block popb on sso.id_sales_order = popb.fk_sales_order
            and popb.fk_picking_zone = " . $idZone . "
    where sso.merchant_reference = '" . $merchantReference . "'
        and (popb.fk_user is null or popb.fk_user = " . $this->userFacade->getCurrentUser()->getIdUser() . ")
    ";

        $data = $this->getResult($sql);
        $daysInTheWeek = $this->pickerFacade->getDaysInTheWeek();
        $transfer = new PickingHeaderTransfer();
        $transfer
            ->setIdZone($idZone)
            ->setIdUser($this->userFacade->getCurrentUser()->getIdUser());
        if (count($data) > 0) {
            $transfer->setZoneAbbrevation($data[0]["zone_abbreviation"]);
            foreach ($data as $item) {
                $order = new PickingOrderTransfer();
                $order->fromArray($item, true);
                $timeSlot = $order->getTimeSlot();
                $index = substr($timeSlot, 0, 1);
                $timeSlot = $daysInTheWeek[(int)$index] . substr($timeSlot, 1);
                $order->setTimeSlot($timeSlot);
                $transfer->addPickingOrders($item["id_order"], $order);
            }
        }

        $transfer->recalculateAll(false);
        $this->setTransferToSession($transfer);

        return $transfer;
    }

    /**
     * @param array $idOrderList
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function setOrdersToPick(array $idOrderList): PickingHeaderTransfer
    {
        $transfer = $this->getTransferFromSession();
        if ($transfer instanceof PickingHeaderTransfer) {
            $transfer->setErrorMessage(
                $this->checkIfOrdersAreLocked($idOrderList, $transfer->getIdZone())
            );
            if (empty($transfer->getErrorMessage())) {
                $orders = [];
                foreach ($transfer->getPickingOrders() as $order) {
                    if (in_array($order->getIdOrder(), $idOrderList)) {
                        array_push($orders, $order);

                        //save data to pyz_order_picking_block - PyzOrderPickingBlockQuery
                        $orderPickingBlockTransfer = (new OrderPickingBlockTransfer())
                            ->setIdSalesOrder($order->getIdOrder())
                            ->setIdPickingZone($transfer->getIdZone())
                            ->setIdUser($this->userFacade->getCurrentUser()->getIdUser());
                        try {
                            $this->pickingZoneFacade->createOrderPickingBlock($orderPickingBlockTransfer);
                        } catch (Exception $ex) {
                        }
                    }
                }

                $numberOfOrders = count($idOrderList);

                $globalPickerReportTransfer = (new PerformanceGlobalSalesOrderReportTransfer())
                    ->setIdPicker($transfer->getIdUser())
                    ->setPickZone($transfer->getIdZone())
                    ->setIsMultiPick(self::GLOBAL_PICKER_REPORT_IS_MULTIPICK)
                    ->setPickTimeBegin(date("Y-m-d H:i:s"))
                    ->setNumberRelatedOrders($numberOfOrders);
                try {
                    $transferGlobal = $this->pickerFacade->setGlobalPickerReport($globalPickerReportTransfer);
                    $transfer->setIdGlobalPickReport($transferGlobal->getIdGlobalPickReport());
                } catch (Exception $exceptionSaveGlobal) {
                    $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
                }

                foreach ($orders as $listOrder) {
                    $containerCount = count($listOrder->getPickingContainers());
                    $orderPickerReportTransfer = (new PerformanceSalesOrderReportTransfer())
                        ->setFkGlobalPickReport($transfer->getIdGlobalPickReport())
                        ->setIdSalesOrder($listOrder->getIdOrder())
                        ->setOrderDate($listOrder->getPerformanceOrderDate())
                        ->setContainersUsed($containerCount)
                        ->setPositionsUsed($listOrder->getArticlesCount())
                        ->setPieces($listOrder->getArticlesQuantity())
                        ->setPickingStart(date("Y-m-d H:i:s"));

                    try {
                        $transferOrderPerformance = $this->pickerFacade->setOrderPickerReport($orderPickerReportTransfer);
                        $listOrder->setIdPerformanceSalesOrderReport($transferOrderPerformance->getIdPerformanceSalesOrderReport());
                    } catch (Exception $exceptionSaveGlobal) {
                        $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
                    }
                }

                $transfer->setPickingOrders(new ArrayObject($orders));
                if ($transfer->getPickingOrders()->count() > 0) {
                    $transfer = $this->getOrderItemsForTransfer($transfer, $transfer->getIdZone());
                }
                $transfer = $this->getOrderContainersForTransfer($transfer);
                $transfer->setColors($this->getColors());
                $transfer->recalculateAll();
                $this->setTransferToSession($transfer);
            }
        }

        return $transfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param string $containerId
     * @param string $shelfId
     * @param bool $isSubstituteContainer
     *
     * @return bool
     */
    public function setContainerToOrder(PickingOrderTransfer $order, string $containerId, string $shelfId, bool $isSubstituteContainer): bool
    {
        $transfer = $this->getTransferFromSession();
        $orderMod = $transfer->getOrder($order->getPickingPosition());
        $dataUpdated = false;

        foreach ($orderMod->getPickingContainers() as $container) {
            if ($container->getContainerID() == $containerId) {
                $container->setShelfID($shelfId === "--" ? null : $shelfId);
                $dataUpdated = true;
            }
        }
        if (!$dataUpdated) {
            $container = new PickingContainerTransfer();
            $container
                ->setIdOrder($orderMod->getIdOrder())
                ->setContainerID($containerId)
                ->setShelfID($shelfId)
                ->setIdUser($transfer->getIdUser())
                ->setIdZone($transfer->getIdZone())
                ->setIsAdded(true)
                ->setPickingColor($orderMod->getPickingColor())
                ->setZoneAbbrevation($transfer->getZoneAbbrevation())
                ->setHasSubstitutedItem($isSubstituteContainer);
            $orderMod->addPickingContainer($containerId, $container);
            $dataUpdated = true;
        }
        //save data to pyz_picking_sales_order - PyzPickingSalesOrderQuery
        $containerEntity = PyzPickingSalesOrderQuery::create()
            ->filterByFkSalesOrder($orderMod->getIdOrder())
            ->filterByContainerCode($containerId)
            ->findOneOrCreate();
        $containerEntity->setHasSubstitutedItem($isSubstituteContainer);

        if ($shelfId === "--") {
            $containerEntity->setShelfCode(null);
        } elseif (!empty($shelfId)) {
            $containerEntity->setShelfCode($shelfId);

            $containerCount = count($orderMod->getPickingContainers());
            $fkGlobalPickReport = $this->updatePerformanceOrder($orderMod->getIdPerformanceSalesOrderReport(), $containerCount);

            $this->updateGlobalPerformanceOrder($fkGlobalPickReport);
        }
        if ($containerEntity->isNew()) {
            $containerEntity->setFkPickingZone($transfer->getIdZone());
        }

        if ($containerEntity->isModified() || $containerEntity->isNew()) {
            $containerEntity->save();
        }

        $this->setTransferToSession($transfer);

        return $dataUpdated;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param string $containerId
     *
     * @return void
     */
    public function updateContainerPickZone(PickingOrderTransfer $order, string $containerId)
    {
        $transfer = $this->getTransferFromSession();
        foreach ($order->getPickingContainers() as $container) {
            if ($container->getContainerID() == $containerId) {
                if (!$container->getHasItems()) {
                    $container->setHasItems(true);
                    $container->setShelfID(null);
                    $this->setTransferToSession($transfer);
                    $this->setContainerToOrder($order, $containerId, "--", $container->getHasSubstitutedItem() ?? false);
                }
                break;
            }
        }
    }

    /**
     * @param int $quantityPicked
     * @param int $weight
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked, int $weight): void
    {
        $transfer = $this->getTransferFromSession();
        $orderItem = $transfer->setCurrentOrderItemPicked($quantityPicked, $weight);
        $orderItem->setPerformancePickingStartedAt($this->getPerformancePickingStartedAt());

        $this->saveCurrentOrderItemReadyForPicking($orderItem);
        $idList = $this->getOrderItemIdArray($orderItem);
        $counter = 0;
        $pickedItems = [];
        $nonPickedItems = [];

        $orderItem->setIsSubstitutionFound(false);
        $transfer->setParents(false);
        $order = $orderItem->getParent();
        $transfer->setParents(true);

        foreach ($idList as $id) {
            if ($counter < $orderItem->getQuantityPicked()) {
                $counter++;
                array_push($pickedItems, $id);
            } else {
                array_push($nonPickedItems, $id);
            }
        }
        if (count($pickedItems) > 0) {
            if ($weight > 0) {
                if (count($nonPickedItems) > 0) {
                    $this->orderUpdater->markOrderItemsAsNotPicked($nonPickedItems);
                }
                $this->updateOrderItemWeight($orderItem);
            }
            $this->resetCanceledStatusForCanceledItems($pickedItems);
            $this->orderUpdater->markOrderItemsAsContainerSelected($pickedItems);

            $this->updatePerformanceOrderItem($order, $orderItem, static::PERFORMANCE_ORDER_ITEM_REPORT_PICKED);
        }
        if (count($nonPickedItems) > 0) {
            $this->orderUpdater->markOrderItemsAsNotPicked($nonPickedItems);
        }

        $orderItem->setIsPaused(false);
        $this->saveCurrentOrderItemPaused($orderItem, false);
        $transfer->updateItemsPickedCount();

        $this->setTransferToSession($transfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $orderItem
     *
     * @return array
     */
    public function getOrderItemIdArray(PickingOrderItemTransfer $orderItem): array
    {
        $qry = SpySalesOrderItemQuery::create();
        $items = $qry->select(SpySalesOrderItemTableMap::COL_ID_SALES_ORDER_ITEM)
            ->filterByFkSalesOrder($orderItem->getIdOrder())
            ->filterByProductNumber($orderItem->getEan())
            ->find();

        return $items->getData();
    }

    /**
     * @param bool $isPaused
     *
     * @return bool
     */
    public function setCurrentOrderItemPaused(bool $isPaused): bool
    {
        $transfer = $this->getTransferFromSession();
        $result = $transfer->setCurrentOrderItemPaused($isPaused);
        $this->setTransferToSession($transfer);
        if ($result) {
            //save data to spy_sales_order_item - SpySalesOrderItemQuery
            $orderItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition());
            $orderItem->setIsSubstitutionFound(false);
            $this->saveCurrentOrderItemPaused($orderItem, $isPaused);

            $orderItem->setPerformancePickingStartedAt($this->getPerformancePickingStartedAt());

            $transfer->setParents(false);
            $order = $orderItem->getParent();
            $transfer->setParents(true);
            $this->updatePerformanceOrderItem($order, $orderItem, static::PERFORMANCE_ORDER_ITEM_REPORT_PAUSED);
        }

        return $result;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $orderItem
     * @param bool $isPaused
     *
     * @return bool
     */
    private function saveCurrentOrderItemPaused(PickingOrderItemTransfer $orderItem, bool $isPaused): bool
    {
        //save data to spy_sales_order_item - SpySalesOrderItemQuery
        $idState = $this->getIdState(OmsConfig::STORE_STATE_READY_FOR_PICKING);
        $idList = $this->getOrderItemIdArray($orderItem);
        $paused = $isPaused ? 1 : 0;
        $isSubstitutionFound = $orderItem->getIsSubstitutionFound() ? 1 : 0;
        if (count($idList) > 0 && $idState) {
            $whereList = implode($idList, ",");
            if ($paused) {
                $qry = "update spy_sales_order_item set item_paused = " . $paused
                    . ", fk_oms_order_item_state = " . $idState
                    . ", is_substitution_found = " . $isSubstitutionFound
                    . " where id_sales_order_item in(" . $whereList . ")";
            } else {
                $qry = "update spy_sales_order_item set item_paused = " . $paused
                    . ", is_substitution_found = " . $isSubstitutionFound
                    . " where id_sales_order_item in(" . $whereList . ")";
            }
            $this->getResult($qry, false);

            if ($paused) {
                $qry = "insert into spy_oms_order_item_state_history (fk_oms_order_item_state, fk_sales_order_item, created_at)
                        select " . $idState . ", id_sales_order_item, now() from spy_sales_order_item where id_sales_order_item in(" . $whereList . ")";
                $this->getResult($qry, false);
            }
        }

        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $orderItem
     *
     * @return bool
     */
    private function saveCurrentOrderItemReadyForPicking(PickingOrderItemTransfer $orderItem): bool
    {
        $idState = $this->getIdState(OmsConfig::STORE_STATE_READY_FOR_PICKING);
        $idList = $this->getOrderItemIdArray($orderItem);
        if (count($idList) > 0 && $idState) {
            $whereList = implode($idList, ",");
            $qry = "update spy_sales_order_item set item_paused = 0"
                . ", fk_oms_order_item_state = " . $idState
                . " where id_sales_order_item in(" . $whereList . ")";
            $this->getResult($qry, false);
            $qry = "insert into spy_oms_order_item_state_history (fk_oms_order_item_state, fk_sales_order_item, created_at)
                        select " . $idState . ", id_sales_order_item, now() from spy_sales_order_item where id_sales_order_item in(" . $whereList . ")";
            $this->getResult($qry, false);
        }

        return true;
    }

    /**
     * @param string $stateName
     *
     * @return int|null
     */
    protected function getIdState(string $stateName): ?int
    {
        $qry = "select id_oms_order_item_state as id from spy_oms_order_item_state where name = '" . $stateName . "'";
        $data = $this->getResult($qry);
        if (count($data) > 0) {
            return $data[0]["id"];
        }

        return null;
    }

    /**
     * @param array $pickedItems
     *
     * @return void
     */
    private function resetCanceledStatusForCanceledItems(array $pickedItems): void
    {
        $idState = $this->getIdState(OmsConfig::STORE_STATE_READY_FOR_PICKING);
        if ($idState) {
            $whereList = implode($pickedItems, ",");
            $qry = "select ssoi.fk_sales_order, ssoi.id_sales_order_item, ssoi.fk_oms_order_process, soois.name
                    from spy_sales_order_item ssoi
                        inner join spy_oms_order_item_state soois on ssoi.fk_oms_order_item_state = soois.id_oms_order_item_state
                    where ssoi.id_sales_order_item in(" . $whereList . ") and ssoi.fk_oms_order_item_state <> " . $idState;
            $data = $this->getResult($qry);
            $pickedItems = [];
            foreach ($data as $item) {
                $pickedItems[] = $item["id_sales_order_item"];
            }
            if (count($pickedItems) > 0) {
                $whereList = implode($pickedItems, ",");
                $qry = "update spy_sales_order_item set fk_oms_order_item_state = " . $idState . " where id_sales_order_item in(" . $whereList . ")";
                $this->getResult($qry, false);
                $qry = "insert into spy_oms_order_item_state_history (fk_oms_order_item_state, fk_sales_order_item, created_at)
                        select " . $idState . ", id_sales_order_item, now() from spy_sales_order_item where id_sales_order_item in(" . $whereList . ")";
                $this->getResult($qry, false);
                foreach ($data as $item) {
                    $log = new SpyOmsTransitionLog();
                    $log->setFkOmsOrderProcess($item["fk_oms_order_process"])
                        ->setFkSalesOrder($item["fk_sales_order"])
                        ->setFkSalesOrderItem($item["id_sales_order_item"])
                        ->setPath("multiPicking")
                        ->setCommand("resetCanceledStatusForCanceledItems")
                        ->setSourceState($item["name"])
                        ->setTargetState(OmsConfig::STORE_STATE_READY_FOR_PICKING)
                        ->setHostname($this->networkService->getHostName())
                        ->setQuantity(1)
                        ->setIsError(false)
                        ->setCreatedAt(new DateTime());
                    $log->save();
                }
            }
        }
    }

    /**
     * @param bool $isCanceled
     * @param bool $isSubstitutionPicked
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled, bool $isSubstitutionPicked): bool
    {
        $transfer = $this->getTransferFromSession();
        if ($transfer->setCurrentOrderItemCanceled($isCanceled)) {
            //save data to spy_sales_order_item - SpySalesOrderItemQuery

            $orderItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition());
            $orderItem->setIsPaused(false);
            $orderItem->setIsSubstitutionFound($isSubstitutionPicked);
            $this->saveCurrentOrderItemPaused($orderItem, false);

            $orderItem->setPerformancePickingStartedAt($this->getPerformancePickingStartedAt());
            $transfer->setParents(false);
            $order = $orderItem->getParent();
            $transfer->setParents(true);
            $this->updatePerformanceOrderItem($order, $orderItem, static::PERFORMANCE_ORDER_ITEM_REPORT_CANCELLED);

            $idList = $this->getOrderItemIdArray($orderItem);
            if (count($idList) > 0) {
                $this->saveCurrentOrderItemReadyForPicking($orderItem);
                $this->orderUpdater->markOrderItemsAsNotPicked($idList);
            }

            return true;
        }

        return false;
    }

    /**
     * @param string $containerID
     *
     * @return bool
     */
    public function checkContainerForCurrentItem(string $containerID): bool
    {
        $transfer = $this->getTransferFromSession();
        $result = $transfer->checkContainerForCurrentItem($containerID);
        $this->setTransferToSession($transfer);

        return $result;
    }

        /**
         * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
         *
         * @return void
         */
    public function setTransferToSession(PickingHeaderTransfer $transfer)
    {
        $transfer->setParents(true);
        $this->sessionService->set(self::PICKING_TRANSFER_SESSION_NAME, $transfer);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getTransferFromSession(): PickingHeaderTransfer
    {
        $transfer = $this->sessionService->get(self::PICKING_TRANSFER_SESSION_NAME);

        return $transfer;
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param int $idZone
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    private function getOrderItemsForTransfer(PickingHeaderTransfer $transfer, int $idZone): PickingHeaderTransfer
    {
        $whereList = implode($transfer->getIdOrderArray(), ",");
        $sql = "SELECT m.id_order, m.order_reference, m.id_order_item
                        , m.id_product, m.ean
                        , m.alternative_ean, m.quantity, m.price, m.price_unit, m.price_content
                        , m.price_per_kg, m.sum_price, m.name, m.brand_name, m.weight
                        , m.is_paused, m.sequence, m.shelf, m.shelf_floor, m.shelf_field, m.aisle
                        , m.quantityPicked
                        , m.is_cancelled
                        , m.status, m.last_picked_at, m.min_weight
                        , m.max_weight, m.total_weight
                        , i.external_url_small as picture_url
                FROM
                    (
                    select sso.id_sales_order as id_order, sso.order_reference, min(ssoi.id_sales_order_item) as id_order_item
                        , sp.id_product, sp.product_number as ean
                        , ssoi.alternative_ean, count(*) as quantity, ssoi.price, ssoi.base_price_unit as price_unit, ssoi.base_price_content as price_content
                        , ssoi.price_per_kg, sum(ssoi.price) as sum_price, ssoi.name, ssoi.brand as brand_name, ssoi.weight_per_unit as weight
                        , IFNULL(ssoi.item_paused, 0) as is_paused, ssoi.sequence, ssoi.shelf, ssoi.shelf_floor, ssoi.shelf_field,ssoi.aisle
                        , sum(case when sit.name = 'picked' or sit.name = 'ready for selecting shelves' then ssoi.quantity else 0 end) as quantityPicked
                        , IF(sum(case when sit.name = 'cancelled' then 1 else 0 end) > 0, 1, 0) as is_cancelled
                        , sit.name as status, MAX(ssoi.picked_at) as last_picked_at, MAX(ssoi.weight_per_unit) * SUM(ssoi.quantity) * 0.8 as min_weight
                        , MAX(ssoi.weight_per_unit) * SUM(ssoi.quantity) * 1.2 as max_weight, MAX(ssoi.weight_per_unit) * SUM(ssoi.quantity) as total_weight
                    from spy_sales_order sso
                        inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
                        inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                        inner join spy_product sp on ssoi.product_number = sp.product_number
                        inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
                    where sso.id_sales_order in (" . $whereList . ")
                        and ppz.id_picking_zone = " . $idZone . "
                    group by sso.id_sales_order, sso.order_reference
                        , sp.id_product, sp.product_number
                        , ssoi.alternative_ean, ssoi.quantity_base_measurement_unit_name, ssoi.price, ssoi.base_price_unit, ssoi.base_price_content
                        , ssoi.price_per_kg, ssoi.name, ssoi.brand, ssoi.weight_per_unit, ssoi.item_paused, ssoi.sequence, ssoi.shelf, ssoi.shelf_floor
                        , ssoi.shelf_field, ssoi.aisle, sit.name
                    ) m
                    left outer join
                    (
                        SELECT t.id_product, t.external_url_small
                        FROM
                        (
                        SELECT sp.id_product, spi.external_url_small, ROW_NUMBER() OVER(PARTITION BY sp.id_product order by spistpi.sort_order asc) as rowNumber
                        FROM spy_sales_order_item ssoi
                            inner join spy_product sp on ssoi.product_number = sp.product_number
                            inner join spy_product_image_set spis on sp.id_product = spis.fk_product
                            inner join spy_product_image_set_to_product_image spistpi on spis.id_product_image_set = spistpi.fk_product_image_set
                            inner join spy_product_image spi on spistpi.fk_product_image = spi.id_product_image
                            inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
                        where ssoi.fk_sales_order in (" . $whereList . ")
                            and ppz.id_picking_zone = " . $idZone . "
                        ) t where t.rowNumber = 1
                    ) i on i.id_product = m.id_product";

        $data = $this->getResult($sql);

        foreach ($data as $item) {
            $orderItem = new PickingOrderItemTransfer();
            $orderItem->fromArray($item, true);
            $transfer->addOrderItemToTransfer($orderItem);
        }

        $transfer->removeNotPausedIfPausedExists();

        return $transfer;
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    private function getOrderContainersForTransfer(PickingHeaderTransfer $transfer): PickingHeaderTransfer
    {
        $whereList = implode($transfer->getIdOrderArray(), ",");
        $sql = "select ppso.fk_sales_order as id_order,
                ppso.id_picking_sales_order as id_container,
                ppso.container_code as containerID,
                ppso.shelf_code as shelfID,
                popb.fk_user as id_user,
                ppso.fk_picking_zone as id_zone,
                false as is_added,
                ppz.abbreviation as zone_abbrevation,
                ppso.has_substituted_item
            from pyz_picking_sales_order ppso
                left outer join pyz_order_picking_block popb on ppso.fk_sales_order = popb.fk_sales_order and ppso.fk_picking_zone = popb.fk_picking_zone
                left outer join pyz_picking_zone ppz on ppso.fk_picking_zone = ppz.id_picking_zone
            where ppso.fk_sales_order in (" . $whereList . ")";
        $data = $this->getResult($sql);

        foreach ($data as $item) {
            $container = new PickingContainerTransfer();
            $container->fromArray($item, true);
            $transfer->addContainerToTransfer($container);
        }

        return $transfer;
    }

    /**
     * @param array $idOrderList
     * @param int $idZone
     *
     * @return string|null
     */
    private function checkIfOrdersAreLocked(array $idOrderList, int $idZone): ?string
    {
        $sql = "select GROUP_CONCAT(sso.order_reference, ',') as locked_orders
            from pyz_order_picking_block popb
                inner join spy_sales_order sso on popb.fk_sales_order = sso.id_sales_order
                left outer join (
                    select fk_sales_order from spy_sales_order_item where item_paused = 1
                ) ssoi on sso.id_sales_order = ssoi.fk_sales_order
            where popb.fk_picking_zone = " . $idZone . "
                and popb.fk_sales_order in(" . implode(",", $idOrderList) . ")
                and ssoi.fk_sales_order is null ";
        $data = $this->getResult($sql);

        return $data[0]["locked_orders"];
    }

    /**
     * @return array
     */
    private function getColors(): array
    {
        $sql = "select id_color, fore_color, back_color, circle_color from pyz_order_pickzone_color";
        $data = $this->getResult($sql);
        $colors = [];
        foreach ($data as $item) {
            $color = new PickingColorTransfer();
            $color->fromArray($item, true);
            array_push($colors, $color);
        }

        return $colors;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $orderItem
     *
     * @return void
     */
    private function updateOrderItemWeight(PickingOrderItemTransfer $orderItem): void
    {
        $orderChange = new OrderChangeRequestTransfer();
        $orderItemChange = new OrderItemChangeRequestTransfer();
        $orderChange->setFkSalesOrder($orderItem->getIdOrder());
        $newPrice = round(($orderItem->getTotalWeight() * $orderItem->getPricePerKg() / 1000));
        $orderItemChange
            ->setIdSalesOrderItem($orderItem->getIdOrderItem())
            ->setQuantity(1)
            ->setPrice($newPrice)
            ->setNewWeight($orderItem->getTotalWeight());
        $orderChange->setOrderItemChangeRequest(new ArrayObject([$orderItemChange]));
        $this->salesFacade->saveOrderChange($orderChange);
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return void
     */
    public function clearLockForPausedOrders(PickingHeaderTransfer $transfer): void
    {
        foreach ($transfer->getPickingOrders() as $order) {
            if ($order->getIsPaused()) {
                $sql = "delete from pyz_order_picking_block where fk_sales_order = " . $order->getIdOrder() . " and fk_picking_zone = " . $transfer->getIdZone();
                $this->getResult($sql, false);
            }
        }
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param array $idOrders
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function clearLockOrders(PickingHeaderTransfer $transfer, array $idOrders): PickingHeaderTransfer
    {
        foreach ($transfer->getPickingOrders() as $order) {
            if (in_array($order->getIdOrder(), $idOrders)) {
                if ($order->getIsLocked()) {
                    $sql = "delete from pyz_order_picking_block where fk_sales_order = " . $order->getIdOrder() . " and fk_picking_zone = " . $transfer->getIdZone();
                    $this->getResult($sql, false);
                    $order->setIsLocked(false);
                }
                $order->setIsChecked(true);
            }
        }

        return $transfer;
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return bool
     */
    public function unLockAndClearAddedContainers(PickingHeaderTransfer $transfer): bool
    {
        $result = true;
        try {
            foreach ($transfer->getPickingOrders() as $order) {
                foreach ($order->getPickingContainers() as $container) {
                    if ($container->getIsAdded()) {
                        $sql = "delete from pyz_picking_sales_order where fk_sales_order = " . $container->getIdOrder() . " and fk_picking_zone = " . $transfer->getIdZone() . " and container_code = '" . $container->getContainerID() . "'";
                        $this->getResult($sql, false);
                    }
                }
                $sql = "delete from pyz_order_picking_block where fk_sales_order = " . $order->getIdOrder() . " and fk_picking_zone = " . $transfer->getIdZone();
                $this->getResult($sql, false);
            }
        } catch (Exception $ex) {
            $result = false;
        }

        return $result;
    }

    /**
     * @param string $containerID
     * @param string $merchantReference
     * @param int $idSalesOrder
     *
     * @return string|null
     */
    public function checkContainerUsage(string $containerID, string $merchantReference, int $idSalesOrder): ?string
    {
        $sql = "select GROUP_CONCAT(distinct concat_ws(' ', sso.order_reference, ',', sso.first_name, sso.last_name)) as used_in_orders
            from spy_sales_order_item ssoi
                     inner join spy_oms_order_item_state soois on ssoi.fk_oms_order_item_state = soois.id_oms_order_item_state
                     inner join spy_sales_order sso on sso.id_sales_order = ssoi.fk_sales_order
                inner join pyz_picking_sales_order ppso on sso.id_sales_order = ppso.fk_sales_order
            where soois.name in('ready for picking', 'ready for selecting shelves', 'picked', 'collection process', 'ready for collection')
                and ppso.container_code = '" . $containerID . "'
                and sso.merchant_reference = '" . $merchantReference . "'
                and ppso.fk_sales_order <> " . $idSalesOrder;
        $data = $this->getResult($sql);

        return $data[0]["used_in_orders"];
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     * @param string $containerToMove
     * @param string $containerToFill
     *
     * @return string
     */
    public function moveContainerToContainer(PickingHeaderTransfer $transfer, string $containerToMove, string $containerToFill): string
    {
        $sql = "select ppso.fk_sales_order as fk_sales_order
		    from pyz_picking_sales_order ppso
		        inner join pyz_picking_sales_order ppso2 on ppso.fk_sales_order = ppso2.fk_sales_order
                inner join spy_sales_order sso on ppso.fk_sales_order = sso.id_sales_order and sso.invoice_reference is null
		    where ppso.container_code = '" . $containerToMove . "' and ppso2.container_code = '" . $containerToFill . "' and ppso.container_code <> ppso2.container_code";
        $data = $this->getResult($sql);
        if (isset($data[0])) {
            $id = $data[0]["fk_sales_order"];
            $sql = "delete from pyz_picking_sales_order where fk_sales_order = " . $id . " and container_code = '" . $containerToMove . "'";
            $this->getResult($sql, false);
            $order = $transfer->getOrderById($id);
            $containers = [];
            foreach ($order->getPickingContainers() as $container) {
                if ($container->getContainerID() !== $containerToMove) {
                    $containers[] = $container;
                }
            }
            $order->setPickingContainers(new ArrayObject($containers));
            $this->setTransferToSession($transfer);

            return "OK";
        }

        return "Not valid container";
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, bool $doFetch = true): array
    {
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();

        if ($doFetch) {
            return $statement->fetchAll(PDO::FETCH_NAMED);
        }

        return [];
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
     * @param string $startTime
     * @param string $endTime
     *
     * @return int
     */
    protected function calculatePickingDurationTime(string $startTime, string $endTime): int
    {
        $firstTime = strtotime($startTime);
        $lastTime = strtotime($endTime);
        $timeDiff = $lastTime - $firstTime;

        return $timeDiff;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $orderItem
     * @param string $itemStatus
     *
     * @return void
     */
    protected function updatePerformanceOrderItem(PickingOrderTransfer $order, PickingOrderItemTransfer $orderItem, string $itemStatus)
    {
        $orderItemPickerReportTransfer = (new PerformanceSalesOrderReportItemTransfer())
            ->setFkPerformanceSalesOrderReport($order->getIdPerformanceSalesOrderReport())
            ->setIdSalesOrderItem($orderItem->getIdOrderItem())
            ->setPickingStartTime($orderItem->getPerformancePickingStartedAt())
            ->setPickingEndTime(date("Y-m-d H:i:s"))
            ->setPickupEndStatus($itemStatus)
            ->setDurationPickingTime($this->calculatePickingDurationTime($orderItem->getPerformancePickingStartedAt(), date("Y-m-d H:i:s")));

        try {
            $this->pickerFacade->setOrderItemPickerReport($orderItemPickerReportTransfer);
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }
    }

    /**
     * @param int $IdPerformanceSalesOrderReport
     * @param int $containerCount
     *
     * @return int
     */
    public function updatePerformanceOrder(int $IdPerformanceSalesOrderReport, int $containerCount): int
    {
        $orderPerformanceOrderTransfer = (new PerformanceSalesOrderReportTransfer())
            ->setIdPerformanceSalesOrderReport($IdPerformanceSalesOrderReport)
            ->setContainersUsed($containerCount)
            ->setPickingEnd(date("Y-m-d H:i:s"));

        $orderPerformanceOrderTransferEntity = new PyzPerformanceSalesOrderReportQuery();
        try {
            $orderPerformanceOrderTransferEntity = PyzPerformanceSalesOrderReportQuery::create()
                    ->filterByIdPerformanceSalesOrderReport($orderPerformanceOrderTransfer->getIdPerformanceSalesOrderReport())
                    ->findOneOrCreate();

            $orderPickingDuration = $this->calculatePickingDurationTime(date("Y-m-d H:i:s", $orderPerformanceOrderTransferEntity->getPickingStart()->getTimestamp()), $orderPerformanceOrderTransfer->getPickingEnd());

            $orderPerformanceOrderTransferEntity->setContainersUsed($orderPerformanceOrderTransfer->getContainersUsed());
            $orderPerformanceOrderTransferEntity->setPickingEnd($orderPerformanceOrderTransfer->getPickingEnd());
            $orderPerformanceOrderTransferEntity->setDurationPickTime($orderPickingDuration);

            if ($orderPerformanceOrderTransferEntity->isModified()) {
                $orderPerformanceOrderTransferEntity->save();
            }
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }

        return $orderPerformanceOrderTransferEntity->getFkGlobalPickReport();
    }

    /**
     * @param int $IdGlobalPickReport
     *
     * @return void
     */
    public function updateGlobalPerformanceOrder(int $IdGlobalPickReport)
    {
        $orderGlobalPerformanceOrderTransfer = (new PerformanceGlobalSalesOrderReportTransfer())
            ->setIdGlobalPickReport($IdGlobalPickReport)
            ->setPickTimeEnd(date("Y-m-d H:i:s"));

        try {
            $orderPerformanceGlobalOrderTransferEntity = PyzPerformanceGlobalSalesOrderReportQuery::create()
                ->filterByIdGlobalPickReport($orderGlobalPerformanceOrderTransfer->getIdGlobalPickReport())
                ->findOneOrCreate();

            $globalOrderPickingDuration = $this->calculatePickingDurationTime(date("Y-m-d H:i:s", $orderPerformanceGlobalOrderTransferEntity->getPickTimeBegin()->getTimestamp()), $orderGlobalPerformanceOrderTransfer->getPickTimeEnd());

            $orderPerformanceGlobalOrderTransferEntity->setPickTimeEnd($orderGlobalPerformanceOrderTransfer->getPickTimeEnd());
            $orderPerformanceGlobalOrderTransferEntity->setDurationPickTime($globalOrderPickingDuration);

            if ($orderPerformanceGlobalOrderTransferEntity->isModified()) {
                $orderPerformanceGlobalOrderTransferEntity->save();
            }
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }
    }

    /**
     * @return string|mixed|false
     */
    protected function getPerformancePickingStartedAt()
    {
        $itemPickingStartTime = date("Y-m-d H:i:s");
        if (isset($_REQUEST['itemPickingStartTime'])) {
            return $_REQUEST['itemPickingStartTime'];
        } else {
            return $itemPickingStartTime;
        }
    }
}
