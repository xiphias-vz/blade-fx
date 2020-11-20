<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

interface PickerFacadeInterface
{
    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsPicked(array $idSalesOrderItems): void;

    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsContainerSelected(array $idSalesOrderItems): void;

    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsNotPicked(array $idSalesOrderItems): void;

    /**
     * @param int[] $idSalesOrderItems
     * @param int $idUser
     *
     * @return void
     */
    public function markOrderItemsAsCollectedByCustomer(array $idSalesOrderItems, int $idUser): void;

    /**
     * @param int $idSalesOrder
     * @param int $pickingBagsCount
     *
     * @return void
     */
    public function updateOrderPickingBagsCount(int $idSalesOrder, int $pickingBagsCount): void;

    /**
     * @param int[] $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsCanceledByCustomer(array $idSalesOrderItems): void;
}
