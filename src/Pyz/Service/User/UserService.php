<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\User;

use Spryker\Service\Kernel\AbstractService;

/**
 * @method \Pyz\Service\User\UserServiceFactory getFactory()
 */
class UserService extends AbstractService implements UserServiceInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $password
     *
     * @return bool
     */
    public function validatePassword(string $password): bool
    {
        return $this->getFactory()
            ->createPasswordValidator()
            ->validate($password);
    }
}
