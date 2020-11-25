<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderItemChangeRequestTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use InvalidArgumentException;
use StoreApp\Zed\Picker\Communication\Form\OrderItemSelectionForm;

class FormDataMapper implements FormDataMapperInterface
{
    /**
     * @param array $formData
     * @param string $fieldNamePrefix
     *
     * @return int[]
     */
    public function mapFormDataToSelectedQuantityMap(array $formData, string $fieldNamePrefix): array
    {
        $skuToPickedQuantityMap = [];

        $pattern = '/' . $fieldNamePrefix . '(.+)/';

        foreach ($formData as $fieldName => $fieldValue) {
            $matches = [];
            if (preg_match($pattern, $fieldName, $matches) === false || empty($matches)) {
                continue;
            }

            $skuToPickedQuantityMap[$matches[1]] = $fieldValue;
        }

        return $skuToPickedQuantityMap;
    }

    /**
     * @param array $formData
     * @param string $fieldNamePrefix
     *
     * @return int[]
     */
    public function mapFormDataToSelectedWeightMap(array $formData, string $fieldNamePrefix): array
    {
        $skuToWeightMap = [];

        $pattern = '/' . $fieldNamePrefix . '(.+)/';

        foreach ($formData as $fieldName => $fieldValue) {
            $matches = [];
            if (preg_match($pattern, $fieldName, $matches) === false || empty($matches)) {
                continue;
            }

            $skuToWeightMap[$matches[1]] = $fieldValue;
        }

        return $skuToWeightMap;
    }

    /**
     * @param array $formData
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function mapFormDataToPickingSalesOrderCollection(
        array $formData,
        OrderTransfer $salesOrderTransfer,
        PickingZoneTransfer $pickingZoneTransfer
    ): PickingSalesOrderCollectionTransfer {
        $pickingSalesOrderCollectionTransfer = new PickingSalesOrderCollectionTransfer();
        foreach ($formData[OrderItemSelectionForm::FIELD_SALES_ORDER_CONTAINERS] as $pickingSalesOrderTransfer) {
            /** @var \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer */
            $pickingSalesOrderTransfer->setIdSalesOrder($salesOrderTransfer->getIdSalesOrder());
            $pickingSalesOrderTransfer->setIdPickingZone($pickingZoneTransfer->getIdPickingZone());
            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer;
    }

    /**
     * @param array $containerIdToShelfCodeMap
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function mapContainersToShelves(
        array $containerIdToShelfCodeMap,
        OrderTransfer $salesOrderTransfer,
        PickingZoneTransfer $pickingZoneTransfer
    ): PickingSalesOrderCollectionTransfer {
        $pickingSalesOrderCollectionTransfer = new PickingSalesOrderCollectionTransfer();

        foreach ($containerIdToShelfCodeMap as $containerCode => $shelfCode) {
            $pickingSalesOrderTransfer = new PickingSalesOrderTransfer();
            $pickingSalesOrderTransfer->setContainerCode($containerCode);
            $pickingSalesOrderTransfer->setShelfCode($shelfCode);
            $pickingSalesOrderTransfer->setIdSalesOrder($salesOrderTransfer->getIdSalesOrder());
            $pickingSalesOrderTransfer->setIdPickingZone($pickingZoneTransfer->getIdPickingZone());

            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer;
    }

    /**
     * @param array $formData
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param array $selectedIdSalesOrderItems
     * @param string $fieldNamePrefix
     *
     * @return \Generated\Shared\Transfer\OrderChangeRequestTransfer
     */
    public function mapFormDataToOrderItemChangeRequest(
        array $formData,
        OrderTransfer $salesOrderTransfer,
        array $selectedIdSalesOrderItems,
        string $fieldNamePrefix
    ): OrderChangeRequestTransfer {
        $orderChangeRequest = new OrderChangeRequestTransfer();
        $orderChangeRequest->setFkSalesOrder($salesOrderTransfer->getIdSalesOrder());

        $pattern = '/' . $fieldNamePrefix . '(.+)/';

        foreach ($formData as $fieldName => $fieldValue) {
            if (preg_match($pattern, $fieldName, $matches) === false || empty($matches)) {
                continue;
            }

            $orderItemChangeRequest = new OrderItemChangeRequestTransfer();

            $sku = $matches[1];
            $newWeight = $fieldValue;

            $itemTransfer = $this->findItemInOrder($salesOrderTransfer, $sku, $selectedIdSalesOrderItems);

            $newPrice = (int)($newWeight * $itemTransfer->getPricePerKg() / 1000);

            $orderItemChangeRequest->setQuantity($itemTransfer->getQuantity());
            $orderItemChangeRequest->setPrice($newPrice);
            $orderItemChangeRequest->setNewWeight($newWeight);
            $orderItemChangeRequest->setIdSalesOrderItem($itemTransfer->getIdSalesOrderItem());

            $orderChangeRequest->addOrderItemChangeRequest($orderItemChangeRequest);
        }

        return $orderChangeRequest;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param string $sku
     * @param array $selectedIdSalesOrderItems
     *
     * @throws \InvalidArgumentException
     *
     * @return \Generated\Shared\Transfer\ItemTransfer
     */
    private function findItemInOrder(
        OrderTransfer $salesOrderTransfer,
        string $sku,
        array $selectedIdSalesOrderItems
    ): ItemTransfer {
        $sumQuantity = 0;
        $sumPrice = 0;
        $sumWeightPerUnit = 0;
        $selectedItemTransfer = null;

        foreach ($salesOrderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getSku() === $sku) {
                $sumQuantity += $itemTransfer->getQuantity();
                $sumPrice += $itemTransfer->getSumGrossPrice();
                $sumWeightPerUnit += $itemTransfer->getWeightPerUnit();
            }

            if ($itemTransfer->getSku() === $sku && in_array($itemTransfer->getIdSalesOrderItem(), $selectedIdSalesOrderItems)) {
                $selectedItemTransfer = $itemTransfer;
            }
        }

        if (!$selectedItemTransfer) {
            throw new InvalidArgumentException('No item found for sku ' . $sku);
        }

        $selectedItemTransfer->setQuantity($sumQuantity);
        $selectedItemTransfer->setSumGrossPrice($sumPrice);
        $selectedItemTransfer->setWeightPerUnit($sumWeightPerUnit);

        return $selectedItemTransfer;
    }
}
