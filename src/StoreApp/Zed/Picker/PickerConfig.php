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
     * @return array
     */
    public function getDaysInTheWeek(): array
    {
        return $this->get(PickerConstants::DAYS_IN_THE_WEEK);
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
            'multi-picking',
            'scanning-container',
            'scanning-container-merge',
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
     * @return string
     */
    public function getMultiPickingUri(): string
    {
        return '/picker/multi-picking';
    }

    /**
     * @return string
     */
    public function getScanningContainerUri(): string
    {
        return '/picker/scanning-container';
    }

    /**
     * @return string
     */
    public function getScanningContainerMergeUri(): string
    {
        return '/picker/scanning-container-merge';
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

    /**
     * @return string
     */
    public function getPosListeUri(): string
    {
        return '/picker/pos-liste';
    }

    /**
     * @return string
     */
    public function getOverviewUri(): string
    {
        return '/picker/multi-picking-overview-of-containers-on-order';
    }

    /**
     * @return string
     */
    public function getShelfToContainerOnOrder(): string
    {
        return '/picker/multi-picking-scanning-container';
    }

    /**
     * @return string
     */
    public function getMultiPicking(): string
    {
        return '/picker/multi-picking/multi-order-picking';
    }
}
