<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AssortmentZone\Persistence;

use Generated\Shared\Transfer\AssortmentZoneTransfer;
use Orm\Zed\AssortmentZone\Persistence\PyzAssortmentZone;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\AssortmentZone\Persistence\AssortmentZonePersistenceFactory getFactory()
 */
class AssortmentZoneRepository extends AbstractRepository implements AssortmentZoneRepositoryInterface
{
    /**
     * @return \Generated\Shared\Transfer\AssortmentZoneTransfer[]
     */
    public function getAssortmentZones(): array
    {
        $assortmentZoneTransfers = [];

        $assortmentZonesEntitiesZone = $this->getFactory()
            ->createAssortmentZonePersistenceQuery()
            ->find();

        foreach ($assortmentZonesEntitiesZone as $assortmentZoneEntity) {
            $assortmentZoneTransfers[] = $this->mapAssortmentZonesEntityToAssortmentZoneTransfer(
                $assortmentZoneEntity,
                new AssortmentZoneTransfer()
            );
        }

        return $assortmentZoneTransfers;
    }

    /**
     * @param \Orm\Zed\AssortmentZone\Persistence\PyzAssortmentZone $assortmentZoneEntity
     * @param \Generated\Shared\Transfer\AssortmentZoneTransfer $assortmentZoneTransfer
     *
     * @return \Generated\Shared\Transfer\AssortmentZoneTransfer
     */
    public function mapAssortmentZonesEntityToAssortmentZoneTransfer(
        PyzAssortmentZone $assortmentZoneEntity,
        AssortmentZoneTransfer $assortmentZoneTransfer
    ): AssortmentZoneTransfer {
        return $assortmentZoneTransfer->fromArray($assortmentZoneEntity->toArray(), true);
    }

    /**
     * @return array
     */
    public function getAssortmentZonesArray(): array
    {
        $assortmentZonesArray = [];

        $transferAsortmentZones = $this->getFactory()
            ->createAssortmentZonePersistenceQuery()
            ->find()
            ->toArray();

        foreach ($transferAsortmentZones as $listAsortmentZones) {
            $idAssortmentZone = $listAsortmentZones['IdAssortmentZone'];
            $assortmentZone = $listAsortmentZones['AssortmentZone'];
                $assortmentZonesArray[$idAssortmentZone] = $assortmentZone;
        }

        return $assortmentZonesArray;
    }
}
