<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Delivery\Business;

interface DeliveryFacadeInterface
{
    /**
     * @param array $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsDeliveryStarted(array $idSalesOrderItems): void;

    /**
     * @param array $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsDelivered(array $idSalesOrderItems): void;

    /**
     * @param array $idSalesOrderItems
     *
     * @return void
     */
    public function markOrderItemsAsDeliveryCancelledByCustomer(array $idSalesOrderItems): void;
}
