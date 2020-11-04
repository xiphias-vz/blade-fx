<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication\Form\Constraints;

use Pyz\Service\User\UserServiceInterface;
use Symfony\Component\Validator\Constraint;

class PasswordConstraint extends Constraint
{
    public const OPTION_USER_SERVICE = 'userService';

    /**
     * @var string
     */
    protected $message = 'Incorrect password provided, it should contain at least 3 of the following: small letters, capital letters, numbers, special symbols';

    /**
     * @var \Pyz\Service\User\UserServiceInterface
     */
    protected $userService;

    /**
     * @return \Pyz\Service\User\UserServiceInterface
     */
    public function getUserService(): UserServiceInterface
    {
        return $this->userService;
    }

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }
}
