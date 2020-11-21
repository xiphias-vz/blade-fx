<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Updater;

interface OrderUpdaterInterface
{
    /**
     * @param int[] $idOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsPicked(array $idOrderItems): void;

    /**
     * @param int[] $idOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsContainerSelected(array $idOrderItems): void;

    /**
     * @param int[] $idOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsNotPicked(array $idOrderItems): void;

    /**
     * @param int[] $idOrderItems
     * @param int $idUser
     *
     * @return void
     */
    public function markOrderItemsAsCollectedByCustomer(array $idOrderItems, int $idUser): void;

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
