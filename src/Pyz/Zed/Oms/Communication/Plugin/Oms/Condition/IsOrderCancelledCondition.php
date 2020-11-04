<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface;

/**
 * @method \Pyz\Zed\Oms\OmsConfig getConfig()
 * @method \Pyz\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 */
class IsOrderCancelledCondition extends AbstractPlugin implements ConditionInterface
{
    /**
     * @inheritDoc
     */
    public function check(SpySalesOrderItem $orderItem): bool
    {
        return $this->getFacade()
            ->isOrderFlaggedCancelled($orderItem->getFkSalesOrder());
    }
}
