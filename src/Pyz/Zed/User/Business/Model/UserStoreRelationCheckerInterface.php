<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business\Model;

use Generated\Shared\Transfer\StoreTransfer;

interface UserStoreRelationCheckerInterface
{
    /**
     * @return \Generated\Shared\Transfer\StoreTransfer
     */
    public function findStoreRelationForSupervisor(): StoreTransfer;
}
