<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CancelledItems\Business;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\CancelledItems\Business\CancelledItemsBusinessFactory getFactory()
 */
class CancelledItemsFacade extends AbstractFacade implements CancelledItemsFacadeInterface
{
    /**
     * @param int $idSalesOrder
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return void
     */
    public function cancelItemsInSalesOrder(int $idSalesOrder, array $orderItems): void
    {
        $this->getFactory()
            ->createSalesOrderCalculator()
            ->cancelItemsInSalesOrder($idSalesOrder, $orderItems);
    }

    /**
     * @inheritDoc
     */
    public function getCancelledItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array
    {
        return $this->getFactory()
            ->createItemFilter()
            ->filterOutAvailableItemsFromSalesOrder($salesOrderTransfer);
    }

    /**
     * @inheritDoc
     */
    public function getAvailableItemsFromSalesOrder(OrderTransfer $salesOrderTransfer): array
    {
        return $this->getFactory()
            ->createItemFilter()
            ->filterOutCancelledItemsFromSalesOrder($salesOrderTransfer);
    }
}
