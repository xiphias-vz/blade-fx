<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZonePersistenceFactory getFactory()
 */
class PickingZoneRepository extends AbstractRepository implements PickingZoneRepositoryInterface
{
    /**
     * @param string $merchantReference
     *
     * @return array
     */
    public function getPickingZones(string $merchantReference): array
    {
        if (empty($merchantReference)) {
            $factory = $this->getFactory();
            $pickingZoneEntities = $factory->createPickingZoneQuery()->find();

            return $factory->createPickingZoneMapper()
                ->mapPickingZoneEntitiesToPickingZoneTransfers($pickingZoneEntities);
        } else {
            $zones = $this->getPickingZoneWithOrdersCount($merchantReference);
            $pickingZones = [];
            foreach ($zones as $zone) {
                $pickingZones[$zone[PyzPickingZoneTableMap::COL_ID_PICKING_ZONE]] = $zone[PyzPickingZoneTableMap::COL_NAME] . '/' . $zone['orderCount'];
            }

            return $pickingZones;
        }
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
     * @param string $merchantReference
     *
     * @return array
     */
    public function getPickingZoneWithOrdersCount(string $merchantReference): array
    {
        return $this->getFactory()->createPickingZoneQuery()
            ->select([PyzPickingZoneTableMap::COL_ID_PICKING_ZONE, PyzPickingZoneTableMap::COL_NAME])
            ->withColumn("(
                                  	SELECT count(*) as noOrders
                                    FROM spy_merchant_sales_order smso
                                	  	INNER JOIN spy_sales_order_item ssoi on ssoi.fk_sales_order = smso.fk_sales_order
  		                                INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
	  		                            AND soois.name in('ready for picking')
                                	WHERE smso.requested_delivery_date > DATE_ADD(now(), INTERVAL -30 day)
                                		AND smso.merchant_reference = '" . $merchantReference . "'
                                		AND  ssoi.pick_zone = " . PyzPickingZoneTableMap::COL_NAME . "
                                    GROUP BY ssoi.pick_zone
                            )", "orderCount")
            ->find()
            ->toArray();
    }
}
