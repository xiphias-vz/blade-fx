<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Oms\Business\OmsFacade as SprykerOmsFacade;

/**
 * @method \Pyz\Zed\Oms\Business\OmsBusinessFactory getFactory()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 */
class OmsFacade extends SprykerOmsFacade implements OmsFacadeInterface
{
    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancellableByCustomer($idOrder): bool
    {
        return $this->getFactory()
            ->createOrderStateMachineFinder()
            ->isOrderFlaggedCancellableByCustomer($idOrder);
    }

    /**
     * @param string $eventId
     * @param int[] $orderItemIds
     * @param array $data
     *
     * @return int
     */
    public function triggerEventForOrderItemsAndCountProcessed($eventId, array $orderItemIds, array $data = []): int
    {
        return $this->getFactory()
            ->createLockedOrderStateMachine()
            ->triggerEventForOrderItemsAndCountProcessed($eventId, $orderItemIds, $data);
    }

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderCancelledMail(SpySalesOrder $salesOrderEntity): void
    {
        $this->getFactory()->createMailHandler()->sendOrderCancelledEmail($salesOrderEntity);
    }

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderRefundedMail(SpySalesOrder $salesOrderEntity): void
    {
        $this->getFactory()->createMailHandler()->sendOrderRefundedMail($salesOrderEntity);
    }

    /**
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkConditions(array $logContext = [], $processId = null)
    {
        return $this->getFactory()
            ->createLockedOrderStateMachine($logContext)
            ->checkConditions($logContext, $processId);
    }

    /**
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkTimeouts(array $logContext = [], $processId = null)
    {
        $factory = $this->getFactory();
        $orderStateMachine = $factory
            ->createLockedOrderStateMachine($logContext);

        return $factory->createOrderStateMachineTimeout()
            ->checkTimeouts($orderStateMachine, $processId);
    }

    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancelled($idOrder): bool
    {
        return $this->getFactory()
            ->createOrderStateMachineFinder()
            ->isOrderFlaggedCancelled($idOrder);
    }

    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedShippedMailAwaits($idOrder): bool
    {
        return $this->getFactory()
            ->createOrderStateMachineFinder()
            ->isOrderFlaggedShippedMailAwaits($idOrder);
    }
}
