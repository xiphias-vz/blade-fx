<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Acl\Business;

use Spryker\Zed\Acl\Business\AclFacade as SprykerAclFacade;

/**
 * @method \StoreApp\Zed\Acl\Business\AclBusinessFactory getFactory()
 */
class AclFacade extends SprykerAclFacade
{
    /**
     * @return string|null
     */
    public function getRedirectByLoggedInUser(): ?string
    {
        return $this->getFactory()
            ->createLoggedInUserRedirect()
            ->getRedirectByLoggedInUser();
    }
}
