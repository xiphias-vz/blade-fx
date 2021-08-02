<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business;

use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\User\Business\UserFacade as SpyUserFacade;

/**
 * @method \Pyz\Zed\User\Business\UserBusinessFactory getFactory()
 */
class UserFacade extends SpyUserFacade implements UserFacadeInterface
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

    /**
     * @return bool
     */
    public function isEditedUserPicker(): bool
    {
        $httpAction = $_SERVER['REQUEST_URI'];
        $components = parse_url($httpAction);
        parse_str($components['query'], $results);
        $idUser = $results['id-user'];
        if (isset($idUser)) {
            $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);
            foreach ($userGroups->getGroups() as $group) {
                if ($group->getName() === AclConstants::PICKER_GROUP) {
                    return true;
                }
            }
        }

        return false;
    }
}
