<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\User;

interface UserServiceInterface
{
    /**
     * Specification:
     * - Validate password against predefined rules.
     *
     * @api
     *
     * @param string $password
     *
     * @return bool
     */
    public function validatePassword(string $password): bool;
}
