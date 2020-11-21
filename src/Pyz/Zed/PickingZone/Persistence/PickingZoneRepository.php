<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZonePersistenceFactory getFactory()
 */
class PickingZoneRepository extends AbstractRepository implements PickingZoneRepositoryInterface
{
    /**
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function getPickingZones(): array
    {
        $factory = $this->getFactory();
        $pickingZoneEntities = $factory->createPickingZoneQuery()->find();

        return $factory->createPickingZoneMapper()
            ->mapPickingZoneEntitiesToPickingZoneTransfers($pickingZoneEntities);
    }

    /**
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneById(int $idPickingZone): ?PickingZoneTransfer
    {
        $factory = $this->getFactory();
        $pickingZoneEntity = $factory->createPickingZoneQuery()->findOneByIdPickingZone($idPickingZone);

        if (!$pickingZoneEntity) {
            return null;
        }

        return $factory->createPickingZoneMapper()
            ->mapPickingZoneEntityToPickingZoneTransfer(
                $pickingZoneEntity,
                new PickingZoneTransfer()
            );
    }

    /**
     * @param int $idSalesOrder
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer|null
     */
    public function findOrderPickingBlock(int $idSalesOrder, int $idPickingZone): ?OrderPickingBlockTransfer
    {
        $factory = $this->getFactory();
        $orderPickingBlockQuery = $factory->createOrderPickingBlockQuery()
            ->filterByFkSalesOrder($idSalesOrder)
            ->filterByFkPickingZone($idPickingZone)
            ->findOne();

        $orderPickingBlockEntity = $orderPickingBlockQuery;

        if (!$orderPickingBlockEntity) {
            return null;
        }

        return $factory->createPickingZoneMapper()
            ->mapOrderPickingBlockEntityToOrderPickingBlockTransfer(
                $orderPickingBlockEntity,
                new OrderPickingBlockTransfer()
            );
    }
}
