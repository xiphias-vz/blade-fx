<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence\Propel\Mapper;

class SalesExpenseMapper
{
    /**
     * @var array
     */
    protected $fieldMapping = [
        'order_reference' => 'Order.OrderReference',
        'order_shipment_id' => 'SpySalesShipment.IdSalesShipment',
        'canceled_amount' => 'SpySalesExpense.CanceledAmount',
        'discount_amount_aggregation' => 'SpySalesExpense.DiscountAmountAggregation',
        'gross_price' => 'SpySalesExpense.GrossPrice',
        'name' => 'SpySalesExpense.Name',
        'net_price' => 'SpySalesExpense.NetPrice',
        'price' => 'SpySalesExpense.Price',
        'price_to_pay_aggregation' => 'SpySalesExpense.PriceToPayAggregation',
        'refundable_amount' => 'SpySalesExpense.RefundableAmount',
        'tax_amount' => 'SpySalesExpense.TaxAmount',
        'tax_amount_after_cancellation' => 'SpySalesExpense.TaxAmountAfterCancellation',
        'tax_rate' => 'SpySalesExpense.TaxRate',
        'type' => 'SpySalesExpense.Type',
        'expense_created_at' => 'SpySalesExpense.CreatedAt',
        'expense_updated_at' => 'SpySalesExpense.UpdatedAt',
    ];

    /**
     * @return array
     */
    public function getFieldMapping(): array
    {
        return $this->fieldMapping;
    }

    /**
     * @param array $salesExpenseRows
     *
     * @return array
     */
    public function mapSalesExpenseDataByField(array $salesExpenseRows): array
    {
        $fields = $this->getFields();
        $selectedFields = array_values(array_intersect_key($fields, $salesExpenseRows[0] ?? []));

        $mappedSalesExpenses = [];
        foreach ($salesExpenseRows as $salesExpenseRow) {
            $mappedSalesExpenses[] = array_combine($selectedFields, $salesExpenseRow);
        }

        return $mappedSalesExpenses;
    }

    /**
     * @return array
     */
    protected function getFields(): array
    {
        return array_flip($this->fieldMapping);
    }
}
