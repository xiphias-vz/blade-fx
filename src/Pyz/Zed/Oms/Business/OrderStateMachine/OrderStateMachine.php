<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use DateTime;
use Generated\Shared\Transfer\ReservationRequestTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use PDO;
use Propel\Runtime\Exception\LogicException;
use Propel\Runtime\Propel;
use Pyz\Zed\Oms\OmsConfig;
use Spryker\Zed\Oms\Business\OrderStateMachine\BuilderInterface;
use Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachine as SprykerOrderStateMachine;
use Spryker\Zed\Oms\Business\Process\ProcessInterface;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Business\Util\ReservationInterface;
use Spryker\Zed\Oms\Business\Util\TransitionLogInterface;
use Spryker\Zed\Oms\Dependency\Facade\OmsToStoreFacadeInterface;
use Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface;

class OrderStateMachine extends SprykerOrderStateMachine implements OrderStateMachineInterface
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
     * @var array
     */
    protected $lastStateIds = [];

    /**
     * @param \Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface $queryContainer
     * @param \Spryker\Zed\Oms\Business\OrderStateMachine\BuilderInterface $builder
     * @param \Spryker\Zed\Oms\Business\Util\TransitionLogInterface $transitionLog
     * @param \Pyz\Zed\Oms\Business\OrderStateMachine\TimeoutInterface $timeout
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $activeProcesses
     * @param \Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface|array $conditions
     * @param \Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface|array $commands
     * @param \Spryker\Zed\Oms\Business\Util\ReservationInterface $reservation
     * @param \Pyz\Zed\Oms\OmsConfig $omsConfig
     * @param \Spryker\Zed\Oms\Dependency\Facade\OmsToStoreFacadeInterface $storeFacade
     */
    public function __construct(
        OmsQueryContainerInterface $queryContainer,
        BuilderInterface $builder,
        TransitionLogInterface $transitionLog,
        TimeoutInterface $timeout,
        ReadOnlyArrayObject $activeProcesses,
        $conditions,
        $commands,
        ReservationInterface $reservation,
        OmsConfig $omsConfig,
        OmsToStoreFacadeInterface $storeFacade
    ) {
        parent::__construct($queryContainer, $builder, $transitionLog, $timeout, $activeProcesses, $conditions, $commands, $reservation, $omsConfig);

        $this->omsConfig = $omsConfig;
        $this->storeFacade = $storeFacade;
    }

    /**
     * @var array
     */
    private $stateList;

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItemEntity
     *
     * @return mixed|\Orm\Zed\Oms\Persistence\SpyOmsOrderItemState
     */
    private function getState(SpySalesOrderItem $orderItemEntity)
    {
        if (!isset($this->stateList[$orderItemEntity->getFkOmsOrderItemState()])) {
            $this->stateList[$orderItemEntity->getFkOmsOrderItemState()] = $orderItemEntity->getState();
        }

        return $this->stateList[$orderItemEntity->getFkOmsOrderItemState()];
    }

    /**
     * @var array
     */
    private $processList;

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItemEntity
     *
     * @return mixed|\Orm\Zed\Oms\Persistence\SpyOmsOrderItemState
     */
    private function getProcess(SpySalesOrderItem $orderItemEntity)
    {
        if (!isset($this->processList[$orderItemEntity->getFkOmsOrderProcess()])) {
            $this->processList[$orderItemEntity->getFkOmsOrderProcess()] = $orderItemEntity->getProcess();
        }

        return $this->processList[$orderItemEntity->getFkOmsOrderProcess()];
    }

    /**
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkConditions(array $logContext = [], $processId = null)
    {
        $affectedOrderItems = 0;
        foreach ($this->activeProcesses as $processName) {
            $process = $this->builder->createProcess($processName);
            $orderStateMachine = clone $this;
            $affectedOrderItems += $orderStateMachine->checkConditionsForProcess($process, $processId);
        }

        return $affectedOrderItems;
    }

    /**
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface $process
     * @param int|null $processId
     *
     * @return int
     */
    protected function checkConditionsForProcess(ProcessInterface $process, $processId = null)
    {
        $transitions = $process->getAllTransitionsWithoutEvent();
        $stateToTransitionsMap = $this->createStateToTransitionMap($transitions);
        $orderItems = $this->getOrderItemsByState(array_keys($stateToTransitionsMap), $process, $processId);
        $countAffectedItems = count($orderItems);

        if (count($orderItems) === 0) {
            return 0;
        }

        $log = $this->initTransitionLog($orderItems);
        $sourceStateBuffer = $this->updateStateByTransition($stateToTransitionsMap, $orderItems, [], $log);
        $processes = [$process->getName() => $process];
        $this->saveOrderItems($orderItems, $log, $processes, $sourceStateBuffer);
        $orderItemsWithOnEnterEvent = $this->filterItemsWithOnEnterEvent($orderItems, $processes, $sourceStateBuffer);
        $data = $this->makeDataReadOnly([]);
        $this->triggerOnEnterEvents($orderItemsWithOnEnterEvent, $data);

        return $countAffectedItems;
    }

    /**
     * @param array $states
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface $process
     * @param int|null $processId
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItem[]
     */
    protected function getOrderItemsByState(array $states, ProcessInterface $process, $processId = null)
    {
        if ($this->omsProcessWorkerChunkSize === null) {
            $this->omsProcessWorkerChunkSize = $this->omsConfig->getOmsProcessWorkerChunkSize();
        }

        return $this->queryContainer
            ->querySalesOrderItemsByState(
                $states,
                $process->getName(),
                $processId,
                $this->omsProcessWorkerChunkSize,
                $this->storeFacade->getCurrentStore()->getName()
            )
            ->find()
            ->getData();
    }

    /**
     * @param string $eventId
     * @param int[] $orderItemIds
     *
     * @return int[]
     */
    public function preFilterAffectedOrderItems(string $eventId, array $orderItemIds): array
    {
        /** @var \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems */
        $orderItems = $this->queryContainer
            ->querySalesOrderItems($orderItemIds)
            ->find()
            ->getData();

        if (empty($orderItemIds)) {
            return [];
        }

        $currentProcessName = $this->getProcess($orderItems[0])->getName();

        $filteredItems = $this->filterAffectedOrderItems(
            $eventId,
            $orderItems,
            [ $currentProcessName => $this->builder->createProcess($currentProcessName) ]
        );

        return array_map(
            function (SpySalesOrderItem $salesOrderItem): int {
                return (int)$salesOrderItem->getIdSalesOrderItem();
            },
            $filteredItems
        );
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
        $orderItems = $this->queryContainer
            ->querySalesOrderItems($orderItemIds)
            ->find()
            ->getData();

        return $this->triggerEventAndCountProcessed($eventId, $orderItems, $data);
    }

    /**
     * @param string $eventId
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param array|\Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return int
     */
    public function triggerEventAndCountProcessed($eventId, array $orderItems, $data): int
    {
        if ($this->checkForEventRepetitions($eventId) === false) {
            return 0;
        }

        $data = $this->makeDataReadOnly($data);

        $processes = $this->getProcesses($orderItems);

        $orderItems = $this->filterAffectedOrderItems($eventId, $orderItems, $processes);

        $log = $this->initTransitionLog($orderItems);

        $orderGroup = $this->groupByOrderAndState($eventId, $orderItems, $processes);
        $sourceStateBuffer = [];

        $allProcessedOrderItems = [];
        foreach ($orderGroup as $groupedOrderItems) {
            $this->logSourceState($groupedOrderItems, $log);

            $processedOrderItems = $this->runCommand($eventId, $groupedOrderItems, $processes, $data, $log);
            $sourceStateBuffer = $this->updateStateByEvent($eventId, $processedOrderItems, $sourceStateBuffer, $log);
            $this->saveOrderItems($processedOrderItems, $log, $processes, $sourceStateBuffer);
            $allProcessedOrderItems = array_merge($allProcessedOrderItems, $processedOrderItems);
        }

        $orderItemsWithOnEnterEvent = $this->filterItemsWithOnEnterEvent($allProcessedOrderItems, $processes, $sourceStateBuffer);

        $log->saveAll();

        $this->triggerOnEnterEvents($orderItemsWithOnEnterEvent, $data);

        return count($allProcessedOrderItems);
    }

    /**
     * @param string $eventId
     *
     * @return bool
     */
    protected function checkForEventRepetitions($eventId): bool
    {
        return true;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Spryker\Zed\Oms\Business\Util\TransitionLogInterface $log
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface[] $processes
     * @param array $sourceStateBuffer
     *
     * @return void
     */
    protected function saveOrderItems(array $orderItems, TransitionLogInterface $log, array $processes, array $sourceStateBuffer)
    {
        $currentTime = new DateTime('now');
        $timeoutModel = clone $this->timeout;

        $this->handleDatabaseTransaction(function () use ($orderItems, $processes, $sourceStateBuffer, $timeoutModel, $log, $currentTime) {
            $this->executeSaveOrderItemTransactionBulk(
                $orderItems,
                $processes,
                $sourceStateBuffer,
                $timeoutModel,
                $log,
                $currentTime
            );
        });
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param array $processes
     * @param array $sourceStateBuffer
     * @param \Spryker\Zed\Oms\Business\OrderStateMachine\TimeoutInterface $timeoutModel
     * @param \Spryker\Zed\Oms\Business\Util\TransitionLogInterface $log
     * @param \DateTime $currentTime
     *
     * @return void
     */
    protected function executeSaveOrderItemTransactionBulk(
        array $orderItems,
        array $processes,
        array $sourceStateBuffer,
        TimeoutInterface $timeoutModel,
        TransitionLogInterface $log,
        DateTime $currentTime
    ) {
        $deleteOldTimeoutEvents = [];
        $newTimeoutEvents = [];
        foreach ($orderItems as $orderItem) {
            $process = $processes[$this->getProcess($orderItem)->getName()];
            $sourceState = $sourceStateBuffer[$orderItem->getIdSalesOrderItem()];
            $targetState = $this->getState($orderItem)->getName();

            if ($sourceState !== $targetState) {
                if ($timeoutModel->dropOldTimeoutNeeded($process, $sourceState)) {
                    $deleteOldTimeoutEvents[] = $orderItem->getIdSalesOrderItem();
                }
                $newTimeoutEvents = array_merge($newTimeoutEvents, $timeoutModel->getNewTimeoutEvent($process, $orderItem, $currentTime));
            }
        }

        $this->deleteOldTimeoutEvents($deleteOldTimeoutEvents);
        $this->insertNewTimeoutEvents($newTimeoutEvents);
        $this->saveOrderItemsBulk($orderItems, $sourceStateBuffer);
        $this->saveOrderItemsStateHistory($orderItems);
        $this->saveOrderItemsTransitionLog($log->getAllLogs());
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface[] $processes
     * @param array $sourceStateBuffer
     *
     * @return void
     */
    protected function saveOrderItemsTimeout(array $orderItems, array $processes, array $sourceStateBuffer)
    {
        $deleteOldTimeoutEvents = [];
        $newTimeoutEvents = [];
        $currentTime = new DateTime('now');
        foreach ($orderItems as $orderItem) {
            $process = $processes[$this->getProcess($orderItem)->getName()];

            $sourceStateId = $sourceStateBuffer[$orderItem->getIdSalesOrderItem()];
            $targetStateId = $this->getState($orderItem)->getName();
            $targetState = $process->getStateFromAllProcesses($targetStateId);

            if ($targetState->hasTimeoutEvent()) {
                if ($this->timeout->dropOldTimeoutNeeded($process, $sourceStateId)) {
                    $deleteOldTimeoutEvents[] = $orderItem->getIdSalesOrderItem();
                }
                $newTimeoutEvents = array_merge($newTimeoutEvents, $this->timeout->getNewTimeoutEvent($process, $orderItem, $currentTime));
            }
        }

        $this->deleteOldTimeoutEvents($deleteOldTimeoutEvents);
        $this->insertNewTimeoutEvents($newTimeoutEvents);
    }

    /**
     * @param array $deleteOldTimeoutEvents
     *
     * @return void
     */
    protected function deleteOldTimeoutEvents(array $deleteOldTimeoutEvents)
    {
        if (count($deleteOldTimeoutEvents) === 0) {
            return;
        }

        $sql = 'DELETE FROM spy_oms_event_timeout WHERE spy_oms_event_timeout.fk_sales_order_item IN (%s)';
        $sql = sprintf($sql, implode(',', $deleteOldTimeoutEvents));

        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();
    }

    /**
     * @param array $newTimeoutEvents
     *
     * @return void
     */
    protected function insertNewTimeoutEvents(array $newTimeoutEvents)
    {
        $index = 0;
        $sql = 'INSERT INTO spy_oms_event_timeout (fk_oms_order_item_state, fk_sales_order_item, event, timeout, created_at, updated_at) VALUES';
        $count = count($newTimeoutEvents);

        for ($i = 0; $i < $count; $i++) {
            $sql .= sprintf(
                '(:p%d, :p%d, :p%d, :p%d, :p%d, :p%d),',
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++
            );
        }

        $sql = rtrim($sql, ',');

        $index = 0;
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        foreach ($newTimeoutEvents as $newTimeoutEvent) {
            $statement->bindValue(sprintf(':p%d', $index++), $newTimeoutEvent['idOmsOrderItemState'], PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), $newTimeoutEvent['idSalesOrderItem'], PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), $newTimeoutEvent['event'], PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), ($newTimeoutEvent['timeoutDate'])->format('Y-m-d H:i:s.u'), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), (new DateTime())->format('Y-m-d H:i:s.u'), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), (new DateTime())->format('Y-m-d H:i:s.u'), PDO::PARAM_STR);
        }

        if ($index !== 0) {
            $statement->execute();
        }
    }

    /**
     * @param array $orderItems
     * @param array $sourceStateBuffer
     *
     * @return void
     */
    protected function saveOrderItemsBulk(array $orderItems, array $sourceStateBuffer)
    {
        $sqlArr = [];
        foreach ($orderItems as $orderItem) {
            if (array_key_exists($orderItem->getFkOmsOrderItemState(), $sqlArr)) {
                $sqlArr[$orderItem->getFkOmsOrderItemState()] = str_replace(',0)', ',' . $orderItem->getIdSalesOrderItem() . ',0)', $sqlArr[$orderItem->getFkOmsOrderItemState()]);
            } else {
                $sqlArr[$orderItem->getFkOmsOrderItemState()] = 'UPDATE spy_sales_order_item SET fk_oms_order_item_state=' .
                    $orderItem->getFkOmsOrderItemState() . ', last_state_change=now(), updated_at=now() WHERE spy_sales_order_item.fk_sales_order=' .
                    $orderItem->getFkSalesOrder() . ' and spy_sales_order_item.id_sales_order_item in(' . $orderItem->getIdSalesOrderItem() . ',0)';
            }
            $orderItem->setIsOrderItemStateHistoryCreated(false);
        }

        $sql = implode($sqlArr, ';');
        $connection = Propel::getConnection();
        $connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
        $statement = $connection->prepare($sql);
        if (count($sqlArr) > 0) {
            $statement->execute();
        }
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return void
     */
    protected function saveOrderItemsStateHistory(array $orderItems)
    {
        $modifiedOrderItems = [];
        foreach ($orderItems as $orderItem) {
            if ($orderItem->isOrderItemStateHistoryCreated()) {
                continue;
            }

            $modified = in_array(SpySalesOrderItemTableMap::COL_FK_OMS_ORDER_ITEM_STATE, $orderItem->getModifiedColumns());
            if (!$modified) {
                continue;
            }

            if (isset($this->lastStateIds[$orderItem->getIdSalesOrderItem()])
                && $this->lastStateIds[$orderItem->getIdSalesOrderItem()] === $orderItem->getFkOmsOrderItemState()) {
                continue;
            }

            $modifiedOrderItems[] = $orderItem;
        }

        $index = 0;
        $sql = 'INSERT INTO spy_oms_order_item_state_history (fk_oms_order_item_state, fk_sales_order_item, created_at) VALUES ';
        $count = count($modifiedOrderItems);
        for ($i = 0; $i < $count; $i++) {
            $sql .= sprintf("(:p%d, :p%d, :p%d),", $index++, $index++, $index++);
        }

        $sql = rtrim($sql, ',');

        $index = 0;
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        foreach ($modifiedOrderItems as $orderItem) {
            $statement->bindValue(sprintf(':p%d', $index++), $orderItem->getFkOmsOrderItemState(), PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), $orderItem->getIdSalesOrderItem(), PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), (new DateTime())->format('Y-m-d H:i:s.u'), PDO::PARAM_STR);
            $this->lastStateIds[$orderItem->getIdSalesOrderItem()] = $orderItem->getFkOmsOrderItemState();
            $orderItem->setIsOrderItemStateHistoryCreated(true);
        }

        if ($index !== 0) {
            $statement->execute();
        }
    }

    /**
     * @param \Orm\Zed\Oms\Persistence\SpyOmsTransitionLog[] $logs
     *
     * @return void
     */
    protected function saveOrderItemsTransitionLog(array $logs)
    {
        $filteredModifiedLogs = [];
        foreach ($logs as $log) {
            if ($log->isModified()) {
                $filteredModifiedLogs[] = $log;
            }
        }

        $index = 0;
        $sql = 'INSERT INTO spy_oms_transition_log (fk_oms_order_process, fk_sales_order, fk_sales_order_item, event, hostname, params, path, quantity, source_state, target_state, created_at) VALUES ';
        $count = count($filteredModifiedLogs);

        for ($i = 0; $i < $count; $i++) {
            $sql .= sprintf(
                "(:p%d, :p%d, :p%d, :p%d, :p%d, :p%d, :p%d, :p%d, :p%d, :p%d, :p%d),",
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++,
                $index++
            );
        }

        $sql = rtrim($sql, ',');

        $index = 0;
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        foreach ($filteredModifiedLogs as $log) {
            $statement->bindValue(sprintf(':p%d', $index++), $log->getFkOmsOrderProcess(), PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getFkSalesOrder(), PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getFkSalesOrderItem(), PDO::PARAM_INT);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getEvent(), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getHostname(), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), $this->encodeParams($log->getParams()), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getPath(), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getQuantity(), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getSourceState(), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), $log->getTargetState(), PDO::PARAM_STR);
            $statement->bindValue(sprintf(':p%d', $index++), (new DateTime())->format('Y-m-d H:i:s.u'), PDO::PARAM_STR);
        }

        if ($index !== 0) {
            $statement->execute();
        }
    }

    /**
     * @param array $params
     *
     * @return string
     */
    protected function encodeParams(array $params): string
    {
        return '| ' . implode(' | ', $params) . ' |';
    }

    /**
     * @param string $eventId
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface[] $processes
     *
     * @return array
     */
    protected function groupByOrderAndState($eventId, array $orderItems, $processes)
    {
        $orderEventGroup = [];
        foreach ($orderItems as $orderItem) {
            $processId = $this->getProcess($orderItem)->getName();
            $process = $processes[$processId];

            $stateId = $this->getState($orderItem)->getName();
            $orderId = $orderItem->getFkSalesOrder();

            $state = $process->getStateFromAllProcesses($stateId);

            if ($state->hasEvent($eventId)) {
                $key = $orderId . '-' . $stateId;
                if (!isset($orderEventGroup[$key])) {
                    $orderEventGroup[$key] = [];
                }
                $orderEventGroup[$key][] = $orderItem;
            }
        }

        return $orderEventGroup;
    }

    /**
     * @param string $eventId
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param array $sourceStateBuffer
     * @param \Spryker\Zed\Oms\Business\Util\TransitionLogInterface $log
     *
     * @return array
     */
    protected function updateStateByEvent($eventId, array $orderItems, array $sourceStateBuffer, TransitionLogInterface $log)
    {
        $targetStateMap = [];
        foreach ($orderItems as $i => $orderItem) {
            $stateId = $this->getState($orderItem)->getName();
            $sourceStateBuffer[$orderItem->getIdSalesOrderItem()] = $stateId;

            $process = $this->builder->createProcess($this->getProcess($orderItem)->getName());
            $sourceState = $process->getStateFromAllProcesses($stateId);

            $log->addSourceState($orderItem, $sourceState->getName());

            $targetState = $sourceState;
            if ($eventId && $sourceState->hasEvent($eventId)) {
                $transitions = $sourceState->getEvent($eventId)->getTransitionsBySource($sourceState);
                $targetState = $this->checkCondition($transitions, $orderItem, $sourceState, $log);
                $log->addTargetState($orderItem, $targetState->getName());
            }

            $targetStateMap[$i] = $targetState->getName();
        }

        foreach ($orderItems as $i => $orderItem) {
            $this->setState($orderItems[$i], $targetStateMap[$i]);
        }

        return $sourceStateBuffer;
    }

    /**
     * @param array $stateToTransitionsMap
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param array $sourceStateBuffer
     * @param \Spryker\Zed\Oms\Business\Util\TransitionLogInterface $log
     *
     * @return array
     */
    protected function updateStateByTransition($stateToTransitionsMap, array $orderItems, array $sourceStateBuffer, TransitionLogInterface $log)
    {
        $targetStateMap = [];
        foreach ($orderItems as $i => $orderItem) {
            $stateId = $this->getState($orderItem)->getName();
            $sourceStateBuffer[$orderItem->getIdSalesOrderItem()] = $stateId;
            $process = $this->builder->createProcess($this->getProcess($orderItem)->getName());
            $sourceState = $process->getStateFromAllProcesses($stateId);

            $log->addSourceState($orderItem, $sourceState->getName());

            $transitions = $stateToTransitionsMap[$this->getState($orderItem)->getName()];

            $targetState = $sourceState;
            if (count($transitions) > 0) {
                $targetState = $this->checkCondition($transitions, $orderItem, $sourceState, $log);
            }

            $log->addTargetState($orderItem, $targetState->getName());

            $targetStateMap[$i] = $targetState->getName();
        }

        foreach ($orderItems as $i => $orderItem) {
            $this->setState($orderItems[$i], $targetStateMap[$i]);
        }

        return $sourceStateBuffer;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface[] $processes
     * @param array $sourceStateBuffer
     *
     * @throws \LogicException
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItem[][]
     */
    protected function filterItemsWithOnEnterEvent(array $orderItems, array $processes, array $sourceStateBuffer)
    {
        $orderItemsWithOnEnterEvent = [];
        foreach ($orderItems as $orderItem) {
            $stateId = $this->getState($orderItem)->getName();
            $processId = $this->getProcess($orderItem)->getName();

            if (!isset($processes[$processId])) {
                throw new LogicException("Unknown process $processId");
            }

            $process = $processes[$processId];
            $targetState = $process->getStateFromAllProcesses($stateId);

            if (isset($sourceStateBuffer[$orderItem->getIdSalesOrderItem()])) {
                $sourceState = $sourceStateBuffer[$orderItem->getIdSalesOrderItem()];
            } else {
                $sourceState = $process->getStateFromAllProcesses($this->getState($orderItem)->getName());
            }

            if ($sourceState === $targetState && $targetState->isReserved()) {
                $reservationRequestTransfer = (new ReservationRequestTransfer())
                    ->fromArray($orderItem->toArray(), true);
                $this->reservation->updateReservation($reservationRequestTransfer);
            }

            if ($sourceState !== $targetState->getName()
                && $targetState->hasOnEnterEvent()
            ) {
                $event = $targetState->getOnEnterEvent();
                if (array_key_exists($event->getName(), $orderItemsWithOnEnterEvent) === false) {
                    $orderItemsWithOnEnterEvent[$event->getName()] = [];
                }
                $orderItemsWithOnEnterEvent[$event->getName()][] = $orderItem;
            }
        }

        return $orderItemsWithOnEnterEvent;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     *
     * @return \Spryker\Zed\Oms\Business\Process\ProcessInterface[]
     */
    protected function getProcesses(array $orderItems)
    {
        $processes = [];
        foreach ($orderItems as $orderItem) {
            $processName = $this->getProcess($orderItem)->getName();
            if (array_key_exists($processName, $processes) === false) {
                $processes[$processName] = $this->builder->createProcess($processName);
            }
        }

        return $processes;
    }
}
