<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business\Model;

use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;

/**
 * @method \Pyz\Zed\User\Business\UserBusinessFactory getFactory()
 */
class UserRoleChecker implements UserRoleCheckerInterface
{
    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $userFacade;

    /**
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     */
    public function __construct(AclFacadeInterface $aclFacade, SalesToUserInterface $userFacade)
    {
        $this->aclFacade = $aclFacade;
        $this->userFacade = $userFacade;
    }

    /**
     * @return bool
     */
    public function isCurrentUserSupervisor(): bool
    {
        $idUser = $this->userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->aclFacade->getUserGroups($idUser);

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
            $userGroups = $this->aclFacade->getUserGroups($idUser);
            foreach ($userGroups->getGroups() as $group) {
                if ($group->getName() === AclConstants::PICKER_GROUP) {
                    return true;
                }
            }
        }

        return false;
    }
}
