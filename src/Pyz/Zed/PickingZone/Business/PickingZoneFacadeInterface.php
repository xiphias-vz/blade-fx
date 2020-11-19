<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Business;

use Generated\Shared\Transfer\PickingZoneTransfer;

interface PickingZoneFacadeInterface
{
    /**
     * Specification:
     * - Finds all picking zones.
     * - Returns a collection of found picking zones.
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function getPickingZones(): array;

    /**
     * Specification:
     * - Returns a picking zone found using $idPickingZone.
     * - Returns NULL if picking zone doesn't exist.
     *
     * @api
     *
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneById(int $idPickingZone): ?PickingZoneTransfer;
}
