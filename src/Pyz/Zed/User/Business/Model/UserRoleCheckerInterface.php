<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business\Model;

interface UserRoleCheckerInterface
{
    /**
     * @return bool
     */
    public function isCurrentUserSupervisor(): bool;

    /**
     * @return bool
     */
    public function isEditedUserPicker(): bool;
}
