<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\User;

use Pyz\Service\User\Validator\PasswordValidator;
use Pyz\Service\User\Validator\PasswordValidatorInterface;
use Spryker\Service\Kernel\AbstractServiceFactory;

/**
 * @method \Pyz\Service\User\UserConfig getConfig()
 */
class UserServiceFactory extends AbstractServiceFactory
{
    /**
     * @return \Pyz\Service\User\Validator\PasswordValidatorInterface
     */
    public function createPasswordValidator(): PasswordValidatorInterface
    {
        return new PasswordValidator($this->getConfig());
    }
}
