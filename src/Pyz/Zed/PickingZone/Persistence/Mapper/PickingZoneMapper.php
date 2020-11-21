<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence\Mapper;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\PickingZone\Persistence\PyzOrderPickingBlock;
use Orm\Zed\PickingZone\Persistence\PyzPickingZone;
use Propel\Runtime\Collection\ObjectCollection;

class PickingZoneMapper
{
    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\PickingZone\Persistence\PyzPickingZone[] $pickingZoneEntityCollection
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function mapPickingZoneEntitiesToPickingZoneTransfers(
        ObjectCollection $pickingZoneEntityCollection
    ): array {
        $pickingZoneTransfers = [];

        foreach ($pickingZoneEntityCollection as $pickingZoneEntity) {
            $pickingZoneTransfers[] = $this->mapPickingZoneEntityToPickingZoneTransfer(
                $pickingZoneEntity,
                new PickingZoneTransfer()
            );
        }

        return $pickingZoneTransfers;
    }

    /**
     * @param \Orm\Zed\PickingZone\Persistence\PyzPickingZone $pickingZoneEntity
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer
     */
    public function mapPickingZoneEntityToPickingZoneTransfer(
        PyzPickingZone $pickingZoneEntity,
        PickingZoneTransfer $pickingZoneTransfer
    ): PickingZoneTransfer {
        return $pickingZoneTransfer->fromArray($pickingZoneEntity->toArray(), true);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     * @param \Orm\Zed\PickingZone\Persistence\PyzOrderPickingBlock $orderPickingBlockEntity
     *
     * @return \Orm\Zed\PickingZone\Persistence\PyzOrderPickingBlock
     */
    public function mapOrderPickingBlockTransferToOrderPickingBlockEntity(
        OrderPickingBlockTransfer $orderPickingBlockTransfer,
        PyzOrderPickingBlock $orderPickingBlockEntity
    ): PyzOrderPickingBlock {
        $orderPickingBlockEntity->fromArray($orderPickingBlockTransfer->modifiedToArray());
        $orderPickingBlockEntity->setFkSalesOrder($orderPickingBlockTransfer->getIdSalesOrder());
        $orderPickingBlockEntity->setFkPickingZone($orderPickingBlockTransfer->getIdPickingZone());
        $orderPickingBlockEntity->setFkUser($orderPickingBlockTransfer->getIdUser());

        return $orderPickingBlockEntity;
    }

    /**
     * @param \Orm\Zed\PickingZone\Persistence\PyzOrderPickingBlock $orderPickingBlockEntity
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer
     */
    public function mapOrderPickingBlockEntityToOrderPickingBlockTransfer(
        PyzOrderPickingBlock $orderPickingBlockEntity,
        OrderPickingBlockTransfer $orderPickingBlockTransfer
    ): OrderPickingBlockTransfer {
        $orderPickingBlockTransfer->fromArray($orderPickingBlockEntity->toArray(), true);
        $orderPickingBlockTransfer->setIdSalesOrder($orderPickingBlockEntity->getFkSalesOrder());
        $orderPickingBlockTransfer->setIdPickingZone($orderPickingBlockEntity->getFkPickingZone());
        $orderPickingBlockTransfer->setIdUser($orderPickingBlockEntity->getFkUser());

        return $orderPickingBlockTransfer;
    }
}
