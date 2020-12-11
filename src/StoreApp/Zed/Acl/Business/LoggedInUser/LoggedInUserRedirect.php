<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Acl\Business\LoggedInUser;

use Generated\Shared\Transfer\UserTransfer;
use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\Business\Model\GroupInterface;
use Spryker\Zed\Acl\Dependency\Facade\AclToUserInterface;

class LoggedInUserRedirect
{
    private const URL_PICKER = '/' . AclConstants::MODULE_PICKER;
    private const URL_DELIVERY = '/' . AclConstants::MODULE_DELIVERY;

    /**
     * @var \Spryker\Zed\Acl\Dependency\Facade\AclToUserInterface
     */
    private $userFacade;

    /**
     * @var \Spryker\Zed\Acl\Business\Model\GroupInterface
     */
    private $group;

    /**
     * @param \Spryker\Zed\Acl\Dependency\Facade\AclToUserInterface $userFacade
     * @param \Spryker\Zed\Acl\Business\Model\GroupInterface $group
     */
    public function __construct(
        AclToUserInterface $userFacade,
        GroupInterface $group
    ) {
        $this->userFacade = $userFacade;
        $this->group = $group;
    }

    /**
     * @return string|null
     */
    public function getRedirectByLoggedInUser(): ?string
    {
        $currentUserTransfer = $this->userFacade->getCurrentUser();

        if ($this->hasValidAclGroup($currentUserTransfer)) {
            return static::URL_PICKER;
        }

        $deliveryGroupTransfer = $this->group->getByName(AclConstants::DELIVERY_GROUP);
        if ($this->group->hasUser($deliveryGroupTransfer->getIdAclGroup(), $currentUserTransfer->getIdUser())) {
            return static::URL_DELIVERY;
        }

        return null;
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $currentUserTransfer
     *
     * @return bool
     */
    protected function hasValidAclGroup(UserTransfer $currentUserTransfer): bool
    {
        $pickerGroupId = $this->group->getByName(AclConstants::PICKER_GROUP)->getIdAclGroup();
        $rootGroupId = $this->group->getByName(AclConstants::ROOT_GROUP)->getIdAclGroup();
        $supervisorGroupId = $this->group->getByName(AclConstants::SUPERVISOR_GROUP)->getIdAclGroup();
        $currentUserId = $currentUserTransfer->getIdUser();

        return $this->group->hasUser($pickerGroupId, $currentUserId)
            || $this->group->hasUser($rootGroupId, $currentUserId)
            || $this->group->hasUser($supervisorGroupId, $currentUserId);
    }
}
