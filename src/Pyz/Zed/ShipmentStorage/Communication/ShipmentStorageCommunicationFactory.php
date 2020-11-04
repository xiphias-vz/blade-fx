<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Communication;

use Pyz\Zed\ShipmentStorage\ShipmentStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageRepositoryInterface getRepository()
 */
class ShipmentStorageCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }
}
