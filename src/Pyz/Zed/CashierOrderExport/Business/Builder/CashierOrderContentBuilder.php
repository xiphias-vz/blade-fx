<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Builder;

use DateTime;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig;
use Spryker\Shared\Shipment\ShipmentConfig;

class CashierOrderContentBuilder implements CashierOrderContentBuilderInterface
{
    protected const HEADER_MASK = '%s%s%s%s%s%s%s%s%s%s%s%020u%s%s%s%020u%s%020u%s%s%s%s%s%020s%s%s';
    protected const DEFAULT_HEADER_ENDING_ZERO_SETS = 7;
    protected const POSITION_MASK = '%s%s%s%s%s%s%s%s%s%s%s%020u%s%020s%s%-20.20s%s%020s%s%020s%s%020s%s%020s';
    protected const DEFAULT_POSITION_ENDING_ZERO_SETS = 8;

    protected const HEADER_KEY_IDENTIFIER = '1070';
    protected const POSITION_KEY_IDENTIFIER = '1071';
    protected const ORDER_KEY_IDENTIFIER = '0034';
    protected const CUSTOMER_KEY_IDENTIFIER = '0136';
    protected const ORDER_TOTAL_KEY_IDENTIFIER = '0003';
    protected const ORDER_PAYMENT_STATE_IDENTIFIER = '0007';
    protected const ORDER_PAYMENT_TYPE_IDENTIFIER = '0004';
    protected const ORDER_PAYMENT_SUM_IDENTIFIER = '0006';
    protected const ACCOUNT_NUMBER_IDENTIFIER = '0135';
    protected const ORDER_ITEMS_COUNT_IDENTIFIER = '0005';
    protected const ORDER_ITEM_EAN_IDENTIFIER = '0001';
    protected const ORDER_ITEM_NAME_IDENTIFIER = '0002';
    protected const ORDER_ITEM_PRICE_IDENTIFIER = '0003';
    protected const ORDER_ITEM_WGR_LINK_IDENTIFIER = '0004';
    protected const ORDER_ITEM_TAX_IDENTIFIER = '0005';
    protected const ORDER_ITEM_QUANTITY_IDENTIFIER = '0059';

    protected const DEFAULT_ITEM_QUANTITY_MULTIPLIER = 1000;
    protected const DEFAULT_DATE_FORMAT = 'YmdHi';
    protected const DEFAULT_COMPANY_NUMBER = '0000';
    protected const DEFAULT_KEYBOARD_NUMBER = '0000';
    protected const DEFAULT_CASH_DESK_NUMBER = '0000';
    protected const DEFAULT_BON_NUMBER = '0000';
    protected const DEFAULT_POSITIONS_NUMBER = '0000';
    protected const DEFAULT_EMPTY_OPERATOR_NUMBER = '0000';
    protected const DEFAULT_ANDERUNGS_NUMBER = '02';
    protected const DEFAULT_SERVICE_FEE_POSITION_NAME = 'Abholung            ';
    protected const DEFAULT_SERVICE_FEE_FEE_NUMBER = '00000000000000000002';
    protected const DEFAULT_SERVICE_FEE_FEE_QUANTITY = '00000000000000001000';
    protected const DEFAULT_EMPTY_NUMBER = '00000000000000000000';

    protected const DEPOSIT_NAME = 'deposit_name';
    protected const TAX_RATE = 'tax_rate';
    protected const QUANTITY = 'quantity';
    protected const PRICE = 'price';

    /**
     * @var \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig
     */
    protected $cashierOrderExportConfig;

