<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Form\DataProvider;

abstract class AbstractOmsTriggerFormDataProvider
{
    public const OMS_ACTION_ORDER_TRIGGER = 'submit-trigger-event-for-order';
    public const QUERY_PARAM_EVENT = 'event';
    public const QUERY_PARAM_ID_SALES_ORDER = 'id-sales-order';
    public const QUERY_PARAM_ID_PICKING_ZONE = 'pickingZone';
    public const QUERY_PARAM_REDIRECT = 'redirect';

    public const SUBMIT_BUTTON_CLASS = 'btn btn-primary btn-sm trigger-event';

    /**
     * @param string $redirectUrl
     * @param string $event
     * @param int $idSalesOrderItem
     * @param string|null $idPickingZone
     *
     * @return array
     */
    abstract public function getOptions(string $redirectUrl, string $event, int $idSalesOrderItem, ?string $idPickingZone = null): array;
}
