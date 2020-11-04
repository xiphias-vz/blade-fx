<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Sales\Business\Model\Order\OrderUpdater as SprykerOrderUpdater;

class OrderUpdater extends SprykerOrderUpdater
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param int $idSalesOrder
     *
     * @return bool
     */
    public function update(OrderTransfer $orderTransfer, $idSalesOrder)
    {
        $orderEntity = $this->queryContainer
            ->querySalesOrderById($idSalesOrder)
            ->findOne();

        if (empty($orderEntity)) {
            return false;
        }

        $this->hydrateEntityFromOrderTransfer($orderTransfer, $orderEntity);
        $orderEntity->save();

        $this->updateOrderTotals($orderTransfer, $orderEntity);
        $this->updateOrderItems($orderTransfer, $orderEntity);
        $this->updateOrderExpenses($orderTransfer, $orderEntity);

        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     *
     * @return void
     */
    protected function updateOrderTotals(OrderTransfer $orderTransfer, SpySalesOrder $orderEntity)
    {
        $taxTotal = 0;
        if ($orderTransfer->getTotals()->getTaxTotal()) {
            $taxTotal = $orderTransfer->getTotals()->getTaxTotal()->getAmount();
        }

        $salesOrderTotalsEntity = $orderEntity->getOrderTotals()->getFirst();
        $salesOrderTotalsEntity->setFkSalesOrder($orderEntity->getIdSalesOrder());
        $salesOrderTotalsEntity->fromArray($orderTransfer->getTotals()->toArray());
        $salesOrderTotalsEntity->setTaxTotal($taxTotal);
        $salesOrderTotalsEntity->setCanceledTotal($orderTransfer->getTotals()->getCanceledTotal());
        $salesOrderTotalsEntity->setOrderExpenseTotal($orderTransfer->getTotals()->getExpenseTotal());
        $salesOrderTotalsEntity->save();
    }
}
