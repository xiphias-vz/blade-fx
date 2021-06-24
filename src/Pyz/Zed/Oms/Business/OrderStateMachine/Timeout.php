<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use DateTime;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Pyz\Zed\Oms\OmsConfig;
use Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachineInterface;
use Spryker\Zed\Oms\Business\OrderStateMachine\Timeout as SprykerTimeout;
use Spryker\Zed\Oms\Business\Process\ProcessInterface;
use Spryker\Zed\Oms\Business\Util\TimeoutProcessorCollectionInterface;
use Spryker\Zed\Oms\Dependency\Facade\OmsToStoreFacadeInterface;
use Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface;

class Timeout extends SprykerTimeout implements TimeoutInterface
{
    /**
     * @var \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface
     */
    protected $queryContainer;

    /**
     * @var \Pyz\Zed\Oms\OmsConfig
     */
    protected $omsConfig;

    /**
     * @var int|null
     */
    protected $omsProcessWorkerChunkSize;

    /**
     * @var \Spryker\Zed\Oms\Dependency\Facade\OmsToStoreFacadeInterface
     */
    protected $storeFacade;

    /**
     * @param \Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface $queryContainer
     * @param \Pyz\Zed\Oms\OmsConfig $omsConfig
     * @param \Spryker\Zed\Oms\Dependency\Facade\OmsToStoreFacadeInterface $storeFacade
     * @param \Spryker\Zed\Oms\Business\Util\TimeoutProcessorCollectionInterface $timeoutProcessorCollection
     */
    public function __construct(
        OmsQueryContainerInterface $queryContainer,
        OmsConfig $omsConfig,
        OmsToStoreFacadeInterface $storeFacade,
        TimeoutProcessorCollectionInterface $timeoutProcessorCollection
    ) {
        parent::__construct($queryContainer, $timeoutProcessorCollection, $omsConfig);

        $this->omsConfig = $omsConfig;
        $this->storeFacade = $storeFacade;
    }

    /**
     * @param \Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachineInterface $orderStateMachine
     * @param int|null $processId
     *
     * @return int
     */
    public function checkTimeouts(OrderStateMachineInterface $orderStateMachine, $processId = null)
    {
        $orderItems = $this->findItemsWithExpiredTimeouts($processId);

        $countAffectedItems = $orderItems->count();

        $groupedOrderItems = $this->groupItemsByEvent($orderItems);

        foreach ($groupedOrderItems as $orderData) {
            foreach ($orderData as $event => $orderItems) {
                $orderStateMachine->triggerEvent($event, $orderItems, []);
            }
        }

        return $countAffectedItems;
    }

    /**
     * @param int|null $processId
     *
     * @return \Propel\Runtime\Collection\ObjectCollection
     */
    protected function findItemsWithExpiredTimeouts($processId = null)
    {
        $now = new DateTime('now');

        if ($this->omsProcessWorkerChunkSize === null) {
            $this->omsProcessWorkerChunkSize = $this->omsConfig->getOmsProcessWorkerChunkSize();
        }

        return $this->queryContainer->querySalesOrderItemsWithExpiredTimeouts(
            $now,
            $processId,
            $this->omsProcessWorkerChunkSize,
            $this->storeFacade->getCurrentStore()->getName()
        )->find();
    }

    /**
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface $process
     * @param string $stateId
     *
     * @return bool
     */
    public function dropOldTimeoutNeeded(ProcessInterface $process, $stateId)
    {
        $sourceState = $this->getStateFromProcess($stateId, $process);

        if ($sourceState->hasTimeoutEvent()) {
            return true;
        }

        return false;
    }

    /**
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface $process
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     * @param \DateTime $currentTime
     *
     * @return array
     */
    public function getNewTimeoutEvent(ProcessInterface $process, SpySalesOrderItem $orderItem, DateTime $currentTime)
    {
        $eventTimeouts = [];
        $targetStateEntity = $orderItem->getState();
        $targetState = $this->getStateFromProcess($targetStateEntity->getName(), $process);

        if ($targetState->hasTimeoutEvent()) {
            $events = $targetState->getTimeoutEvents();

            $handledEvents = [];
            foreach ($events as $event) {
                if (in_array($event->getName(), $handledEvents)) {
                    continue;
                }

                $handledEvents[] = $event->getName();
                $timeoutDate = $this->calculateTimeoutDateFromEvent($currentTime, $event);

                $eventTimeouts[] = [
                    'timeoutDate' => $timeoutDate,
                    'idSalesOrderItem' => $orderItem->getIdSalesOrderItem(),
                    'idOmsOrderItemState' => $targetStateEntity->getIdOmsOrderItemState(),
                    'event' => $event->getName(),
                ];
            }
        }

        return $eventTimeouts;
    }
}
