<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Shared\Delivery;

class DeliveryConfig
{
    public const REQUEST_PARAM_ID_ORDER = 'idOrder';

    public const URL_DELIVERY_LIST = '/delivery';

    public const URL_DELIVERY_START = '/delivery/index/start';
    public const URL_DELIVERY_START_ALL = '/delivery/index/start-all';
    public const URL_DELIVERY_CONFIRM = '/delivery/index/confirm';
    public const URL_DELIVERY_IN_PROGRESS = '/delivery/index/delivery';
    public const URL_DELIVERY_CANCEL = '/delivery/index/cancel-by-customer';
}
