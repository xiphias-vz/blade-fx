<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Orm\Zed\PickingZone\Persistence\PyzOrderPickingBlock;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZonePersistenceFactory getFactory()
 */
class PickingZoneEntityManager extends AbstractEntityManager implements PickingZoneEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer
     */
    public function createOrderPickingBlock(
        OrderPickingBlockTransfer $orderPickingBlockTransfer
    ): OrderPickingBlockTransfer {
        $pickingZoneMapper = $this->getFactory()->createPickingZoneMapper();

        $orderPickingBlockEntity = $pickingZoneMapper
            ->mapOrderPickingBlockTransferToOrderPickingBlockEntity(
                $orderPickingBlockTransfer,
                new PyzOrderPickingBlock()
            );

        $orderPickingBlockEntity->save();

        return $pickingZoneMapper->mapOrderPickingBlockEntityToOrderPickingBlockTransfer(
            $orderPickingBlockEntity,
            $orderPickingBlockTransfer
        );
    }

    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return void
     */
    public function deleteOrderPickingBlock(OrderPickingBlockTransfer $orderPickingBlockTransfer): void
    {
        $this->getFactory()->createOrderPickingBlockQuery()
            ->filterByFkSalesOrder($orderPickingBlockTransfer->getIdSalesOrder())
            ->filterByFkPickingZone($orderPickingBlockTransfer->getIdPickingZone())
            ->filterByFkUser($orderPickingBlockTransfer->getIdUser())
            ->delete();
    }

    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return void
     */
    public function resetOrderPickingBlock(OrderPickingBlockTransfer $orderPickingBlockTransfer): void
    {
        $this->getFactory()->createOrderPickingBlockQuery()
            ->filterByFkSalesOrder($orderPickingBlockTransfer->getIdSalesOrder())
            ->innerJoinPickingZone()
            ->usePickingZoneQuery()
                ->filterByName($orderPickingBlockTransfer->getPickingZoneName())
            ->endUse()
            ->find()
            ->delete();
    }
}
