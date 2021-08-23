<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper;

use Spryker\Zed\SalesDataExport\Persistence\Propel\Mapper\SalesOrderMapper as SpySalesOrderMapper;

class SalesOrderMapper extends SpySalesOrderMapper
{
    /**
     * @var array
     */
    protected $fieldMapping = [
        'order_reference' => 'SpySalesOrder.OrderReference',
        'customer_reference' => 'SpySalesOrder.CustomerReference',
        'is_substitution_allowed' => 'SpySalesOrder.isSubstitutionAllowed',
        'order_created_at' => 'SpySalesOrder.CreatedAt',
        'order_updated_at' => 'SpySalesOrder.UpdatedAt',
        'order_store' => 'SpySalesOrder.Store',
        'email' => 'SpySalesOrder.Email',
        'salutation' => 'SpySalesOrder.Salutation',
        'first_name' => 'SpySalesOrder.FirstName',
        'last_name' => 'SpySalesOrder.LastName',
        'order_note' => 'SpySalesOrder.CartNote',
        'currency_iso_code' => 'SpySalesOrder.CurrencyIsoCode',
        'price_mode' => 'SpySalesOrder.PriceMode',
        'locale_name' => 'Locale.LocaleName',
        'billing_address_salutation' => 'BillingAddress.Salutation',
        'billing_address_first_name' => 'BillingAddress.FirstName',
        'billing_address_last_name' => 'BillingAddress.LastName',
        'billing_address_middle_name' => 'BillingAddress.MiddleName',
        'billing_address_email' => 'BillingAddress.Email',
        'billing_address_cell_phone' => 'BillingAddress.CellPhone',
        'billing_address_phone' => 'BillingAddress.Phone',
        'billing_address_address1' => 'BillingAddress.Address1',
        'billing_address_address2' => 'BillingAddress.Address2',
        'billing_address_address3' => 'BillingAddress.Address3',
        'billing_address_city' => 'BillingAddress.City',
        'billing_address_zip_code' => 'BillingAddress.ZipCode',
        'billing_address_po_box' => 'BillingAddress.PoBox',
        'billing_address_company' => 'BillingAddress.Company',
        'billing_address_description' => 'BillingAddress.Description',
        'billing_address_comment' => 'BillingAddress.Comment',
        'billing_address_country' => 'Country.Name',
        'billing_address_region' => 'Region.Name',
        'order_totals_canceled_total' => 'OrderTotal.CanceledTotal',
        'order_totals_discount_total' => 'OrderTotal.DiscountTotal',
        'order_totals_grand_total' => 'OrderTotal.GrandTotal',
        'order_totals_order_expense_total' => 'OrderTotal.OrderExpenseTotal',
        'order_totals_refund_total' => 'OrderTotal.RefundTotal',
        'order_totals_subtotal' => 'OrderTotal.Subtotal',
        'order_totals_tax_total' => 'OrderTotal.TaxTotal',
    ];

    /**
     * @return array
     */
    public function getFieldMapping(): array
    {
        return $this->fieldMapping;
    }
}
