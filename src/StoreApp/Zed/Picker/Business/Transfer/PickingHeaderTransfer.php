<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Transfer;

use Generated\Shared\Transfer\PickingContainerTransfer;
use Generated\Shared\Transfer\PickingHeaderTransfer as SpyPickingHeaderTransfer;
use Generated\Shared\Transfer\PickingOrderItemTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;

class PickingHeaderTransfer extends SpyPickingHeaderTransfer
{
    /**
     * @returns void
     *
     * @return void
     */
    public function recalculateAll()
    {
        //$this->setParents();
        $this->recalculateArticlesCount();
        $this->recalculatePickingPosition();
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
     * @returns void
     *
     * @return void
     */
    public function recalculateArticlesCount(): void
    {
        if (!empty($this->getPickingOrders())) {
            $ordersCount = 0;
            $articlesCountTotal = 0;
            $articlesQuantityTotal = 0;
            foreach ($this->getPickingOrders() as $order) {
                $ordersCount++;
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
            foreach ($this->getPickingOrders() as $order) {
                $orderPosition++;
                $order->setPickingPosition($orderPosition);
                foreach ($order->getPickingOrderItems() as $orderItem) {
                    $orderItem->setPickingPosition($orderPosition);
                    $sequence = $orderItem->getSequence();
                    if (empty($sequence)) {
                        $sequence = $orderItem->getShelf() . $orderItem->getShelfField() . $orderItem->getShelfFloor();
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
     * @param int $oldPosition
     *
     * @return \Generated\Shared\Transfer\PickingOrderItemTransfer|null
     */
    public function getNextOrderItem(int $oldPosition): ?PickingOrderItemTransfer
    {
        if ($oldPosition == 0 && $this->getLastPickingItemPosition() > 0) {
            $oldPosition = $this->getLastPickingItemPosition();
        }
        foreach ($this->getPickingOrders() as $order) {
            foreach ($order->getPickingOrderItems() as $orderItem) {
                if ($orderItem->getPickingItemPosition() == $oldPosition + 1) {
                    $this->setLastPickingItemPosition($orderItem->getPickingItemPosition());

                    return $orderItem;
                }
            }
        }

        return null;
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
                    return $orderItem;
                }
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
            $key = empty($order->getTimeSlot()) ? "0" : $order->getTimeSlot();
            if (count(array_keys($keys, $key)) === 0) {
                array_push($keys, $key);
                array_push($items, []);
            }
        }
        $result = array_combine($keys, $items);
        foreach ($this->getPickingOrders() as $order) {
            array_push($result[$order->getTimeSlot()], $order);
        }
        ksort($result);

        return $result;
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
     * @param \Generated\Shared\Transfer\PickingOrderItemTransfer $item
     *
     * @return void
     */
    public function addOrderItemToTransfer(PickingOrderItemTransfer $item)
    {
        foreach ($this->getPickingOrders() as $order) {
            if ($order->getIdOrder() == $item->getIdOrder()) {
                $order->addPickingOrderItem($item->getIdOrderItem(), $item);

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
     *
     * @return void
     */
    public function setCurrentOrderItemPicked(int $quantityPicked): void
    {
        $orderItem = $this->getOrderItem($this->getLastPickingItemPosition());
        $orderItem->setQuantityPicked($quantityPicked);
    }

    /**
     * @param bool $isPaused
     *
     * @return void
     */
    public function setCurrentOrderItemPaused(bool $isPaused): void
    {
        $this->setParents(false);
        $orderItem = $this->getOrderItem($this->getLastPickingItemPosition());
        $orderItem->setIsPaused($isPaused);
        $orderItem->getParent()->setIsPaused($isPaused);
        $this->setParents(true);
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
}
