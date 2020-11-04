<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetail\Model;

use DateInterval;
use DateTime;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Client\OrderDetail\OrderDetailConfig;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Pyz\Shared\Sales\SalesConfig;
use Pyz\Shared\Tax\TaxConfig;
use Spryker\Client\Customer\CustomerClientInterface;
use Spryker\Client\Sales\SalesClientInterface;

class OrderDetailModel
{
    /**
     * @var \Spryker\Client\Sales\SalesClientInterface
     */
    protected $salesClient;

    /**
     * @var \Spryker\Client\Customer\CustomerClientInterface
     */
    protected $customerClient;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    protected $dateTimeWithZoneService;

    /**
     * @var \Pyz\Client\OrderDetail\OrderDetailConfig
     */
    protected $orderDetailConfig;

    /**
     * @param \Spryker\Client\Sales\SalesClientInterface $salesClient
     * @param \Spryker\Client\Customer\CustomerClientInterface $customerClient
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Pyz\Client\OrderDetail\OrderDetailConfig $orderDetailConfig
     */
    public function __construct(
        SalesClientInterface $salesClient,
        CustomerClientInterface $customerClient,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        OrderDetailConfig $orderDetailConfig
    ) {
        $this->salesClient = $salesClient;
        $this->customerClient = $customerClient;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->orderDetailConfig = $orderDetailConfig;
    }

    /**
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getOrderDetailData(int $idSalesOrder, int $idCustomer): array
    {
        $orderTransfer = new OrderTransfer();
        $orderTransfer
            ->setIdSalesOrder($idSalesOrder)
            ->setFkCustomer($idCustomer);

        $orderTransfer = $this->salesClient
            ->getOrderDetails($orderTransfer);

        if ($orderTransfer->getIdSalesOrder() === null) {
            return [];
        }

        return $this->getOrderDetailDataFromOrder((new OrderDetailRequestTransfer())->fromArray($orderTransfer->toArray(), true));
    }

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return array
     */
    public function getInvoiceOrderDetailDataByOrder(OrderDetailRequestTransfer $orderDetailRequestTransfer): array
    {
        if (!$orderDetailRequestTransfer->getItems()->count()) {
            return [];
        }

        $orderDetails = $this->getOrderDetailDataFromOrder($orderDetailRequestTransfer);

        if (empty($orderDetails)) {
            return [];
        }

        return $this->buildInvoiceOrderDetailDataFromOrderDetails($orderDetails);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return array
     */
    private function getOrderDetailDataFromOrder(OrderDetailRequestTransfer $orderDetailRequestTransfer): array
    {
        $orderDetails = [
            OrderDetailConstants::KEY_ORDER => $orderDetailRequestTransfer,
            OrderDetailConstants::KEY_ITEMS => $orderDetailRequestTransfer->getItems()->getArrayCopy(),
        ];

        $bottleDepositName = '';
        $bottleDepositPrice = 0;
        $bottleCount = 0;

        foreach ($orderDetailRequestTransfer->getExpenses() as $expenseTransfer) {
            if ($expenseTransfer->getType() !== SalesConfig::EXPENSE_BOTTLE_DEPOSIT_TYPE) {
                continue;
            }

            $bottleDepositName = $expenseTransfer->getName();
            $bottleDepositPrice += $expenseTransfer->getUnitPrice();
            $bottleCount++;
        }

        $orderDetails[OrderDetailConstants::KEY_BOTTLE_DEPOSIT_NAME] = $bottleDepositName;
        $orderDetails[OrderDetailConstants::KEY_BOTTLE_DEPOSIT_UNIT_PRICE] = $this->orderDetailConfig->getBottleDepositPrice();
        $orderDetails[OrderDetailConstants::KEY_BOTTLE_COUNT] = $bottleCount;
        $orderDetails[OrderDetailConstants::KEY_BOTTLE_DEPOSIT_PRICE] = $bottleDepositPrice;
        $orderDetails[OrderDetailConstants::KEY_EXPENSES] = $this->getNonBottleExpenses($orderDetailRequestTransfer);
        $orderDetails[OrderDetailConstants::KEY_EXPENSES_TAX] = $this->getExpensesTax($orderDetailRequestTransfer);

        $groupedItems = $this->groupSameProducts($orderDetails[OrderDetailConstants::KEY_ITEMS]);
        $orderDetails[OrderDetailConstants::KEY_ITEMS] = $groupedItems[OrderDetailConstants::KEY_ITEMS];
        $orderDetails[OrderDetailConstants::KEY_ORDERED_ITEMS] = $groupedItems[OrderDetailConstants::KEY_ORDERED_ITEMS];
        $orderDetails[OrderDetailConstants::KEY_CANCELLED_ITEMS] = $groupedItems[OrderDetailConstants::KEY_CANCELLED_ITEMS];
        $orderDetails[OrderDetailConstants::KEY_IS_LOCATION_SHOWABLE] = !in_array(
            $orderDetailRequestTransfer->getStatus(),
            [SalesConfig::ORDER_STATUS_DELIVERED_ON, SalesConfig::ORDER_STATUS_CANCELLED]
        );

        $purchasedBottlesPrice = $this->calculatePurchasedBottlesPrice($orderDetails[OrderDetailConstants::KEY_ORDERED_ITEMS]);
        $orderDetails[OrderDetailConstants::KEY_PURCHASED_BOTTLES_PRICE] = $purchasedBottlesPrice;

        return $orderDetails;
    }

    /**
     * @param int $idSalesOrder
     * @param int $idCustomer
     *
     * @return array
     */
    public function getInvoiceOrderDetailData(int $idSalesOrder, int $idCustomer): array
    {
        $orderDetails = $this->getOrderDetailData($idSalesOrder, $idCustomer);

        if (empty($orderDetails)) {
            return [];
        }

        return $this->buildInvoiceOrderDetailDataFromOrderDetails($orderDetails);
    }

    /**
     * @param array $orderDetails
     *
     * @return array
     */
    private function buildInvoiceOrderDetailDataFromOrderDetails(array $orderDetails): array
    {
        /** @var \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer */
        $orderDetailRequestTransfer = $orderDetails[OrderDetailConstants::KEY_ORDER];

        $taxPayments = $this->initTaxPaymentsByRate();
        $taxPayments = $this->groupTaxPaymentsByRate($taxPayments, $orderDetails[OrderDetailConstants::KEY_ITEMS]);
        $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS_NO_BOTTLES] = $this->calculateTaxesByRate($taxPayments);

        $bottleTaxPayments = [];
        $bottleTaxPayments = $this->addBottleTaxes($bottleTaxPayments, $orderDetails[OrderDetailConstants::KEY_PURCHASED_BOTTLES_PRICE]);
        $bottleTaxPayments = $this->addBottleTaxes($bottleTaxPayments, $orderDetails[OrderDetailConstants::KEY_BOTTLE_DEPOSIT_PRICE]);
        $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS_BOTTLES] = $this->calculateTaxesByRate($bottleTaxPayments);

