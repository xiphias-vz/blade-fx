<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\OrderDetail;

interface OrderDetailConstants
{
    public const KEY_TAX = 'tax';
    public const KEY_SUM = 'sum';
    public const KEY_NET = 'net';
    public const KEY_BOTTLE_DEPOSIT_PRICE = 'bottleDepositPrice';
    public const KEY_ITEMS = 'items';
    public const KEY_ORDERED_ITEMS = 'orderedItems';
    public const KEY_CANCELLED_ITEMS = 'cancelledItems';
    public const KEY_IS_LOCATION_SHOWABLE = 'isLocationShowable';
    public const KEY_PURCHASED_BOTTLES_PRICE = 'purchasedBottlesPrice';
    public const KEY_BOTTLE_COUNT = 'bottleCount';
    public const KEY_ORDER = 'order';
    public const KEY_BOTTLE_DEPOSIT_NAME = 'bottleDepositName';
    public const KEY_BOTTLE_DEPOSIT_UNIT_PRICE = 'bottleDepositUnitPrice';
    public const KEY_EXPENSES = 'expenses';
    public const KEY_EXPENSES_TAX = 'expenses_tax';
    public const KEY_TAX_PAYMENTS = 'taxPayments';
    public const KEY_TAX_PAYMENTS_NO_BOTTLES = 'taxPaymentsNoBottles';
    public const KEY_TAX_PAYMENTS_BOTTLES = 'taxPaymentsBottles';
    public const KEY_TAX_PAYMENTS_EXPENSES = 'taxPaymentsExpenses';
    public const KEY_INVOICE_DUE_DATE = 'invoiceDueDate';
    public const KEY_DELIVERY_TOTAL = 'deliveryTotal';
    public const TAX_RATE_MULTIPLIER = 100;
}
