<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business;

use Pyz\Zed\User\Business\Model\UserRoleChecker;
use Pyz\Zed\User\Business\Model\UserRoleCheckerInterface;
use Pyz\Zed\User\Business\Model\UserStoreRelationChecker;
use Pyz\Zed\User\Business\Model\UserStoreRelationCheckerInterface;
use Pyz\Zed\User\UserDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;
use Spryker\Zed\User\Business\UserBusinessFactory as SpyUserBusinessFactory;

class UserBusinessFactory extends SpyUserBusinessFactory
{
    /**
     * @return \Pyz\Zed\User\Business\Model\UserStoreRelationCheckerInterface
     */
    public function createUserStoreRelationChecker(): UserStoreRelationCheckerInterface
    {
        return new UserStoreRelationChecker(
            $this->getUserFacade()
        );
    }

    /**
     * @return \Pyz\Zed\User\Business\Model\UserRoleCheckerInterface
     */
    public function createUserRoleChecker(): UserRoleCheckerInterface
    {
        return new UserRoleChecker(
            $this->getAclFacade(),
            $this->getUserFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(UserDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    public function getUserFacade(): SalesToUserInterface
    {
        return $this->getProvidedDependency(UserDependencyProvider::FACADE_USER);
    }
}
