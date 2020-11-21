<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Reader;

use Generated\Shared\Transfer\PickingZoneTransfer;

interface PickingZoneReaderInterface
{
    /**
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findInSession(): ?PickingZoneTransfer;
}
