<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication\Controller;

use Spryker\Zed\User\Communication\Controller\IndexController as SpyIndexController;

/**
 * @method \Pyz\Zed\User\Business\UserFacadeInterface getFacade()
 * @method \Pyz\Zed\User\Communication\UserCommunicationFactory getFactory()
 */
class IndexController extends SpyIndexController
{
    /**
     * @return array
     */
    public function indexAction()
    {
        $usersTable = $this->getFactory()->createUserTable();

        return [
            'users' => $usersTable->render(),
            'isCurrentUserSupervisor' => $this->getFacade()->isCurrentUserSupervisor(),
        ];
    }
}
