<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Generated\Shared\Transfer\OrderTransfer;

interface FormDataMapperInterface
{
    /**
     * @param array $formData
     * @param string $fieldNamePrefix
     *
     * @return int[]
     */
    public function mapFormDataToSelectedQuantityMap(array $formData, string $fieldNamePrefix): array;

    /**
     * @param array $formData
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderContainerCollectionTransfer
     */
    public function mapFormDataToOrderContainerCollection(array $formData, OrderTransfer $salesOrderTransfer): OrderContainerCollectionTransfer;
}
