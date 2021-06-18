<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Pyz\Zed\Oms\Communication\Console\CheckConditionConsole;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;

/**
 * @method \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacadeInterface getFacade()
 * @method \Pyz\Zed\CashierOrderExport\Communication\CashierOrderExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 */
class WaitAllItemsInPickedOrCanceledStateConditionPlugin extends AbstractCondition
{
    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
        $orderTransfer = null;
        if (CheckConditionConsole::$ordersTransfers !== null) {
            foreach (CheckConditionConsole::$ordersTransfers as $transfer) {
                if ($transfer->getIdSalesOrder() === $orderItem->getFkSalesOrder()) {
                    $orderTransfer = $transfer;
                }
            }
        }
        if ($orderTransfer == null) {
            $orderTransfer = $this->getFactory()->getSalesFacade()->getOrderByIdSalesOrderWithoutExpand($orderItem->getFkSalesOrder());
            if (CheckConditionConsole::$ordersTransfers !== null) {
                CheckConditionConsole::$ordersTransfers[] = $orderTransfer;
            }
        }

        return $this->getFacade()->checkIsAllItemsReadyForExport($orderTransfer);
    }
}
