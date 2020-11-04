<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Persistence;

use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Spryker\Zed\MerchantSalesOrder\Persistence\MerchantSalesOrderEntityManagerInterface as SprykerMerchantSalesOrderEntityManagerInterface;

interface MerchantSalesOrderEntityManagerInterface extends SprykerMerchantSalesOrderEntityManagerInterface
{
    /**
     * @param int $idSalesOrder
     * @param \Generated\Shared\Transfer\OrderUpdateRequestTransfer $orderUpdateRequestTransfer
     *
     * @return bool
     */
    public function updateOrderWithOrderUpdateRequest(int $idSalesOrder, OrderUpdateRequestTransfer $orderUpdateRequestTransfer): bool;
}
