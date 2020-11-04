<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use Spryker\Zed\Oms\Business\OrderStateMachine\LockedOrderStateMachine as SprykerLockedOrderStateMachine;

class LockedOrderStateMachine extends SprykerLockedOrderStateMachine implements OrderStateMachineInterface
{
    /**
     * @var \Pyz\Zed\Oms\Business\OrderStateMachine\OrderStateMachine
     */
    protected $stateMachine;

    /**
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkConditions(array $logContext = [], $processId = null)
    {
        return $this->stateMachine->checkConditions($logContext, $processId);
    }

    /**
     * @param string $eventId
     * @param int[] $orderItemIds
     * @param array $data
     *
     * @return int
     */
    public function triggerEventForOrderItemsAndCountProcessed($eventId, array $orderItemIds, $data): int
    {
        $processedItemsCount = 0;
        $filteredOrderItemIds = $this->stateMachine->preFilterAffectedOrderItems($eventId, $orderItemIds);

        if (empty($filteredOrderItemIds)) {
            return $processedItemsCount;
        }

        $identifier = $this->acquireTriggerLockerByOrderItemIds($filteredOrderItemIds);

        try {
            $processedItemsCount = $this->stateMachine->triggerEventForOrderItemsAndCountProcessed($eventId, $filteredOrderItemIds, $data);
        } finally {
            $this->triggerLocker->release($identifier);
        }

        return $processedItemsCount;
    }
}
