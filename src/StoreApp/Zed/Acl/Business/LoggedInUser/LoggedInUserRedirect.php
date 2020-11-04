<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Acl\Business\LoggedInUser;

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

        $pickerGroupTransfer = $this->group->getByName(AclConstants::PICKER_GROUP);
        if ($this->group->hasUser($pickerGroupTransfer->getIdAclGroup(), $currentUserTransfer->getIdUser())) {
            return static::URL_PICKER;
        }

        $deliveryGroupTransfer = $this->group->getByName(AclConstants::DELIVERY_GROUP);
        if ($this->group->hasUser($deliveryGroupTransfer->getIdAclGroup(), $currentUserTransfer->getIdUser())) {
            return static::URL_DELIVERY;
        }

        return null;
    }
}
