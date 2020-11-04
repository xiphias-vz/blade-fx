<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Sales;

use Spryker\Shared\Sales\SalesConstants as SprykerSalesConstants;

interface SalesConstants extends SprykerSalesConstants
{
    public const BOTTLE_DEPOSIT_PRICE_IN_CENTS = 'SALES:BOTTLE_DEPOSIT_PRICE_IN_CENTS';

    public const ORDER_CANCELLATION_ALLOWED_PERIOD = 'SALES:ORDER_CANCELLATION_ALLOWED_PERIOD';
    public const ORDER_EXPIRE_HOUR = 'SALES:ORDER_EXPIRE_HOUR';
    public const ORDER_READY_FOR_PICKING_HOUR = 'ORDER_READY_FOR_PICKING_HOUR';
}
