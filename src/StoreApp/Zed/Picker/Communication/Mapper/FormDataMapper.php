<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Generated\Shared\Transfer\OrderTransfer;
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

            $skuToPickedQuantityMap[$matches[1]] = (int)$fieldValue;
        }

        return $skuToPickedQuantityMap;
    }

    /**
     * @param array $formData
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderContainerCollectionTransfer
     */
    public function mapFormDataToOrderContainerCollection(array $formData, OrderTransfer $salesOrderTransfer): OrderContainerCollectionTransfer
    {
        $orderContainerCollectionTransfer = new OrderContainerCollectionTransfer();
        foreach ($formData[OrderItemSelectionForm::FIELD_SALES_ORDER_CONTAINERS] as $orderContainerTransfer) {
            /**
             * @var \Generated\Shared\Transfer\OrderContainerTransfer $orderContainerTransfer
             */
            $orderContainerTransfer->setIdSalesOrder($salesOrderTransfer->getIdSalesOrder());
            $orderContainerCollectionTransfer->addOrderContainer($orderContainerTransfer);
        }

        return $orderContainerCollectionTransfer;
    }
}
