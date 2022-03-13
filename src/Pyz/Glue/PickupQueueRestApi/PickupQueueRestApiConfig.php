<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class PickupQueueRestApiConfig extends AbstractBundleConfig
{
    public const RESOURCE_PICKUP_QUEUE = 'pickupQueue';
    public const RESOURCE_ADD_TO_QUEUE = 'addToQueue';
    public const RESOURCE_GET_ORDERS_QUEUE = 'getOrdersQueue';

    public const RESPONSE_CODE_ORDER_MET_NO_CRITERIA = '0';
    public const RESPONSE_DETAIL_ORDER_MET_NO_CRITERIA = 'Order did not meet any criteria.';
    public const RESPONSE_CODE_ORDER_INVOICED = '10';
    public const RESPONSE_DETAIL_ORDER_INVOICED = 'Order is collected by customer';
    public const RESPONSE_CODE_ORDER_EXCEEDED_TIME_SLOT_WITH_NO_READY_FOR_COLLECTION = '21';
    public const RESPONSE_DETAIL_ORDER_EXCEEDED_TIME_SLOT_WITH_NO_READY_FOR_COLLECTION = 'Order has exceeded scheduled timeslot and status is NOT ready for collection';
    public const RESPONSE_CODE_ORDER_HAS_TIME_SLOT_IN_FUTURE_WITH_NO_READY_FOR_COLLECTION = '22';
    public const RESPONSE_DETAIL_ORDER_HAS_TIME_SLOT_IN_FUTURE_WITH_NO_READY_FOR_COLLECTION = 'Order has scheduled timeslot in future and status is NOT ready for collection';
    public const RESPONSE_CODE_ORDER_DOES_NOT_EXIST = '30';
    public const RESPONSE_DETAIL_ORDER_DOES_NOT_EXIST = 'Order does not exist';
    public const RESPONSE_CODE_ORDER_WAS_NOT_ORDERED_FROM_CURRENT_STORE = '40';
    public const RESPONSE_DETAIL_ORDER_WAS_NOT_ORDERED_FROM_CURRENT_STORE = 'Order is not ordered for this store!';
    public const RESPONSE_CODE_UNSPECIFIED_ERROR = '500';
    public const RESPONSE_DETAIL_UNSPECIFIED_ERROR = 'An error has occurred.';
}
