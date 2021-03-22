<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Transfer;

use ArrayObject;
use Exception;
use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderItemChangeRequestTransfer;
use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingColorTransfer;
use Generated\Shared\Transfer\PickingContainerTransfer;
use Generated\Shared\Transfer\PickingOrderItemTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface;
use Symfony\Component\HttpFoundation\Session\Session;

class PickingHeaderTransferData
{
    public const PICKING_TRANSFER_SESSION_NAME = 'PickingTransfer';
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
     * @param \Spryker\Zed\Oms\Business\OmsFacadeInterface $omsFacade
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Symfony\Component\HttpFoundation\Session\Session $sessionService
     * @param \Spryker\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface $orderUpdater
     */
    public function __construct(
        OmsFacadeInterface $omsFacade,
        SalesFacadeInterface $salesFacade,
        Session $sessionService,
        UserFacadeInterface $userFacade,
        PickingZoneFacadeInterface $pickingZoneFacade,
        OrderUpdaterInterface $orderUpdater
    ) {
        $this->omsFacade = $omsFacade;
        $this->salesFacade = $salesFacade;
        $this->sessionService = $sessionService;
        $this->userFacade = $userFacade;
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->orderUpdater = $orderUpdater;
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
           so.is_paused
    from spy_sales_order sso
        inner join
         (
             select ssoi.fk_sales_order,
                count(distinct ssoi.product_number) as articles_count,
                sum(ssoi.quantity) as articles_quantity,
                max(IFNULL(ssoi.item_paused, 0)) as is_paused
             from spy_sales_order_item ssoi
                      inner join spy_oms_order_item_state soois
                                 on ssoi.fk_oms_order_item_state = soois.id_oms_order_item_state
                inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
             where soois.name like '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "'
                and ppz.id_picking_zone = " . $idZone . "
             group by ssoi.fk_sales_order
         ) so on sso.id_sales_order = so.fk_sales_order
        left outer join spy_customer sc on sso.customer_reference = sc.customer_reference
        left outer join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
        left outer join pyz_order_picking_block popb on sso.id_sales_order = popb.fk_sales_order
            and popb.fk_picking_zone = " . $idZone . "
    where sso.merchant_reference = '" . $merchantReference . "'
      and (popb.fk_user is null or so.is_paused = 1)
    ";

        $data = $this->getResult($sql);
        $days = [0 => "SO", 1 => "MO", 2 => "DI", 3 => "MI", 4 => "DO", 5 => "FR", 6 => "SA"];
        $transfer = new PickingHeaderTransfer();
        $transfer
            ->setIdZone($idZone)
            ->setIdUser($this->userFacade->getCurrentUser()->getIdUser());
        foreach ($data as $item) {
            $order = new PickingOrderTransfer();
            $order->fromArray($item, true);
            $timeSlot = $order->getTimeSlot();
            $index = substr($timeSlot, 0, 1);
            $timeSlot = $days[(int)$index] . substr($timeSlot, 1);
            $order->setTimeSlot($timeSlot);
            $transfer->addPickingOrders($item["id_order"], $order);
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
     *
     * @return bool
     */
    public function setContainerToOrder(PickingOrderTransfer $order, string $containerId, string $shelfId): bool
    {
        $transfer = $this->getTransferFromSession();
        $orderMod = $transfer->getOrder($order->getPickingPosition());
        $dataUpdated = false;
        foreach ($orderMod->getPickingContainers() as $container) {
            if ($container->getContainerID() == $containerId) {
                $container->setShelfID($shelfId);
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
                ->setPickingColor($orderMod->getPickingColor());
            $orderMod->addPickingContainer($containerId, $container);
            $dataUpdated = true;
        }
        //save data to pyz_picking_sales_order - PyzPickingSalesOrderQuery
        $containerEntity = PyzPickingSalesOrderQuery::create()
            ->filterByFkSalesOrder($orderMod->getIdOrder())
            ->filterByContainerCode($containerId)
            ->findOneOrCreate();
        $containerEntity->setFkPickingZone($transfer->getIdZone());
        if (!empty($shelfId)) {
            $containerEntity->setShelfCode($shelfId);
        }

        if ($containerEntity->isModified() || $containerEntity->isNew()) {
            $containerEntity->save();
        }

        $this->setTransferToSession($transfer);

        return $dataUpdated;
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

        $idList = $this->getOrderItemIdArray($orderItem);
        $counter = 0;
        $pickedItems = [];
        $nonPickedItems = [];
        foreach ($idList as $id) {
            if ($counter < $orderItem->getQuantityPicked()) {
                $counter++;
                array_push($pickedItems, $id);
            } else {
                array_push($nonPickedItems, $id);
            }
        }
        if (count($pickedItems) > 0) {
            $this->resetCanceledStatusForCanceledItems($pickedItems);
            $this->orderUpdater->markOrderItemsAsContainerSelected($pickedItems);
            $this->orderUpdater->markOrderItemsAsPicked($pickedItems);
        }
        if (count($nonPickedItems) > 0) {
            $this->orderUpdater->markOrderItemsAsNotPicked($nonPickedItems);
        }
        if ($weight > 0) {
            $this->updateOrderItemWeight($orderItem);
        }
        if ($orderItem->getIsPaused()) {
            $orderItem->setIsPaused(false);
            $this->saveCurrentOrderItemPaused($orderItem, false);
            $transfer->updateItemsPickedCount();
        }
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
            $this->saveCurrentOrderItemPaused($orderItem, $isPaused);
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
        $idList = $this->getOrderItemIdArray($orderItem);
        $paused = $isPaused ? 1 : 0;
        if (count($idList) > 0) {
            $whereList = implode($idList, ",");
            $qry = "update spy_sales_order_item set item_paused = " . $paused . " where id_sales_order_item in(" . $whereList . ")";
            $this->getResult($qry, false);
        }

        return true;
    }

    /**
     * @param array $pickedItems
     *
     * @return void
     */
    private function resetCanceledStatusForCanceledItems(array $pickedItems): void
    {
        $qry = "select id_oms_order_item_state as id from spy_oms_order_item_state where name = '" . OmsConfig::STORE_STATE_READY_FOR_PICKING . "'";
        $data = $this->getResult($qry);
        if (count($data) > 0) {
            $whereList = implode($pickedItems, ",");
            $idState = $data[0]["id"];
            $qry = "update spy_sales_order_item set fk_oms_order_item_state = " . $idState . " where id_sales_order_item in(" . $whereList . ") and fk_oms_order_item_state <> " . $idState;
            $this->getResult($qry, false);
        }
    }

    /**
     * @param bool $isCanceled
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled): bool
    {
        $transfer = $this->getTransferFromSession();
        if ($transfer->setCurrentOrderItemCanceled($isCanceled)) {
            //save data to spy_sales_order_item - SpySalesOrderItemQuery

            $orderItem = $transfer->getOrderItem($transfer->getLastPickingItemPosition());
            if ($orderItem->getIsPaused()) {
                $orderItem->setIsPaused(false);
                $this->saveCurrentOrderItemPaused($orderItem, false);
            }
            $idList = $this->getOrderItemIdArray($orderItem);
            if (count($idList) > 0) {
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
        $sql = "select sso.id_sales_order as id_order,
               sso.order_reference,
               max(ssoi.id_sales_order_item) as id_order_item,
               sp.id_product,
               sp.product_number as ean,
               ssoi.alternative_ean,
               count(*) as quantity,
               sum(case when sit.name = '" . OmsConfig::STORE_STATE_PICKED . "' then ssoi.quantity else 0 end) as quantityPicked,
               IF(sum(case when sit.name = '" . OmsConfig::STATE_TYPE_FLAG_CANCELLED . "' then 1 else 0 end) > 0, 1, 0) as is_cancelled,
               ssoi.price,
               ssoi.base_price_unit as price_unit,
               ssoi.price_per_kg,
               sum(ssoi.price) as sum_price,
               ssoi.name,
               ssoi.brand as brand_name,
               ssoi.weight_per_unit as weight,
               IFNULL(ssoi.item_paused, 0) as is_paused,
               MAX(spi.external_url_small) as picture_url,
               ssoi.sequence,
               ssoi.shelf,
               ssoi.shelf_floor,
               ssoi.shelf_field,
               ssoi.aisle,
               sit.name as status,
               MAX(ssoi.picked_at) as last_picked_at,
               MAX(ssoi.weight_per_unit) * SUM(ssoi.quantity) * 0.8 as min_weight,
               MAX(ssoi.weight_per_unit) * SUM(ssoi.quantity) * 1.2 as max_weight,
               MAX(ssoi.weight_per_unit) * SUM(ssoi.quantity) as total_weight
        from spy_sales_order sso
            inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
            inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
            inner join spy_product sp on ssoi.product_number = sp.product_number
            inner join spy_oms_order_item_state sit on ssoi.fk_oms_order_item_state = sit.id_oms_order_item_state
            left outer join spy_product_image_set spis on sp.id_product = spis.fk_product
            left outer join spy_product_image_set_to_product_image spistpi on spis.id_product_image_set = spistpi.fk_product_image_set
                and spistpi.sort_order = (select min(s1.sort_order) from spy_product_image_set_to_product_image s1 where s1.fk_product_image_set = spis.id_product_image_set)
            left outer join spy_product_image spi on spistpi.fk_product_image = spi.id_product_image
         where sso.id_sales_order in(" . $whereList . ")
            and ppz.id_picking_zone = " . $idZone . "
         group by sso.id_sales_order,
           sso.order_reference,
           sp.id_product,
           sp.product_number,
           ssoi.alternative_ean,
           ssoi.quantity_base_measurement_unit_name,
           ssoi.price,
           ssoi.base_price_unit,
           ssoi.price_per_kg,
           ssoi.name,
           ssoi.brand,
           ssoi.weight_per_unit,
           ssoi.item_paused,
           ssoi.sequence,
           ssoi.shelf,
           ssoi.shelf_floor,
           ssoi.shelf_field,
           ssoi.aisle,
           sit.name";

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
                ppso.fk_picking_zone as id_zone
            from pyz_picking_sales_order ppso
                left outer join pyz_order_picking_block popb on ppso.fk_sales_order = popb.fk_sales_order and ppso.fk_picking_zone = popb.fk_picking_zone
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
}
