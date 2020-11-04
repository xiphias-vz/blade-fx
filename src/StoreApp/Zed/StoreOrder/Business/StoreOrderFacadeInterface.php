<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\StoreOrder\Business;

use Generated\Shared\Transfer\UserTransfer;

interface StoreOrderFacadeInterface
{
    /**
     * Specification:
     * - finds merchant sales orders ready for delivery
     * - filters for store statuses: ready, selected, delivered, cancelled
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array;

    /**
     * Specification:
     * - finds merchant sales orders for delivery assigned to a user
     * - filters for store statuses: selected, delivered, cancelled
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findSelectedDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array;
}
