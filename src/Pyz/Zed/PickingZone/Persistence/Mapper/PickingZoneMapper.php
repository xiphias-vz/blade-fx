<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence\Mapper;

use Generated\Shared\Transfer\PickingZoneTransfer;
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
}
