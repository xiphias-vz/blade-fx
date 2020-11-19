<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Sales\Business\Order\OrderReaderInterface as SprykerOrderReaderInterface;

interface OrderReaderInterface extends SprykerOrderReaderInterface
{
    /**
     * @param int $idSalesOrder
     * @param string $pickingZoneName
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByIdSalesOrderAndPickingZone(int $idSalesOrder, string $pickingZoneName): ?OrderTransfer;
}
