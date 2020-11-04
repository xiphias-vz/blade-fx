<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\PermissionAccess\Business;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\UserTransfer;

interface PermissionAccessFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer|null $salesOrderTransfer
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     * @param string[] $allowedStatuses
     *
     * @return bool
     */
    public function isAccessAllowed(?OrderTransfer $salesOrderTransfer, UserTransfer $userTransfer, array $allowedStatuses): bool;
}
