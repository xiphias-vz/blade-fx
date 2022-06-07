<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Transfer;

use ArrayObject;
use Generated\Shared\Transfer\PickingContainerTransfer;
use Generated\Shared\Transfer\PickingHeaderTransfer as SpyPickingHeaderTransfer;
use Generated\Shared\Transfer\PickingOrderItemTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;
use Pyz\Shared\Oms\OmsConfig;

class PickingHeaderTransfer extends SpyPickingHeaderTransfer
{
    public const ERR_MESSAGE_ITEM_PICKED = 'Item already picked';
    public const ERR_MESSAGE_WRONG_CONTAINER = 'Wrong container';

    /**
     * @param bool $recalculateItems
     *
     * @return void
     */
    public function recalculateAll(bool $recalculateItems = true)
    {
        $this->recalculateArticlesCount($recalculateItems);
        $this->recalculatePickingPosition();
        if ($recalculateItems) {
            $this->updateItemsPickedCount();
        }
    }

    /**
     * @param array $colors
     *
     * @return void
     */
    public function setColors(array $colors): void
    {
        if (!empty($this->getPickingOrders())) {
            $i = 0;
            foreach ($this->getPickingOrders() as $order) {
                $order->setPickingColor($colors[$i]);
                foreach ($order->getPickingOrderItems() as $orderItem) {
                    $orderItem->setPickingColor($colors[$i]);
                }
                foreach ($order->getPickingContainers() as $container) {
                    $container->setPickingColor($colors[$i]);
                }
                $i++;
            }
        }
    }

    /**
     * @param bool $doRemove
     *
     * @return void
     */
    public function setParents(bool $doRemove = false): void
    {
        if (!empty($this->getPickingOrders())) {
            foreach ($this->getPickingOrders() as $order) {
                $order->setParent($doRemove ? null : $this);
                foreach ($order->getPickingOrderItems() as $orderItem) {
                    $orderItem->setParent($doRemove ? null : $order);
                }
                foreach ($order->getPickingContainers() as $container) {
                    $container->setParent($doRemove ? null : $order);
                }
            }
        }
    }

    /**
     * @param bool $recalculateItems
     *
     * @return void
     */
    public function recalculateArticlesCount(bool $recalculateItems = true): void
    {
        if (!empty($this->getPickingOrders())) {
            $ordersCount = 0;
            $articlesCountTotal = 0;
            $articlesQuantityTotal = 0;
            foreach ($this->getPickingOrders() as $order) {
                $ordersCount++;
                if ($recalculateItems) {
                    $articlesCount = 0;
                    $articlesQuantity = 0;
                    foreach ($order->getPickingOrderItems() as $orderItem) {
                        $articlesQuantity += $orderItem->getQuantity();
                        $articlesCount++;
                    }
                    $order->setArticlesCount($articlesCount);
                    $order->setArticlesQuantity($articlesQuantity);
                    $articlesCountTotal += $articlesCount;
                    $articlesQuantityTotal += $articlesQuantity;
                } else {
                    $articlesCountTotal += $order->getArticlesCount();
                    $articlesQuantityTotal += $order->getArticlesQuantity();
                }
            }
            $this->setArticlesCount($articlesCountTotal);
            $this->setArticlesQuantity($articlesQuantityTotal);
            $this->setOrdersCount($ordersCount);
        }
    }

