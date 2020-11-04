<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Plugin\Oms\Condition;

use DateInterval;
use DateTime;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;

class Is1DayPassedConditionPlugin extends AbstractCondition
{
    /**
     * @inheritDoc
     */
    public function check(SpySalesOrderItem $orderItem): bool
    {
        return $orderItem->getCreatedAt()->add(new DateInterval('P1D')) < (new DateTime());
    }
}
