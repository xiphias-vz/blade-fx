<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Application\Communication;

use Spryker\Zed\Application\Communication\ApplicationCommunicationFactory as SprykerApplicationCommunicationFactory;
use StoreApp\Zed\Acl\Business\AclFacade;
use StoreApp\Zed\Application\ApplicationDependencyProvider;

class ApplicationCommunicationFactory extends SprykerApplicationCommunicationFactory
{
    /**
     * @return \StoreApp\Zed\Acl\Business\AclFacade
     */
    public function getAclFacade(): AclFacade
    {
        return $this->getProvidedDependency(ApplicationDependencyProvider::FACADE_ACL);
    }
}
