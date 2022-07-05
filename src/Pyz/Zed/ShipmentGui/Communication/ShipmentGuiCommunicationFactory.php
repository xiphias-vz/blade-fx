<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentGui\Communication;

use Pyz\Zed\ShipmentGui\ShipmentGuiDependencyProvider;
use Pyz\Zed\User\Business\UserFacadeInterface;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\ShipmentGui\Communication\ShipmentGuiCommunicationFactory as SprykerShipmentGuiCommunicationFactory;

class ShipmentGuiCommunicationFactory extends SprykerShipmentGuiCommunicationFactory
{
    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(ShipmentGuiDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Pyz\Zed\User\Business\UserFacadeInterface
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(ShipmentGuiDependencyProvider::FACADE_USER);
    }
}
