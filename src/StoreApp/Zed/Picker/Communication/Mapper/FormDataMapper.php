<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
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
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function mapFormDataToPickingSalesOrderCollection(array $formData, OrderTransfer $salesOrderTransfer): PickingSalesOrderCollectionTransfer
    {
        $pickingSalesOrderCollectionTransfer = new PickingSalesOrderCollectionTransfer();
        foreach ($formData[OrderItemSelectionForm::FIELD_SALES_ORDER_CONTAINERS] as $pickingSalesOrderTransfer) {
            /** @var \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer */
            $pickingSalesOrderTransfer->setIdSalesOrder($salesOrderTransfer->getIdSalesOrder());
            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer;
    }

    /**
     * @param array $containerIdToShelfCodeMap
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function mapContainersToShelves(array $containerIdToShelfCodeMap, OrderTransfer $salesOrderTransfer): PickingSalesOrderCollectionTransfer
    {
        $pickingSalesOrderCollectionTransfer = new PickingSalesOrderCollectionTransfer();

        foreach ($containerIdToShelfCodeMap as $containerCode => $shelfCode) {
            $pickingSalesOrderTransfer = new PickingSalesOrderTransfer();
            $pickingSalesOrderTransfer->setContainerCode($containerCode);
            $pickingSalesOrderTransfer->setShelfCode($shelfCode);
            $pickingSalesOrderTransfer->setIdSalesOrder($salesOrderTransfer->getIdSalesOrder());

            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer;
    }
}
