<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Shared\Picker;

interface PickerConstants
{
    public const MAX_PICKING_BAGS = 'PICKER:MAX_PICKING_BAGS';
    public const MAX_ORDERS_COUNT_TO_DISPLAY = 'PICKER:MAX_ORDERS_COUNT_TO_DISPLAY';
    public const DAYS_IN_THE_WEEK = 'DAYS_IN_THE_WEEK';

    /**
     * How many days in past are orders for pickup(abholung) taken in account
     */
    public const PICKUP_DATE_INTERVAL_MINUS = -1;
}
