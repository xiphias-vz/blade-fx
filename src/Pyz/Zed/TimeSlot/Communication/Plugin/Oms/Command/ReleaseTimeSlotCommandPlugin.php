<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\ShipmentTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface getFacade()
 * @method \Pyz\Zed\TimeSlot\TimeSlotConfig getConfig()
 * @method \Pyz\Zed\TimeSlot\Communication\TimeSlotCommunicationFactory getFactory()
 * @method \Pyz\Zed\TimeSlot\Persistence\TimeSlotQueryContainerInterface getQueryContainer()
 */
class ReleaseTimeSlotCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data): array
    {
        $shipmentTransfer = $this->getShipmentFromOrder($orderEntity);
        $shipmentTransfer->setStoreName($orderEntity->getStore());
        $this->getFacade()->releaseTimeSlotForShipment($shipmentTransfer);

        return [];
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     *
     * @return \Generated\Shared\Transfer\ShipmentTransfer
     */
    private function getShipmentFromOrder(SpySalesOrder $orderEntity): ShipmentTransfer
    {
        $shipmentTransfer = new ShipmentTransfer();
        $shipmentEntity = $orderEntity->getSpySalesShipments()[0];
        $shipmentTransfer->fromArray($shipmentEntity->toArray(), true);

        return $shipmentTransfer;
    }
}
