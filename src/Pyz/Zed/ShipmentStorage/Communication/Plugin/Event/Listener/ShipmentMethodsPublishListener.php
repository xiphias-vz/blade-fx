<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Communication\Plugin\Event\Listener;

use Spryker\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ShipmentStorage\Communication\ShipmentStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 */
class ShipmentMethodsPublishListener extends AbstractPlugin implements EventBulkHandlerInterface
{
    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $this->getFacade()->publishShipmentMethods($eventTransfers);
    }
}