    /**
     * @returns void
     *
     * @return void
     */
    public function recalculatePickingPosition(): void
    {
        if (!empty($this->getPickingOrders())) {
            $keys = [];
            $items = [];
            $orderPosition = 0;
            $pattern = "/[^0]/i";
            foreach ($this->getPickingOrders() as $order) {
                $orderPosition++;
                $order->setPickingPosition($orderPosition);
                foreach ($order->getPickingOrderItems() as $orderItem) {
                    $orderItem->setPickingPosition($orderPosition);
                    $sequence = $orderItem->getSequence();
                    $sequenceShelf = $orderItem->getShelf() . $orderItem->getShelfFloor() . $orderItem->getShelfField();
                    if (empty($sequence)) {
                        $sequence = $sequenceShelf;
                    }
                    if (preg_match($pattern, $sequenceShelf) == 0) {
                        $sequence = "999999999";
                    }
                    $key = str_pad($sequence, 10, "0", STR_PAD_LEFT);
                    $key .= str_pad($orderItem->getIdProduct(), 8, "0", STR_PAD_LEFT);
                    $key .= str_pad($orderPosition, 3, "0", STR_PAD_LEFT);
                    array_push($keys, $key);
                    array_push($items, $orderItem);
                }
            }
            $result = array_combine($keys, $items);
            ksort($result);
            $pickingPosition = 0;
            foreach ($result as $item) {
                $pickingPosition++;
                $this->getOrderItemByItemId($item->getIdOrderItem())->setPickingItemPosition($pickingPosition);
            }
            $this->setMaxPickingItemPosition($pickingPosition);
        }
    }

