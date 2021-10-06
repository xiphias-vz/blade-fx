<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Business;

use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\User\Business\UserFacade as SpyUserFacade;

/**
 * @method \Pyz\Zed\SalesOverview\Business\SalesOverviewBusinessFactory getFactory()
 */
class SalesOverviewFacade extends SpyUserFacade implements SalesOverviewFacadeInterface
{
    /**
     * @return bool
     */
    public function isCurrentUserSupervisor(): bool
    {
        $idUser = $this->getFactory()->getUserFacade()->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::SUPERVISOR_GROUP) {
                return true;
            }
        }

        return false;
    }
}
