<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Acl\Business;

use Spryker\Zed\Acl\Business\AclBusinessFactory as SprykerAclBusinessFactory;
use StoreApp\Zed\Acl\Business\LoggedInUser\LoggedInUserRedirect;

class AclBusinessFactory extends SprykerAclBusinessFactory
{
    /**
     * @return \StoreApp\Zed\Acl\Business\LoggedInUser\LoggedInUserRedirect
     */
    public function createLoggedInUserRedirect(): LoggedInUserRedirect
    {
        return new LoggedInUserRedirect(
            $this->getUserFacade(),
            $this->createGroupModel()
        );
    }
}