    /**
     * @return void
     */
    public function removeNotPausedIfPausedExists(): void
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getIsPaused()) {
                $items = [];
                foreach ($order->getPickingOrderItems() as $orderItem) {
                    if ($orderItem->getIsPaused() || $orderItem->getStatus() == OmsConfig::STORE_STATE_READY_FOR_PICKING) {
                        $orderItem->setIsPaused(false);
                        array_push($items, $orderItem);
                    }
                }
                $order->setPickingOrderItems(new ArrayObject($items));
            }
        }
    }

    /**
     * @param int $oldPosition
     *
     * @return \Generated\Shared\Transfer\PickingOrderTransfer|null
     */
    public function getNextOrder(int $oldPosition): ?PickingOrderTransfer
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getPickingPosition() == $oldPosition + 1) {
                return $order;
            }
        }

        return null;
    }

    /**
     * @param int $position
     *
     * @return \Generated\Shared\Transfer\PickingOrderTransfer|null
     */
    public function getOrder(int $position): ?PickingOrderTransfer
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getPickingPosition() == $position) {
                return $order;
            }
        }

        return null;
    }

    /**
     * @param int $idOrder
     *
     * @return \Generated\Shared\Transfer\PickingOrderTransfer|null
     */
    public function getOrderById(int $idOrder): ?PickingOrderTransfer
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getIdOrder() == $idOrder) {
                return $order;
            }
        }

        return null;
    }

    /**
     * @return \Generated\Shared\Transfer\PickingOrderTransfer|null
     */
    public function getCurrentOrder(): ?PickingOrderTransfer
    {
        return $this->getOrderById($this->getOrderItem($this->getLastPickingItemPosition())->getIdOrder());
    }

    /**
     * @param int $oldPosition
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getNextOrderItem(int $oldPosition): ?PickingOrderItemTransfer
    {
        if ($oldPosition == 0 && $this->getLastPickingItemPosition() > 0) {
            $oldPosition = $this->getLastPickingItemPosition();
        }
        $orderItem = null;
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItemN) {
                if ($orderItemN->getPickingItemPosition() == $oldPosition + 1) {
                    $this->setLastPickingItemPosition($orderItemN->getPickingItemPosition());
                    $orderItem = $orderItemN;
                    $orderItem->setIsSubstitutionAllowedOnOrder($order->getIsSubstitutionAllowed());
                }
            }
        }
        if ($orderItem == null) {
            $orderItem = $this->getFirstNonPickedOrderItem();
            if ($orderItem != null) {
                $this->setLastPickingItemPosition($orderItem->getPickingItemPosition());
            }
        }

        return $orderItem;
    }

    /**
     * @param int $position
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getOrderItem(int $position): ?PickingOrderItemTransfer
    {
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItem) {
                if ($orderItem->getPickingItemPosition() == $position) {
                    $orderItem->setIsSubstitutionAllowedOnOrder($order->getIsSubstitutionAllowed());

                    return $orderItem;
                }
            }
        }

        return null;
    }

    /**
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getFirstNonPickedOrderItem(): ?PickingOrderItemTransfer
    {
        $oldPosition = $this->getLastPickingItemPosition();
        $maxPosition = $this->getMaxPickingItemPosition();
        $orderItemResult = null;
        for ($i = 1; $i <= $maxPosition; $i++) {
            $orderItem = $this->getOrderItem($i);
            if ($orderItem->getQuantityPicked() == 0
                && !$orderItem->getIsPaused()
                && !$orderItem->getIsCancelled()) {
                if ($orderItemResult == null) {
                    $orderItemResult = $orderItem;
                    if ($i > $oldPosition) {
                        break;
                    }
                } else {
                    if ($i > $oldPosition) {
                        $orderItemResult = $orderItem;
                        break;
                    }
                }
            }
        }

        return $orderItemResult;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $orderItem
     *
     * @return \Generated\Shared\Transfer\PickingOrderTransfer|null
     */
    public function getOrderItemOrder(PickingOrderItemTransfer $orderItem): ?PickingOrderTransfer
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getIdOrder() == $orderItem->getIdOrder()) {
                return $order;
            }
        }

        return null;
    }

    /**
     * @param int $idOrderItem
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getOrderItemByItemId(int $idOrderItem): ?PickingOrderItemTransfer
    {
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItem) {
                if ($orderItem->getIdOrderItem() == $idOrderItem) {
                    return $orderItem;
                }
            }
        }

        return null;
    }

    /**
     * @param int $position
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer[]
     */
    public function getOrderItems(int $position): array
    {
        $keys = [];
        $items = [];
        $currentItem = $this->getOrderItem($position);
        if ($currentItem) {
            $idProduct = $currentItem->getIdProduct();
            foreach ($this->getPickingOrders() as $order) {
                foreach ($order->getPickingOrderItems() as $orderItem) {
                    if ($orderItem->getIdProduct() == $idProduct) {
                        array_push($keys, $orderItem->getPickingItemPosition());
                        array_push($items, $orderItem);
                    }
                }
            }
        }
        $result = array_combine($keys, $items);
        ksort($result);

        return array_values($result);
    }

    /**
     * @param int $position
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer[]
     */
    public function getOrderItemsExtended(int $position): array
    {
        $items = $this->getOrderItems($position);
        $result = [];
        foreach ($items as $item) {
            $result[] = $this->convertItemToExtended($item);
        }

        return $result;
    }

    /**
     * @return array
     */
    public function getOrderItemsByAisle(): array
    {
        $keys = [];
        $items = [];
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItem) {
                $key = empty($orderItem->getAisle()) ? "0" : $orderItem->getAisle();
                if (count(array_keys($keys, $key)) === 0) {
                    array_push($keys, $key);
                    array_push($items, []);
                }
            }
        }
        $result = array_combine($keys, $items);
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItem) {
                array_push($result[$orderItem->getAisle()], $orderItem);
            }
        }
        ksort($result);

        return $result;
    }

    /**
     * @return array
     */
    public function getOrdersByTimeSlot(): array
    {
        $keys = [];
        $items = [];
        foreach ($this->getPickingOrders() as $order) {
            $key = $order->getTimeSlotSort() . " " . $order->getTimeSlot();
            if (count(array_keys($keys, $key)) === 0) {
                array_push($keys, $key);
                array_push($items, []);
            }
        }
        $result = array_combine($keys, $items);
        foreach ($this->getPickingOrders() as $order) {
            $key = $order->getTimeSlotSort() . " " . $order->getTimeSlot();
            array_push($result[$key], $order);
        }
        ksort($result);

        return $result;
    }

    /**
     * @return array
     */
    public function getGroupedOrderItems(): array
    {
        $itemsCount = $this->getMaxPickingItemPosition();
        $idProduct = "0";
        $counter = 0;
        $items = [];
        $this->setParents();
        for ($i = 1; $i <= $itemsCount; $i++) {
            $orderItem = $this->getOrderItem($i);
            if ($idProduct != $orderItem->getIdProduct()) {
                $counter++;
                $idProduct = $orderItem->getIdProduct();
                $items[$counter] = $orderItem;
                $items[$counter]["orders"] = [[
                    'idOrder' => $orderItem->getParent()->getIdOrder(),
                    'pickingPosition' => $orderItem->getParent()->getPickingPosition(),
                    'pickingColor' => $orderItem->getParent()->getPickingColor(),
                ]];
                $items[$counter]["isFullPicked"] = false;
                $items[$counter]["isPartiallyPicked"] = false;
                $items[$counter]["isCancelledStatus"] = false;
                $items[$counter]["isPausedStatus"] = false;
                $items[$counter]["counterOrder"] = 1;
                $items[$counter]["counterFullPicked"] = 0;
                $items[$counter]["counterPartiallyPicked"] = 0;
                $items[$counter]["counterCancelled"] = 0;
                $items[$counter]["counterPaused"] = 0;
                $items[$counter]["itemsQuantity"] = $orderItem->getQuantity();
            } else {
                $orders = $items[$counter]["orders"];
                $order =
                    [
                        'idOrder' => $orderItem->getParent()->getIdOrder(),
                        'pickingPosition' => $orderItem->getParent()->getPickingPosition(),
                        'pickingColor' => $orderItem->getParent()->getPickingColor(),
                    ];
                array_push($orders, $order);
                $items[$counter]["orders"] = $orders;
                $items[$counter]["counterOrder"] = $items[$counter]["counterOrder"] + 1;
                $items[$counter]["itemsQuantity"] = $items[$counter]["itemsQuantity"] + $orderItem->getQuantity();
            }
            if (($orderItem->getQuantity() == $orderItem->getQuantityPicked())
                || ($orderItem->getPricePerKg() > 0 && $orderItem->getQuantityPicked() == 1)) {
                $items[$counter]["counterFullPicked"] = $items[$counter]["counterFullPicked"] + 1;
            }
            if ($orderItem->getQuantityPicked() > 0 && $orderItem->getQuantity() > $orderItem->getQuantityPicked()) {
                $items[$counter]["counterPartiallyPicked"] = $items[$counter]["counterPartiallyPicked"] + 1;
            }
            if ($orderItem->getIsPaused()) {
                $items[$counter]["counterPaused"] = $items[$counter]["counterPaused"] + 1;
            }
            if ($orderItem->getIsCancelled()) {
                $items[$counter]["counterCancelled"] = $items[$counter]["counterCancelled"] + 1;
            }
        }
        foreach ($items as $item) {
            $counterOrder = $item["counterOrder"];
            $counterFullPicked = $item["counterFullPicked"];
            $counterPartiallyPicked = $item["counterPartiallyPicked"];
            $counterPaused = $item["counterPaused"];
            $counterCancelled = $item["counterCancelled"];
            if (($counterFullPicked + $counterPartiallyPicked + $counterPaused + $counterCancelled) > 0) {
                if ($counterFullPicked > 0) {
                    $item["isFullPicked"] = true;
                } elseif ($counterPartiallyPicked > 0) {
                    $item["isPartiallyPicked"] = true;
                } elseif ($counterCancelled > 0) {
                    $item["isCancelledStatus"] = true;
                } elseif ($counterPaused > 0) {
                    $item["isPausedStatus"] = true;
                }
            }
        }
        $this->setParents(true);

        return $items;
    }

    /**
     * @param int $position
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getOrderItemExtended(int $position): ?PickingOrderItemTransfer
    {
        return $this->convertItemToExtended($this->getOrderItem($position));
    }

    /**
     * @param int $oldPosition
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getNextOrderItemExtended(int $oldPosition): ?PickingOrderItemTransfer
    {
        $item = $this->getNextOrderItem($oldPosition);

        return $this->convertItemToExtended($item);
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer|null $item
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function convertItemToExtended(?PickingOrderItemTransfer $item): ?PickingOrderItemTransfer
    {
        if ($item) {
            if ($item->getIsSubstitutionFound()) {
                $item->setIsCancelled(true);
                $item->setIsPaused(false);
            }
            $item["isFullPicked"] = !$item->getIsPaused() && !$item->getIsCancelled() && ($item->getQuantityPicked() == $item->getQuantity() || ($item->getTotalWeight() > 0 && $item->getQuantityPicked() === 1 ));
            $item["isPartiallyPicked"] = !$item->getIsPaused() && !$item->getIsCancelled() && $item->getQuantityPicked() > 0 && $item->getQuantityPicked() < $item->getQuantity() && ($item->getTotalWeight() ?? 0) === 0;
            $item["isCancelledStatus"] = $item->getIsCancelled() || $item->getIsSubstitutionFound();
            $item["isPausedStatus"] = $item->getIsPaused();
            $item["counterOrder"] = 1;
            $item["counterFullPicked"] = $item["isFullPicked"] ? 1 : 0;
            $item["counterPartiallyPicked"] = $item["isPartiallyPicked"] ? 1 : 0;
            $item["counterCancelled"] = $item->getIsCancelled() ? 1 : 0;
            $item["counterPaused"] = $item->getIsPaused() ? 1 : 0;
            $item["itemsQuantity"] = $item->getQuantity();
        }

        return $item;
    }

    /**
     * @return array
     */
    public function getOrderList(): array
    {
        $orders = [];
        foreach ($this->getPickingOrders() as $order) {
            array_push($orders, $order);
        }

        return $orders;
    }

    /**
     * @return array
     */
    public function getIdOrderArray(): array
    {
        $array = [];
        foreach ($this->getPickingOrders() as $order) {
            array_push($array, $order->getIdOrder());
        }

        return $array;
    }

    /**
     * @return array
     */
    public function getContainersArray(): array
    {
        $array = [];

        foreach ($this->getPickingOrders() as $order) {
            array_push($array, $order->getPickingContainers());
        }

        return $array;
    }

    /**
     * @return bool
     */
    public function isLastItem(): bool
    {
        if ($this->getArticlesCount() == $this->getPickedArticlesCount() + 1) {
            return true;
        }

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $item
     *
     * @return void
     */
    public function addOrderItemToTransfer(PickingOrderItemTransfer $item)
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getIdOrder() == $item->getIdOrder()) {
                $order->addPickingOrderItem($item->getIdOrderItem(), $item);
                if ($item->getIsPaused()) {
                    $order->setIsPaused(true);
                }

                return;
            }
        }
    }

    /**
     * @param \Generated\Shared\Transfer\PickingContainerTransfer $item
     *
     * @return void
     */
    public function addContainerToTransfer(PickingContainerTransfer $item)
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getIdOrder() == $item->getIdOrder()) {
                $order->addPickingContainer($item->getIdContainer(), $item);

                return;
            }
        }
    }

    /**
     * @param int $quantityPicked
     * @param int $weight
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer
     */
    public function setCurrentOrderItemPicked(int $quantityPicked, int $weight): PickingOrderItemTransfer
    {
        $this->setErrorMessage(null);
        $orderItem = $this->getOrderItem($this->getLastPickingItemPosition());
        if ($weight > 0) {
            $orderItem->setTotalWeight($weight);
            $quantityPicked = 1;
        }
        $orderItem
            ->setIsCancelled(false)
            ->setQuantityPicked($quantityPicked);
        $this->updateItemsPickedCount();

        return $orderItem;
    }

    /**
     * @param bool $isPaused
     *
     * @return bool
     */
    public function setCurrentOrderItemPaused(bool $isPaused): bool
    {
        $this->setErrorMessage(null);
        $orderItem = $this->getOrderItem($this->getLastPickingItemPosition());

        $orderItem->setIsPaused($isPaused);
        if ($isPaused) {
            $orderItem->setQuantityPicked(0);
            $orderItem->setIsCancelled(false);
        }
        $this->getOrderItemOrder($orderItem)->setIsPaused($isPaused);
        $this->updateItemsPickedCount();

        return true;
    }

    /**
     * @param bool $isCanceled
     *
     * @return bool
     */
    public function setCurrentOrderItemCanceled(bool $isCanceled): bool
    {
        $this->setErrorMessage(null);
        $orderItem = $this->getOrderItem($this->getLastPickingItemPosition());
        $orderItem
            ->setIsCancelled($isCanceled)
            ->setQuantityPicked(0);
        $this->updateItemsPickedCount();

        return true;
    }

    /**
     * @param string $containerID
     *
     * @return bool
     */
    public function checkContainerForCurrentItem(string $containerID): bool
    {
        $this->setErrorMessage(null);
        $order = $this->getOrderItemOrder(
            $this->getOrderItem($this->getLastPickingItemPosition())
        );
        foreach ($order->getPickingContainers() as $container) {
            if ($container->getContainerID() == $containerID) {
                return true;
            }
        }
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingContainers() as $container) {
                if ($container->getContainerID() == $containerID) {
                    $msg = "Container: " . $containerID . " *
                        bereits Für Kunde " . $order->getCustomerName() . " *
                        Bestellung: " . $order->getOrderReference() . " genutzt";
                    $this->setErrorMessage($msg);

                    return false;
                }
            }
        }
        $msg = "Container: " . $containerID . " existiert nicht.";
        $this->setErrorMessage($msg);

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingOrderTransfer $order
     * @param bool $onlyContainersWithoutShelf
     *
     * @return \Generated\Shared\Transfer\PickingContainerTransfer[]
     */
    public function getOnlyCurrentUserAndZonePickingContainers(PickingOrderTransfer $order, bool $onlyContainersWithoutShelf)
    {
        $containers = [];
        foreach ($order->getPickingContainers() as $container) {
            if ($container->getIdZone() == $this->getIdZone()) {
                if ($onlyContainersWithoutShelf) {
                    if (empty($container->getShelfID())) {
                        array_push($containers, $container);
                    }
                } else {
                    array_push($containers, $container);
                }
            }
        }

        return $containers;
    }

    /**
     * @return void
     */
    public function updateItemsPickedCount(): void
    {
        $pickedItems = 0;
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItem) {
                if ($order->getIsPaused()) {
                    if ($orderItem->getIsCancelled() || $orderItem->getQuantityPicked() > 0) {
                        $pickedItems++;
                    }
                } else {
                    if ($orderItem->getIsCancelled() || $orderItem->getIsPaused() || $orderItem->getQuantityPicked() > 0) {
                        $pickedItems++;
                    }
                }
            }
        }
        $this->setPickedArticlesCount($pickedItems);
    }

    /**
     * @return void
     */
    public function updatePausedOrders(): void
    {
        foreach ($this->getPickingOrders() as $order) {
            $pausedItems = 0;
            foreach ($order->getPickingOrderItems() as $orderItem) {
                if ($order->getIsPaused()) {
                    $pausedItems++;
                }
            }
            $order->setIsPaused($pausedItems > 0);
        }
    }

    /**
     * Retuns object serialized to JSON
     *
     * @return string
     */
    public function toJson(): string
    {
        $this->setParents(true);

        return $this->serialize();
    }

    /**
     * Convert JSON to PickingHeaderTransfer object
     *
     * @param string $json
     *
     * @return self
     */
    public static function fromJson(string $json): self
    {
        $obj = new PickingHeaderTransfer();
        $obj->unserialize($json);
        $obj->setParents(false);

        return $obj;
    }

    /**
     * @param int|string $container
     *
     * @return array
     */
    public function getPickingOrderByContainer(string $container): array
    {
        $containers = [];
        $idOrder = 0;
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingContainers() as $pickingContainer) {
                if ($pickingContainer->getContainerID() == $container) {
                    $idOrder = $pickingContainer->getIdOrder();
                    break;
                }
            }
        }

        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingContainers() as $pickingContainer) {
                if ($pickingContainer->getIdOrder() == $idOrder) {
                    array_push($containers, $pickingContainer->toArray());
                }
            }
        }

        return $containers;
    }

    /**
     * @param int $position
     *
     * @return bool
     */
    public function resetCurrentOrderItemWeight(int $position): bool
    {
        $this->setErrorMessage(null);
        $orderItem = $this->getOrderItem($this->getLastPickingItemPosition());
        $orderItem
            ->setQuantityPicked(0);
        $this->updateItemsPickedCount();

        return true;
    }
}
