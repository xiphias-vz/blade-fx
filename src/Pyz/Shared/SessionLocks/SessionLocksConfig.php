<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\SessionLocks;

use Spryker\Shared\Kernel\AbstractSharedConfig;

class SessionLocksConfig extends AbstractSharedConfig
{
    public const LOCKING_TIMEOUT_MILLISECONDS = 5000;
    public const LOCKING_RETRY_DELAY_MICROSECONDS = 5000;
    public const LOCKING_LOCK_TTL_MILLISECONDS = 10000;
}
