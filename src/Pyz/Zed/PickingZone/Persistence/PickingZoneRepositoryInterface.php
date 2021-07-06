<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Persistence;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;

interface PickingZoneRepositoryInterface
{
    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function getPickingZones(string $merchantReference): array;

    /**
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneById(int $idPickingZone): ?PickingZoneTransfer;

    /**
     * @param int $idSalesOrder
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer|null
     */
    public function findOrderPickingBlock(int $idSalesOrder, int $idPickingZone): ?OrderPickingBlockTransfer;

    /**
     * @return array
     */
    public function getPickingZonesArray(): array;

    /**
     * @param string $idMerchant
     *
     * @return array
     */
    public function getMappedAsortmentPickingZonesArray(string $idMerchant): array;
}
