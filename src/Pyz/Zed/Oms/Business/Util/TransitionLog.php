<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\Util;

use Spryker\Zed\Oms\Business\Util\TransitionLog as SprykerTransitionLog;

class TransitionLog extends SprykerTransitionLog implements TransitionLogInterface
{
    /**
     * @inheritDoc
     */
    public function getAllLogs()
    {
        return $this->logEntities ?? [];
    }
}
