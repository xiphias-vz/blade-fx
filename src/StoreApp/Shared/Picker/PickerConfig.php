<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Shared\Picker;

class PickerConfig
{
    public const REQUEST_PARAM_ID_ORDER = 'idOrder';
    public const REQUEST_PARAM_SKU = 'sku';

    public const ACTIVITIES = [
        [
            'name' => 'picker.activity.multi-picking',
            'path' => self::URL_ORDER_MULTI_PICKING,
        ],
        [
            'name' => 'picker.activity.picking',
            'path' => self::URL_PICKING_LIST,
        ],
        [
            'name' => 'picker.activity.container-to-shelf',
            'path' => self::URL_CONTAINER_TO_SHELF,
        ],
        [
            'name' => 'picker.activity.collection',
            'path' => self::URL_COLLECT_BY_CUSTOMER_LIST,
        ],
    ];

    public const SECTIONS = [
        [
            'name' => 'picker.activity.multi-picking',
            'path' => self::URL_DIFF_PICKING_ZONE_FOR_MULTI_PICKING,
        ],
        [
            'name' => 'picker.activity.picking',
            'path' => self::URL_DIFF_PICKING_ZONE,
        ],
        [
            'name' => 'picker.activity.container-to-shelf',
            'path' => self::URL_CONTAINER_TO_SHELF,
        ],
        [
            'name' => 'picker.activity.collection',
            'path' => self::URL_COLLECT_BY_CUSTOMER_LIST,
        ],
    ];

    public const URL_DIFF_PICKING_ZONE = '/picker/select-picking-zone';
    public const URL_DIFF_PICKING_ZONE_FOR_MULTI_PICKING = '/picker/select-picking-zone?multi_picking=1';
    public const URL_DIFF_SECTIONS = '/picker/diff-sections';
    public const URL_PICKING_LIST = '/picker/picking';
    public const URL_SELECT_SHELVES = '/picker/select-shelves';
    public const URL_SELECT_CONTAINERS = '/picker/picking/select-containers';
    public const URL_START_ORDER_PICKING = '/picker/picking/start-order-picking';
    public const URL_STOP_ORDER_PICKING = '/picker/picking/stop-order-picking';
    public const URL_ORDER_PICKING = '/picker/picking/order-picking';
    public const URL_ORDER_MULTI_PICKING = '/picker/multi-picking';
    public const URL_POS_LISTE = '/picker/pos-liste';
    public const URL_MULTI_PICKING_OVERVIEW = '/picker/multi-picking-overview-of-containers-on-order';
    public const URL_MULTI_PICKING_START_PICKING = '/picker/multi-picking/multi-order-picking';
    public const URL_MULTI_PICKING_SCAN_SHELVES = '/picker/multi-picking-scanning-container';

    public const URL_COLLECT_BY_CUSTOMER_LIST = '/picker/collect-by-customer';
    public const URL_CONTAINER_TO_SHELF = '/picker/container-to-shelf';
    public const URL_COLLECT_BY_CUSTOMER_CONFIRMATION = '/picker/collect-by-customer/confirm';
    public const URL_COLLECT_BY_CUSTOMER_CANCELLATION = '/picker/collect-by-customer/cancel';
    public const URL_COLLECT_BY_CUSTOMER_DETAILS = '/picker/collect-by-customer/details';

    public const FORMAT_ORDER_ITEM_NAME = '%s - %s';
    public const FORMAT_ORDER_ITEM_VARIETY_NAME = '(%s)';
}
