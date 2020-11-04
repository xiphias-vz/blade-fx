<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Persistence;

use Orm\Zed\PickingRoute\Persistence\PyzPickingRouteQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\PickingRoute\PickingRouteConfig getConfig()
 * @method \Pyz\Zed\PickingRoute\Persistence\PickingRouteRepositoryInterface getRepository()
 */
class PickingRoutePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\PickingRoute\Persistence\PyzPickingRouteQuery
     */
    public function getPickingRouteQuery(): PyzPickingRouteQuery
    {
        return PyzPickingRouteQuery::create();
    }
}
