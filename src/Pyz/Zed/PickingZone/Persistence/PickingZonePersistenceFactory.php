<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery;
use Pyz\Zed\PickingZone\Persistence\Mapper\PickingZoneMapper;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZoneRepositoryInterface getRepository()
 */
class PickingZonePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery
     */
    public function createPickingZoneQuery(): PyzPickingZoneQuery
    {
        return PyzPickingZoneQuery::create();
    }

    /**
     * @return \Spryker\Zed\Merchant\Persistence\Propel\Mapper\PickingZoneMapper
     */
    public function createPickingZoneMapper(): PickingZoneMapper
    {
        return new PickingZoneMapper();
    }
}
