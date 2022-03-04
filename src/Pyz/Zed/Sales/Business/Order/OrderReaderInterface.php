<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder;
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

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderWithPickingSalesOrdersByIdSalesOrder(int $idSalesOrder): ?OrderTransfer;

    /**
     * @param int $idSalesOrder
     *
     * @return \Orm\Zed\MerchantSalesOrder\Persistence\SpyMerchantSalesOrder
     */
    public function findMerchantSalesOrderByIdSalesOrder(int $idSalesOrder): SpyMerchantSalesOrder;

    /**
     * @param string $orderUid
     *
     * @return \Generated\Shared\Transfer\OrderTransfer|null
     */
    public function findOrderByOrderUid(string $orderUid): ?OrderTransfer;
}
