<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Writer;

interface PickingZoneWriterInterface
{
    /**
     * @param int $idPickingZone
     *
     * @return void
     */
    public function saveInSession(int $idPickingZone): void;
}
