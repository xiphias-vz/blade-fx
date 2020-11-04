<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Business;

use Pyz\Zed\ShipmentStorage\Business\Storage\ShipmentStorageWriter;
use Pyz\Zed\ShipmentStorage\Business\Storage\ShipmentStorageWriterInterface;
use Pyz\Zed\ShipmentStorage\ShipmentStorageDependencyProvider;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageRepositoryInterface getRepository()()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface getEntityManager()()
 */
class ShipmentStorageBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\ShipmentStorage\Business\Storage\ShipmentStorageWriterInterface
     */
    public function createShipmentStorageWriter(): ShipmentStorageWriterInterface
    {
        return new ShipmentStorageWriter(
            $this->getEntityManager(),
            $this->getEventBehaviorFacade()
        );
    }

    /**
     * @return \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    public function getEventBehaviorFacade(): EventBehaviorFacadeInterface
    {
        return $this->getProvidedDependency(ShipmentStorageDependencyProvider::FACADE_EVENT_BEHAVIOR);
    }
}