    /**
     * @param \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig $cashierOrderExportConfig
     */
    public function __construct(CashierOrderExportConfig $cashierOrderExportConfig)
    {
        $this->cashierOrderExportConfig = $cashierOrderExportConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    public function prepareContent(OrderTransfer $orderTransfer): string
    {
        $headerContent = $this->getHeaderContent($orderTransfer);
        $positionsContent = $this->getPositionsContent($orderTransfer);
        $serviceFeeContent = $this->getServiceFeeContent($orderTransfer);
        $depositPositionsContent = $this->getDepositPositionsContent($orderTransfer);

        return $headerContent . $positionsContent . $serviceFeeContent . $depositPositionsContent;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getHeaderContent(OrderTransfer $orderTransfer): string
    {
         $content = sprintf(
             static::HEADER_MASK,
             $this->getSapStoreId($orderTransfer->getStore()),
             static::DEFAULT_COMPANY_NUMBER,
             static::DEFAULT_KEYBOARD_NUMBER,
             static::DEFAULT_CASH_DESK_NUMBER,
             static::DEFAULT_BON_NUMBER,
             static::DEFAULT_POSITIONS_NUMBER,
             static::DEFAULT_EMPTY_OPERATOR_NUMBER,
             (new DateTime())->format(static::DEFAULT_DATE_FORMAT),
             static::HEADER_KEY_IDENTIFIER,
             static::DEFAULT_ANDERUNGS_NUMBER,
             static::ORDER_KEY_IDENTIFIER,
             $orderTransfer->getIdSalesOrder() ?? static::DEFAULT_EMPTY_NUMBER,
             static::ACCOUNT_NUMBER_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::CUSTOMER_KEY_IDENTIFIER,
             $orderTransfer->getCustomer()->getIdCustomer() ?? static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_TOTAL_KEY_IDENTIFIER,
             $orderTransfer->getTotals()->getGrandTotal() ?? static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_PAYMENT_STATE_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_PAYMENT_TYPE_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_ITEMS_COUNT_IDENTIFIER,
             $orderTransfer->getItems()->count() ?? static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_PAYMENT_SUM_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER
         );

        return $this->addEndingZeroSets($content, static::DEFAULT_HEADER_ENDING_ZERO_SETS);
    }

    /**
     * @param string $content
     * @param int $quantity
     *
     * @return string
     */
    protected function addEndingZeroSets(string $content, int $quantity): string
    {
        for ($i = $quantity; $i !== 0; $i--) {
            $content .= sprintf('%s%s', static::DEFAULT_EMPTY_OPERATOR_NUMBER, static::DEFAULT_EMPTY_NUMBER);
        }

        return $content . PHP_EOL;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getPositionsContent(OrderTransfer $orderTransfer): string
    {
        $positionsContent = '';

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount()) {
                continue;
            }

            $positionsContent .= $this->getPositionContent($orderTransfer, $itemTransfer);
        }

        return $positionsContent;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string
     */
    protected function getPositionContent(OrderTransfer $orderTransfer, ItemTransfer $itemTransfer): string
    {
        $content = sprintf(
            static::POSITION_MASK,
            $this->getSapStoreId($orderTransfer->getStore()),
            static::DEFAULT_COMPANY_NUMBER,
            static::DEFAULT_KEYBOARD_NUMBER,
            static::DEFAULT_CASH_DESK_NUMBER,
            static::DEFAULT_BON_NUMBER,
            static::DEFAULT_POSITIONS_NUMBER,
            static::DEFAULT_EMPTY_OPERATOR_NUMBER,
            (new DateTime())->format(static::DEFAULT_DATE_FORMAT),
            static::POSITION_KEY_IDENTIFIER,
            static::DEFAULT_ANDERUNGS_NUMBER,
            static::ORDER_KEY_IDENTIFIER,
            $orderTransfer->getIdSalesOrder() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_EAN_IDENTIFIER,
            $itemTransfer->getProductNumber() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_NAME_IDENTIFIER,
            $itemTransfer->getBonText() ?? $itemTransfer->getName(),
            static::ORDER_ITEM_PRICE_IDENTIFIER,
            $itemTransfer->getSumPrice() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_WGR_LINK_IDENTIFIER,
            $itemTransfer->getSapWgr() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_TAX_IDENTIFIER,
            $this->getSapItemTaxIdByTaxRate($itemTransfer->getTaxRate()),
            static::ORDER_ITEM_QUANTITY_IDENTIFIER,
            $this->getDecimalViewOfItemQuantity($itemTransfer) ?? static::DEFAULT_EMPTY_NUMBER
        );

        return $this->addEndingZeroSets($content, static::DEFAULT_POSITION_ENDING_ZERO_SETS);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getServiceFeeContent(OrderTransfer $orderTransfer)
    {
        $content = sprintf(
            static::POSITION_MASK,
            $this->getSapStoreId($orderTransfer->getStore()),
            static::DEFAULT_COMPANY_NUMBER,
            static::DEFAULT_KEYBOARD_NUMBER,
            static::DEFAULT_CASH_DESK_NUMBER,
            static::DEFAULT_BON_NUMBER,
            static::DEFAULT_POSITIONS_NUMBER,
            static::DEFAULT_EMPTY_OPERATOR_NUMBER,
            (new DateTime())->format(static::DEFAULT_DATE_FORMAT),
            static::POSITION_KEY_IDENTIFIER,
            static::DEFAULT_ANDERUNGS_NUMBER,
            static::ORDER_KEY_IDENTIFIER,
            $orderTransfer->getIdSalesOrder() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_EAN_IDENTIFIER,
            $this->getCashierNumberServiceFee($orderTransfer),
            static::ORDER_ITEM_NAME_IDENTIFIER,
            static::DEFAULT_SERVICE_FEE_POSITION_NAME,
            static::ORDER_ITEM_PRICE_IDENTIFIER,
            $this->getShipmentExpensePrice($orderTransfer),
            static::ORDER_ITEM_WGR_LINK_IDENTIFIER,
            static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_TAX_IDENTIFIER,
            static::DEFAULT_SERVICE_FEE_FEE_NUMBER,
            static::ORDER_ITEM_QUANTITY_IDENTIFIER,
            static::DEFAULT_SERVICE_FEE_FEE_QUANTITY
        );

        return $this->addEndingZeroSets($content, static::DEFAULT_POSITION_ENDING_ZERO_SETS);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getDepositPositionsContent(OrderTransfer $orderTransfer): string
    {
        $positionsContent = '';
        $depositAggregationCollection = $this->getAggregatedDepositCollection($orderTransfer);

        foreach ($depositAggregationCollection as $depositSkuIdentifier => $depositAggregation) {
            $positionsContent .= $this->getDepositPositionContent($orderTransfer, $depositAggregation, $depositSkuIdentifier);
        }

        return $positionsContent;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param array $depositAggregation
     * @param string $depositSkuIdentifier
     *
     * @return string
     */
    protected function getDepositPositionContent(OrderTransfer $orderTransfer, array $depositAggregation, string $depositSkuIdentifier): string
    {
        $content = sprintf(
            static::POSITION_MASK,
            $this->getSapStoreId($orderTransfer->getStore()),
            static::DEFAULT_COMPANY_NUMBER,
            static::DEFAULT_KEYBOARD_NUMBER,
            static::DEFAULT_CASH_DESK_NUMBER,
            static::DEFAULT_BON_NUMBER,
            static::DEFAULT_POSITIONS_NUMBER,
            static::DEFAULT_EMPTY_OPERATOR_NUMBER,
            (new DateTime())->format(static::DEFAULT_DATE_FORMAT),
            static::POSITION_KEY_IDENTIFIER,
            static::DEFAULT_ANDERUNGS_NUMBER,
            static::ORDER_KEY_IDENTIFIER,
            $orderTransfer->getIdSalesOrder() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_EAN_IDENTIFIER,
            $this->extractPluFromProductDepositSku($depositSkuIdentifier) ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_NAME_IDENTIFIER,
            $depositAggregation[static::DEPOSIT_NAME],
            static::ORDER_ITEM_PRICE_IDENTIFIER,
            $depositAggregation[static::PRICE] ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_WGR_LINK_IDENTIFIER,
            static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_TAX_IDENTIFIER,
            $this->getSapItemTaxIdByTaxRate($depositAggregation[static::TAX_RATE]),
            static::ORDER_ITEM_QUANTITY_IDENTIFIER,
            //quantity of deposit items e.g. 3 bottles = 3000
            ($depositAggregation[static::QUANTITY] * 1000) ?? static::DEFAULT_EMPTY_NUMBER
        );

        return $this->addEndingZeroSets($content, static::DEFAULT_POSITION_ENDING_ZERO_SETS);
    }

    /***
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array
     */
    protected function getAggregatedDepositCollection(OrderTransfer $orderTransfer): array
    {
        $depositAggregationCollection = [];
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            foreach ($itemTransfer->getProductOptions() as $productOption) {
                $quantity = $productOption->getQuantity();
                if (isset($depositAggregationCollection[$productOption->getSku()][static::QUANTITY])) {
                    $quantity = $productOption->getQuantity() + $depositAggregationCollection[$productOption->getSku()][static::QUANTITY];
                }

                $depositAggregationCollection[$productOption->getSku()][static::QUANTITY] = $quantity;
                $depositAggregationCollection[$productOption->getSku()][static::PRICE] = $productOption->getUnitGrossPrice();
                $depositAggregationCollection[$productOption->getSku()][static::DEPOSIT_NAME] = $productOption->getValue();
                $depositAggregationCollection[$productOption->getSku()][static::TAX_RATE] = $productOption->getTaxRate();
            }
        }

        return $depositAggregationCollection;
    }

    /**
     * @param string $productDepositSku
     *
     * @return string|null
     */
    protected function extractPluFromProductDepositSku(string $productDepositSku): ?string
    {
        $productDepositSkuParts = explode('_', $productDepositSku);

        return $productDepositSkuParts[4] ?? null;
    }

    /**
     * @param string $taxRate
     *
     * @return string
     */
    protected function getSapItemTaxIdByTaxRate(string $taxRate)
    {
        $taxRateToSapItemTaxIdMap = $this->cashierOrderExportConfig->getTaxRateToSapItemTaxIdMap();

        return $taxRateToSapItemTaxIdMap[$taxRate] ?? static::DEFAULT_EMPTY_NUMBER;
    }

    /**
     * @param string $store
     *
     * @return int
     */
    protected function getSapStoreId(string $store): int
    {
        $sapStoreIdToStoreMap = $this->cashierOrderExportConfig->getSapStoreIdToStoreMap();

        return array_search($store, $sapStoreIdToStoreMap);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getCashierNumberServiceFee(OrderTransfer $orderTransfer): string
    {
        $serviceFeeToServiceFeeCashierNumber = $this->cashierOrderExportConfig->getServiceFeeToServiceFeeCashierNumber();
        $currentOrderShipmentExpensePrice = $this->getShipmentExpensePrice($orderTransfer);

        if (!$currentOrderShipmentExpensePrice) {
            return static::DEFAULT_EMPTY_NUMBER;
        }

        return $serviceFeeToServiceFeeCashierNumber[$currentOrderShipmentExpensePrice] ?? static::DEFAULT_EMPTY_NUMBER;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return int|null
     */
    protected function getShipmentExpensePrice(OrderTransfer $orderTransfer): ?int
    {
        foreach ($orderTransfer->getExpenses() as $expense) {
            if ($expense->getType() === ShipmentConfig::SHIPMENT_EXPENSE_TYPE) {
                return $expense->getSumPrice();
            }
        }

        return null;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return int|null
     */
    protected function getDecimalViewOfItemQuantity(ItemTransfer $itemTransfer): ?int
    {
        $itemQuantity = $itemTransfer->getQuantity();

        if (!$itemQuantity) {
            return null;
        }

        return $itemQuantity * static::DEFAULT_ITEM_QUANTITY_MULTIPLIER;
    }
}