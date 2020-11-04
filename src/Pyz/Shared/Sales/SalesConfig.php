<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Sales;

use Pyz\Shared\Tax\TaxConfig;

interface SalesConfig
{
    public const ORDER_STATUS_DELIVERED_ON = 'delivered_on';
    public const ORDER_STATUS_CANCELLED = 'cancelled';

    public const DEPOSIT_TAX_RATE = TaxConfig::TAX_RATE_STANDARD;
    public const DEPOSIT_OPTION_NAME = 'OP_product_deposit';
    public const EXPENSE_BOTTLE_DEPOSIT_TYPE = 'SALES:BOTTLE_DEPOSIT';
}
