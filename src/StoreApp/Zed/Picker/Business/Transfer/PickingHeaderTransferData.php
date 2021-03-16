<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Transfer;

use ArrayObject;
use Generated\Shared\Transfer\PickingColorTransfer;
use Generated\Shared\Transfer\PickingContainerTransfer;
use Generated\Shared\Transfer\PickingOrderItemTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
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
     * @param \Spryker\Zed\Oms\Business\OmsFacadeInterface $omsFacade
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Symfony\Component\HttpFoundation\Session\Session $sessionService
     * @param \Spryker\Zed\User\Business\UserFacadeInterface $userFacade
     */
    public function __construct(
        OmsFacadeInterface $omsFacade,
        SalesFacadeInterface $salesFacade,
        Session $sessionService,
        UserFacadeInterface $userFacade
    ) {
        $this->omsFacade = $omsFacade;
        $this->salesFacade = $salesFacade;
        $this->sessionService = $sessionService;
        $this->userFacade = $userFacade;
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
      and popb.fk_user is null
    ";

        $data = $this->getResult($sql);
        $days = [1 => "SO", 2 => "MO", 3 => "DI", 4 => "MI", 5 => "DO", 6 => "FR", 7 => "SA"];
        $transfer = new PickingHeaderTransfer();
        $transfer->setIdZone($idZone);
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
                        //TODO save data to pyz_order_picking_block - PyzOrderPickingBlockQuery
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
                ->setPickingColor($orderMod->getPickingColor());
            $orderMod->addPickingContainer($containerId, $container);
            $dataUpdated = true;
        }
        //TODO save data to pyz_picking_sales_order - PyzPickingSalesOrderQuery
        $this->setTransferToSession($transfer);

        return $dataUpdated;
    }

    /**
     * @param int $quantityPicked
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked): void
    {
        $transfer = $this->getTransferFromSession();
        $transfer->setCurrentOrderItemPicked($quantityPicked);
        //TODO save data to spy_sales_order_item - SpySalesOrderItemQuery
        $this->setTransferToSession($transfer);
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
        //TODO save data to spy_sales_order_item - SpySalesOrderItemQuery
        $this->setTransferToSession($transfer);

        return $result;
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
        $sql = "select fk_sales_order as id_order,
                id_picking_sales_order as id_container,
                container_code as containerID,
                shelf_code as shelfID
            from pyz_picking_sales_order
            where fk_sales_order in (" . $whereList . ")";
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
            where popb.fk_picking_zone = " . $idZone . "
                and popb.fk_sales_order in(" . implode(",", $idOrderList) . ")";
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
     * @param string $sql
     *
     * @return array
     */
    private function getResult(string $sql): array
    {
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_NAMED);
    }
}
