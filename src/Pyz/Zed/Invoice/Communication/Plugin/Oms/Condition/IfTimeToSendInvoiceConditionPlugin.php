<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Communication\Plugin\Oms\Condition;

use DateInterval;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface;

/**
 * @method \Pyz\Zed\Invoice\Communication\InvoiceCommunicationFactory getFactory()
 * @method \Pyz\Zed\Invoice\Business\InvoiceFacadeInterface getFacade()
 * @method \Pyz\Zed\Invoice\InvoiceConfig getConfig()
 */
class IfTimeToSendInvoiceConditionPlugin extends AbstractPlugin implements ConditionInterface
{
    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
        $lastStateCreateAt = $orderItem->getStateHistories()->getLast()->getCreatedAt();

        $lastStateDateTime = $this->getFactory()
            ->getDateTimeWithZoneService()
            ->updateDateTimeWithStoreTimeZone($lastStateCreateAt);
        $lastStateDateTime->add(new DateInterval('P1D'))
            ->setTime($this->getConfig()->getInvoiceTimeHours(), 0, 0);

        $now = $this->getFactory()
            ->getDateTimeWithZoneService()
            ->getDateTimeInStoreTimeZone('now');

        return $lastStateDateTime < $now;
    }
}
