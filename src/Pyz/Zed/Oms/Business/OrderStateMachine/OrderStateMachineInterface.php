<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachineInterface as SprykerOrderStateMachineInterface;

interface OrderStateMachineInterface extends SprykerOrderStateMachineInterface
{
    /**
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkConditions(array $logContext = [], $processId = null);
}
