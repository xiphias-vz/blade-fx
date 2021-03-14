<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Transfer;

use Generated\Shared\Transfer\PickingColorTransfer;
use Generated\Shared\Transfer\PickingContainerTransfer;
use Generated\Shared\Transfer\PickingOrderItemTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;

class PickingHeaderTransferMockData
{
    /**
     * @var int
     */
    protected $ordersCount;

    /**
     * @var int
     */
    protected $itemsPerOrderCount;

    /**
     * @var array
     */
    protected $colors;

    /**
     * @param int $ordersCount
     * @param int $itemsPerOrderCount
     */
    public function __construct(int $ordersCount, int $itemsPerOrderCount)
    {
        $this->ordersCount = $ordersCount;
        $this->itemsPerOrderCount = $itemsPerOrderCount;
        $this->colors = $this->getPickingColorTransfer();
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getData(): PickingHeaderTransfer
    {
        $head = $this->getHeader();
        $head->setColors($this->colors);
        $head->recalculateAll();

        return $head;
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getDataWithContainers(): PickingHeaderTransfer
    {
        $head = $this->getHeader();
        $i = 1;
        foreach ($head->getPickingOrders() as $order) {
            $cont = new PickingContainerTransfer();
            $cont->setIdContainer($i)
                ->setContainerID("A2342099" . $i)
                ->setIdOrder($order->getIdOrder());
            $order->addPickingContainer($cont->getIdContainer(), $cont);
            $i++;
        }
        $head->setColors($this->colors);
        $head->recalculateAll();

        return $head;
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getHeader(): PickingHeaderTransfer
    {
        $trans = new PickingHeaderTransfer();
        $this->setOrders($trans, []);

        return $trans;
    }

    /**
     * @param array $timeSlots
     *
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer
     */
    public function getHeaderWithTimeSlots(array $timeSlots): PickingHeaderTransfer
    {
        $trans = new PickingHeaderTransfer();
        $this->setOrders($trans, $timeSlots);

        return $trans;
    }

    /**
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $headerTransfer
     * @param array $timeSlots
     *
     * @return void
     */
    public function setOrders(PickingHeaderTransfer $headerTransfer, array $timeSlots)
    {
        if (count($timeSlots) == 0) {
            $timeSlots = ["12:00-14:00"];
        }

        for ($i = 1; $i <= $this->ordersCount; $i++) {
            $timeSlot = count($timeSlots) > $i ? $timeSlots[$i] : $timeSlots[0];
            $order = new PickingOrderTransfer();
            $order->setIdOrder($i)
                ->setOrderReference("000000" . $i)
                ->setCustomerName("Customer " . $i)
                ->setRequestedDeliveryDate($timeSlot)
                ->setTimeSlot($timeSlot)
                ->setIsChecked(false)
                ->setIsPaused(false)
                ->setState("ready for collection")
                ->setNote("note" . $i);
            $headerTransfer->addPickingOrders($i, $order);
            for ($i2 = 1; $i2 <= $this->itemsPerOrderCount; $i2++) {
                $item = new PickingOrderItemTransfer();
                $item->setIdOrder($order->getIdOrder())
                    ->setOrderReference($order->getOrderReference())
                    ->setIdOrderItem($i * 1000 + $i2)
                    ->setIdProduct($i2)
                    ->setEan("45450000" . $i2)
                    ->setQuantity($i)
                    ->setPrice(199)
                    ->setWeight($i2)
                    ->setName("Product " . $i2)
                    ->setIsPaused(false)
                    ->setSequence("1425000" . $i2)
                    ->setShelf("A" . $i2)
                    ->setShelfFloor("B" . $i2)
                    ->setShelfField("C" . $i2)
                    ->setAisle("23" . $i2)
                    ->setStatus("ready for collection")
                    ->setMinWeight(0)
                    ->setMaxWeight(100)
                    ->setTotalWeight(50)
                    ->setDoubleDigits(true);
                $order->addPickingOrderItem($item->getIdOrderItem(), $item);
            }
        }
    }

    /**
     * @return array
     */
    public function getPickingColorTransfer(): array
    {
        $colors = [];
        for ($i = 1; $i <= $this->ordersCount; $i++) {
            $color = new PickingColorTransfer();
            $color->setIdColor($i)
               ->setForeColor("#F" . $i . "AC" . $i)
               ->setBackColor("#333333")
               ->setCircleColor("#333333");
            array_push($colors, $color);
        }

        return $colors;
    }
}
