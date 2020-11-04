<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Persistence;

use Orm\Zed\PickingRoute\Persistence\Map\PyzPickingRouteTableMap;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\PickingRoute\Persistence\PickingRoutePersistenceFactory getFactory()
 */
class PickingRouteRepository extends AbstractRepository implements PickingRouteRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function findPickingOrderByPickingOrderKeys(array $pickingOrderKeys): array
    {
        $pickingOrderQuery = $this->getFactory()->getPickingRouteQuery()
            ->select([
                PyzPickingRouteTableMap::COL_PICKING_ORDER_KEY,
                PyzPickingRouteTableMap::COL_PICKING_ORDER,
            ])
            ->filterByPickingOrderKey_In($pickingOrderKeys);

        return $pickingOrderQuery
            ->find()
            ->toKeyValue(
                PyzPickingRouteTableMap::COL_PICKING_ORDER_KEY,
                PyzPickingRouteTableMap::COL_PICKING_ORDER
            );
    }
}
