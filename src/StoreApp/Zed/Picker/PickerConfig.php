<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker;

use Spryker\Zed\Kernel\AbstractBundleConfig;
use StoreApp\Shared\Picker\PickerConstants;

class PickerConfig extends AbstractBundleConfig
{
    /**
     * @return int
     */
    public function getMaxPickingBags(): int
    {
        return $this->get(PickerConstants::MAX_PICKING_BAGS);
    }

    /**
     * @return int
     */
    public function getMaxOrdersCountToDisplay(): int
    {
        return $this->get(PickerConstants::MAX_ORDERS_COUNT_TO_DISPLAY);
    }
}
