<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;

class TrueConditionPlugin extends AbstractCondition
{
    /**
     * @inheritDoc
     */
    public function check(SpySalesOrderItem $orderItem): bool
    {
        return true;
    }
}
