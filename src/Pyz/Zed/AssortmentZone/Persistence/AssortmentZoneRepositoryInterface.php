<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AssortmentZone\Persistence;

interface AssortmentZoneRepositoryInterface
{
    /**
     * @return \Generated\Shared\Transfer\AssortmentZoneTransfer[]
     */
    public function getAssortmentZones(): array;
}
