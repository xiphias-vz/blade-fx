<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Shared\Picker;

class PickerConfig
{
    public const REQUEST_PARAM_ID_ORDER = 'idOrder';

    public const ACTIVITIES = [
        [
            'name' => 'picker.activity.picking',
            'path' => self::URL_PICKING_LIST,
        ],
        [
            'name' => 'picker.activity.collection',
            'path' => self::URL_COLLECT_BY_CUSTOMER_LIST,
        ],
    ];

    public const URL_PICKING_LIST = '/picker/picking';
    public const URL_START_ORDER_PICKING = '/picker/picking/start-order-picking';
    public const URL_STOP_ORDER_PICKING = '/picker/picking/stop-order-picking';
    public const URL_ORDER_PICKING = '/picker/picking/order-picking';

    public const URL_COLLECT_BY_CUSTOMER_LIST = '/picker/collect-by-customer';
    public const URL_COLLECT_BY_CUSTOMER_CONFIRMATION = '/picker/collect-by-customer/confirm';
    public const URL_COLLECT_BY_CUSTOMER_CANCELLATION = '/picker/collect-by-customer/cancel';
    public const URL_COLLECT_BY_CUSTOMER_DETAILS = '/picker/collect-by-customer/details';

    public const FORMAT_ORDER_ITEM_NAME = '%s - %s';
    public const FORMAT_ORDER_ITEM_VARIETY_NAME = '(%s)';
}
