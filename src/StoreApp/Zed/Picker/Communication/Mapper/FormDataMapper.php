<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderItemChangeRequestTransfer;
use Generated\Shared\Transfer\OrderTransfer;

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
     * @param string $fieldNamePrefix
     *
     * @return \Generated\Shared\Transfer\OrderChangeRequestTransfer
     */
    public function mapFormDataToOrderItemChangeRequest(
        array $formData,
        OrderTransfer $salesOrderTransfer,
        string $fieldNamePrefix
    ): OrderChangeRequestTransfer {

        $orderChangeRequest = new OrderChangeRequestTransfer();
        $orderChangeRequest->setFkSalesOrder($salesOrderTransfer->getIdSalesOrder());

        $pattern = '/' . $fieldNamePrefix . '(.+)/';

        foreach ($formData as $fieldName => $fieldValue) {
            $matches = [];

            if (preg_match($pattern, $fieldName, $matches) === false || empty($matches)) {
                continue;
            }

            $orderItemChangeRequest = new OrderItemChangeRequestTransfer();

            $sku = $matches[1];
            $newWeight = $fieldValue;
        }

        return $orderChangeRequest;
    }
}
