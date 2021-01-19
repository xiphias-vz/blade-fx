<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\Oms\Persistence\Map\SpyOmsOrderItemStateTableMap;
use Orm\Zed\PickingSalesOrder\Persistence\Map\PyzPickingSalesOrderTableMap;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZonePersistenceFactory getFactory()
 */
class PickingZoneRepository extends AbstractRepository implements PickingZoneRepositoryInterface
{
    /**
     * @return array
     */
    public function getPickingZones(): array
    {
        $zones = $this->getPickingZoneWithOrdersCount();
        $pickingZones = [];
        foreach ($zones as $zone) {
            $pickingZones[$zone[PyzPickingZoneTableMap::COL_ID_PICKING_ZONE]] = $zone[PyzPickingZoneTableMap::COL_NAME] . '/' . $zone['orderCount'];
        }

        return $pickingZones;
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

    /**
     * @return array
     */
    public function getPickingZoneWithOrdersCount(): array
    {
        return $this->getFactory()->createPickingZoneQuery()
            ->select([PyzPickingZoneTableMap::COL_ID_PICKING_ZONE, PyzPickingZoneTableMap::COL_NAME])
            ->withColumn('COUNT(DISTINCT ' . SpySalesOrderTableMap::COL_ID_SALES_ORDER . ')', 'orderCount')
            ->leftJoinPyzPickingSalesOrder()
            ->addJoin(PyzPickingSalesOrderTableMap::COL_FK_SALES_ORDER, SpySalesOrderTableMap::COL_ID_SALES_ORDER, Criteria::LEFT_JOIN)
            ->addJoin(SpySalesOrderTableMap::COL_ID_SALES_ORDER, SpySalesOrderItemTableMap::COL_FK_SALES_ORDER, Criteria::LEFT_JOIN)
            ->addJoin(
                [SpySalesOrderItemTableMap::COL_FK_OMS_ORDER_ITEM_STATE, SpyOmsOrderItemStateTableMap::COL_NAME],
                [SpyOmsOrderItemStateTableMap::COL_ID_OMS_ORDER_ITEM_STATE, '\'' . OmsConfig::STORE_STATE_READY_FOR_PICKING . '\''],
                Criteria::LEFT_JOIN
            )
            ->addGroupByColumn(PyzPickingZoneTableMap::COL_ID_PICKING_ZONE)
            ->addGroupByColumn(PyzPickingZoneTableMap::COL_NAME)
            ->find()
            ->toArray();
    }
}
