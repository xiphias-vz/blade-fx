<?php

namespace BladeFxSpryker\Zed\BladeFx\Business\Request;

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
