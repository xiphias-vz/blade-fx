<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;

/**
 * @method \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacadeInterface getFacade()
 * @method \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig getConfig()
 */
class IsOrderExportedToCashierConditionPlugin extends AbstractCondition
{
    /**
     * @var array
     */
    protected $orderCashierExportSuccess = [];

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
        if (!isset($this->orderCashierExportSuccess[$orderItem->getFkSalesOrder()])) {
            $this->orderCashierExportSuccess[$orderItem->getFkSalesOrder()] = $this->getFacade()->checkIsOrderExportedToCashierSuccessfully($orderItem->getFkSalesOrder());
        }

        return $this->orderCashierExportSuccess[$orderItem->getFkSalesOrder()];
    }
}
