<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\StoreOrder\Business\Reader;

use Generated\Shared\Transfer\UserTransfer;

interface StoreOrderReaderInterface
{
    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array;

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    public function findSelectedDeliveryMerchantSalesOrders(UserTransfer $userTransfer): array;
}
