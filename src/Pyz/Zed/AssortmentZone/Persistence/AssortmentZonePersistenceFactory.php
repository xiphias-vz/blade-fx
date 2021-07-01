<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AssortmentZone\Persistence;

use Orm\Zed\AssortmentZone\Persistence\PyzAssortmentZoneQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\AssortmentZone\Persistence\AssortmentZoneRepositoryInterface getRepository()
 * @method \Pyz\Zed\AssortmentZone\Persistence\AssortmentZoneEntityManagerInterface getEntityManager()
 */
class AssortmentZonePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Orm\Zed\AssortmentZone\Persistence\PyzAssortmentZoneQuery
     */
    public function createAssortmentZonePersistenceQuery(): PyzAssortmentZoneQuery
    {
        return PyzAssortmentZoneQuery::create();
    }
}
