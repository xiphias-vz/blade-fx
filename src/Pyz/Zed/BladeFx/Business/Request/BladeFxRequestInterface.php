<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Request;

use Generated\Shared\Transfer\UserBladeFxTransfer;

interface BladeFxRequestInterface
{
    /**
     * @return string
     */
    public function loggedInUserRequest(): string;

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $user
     *
     * @return string
     */
    public function reportsForLoggedInUserRequest(UserBladeFxTransfer $user): string;
}
