<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\PickingZoneTransfer;

interface PickingZoneRepositoryInterface
{
    /**
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function getPickingZones(): array;

    /**
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneById(int $idPickingZone): ?PickingZoneTransfer;
}