        $taxPayments = $this->addBottleTaxes($taxPayments, $orderDetails[OrderDetailConstants::KEY_PURCHASED_BOTTLES_PRICE]);
        $taxPayments = $this->addBottleTaxes($taxPayments, $orderDetails[OrderDetailConstants::KEY_BOTTLE_DEPOSIT_PRICE]);
        $taxPayments = $this->calculateTaxesByRate($taxPayments);
        $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS] = $taxPayments;

        $taxPayments = $this->addExpensesTaxes($taxPayments, $orderDetails[OrderDetailConstants::KEY_EXPENSES]);
        $taxPayments = $this->calculateTaxesByRate($taxPayments);

        $taxTotal = $orderDetailRequestTransfer->getTotals()->getTaxTotal()->getAmount();
        $taxPayments = $this->adjustTaxesByRateWithTotalTax($taxPayments, $taxTotal);
        $orderDetailRequestTransfer->getTotals()->setNetTotal($orderDetailRequestTransfer->getTotals()->getGrandTotal() - $taxTotal);

        $orderDetails[OrderDetailConstants::KEY_DELIVERY_TOTAL] = $this->getDeliveryTotal($orderDetailRequestTransfer);
        $orderDetails[OrderDetailConstants::KEY_ORDER] = $orderDetailRequestTransfer;
        $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS_EXPENSES] = $taxPayments;
        $orderDetails[OrderDetailConstants::KEY_INVOICE_DUE_DATE] = $this->getInvoiceDueDate($orderDetailRequestTransfer);

        return $orderDetails;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $items
     *
     * @return array
     */
    protected function groupSameProducts(array $items): array
    {
        $groupedAllItems = [];
        $groupedOrderedItems = [];
        $groupedCancelledItems = [];

        foreach ($items as $itemTransfer) {
            $groupedAllItems = $this->updateGroupedItems($groupedAllItems, $itemTransfer);

            if ($itemTransfer->getCanceledAmount()) {
                $groupedCancelledItems = $this->updateGroupedItems($groupedCancelledItems, $itemTransfer);

                continue;
            }

            $groupedOrderedItems = $this->updateGroupedItems($groupedOrderedItems, $itemTransfer);
        }

        return [
            OrderDetailConstants::KEY_ITEMS => $groupedAllItems,
            OrderDetailConstants::KEY_ORDERED_ITEMS => $groupedOrderedItems,
            OrderDetailConstants::KEY_CANCELLED_ITEMS => $groupedCancelledItems,
        ];
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $groupedItems
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    protected function updateGroupedItems(
        array $groupedItems,
        ItemTransfer $itemTransfer
    ): array {
        $groupedItemId = sprintf('%s-%s-%s-%s', $itemTransfer->getSku(), $itemTransfer->getSumPrice(), $itemTransfer->getTaxRate(), $itemTransfer->getCanceledAmount());

        $groupedItemTransfer = $groupedItems[$groupedItemId] ?? null;

        if ($groupedItemTransfer === null) {
            $groupedItemTransfer = (new ItemTransfer())->fromArray($itemTransfer->toArray());

            $groupedItems[$groupedItemId] = $groupedItemTransfer;

            return $groupedItems;
        }

        $groupedItemTransfer->setQuantity($groupedItemTransfer->getQuantity() + $itemTransfer->getQuantity())
            ->setSumGrossPrice($groupedItemTransfer->getSumGrossPrice() + $itemTransfer->getSumGrossPrice())
            ->setSumPrice($groupedItemTransfer->getSumPrice() + $itemTransfer->getSumPrice())
            ->setSumTaxAmount($groupedItemTransfer->getSumTaxAmount() + $itemTransfer->getSumTaxAmount())
            ->setSumNetPrice($groupedItemTransfer->getSumNetPrice() + $itemTransfer->getSumNetPrice())
            ->setCanceledAmount($groupedItemTransfer->getCanceledAmount() + $itemTransfer->getCanceledAmount())
            ->setSumProductOptionPriceAggregation(
                $groupedItemTransfer->getSumProductOptionPriceAggregation()
                + $itemTransfer->getSumProductOptionPriceAggregation()
            );

        if ($groupedItemTransfer->getProductOptions()->count()) {
            $groupedItemTransfer->getProductOptions()[0]->setSumPrice(
                $groupedItemTransfer->getProductOptions()[0]->getSumPrice() +
                $itemTransfer->getProductOptions()[0]->getSumPrice()
            );
        }

        return $groupedItems;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $orderedItems
     *
     * @return int
     */
    protected function calculatePurchasedBottlesPrice(array $orderedItems): int
    {
        $purchasedBottlesPrice = 0;

        foreach ($orderedItems as $itemTransfer) {
            foreach ($itemTransfer->getProductOptions() as $productOptionTransfer) {
                if (strpos($productOptionTransfer->getSku(), SalesConfig::DEPOSIT_OPTION_NAME) !== 0) {
                    continue;
                }

                $purchasedBottlesPrice += $productOptionTransfer->getSumPrice();
            }
        }

        return $purchasedBottlesPrice;
    }

    /**
     * @return array
     */
    protected function initTaxPaymentsByRate(): array
    {
        $taxPayments = [];

        foreach (TaxConfig::TAX_RATES as $taxRate) {
            $taxPayments = $this->aggregateSumByTax($taxPayments, $taxRate, 0);
        }

        return $taxPayments;
    }

    /**
     * @param array $taxPayments
     * @param int $taxRateValue
     * @param int $sumAmount
     *
     * @return array
     */
    protected function aggregateSumByTax(array $taxPayments, int $taxRateValue, int $sumAmount): array
    {
        $keyTaxRate = (int)(OrderDetailConstants::TAX_RATE_MULTIPLIER * $taxRateValue);

        $taxRate = $taxPayments[$keyTaxRate] ??
            [
                OrderDetailConstants::KEY_SUM => 0,
            ];

        $taxRate[OrderDetailConstants::KEY_SUM] += $sumAmount;

        $taxPayments[$keyTaxRate] = $taxRate;

        return $taxPayments;
    }

    /**
     * @param array $taxPayments
     * @param \Generated\Shared\Transfer\ItemTransfer[] $items
     *
     * @return array
     */
    protected function groupTaxPaymentsByRate(array $taxPayments, array $items): array
    {
        foreach ($items as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount() > 0) {
                continue;
            }

            $taxPayments = $this->aggregateSumByTax(
                $taxPayments,
                $itemTransfer->getTaxRate(),
                $itemTransfer->getSumPrice()
            );
        }

        return $taxPayments;
    }

    /**
     * @param array $taxPayments
     * @param int $bottlePrice
     *
     * @return array
     */
    protected function addBottleTaxes(array $taxPayments, int $bottlePrice): array
    {
        $taxPayments = $this->aggregateSumByTax(
            $taxPayments,
            SalesConfig::DEPOSIT_TAX_RATE,
            $bottlePrice
        );

        return $taxPayments;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return int
     */
    protected function getDeliveryTotal(OrderDetailRequestTransfer $orderDetailRequestTransfer): int
    {
        $total = 0;

        foreach ($orderDetailRequestTransfer->getExpenses() as $expenseTransfer) {
            if ($expenseTransfer->getType() === SalesConfig::EXPENSE_BOTTLE_DEPOSIT_TYPE) {
                continue;
            }

            $total += $expenseTransfer->getSumGrossPrice();
        }

        return $total;
    }

    /**
     * @param array $taxPayments
     *
     * @return array
     */
    protected function calculateTaxesByRate(array $taxPayments): array
    {
        foreach ($taxPayments as $taxRateKey => &$taxDetails) {
            $taxRate = $taxRateKey / OrderDetailConstants::TAX_RATE_MULTIPLIER;

            $netAmountRaw = $taxDetails[OrderDetailConstants::KEY_SUM] * (100) / (100 + $taxRate);
            $taxDetails[OrderDetailConstants::KEY_NET] = (int)round($netAmountRaw);
            $taxDetails[OrderDetailConstants::KEY_TAX] = $taxDetails[OrderDetailConstants::KEY_SUM] - $taxDetails[OrderDetailConstants::KEY_NET];
        }

        return $taxPayments;
    }

    /**
     * @param array $taxPayments
     * @param int $taxTotal
     *
     * @return array
     */
    private function adjustTaxesByRateWithTotalTax(array $taxPayments, int &$taxTotal): array
    {
        $totalCalculatedTax = 0;
        $lastNotNullTaxKey = null;

        foreach ($taxPayments as $taxRateKey => &$taxDetails) {
            $totalCalculatedTax += $taxDetails[OrderDetailConstants::KEY_TAX];

            if ($taxDetails[OrderDetailConstants::KEY_TAX] > 0) {
                $lastNotNullTaxKey = $taxRateKey;
            }
        }

        $deltaTax = $taxTotal - $totalCalculatedTax;

        if (abs($deltaTax) < 10 && $lastNotNullTaxKey) {
            $taxPayments[$lastNotNullTaxKey][OrderDetailConstants::KEY_NET] -= $deltaTax;
            $taxPayments[$lastNotNullTaxKey][OrderDetailConstants::KEY_TAX] += $deltaTax;
        }

        $taxTotal = $totalCalculatedTax;

        return $taxPayments;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return \DateTime|null
     */
    private function getInvoiceDueDate(OrderDetailRequestTransfer $orderDetailRequestTransfer): ?DateTime
    {
        if (!$orderDetailRequestTransfer->getInvoiceCreatedAt()) {
            return null;
        }

        $orderDate = $this->dateTimeWithZoneService
            ->getDateTimeInStoreTimeZone($orderDetailRequestTransfer->getInvoiceCreatedAt());

        return $orderDate->add(new DateInterval(sprintf('P%sD', $this->orderDetailConfig->getInvoiceDueDateDays())));
    }

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return array
     */
    private function getNonBottleExpenses(OrderDetailRequestTransfer $orderDetailRequestTransfer): array
    {
        $expenses = [];

        foreach ($orderDetailRequestTransfer->getExpenses() as $expenseTransfer) {
            if ($expenseTransfer->getType() === SalesConfig::EXPENSE_BOTTLE_DEPOSIT_TYPE) {
                continue;
            }

            $expenses[] = [
                'title' => $expenseTransfer->getName(),
                'type' => $expenseTransfer->getType(),
                'rate' => (int)$expenseTransfer->getTaxRate(),
                'price' => $expenseTransfer->getSumGrossPrice(),
            ];
        }

        return $expenses;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderDetailRequestTransfer $orderDetailRequestTransfer
     *
     * @return int
     */
    private function getExpensesTax(OrderDetailRequestTransfer $orderDetailRequestTransfer): int
    {
        $expensesTax = 0;

        foreach ($orderDetailRequestTransfer->getExpenses() as $expenseTransfer) {
            if ($expenseTransfer->getType() === SalesConfig::EXPENSE_BOTTLE_DEPOSIT_TYPE) {
                continue;
            }

            $expensesTax += $expenseTransfer->getSumTaxAmount();
        }

        return $expensesTax;
    }

    /**
     * @param array $taxPayments
     * @param array $expenses
     *
     * @return array
     */
    private function addExpensesTaxes(array $taxPayments, array $expenses): array
    {
        foreach ($expenses as $expense) {
            $taxPayments = $this->aggregateSumByTax($taxPayments, $expense['rate'], $expense['price']);
        }

        return $taxPayments;
    }
}
