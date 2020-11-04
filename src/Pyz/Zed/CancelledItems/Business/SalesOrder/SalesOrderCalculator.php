<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CancelledItems\Business\SalesOrder;

use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Pyz\Zed\Payment\Business\PaymentFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Calculation\Business\CalculationFacadeInterface;

class SalesOrderCalculator
{
    /**
     * @var \Spryker\Zed\Calculation\Business\CalculationFacadeInterface
     */
    private $calculationFacade;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    private $salesFacade;

    /**
     * @var \Pyz\Zed\Payment\Business\PaymentFacadeInterface
     */
    private $paymentFacade;

    /**
     * @param \Spryker\Zed\Calculation\Business\CalculationFacadeInterface $calculationFacade
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Pyz\Zed\Payment\Business\PaymentFacadeInterface $paymentFacade
     */
    public function __construct(
        CalculationFacadeInterface $calculationFacade,
        SalesFacadeInterface $salesFacade,
        PaymentFacadeInterface $paymentFacade
    ) {
        $this->calculationFacade = $calculationFacade;
        $this->salesFacade = $salesFacade;
        $this->paymentFacade = $paymentFacade;
    }

    /**
     * @param int $idSalesOrder
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return void
     */
    public function cancelItemsInSalesOrder(int $idSalesOrder, array $orderItems): void
    {
        SpySalesOrderTableMap::clearInstancePool();

        $orderTransfer = $this->salesFacade->getOrderByIdSalesOrder($idSalesOrder);

        $orderTransfer = $this->markItemsAsCancelledBySalesOrderItemIds(
            $orderTransfer,
            $this->getCancelledSalesOrderItemIds($orderItems)
        );

        $orderTransfer = $this->calculationFacade->recalculateOrder($orderTransfer);

        $this->salesFacade->updateOrder($orderTransfer, $idSalesOrder);
        $this->updateSalesPayment($orderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return bool
     */
    protected function updateSalesPayment(OrderTransfer $orderTransfer): bool
    {
        return $this->paymentFacade->updateSalesPayment($orderTransfer);
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return int[]
     */
    private function getCancelledSalesOrderItemIds(array $orderItems): array
    {
        return array_reduce($orderItems, function (array $ids, SpySalesOrderItem $salesOrderItem) {
            $ids[] = $salesOrderItem->getIdSalesOrderItem();

            return $ids;
        }, []);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param int[] $salesOrderItemIds
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    private function markItemsAsCancelledBySalesOrderItemIds(OrderTransfer $orderTransfer, array $salesOrderItemIds): OrderTransfer
    {
        $remainingItemsCount = 0;
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if (in_array($itemTransfer->getIdSalesOrderItem(), $salesOrderItemIds)) {
                $itemTransfer->setCanceledAmount($itemTransfer->getCanceledAmount() + $itemTransfer->getRefundableAmount());
            }

            if ($itemTransfer->getCanceledAmount() < $itemTransfer->getRefundableAmount()) {
                $remainingItemsCount++;
            }
        }

        if ($remainingItemsCount) {
            return $orderTransfer;
        }

        return $this->markExpensesAsCancelled($orderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    private function markExpensesAsCancelled(OrderTransfer $orderTransfer): OrderTransfer
    {
        foreach ($orderTransfer->getExpenses() as $expenseTransfer) {
            $expenseTransfer->setCanceledAmount($expenseTransfer->getCanceledAmount() + $expenseTransfer->getRefundableAmount());
        }

        return $orderTransfer;
    }
}
