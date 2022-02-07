<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business;

use Generated\Shared\Transfer\StoreTransfer;
use Spryker\Zed\User\Business\UserFacade as SpyUserFacade;

/**
 * @method \Pyz\Zed\User\Business\UserBusinessFactory getFactory()
 */
class UserFacade extends SpyUserFacade implements UserFacadeInterface
{
    /**
     * @return \Generated\Shared\Transfer\StoreTransfer
     */
    public function findStoreRelationForSupervisor(): StoreTransfer
    {
        return $this->getFactory()
            ->createUserStoreRelationChecker()
            ->findStoreRelationForSupervisor();
    }

    /**
     * @return bool
     */
    public function isCurrentUserSupervisor(): bool
    {
        return $this->getFactory()
          ->createUserRoleChecker()
          ->isCurrentUserSupervisor();
    }

    /**
     * @return bool
     */
    public function isEditedUserPicker(): bool
    {
        return $this->getFactory()
            ->createUserRoleChecker()
            ->isEditedUserPicker();
    }
}
