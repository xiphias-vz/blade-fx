<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use DateTime;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachineInterface;
use Spryker\Zed\Oms\Business\OrderStateMachine\TimeoutInterface as SprykerTimeoutInterface;
use Spryker\Zed\Oms\Business\Process\ProcessInterface;

interface TimeoutInterface extends SprykerTimeoutInterface
{
    /**
     * @param \Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachineInterface $orderStateMachine
     * @param int|null $processId
     *
     * @return int
     */
    public function checkTimeouts(OrderStateMachineInterface $orderStateMachine, $processId = null);

    /**
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface $process
     * @param string $stateId
     *
     * @return bool
     */
    public function dropOldTimeoutNeeded(ProcessInterface $process, $stateId);

    /**
     * @param \Spryker\Zed\Oms\Business\Process\ProcessInterface $process
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     * @param \DateTime $currentTime
     *
     * @return array
     */
    public function getNewTimeoutEvent(ProcessInterface $process, SpySalesOrderItem $orderItem, DateTime $currentTime);
}
