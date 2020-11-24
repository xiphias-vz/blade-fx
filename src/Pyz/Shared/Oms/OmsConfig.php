<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Oms;

use Spryker\Shared\Oms\OmsConfig as SprykerOmsConfig;

class OmsConfig extends SprykerOmsConfig
{
    public const EVENT_ID_USER = 'event_id_user';

    public const STATE_TYPE_FLAG_CANCELLABLE_BY_CUSTOMER = 'cancellable by customer';
    public const STATE_TYPE_FLAG_CANCELLED = 'cancelled';
    public const STATE_TYPE_FLAG_SHIPPED_MAIL_AWAITS = 'shipped mail awaits';
    public const EVENT_ORDER_CANCEL_BY_CUSTOMER = 'cancel by customer';

    public const STORE_STATE_READY_FOR_PICKING = 'ready for picking';
    public const STORE_STATE_READY_FOR_SELECTING_SHELVES = 'ready for selecting shelves';
    public const STORE_STATE_READY_FOR_CASHIER_ORDER_EXPORT = 'ready for cashier order export';
    public const STORE_STATE_PICKED = 'picked';
    public const STORE_STATE_CANCELLED_NOT_IN_STOCK = 'cancelled due to not in stock';
    public const STORE_STATE_CASHIER_ORDER_EXPORTING_FAIL = 'cashier order exporting fail';
    public const STORE_STATE_CASHIER_EXPORT_PROCESS = 'cashier export process';

    public const STORE_EVENT_CONFIRM_PICKING = 'confirm picking';
    public const STORE_EVENT_CONFIRM_SELECTING_CONTAINERS = 'confirm selecting containers';
    public const STORE_EVENT_CANCEL_NOT_IN_STOCK = 'cancel due to not in stock';

    public const STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER = 'ready for collection';
    public const STORE_STATE_COLLECTED_BY_CUSTOMER = 'collected by customer';
    public const STORE_STATE_COLLECTION_CANCELLED_BY_CUSTOMER = 'collection cancelled by customer';
    public const STORE_STATE_COLLECTION_CANCELLED_BY_STORE = 'collection cancelled by store';

    public const STORE_EVENT_CONFIRM_COLLECTION = 'confirm collection';
    public const STORE_EVENT_CANCEL_COLLECTION_BY_CUSTOMER = 'cancel collection by customer';
    public const STORE_STATE_READY_FOR_DELIVERY = 'ready for delivery';

    public const STORE_STATE_DELIVERY_STARTED = 'delivery started';
    public const STORE_STATE_DELIVERED = 'delivered to customer';
    public const STORE_STATE_DELIVERY_CANCELLED_BY_CUSTOMER = 'delivery cancelled by customer';
    public const STORE_STATE_DELIVERY_CANCELLED_BY_STORE = 'delivery cancelled by store';

    public const STORE_EVENT_START_DELIVERY = 'start delivery';
    public const STORE_EVENT_CANCEL_START_DELIVERY = 'cancel start delivery';
    public const STORE_EVENT_CONFIRM_DELIVERY = 'confirm delivery';
    public const STORE_EVENT_CANCEL_DELIVERY_BY_CUSTOMER = 'cancel delivery by customer';
    public const STORE_STATE_CANCELLED_BY_TIMEOUT = 'cancelled by timeout';

    public const STATE_NEW = 'new';
    public const STATE_CANCELLED = 'cancelled';
    public const STATE_CLOSED = 'closed';
    public const STATE_IN_PROCESSING = 'in processing';
    public const STATE_INVALID = 'invalid';
    public const STATE_COMPLETED = 'completed';
    public const STATE_CANCELLED_BY_CUSTOMER = 'cancelled by customer';
}
