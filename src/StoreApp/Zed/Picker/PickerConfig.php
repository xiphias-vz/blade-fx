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

    /**
     * @api
     *
     * @return mixed[]
     */
    public function getAllowedControllerNames(): array
    {
        return [
            'select-picking-zone',
            'diff-sections',
            'collect-by-customer',
            'container-to-shelf',
        ];
    }

    /**
     * @api
     *
     * @return string
     */
    public function getPickingUri(): string
    {
        return '/picker/picking';
    }

    /**
     * @api
     *
     * @return string
     */
    public function getDiffSectionsUri(): string
    {
        return '/picker/diff-sections';
    }

    /**
     * @api
     *
     * @return string
     */
    public function getPickingZoneSessionKey(): string
    {
        return 'picking_zone';
    }
}
