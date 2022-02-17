<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Propel\Runtime\Propel;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZonePersistenceFactory getFactory()
 */
class PickingZoneRepository extends AbstractRepository implements PickingZoneRepositoryInterface
{
    public const PICKING_ZONE_SEPARATOR = '__';

    /**
     * How many days in past are orders taken in account
     */
    public const PICKING_DATE_INTERVAL = -1;

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
                $pickingZones[$zone[PyzPickingZoneTableMap::COL_ID_PICKING_ZONE]] = $zone[PyzPickingZoneTableMap::COL_NAME] . self::PICKING_ZONE_SEPARATOR . $zone['orderCount'];
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
        $query = "select ppz.id_picking_zone as 'pyz_picking_zone.id_picking_zone',
                ppz.name as 'pyz_picking_zone.name',
                ppz.is_default as 'pyz_picking_zone.is_default',
                ppz.abbreviation as 'pyz_picking_zone.abbreviation',
                IFNULL(orders.orderCount, 0) as orderCount
            from pyz_picking_zone ppz
            left outer join (
                SELECT count(distinct smso.fk_sales_order) as orderCount, ssoi.pick_zone, smso.merchant_reference
                FROM spy_merchant_sales_order smso
                    INNER JOIN spy_sales_order_item ssoi on ssoi.fk_sales_order = smso.fk_sales_order
                    INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
                    AND soois.name in('ready for picking', 'ready for selecting shelves')
                WHERE smso.requested_delivery_date > DATE_ADD(now(), INTERVAL " . PickingZoneRepository::PICKING_DATE_INTERVAL . " day)
                    AND smso.merchant_reference = '" . $merchantReference . "'
                GROUP BY ssoi.pick_zone
            ) orders on ppz.name = orders.pick_zone";

        return PropelExtension::getResultAssoc($query);
    }

    /**
     * @return array
     */
    public function getPickingZonesArray(): array
    {
        $pickingZonesArray = [];

        $factory = $this->getFactory();
        $pickingZoneEntities = $factory->createPickingZoneQuery()->find();

        $pickingZoneFactory = $factory->createPickingZoneMapper()
            ->mapPickingZoneEntitiesToPickingZoneTransfers($pickingZoneEntities);

        foreach ($pickingZoneFactory as $listPickingZones) {
            $idPickingZone = $listPickingZones['idPickingZone'];
            $name = $listPickingZones['name'];
            $pickingZonesArray[$idPickingZone] = $name;
        }

        return $pickingZonesArray;
    }

    /**
     * @param string $idMerchant
     *
     * @return array
     */
    public function getMappedAsortmentPickingZonesArray(string $idMerchant): array
    {
        $con = Propel::getConnection();
        $statement = $con->prepare('SELECT papzr.id_assortment_pick_zone_relation, papzr.fk_picking_zone, pz.name as pick_zone_name, paz.id_assortment_zone, paz.assortment_zone
                        FROM pyz_assortment_pick_zone_relation papzr
                            INNER JOIN pyz_assortment_zone paz on paz.id_assortment_zone = papzr.fk_assortment_zone
                            INNER JOIN pyz_picking_zone pz on pz.id_picking_zone = papzr.fk_picking_zone
                        WHERE papzr.fk_merchant =' . $idMerchant . '
                        ORDER BY paz.assortment_zone');
        $statement->execute();

        return $statement->fetchAll();
    }
}
