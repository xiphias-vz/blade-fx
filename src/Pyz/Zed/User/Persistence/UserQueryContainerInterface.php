<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Persistence;

use Spryker\Zed\User\Persistence\UserQueryContainerInterface as SpyUserQueryContainerInterface;

interface UserQueryContainerInterface extends SpyUserQueryContainerInterface
{
    /**
     * @param string $merchantReference
     *
     * @return mixed
     */
    public function queryUsersByMerchantReference(string $merchantReference);
}
