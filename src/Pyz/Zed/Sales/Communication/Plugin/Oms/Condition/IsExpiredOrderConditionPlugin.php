<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;

/**
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 */
class IsExpiredOrderConditionPlugin extends AbstractCondition
{
    /**
     * @var array
     */
    private static $orderCheckResult = [];

    /**
     * @inheritDoc
     */
    public function check(SpySalesOrderItem $orderItem): bool
    {
        $idSalesOrder = $orderItem->getFkSalesOrder();

        if (isset(static::$orderCheckResult[$idSalesOrder])) {
            return static::$orderCheckResult[$idSalesOrder];
        }

        $order = $orderItem->getOrder();

        $requestedDeliveryDate = $order->getSpySalesShipments()[0]->getRequestedDeliveryDate();

        static::$orderCheckResult[$idSalesOrder] = $this->getFacade()
            ->isRequestedOrderDatePassed(
                $requestedDeliveryDate,
                $this->getConfig()->getOrderExpireHour()
            );

        return static::$orderCheckResult[$idSalesOrder];
    }
}
