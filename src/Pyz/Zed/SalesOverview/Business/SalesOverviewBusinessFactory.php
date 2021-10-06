<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Business;

use Pyz\Zed\SalesOverview\SalesOverviewDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;
use Spryker\Zed\User\Business\UserBusinessFactory as SpyUserBusinessFactory;

class SalesOverviewBusinessFactory extends SpyUserBusinessFactory
{
    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(SalesOverviewDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    public function getUserFacade(): SalesToUserInterface
    {
        return $this->getProvidedDependency(SalesOverviewDependencyProvider::FACADE_USER);
    }
}
