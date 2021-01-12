<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Mapper;

use Generated\Shared\Transfer\OrderChangeRequestTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;

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
     * @param string $fieldNamePrefix
     *
     * @return int[]
     */
    public function mapFormDataToSelectedWeightMap(array $formData, string $fieldNamePrefix): array;

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
    ): PickingSalesOrderCollectionTransfer;

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
    ): PickingSalesOrderCollectionTransfer;

    /**
     * @param array $formData
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param array $selectedIdSalesOrderItems
     * @param string $fieldNamePrefix
     * @param string $fieldItemsSkuPrefix
     *
     * @return \Generated\Shared\Transfer\OrderChangeRequestTransfer
     */
    public function mapFormDataToOrderItemChangeRequest(
        array $formData,
        OrderTransfer $salesOrderTransfer,
        array $selectedIdSalesOrderItems,
        string $fieldNamePrefix,
        string $fieldItemsSkuPrefix
    ): OrderChangeRequestTransfer;
}
