<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Communication\Plugin\Oms\Condition;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Pyz\Shared\Payone\PayoneTransactionStatusConstants;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface;

/**
 * @method \Pyz\Zed\Payone\Business\PayoneFacadeInterface getFacade()
 * @method \SprykerEco\Zed\Payone\Communication\PayoneCommunicationFactory getFactory()
 * @method \Pyz\Zed\Payone\PayoneConfig getConfig()
 */
class PartialCaptureIsApprovedConditionPlugin extends AbstractPlugin implements ConditionInterface
{
    /**
     * {@inheritDoc}
     * - Checks if payone order item status is `capture approved`.
     *
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem): bool
    {
        $payoneOrderItemStatus = $this->getFacade()
            ->findPayoneOrderItemStatus($orderItem->getFkSalesOrder(), $orderItem->getIdSalesOrderItem());

        return $payoneOrderItemStatus === PayoneTransactionStatusConstants::STATUS_CAPTURE_APPROVED;
    }
}
