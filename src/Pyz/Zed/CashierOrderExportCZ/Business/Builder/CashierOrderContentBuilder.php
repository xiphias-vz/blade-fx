<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExportCZ\Business\Builder;

use DateTime;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\CashierOrderExport\Business\Builder\CashierOrderContentBuilder as IntCashierOrderContentBuilder;

class CashierOrderContentBuilder extends IntCashierOrderContentBuilder
{
    protected const TAX_RATE = 'tax_rate';
    protected const UMLAUTS_REPLACE_FROM = ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž', 'Á', 'Č', 'Ď', 'É', 'Ě', 'Í', 'Ň', 'Ó', 'Ř', 'Š', 'Ť', 'Ú', 'Ů', 'Ý', 'Ž'];
    protected const UMLAUTS_REPLACE_TO = ['a', 'c', 'd', 'e', 'e', 'i', 'n', 'o', 'r', 's', 't', 'u', 'u', 'y', 'z', 'A', 'C', 'D', 'E', 'E', 'I', 'N', 'O', 'R', 'S', 'T', 'U', 'U', 'Y', 'Z'];

    protected const HEADER_KEY_IDENTIFIER_CZ = '1072';
    protected const POSITION_KEY_IDENTIFIER_CZ = '1073';
    protected const DEFAULT_SERVICE_FEE_POSITION_NAME = 'Poplatek            ';

    /**
     * @var \Pyz\Zed\CashierOrderExportCZ\CashierOrderExportConfig
     */
    protected $cashierOrderExportConfig;

    /**
     * @var int
     */
    protected $totalSum = 0;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getHeaderContent(OrderTransfer $orderTransfer): string
    {
        if ($orderTransfer->getIsConnected()) {
            $renderCardInformation = self::PAYBACK_PREFIX . $orderTransfer->getPaybackNumber() ?? static::DEFAULT_EMPTY_NUMBER;
        } else {
            $renderCardInformation = ($orderTransfer->getCustomer() === null) ? (static::DEFAULT_EMPTY_NUMBER) : ($orderTransfer->getCustomer()->getMyGlobusCard() ?? static::DEFAULT_EMPTY_NUMBER);
        }

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
             static::HEADER_KEY_IDENTIFIER_CZ,
             static::DEFAULT_ANDERUNGS_NUMBER,
             static::ORDER_KEY_IDENTIFIER,
             $orderTransfer->getOrderReference() ?? static::DEFAULT_EMPTY_NUMBER,
             static::ACCOUNT_NUMBER_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::CUSTOMER_KEY_IDENTIFIER,
             $renderCardInformation,
             static::ORDER_TOTAL_KEY_IDENTIFIER,
             $this->totalSum,
             static::ORDER_PAYMENT_STATE_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_PAYMENT_TYPE_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::ORDER_ITEMS_COUNT_IDENTIFIER,
             $orderTransfer->getCashierPositionsQantity() ?? static::DEFAULT_EMPTY_NUMBER,
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
            static::POSITION_KEY_IDENTIFIER_CZ,
            static::DEFAULT_ANDERUNGS_NUMBER,
            static::ORDER_KEY_IDENTIFIER,
            $orderTransfer->getOrderReference() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_EAN_IDENTIFIER,
            $this->getItemProductNumber($itemTransfer) ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_NAME_IDENTIFIER,
            $this->getItemName($itemTransfer),
            static::ORDER_ITEM_PRICE_IDENTIFIER,
            $this->getItemPrice($itemTransfer) ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_WGR_LINK_IDENTIFIER,
            $itemTransfer->getSapWgr() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_TAX_IDENTIFIER,
            $this->getSapItemTaxIdByTaxRate($itemTransfer->getTaxRate()),
            static::ORDER_ITEM_QUANTITY_IDENTIFIER,
            $this->getDecimalViewOfItemQuantity($itemTransfer) ?? static::DEFAULT_EMPTY_NUMBER
        );

        $this->incrementCashierOrderPositionsQuantity($orderTransfer);

        return $this->addEndingZeroSets($content, static::DEFAULT_POSITION_ENDING_ZERO_SETS);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getServiceFeeContent(OrderTransfer $orderTransfer): string
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
            static::POSITION_KEY_IDENTIFIER_CZ,
            static::DEFAULT_ANDERUNGS_NUMBER,
            static::ORDER_KEY_IDENTIFIER,
            $orderTransfer->getOrderReference() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_EAN_IDENTIFIER,
            $this->getCashierNumberServiceFee($orderTransfer),
            static::ORDER_ITEM_NAME_IDENTIFIER,
            $this->applyLength(static::DEFAULT_SERVICE_FEE_POSITION_NAME),
            static::ORDER_ITEM_PRICE_IDENTIFIER,
            $this->getShipmentExpensePrice($orderTransfer),
            static::ORDER_ITEM_WGR_LINK_IDENTIFIER,
            static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_TAX_IDENTIFIER,
            static::DEFAULT_SERVICE_FEE_FEE_NUMBER,
            static::ORDER_ITEM_QUANTITY_IDENTIFIER,
            static::DEFAULT_SERVICE_FEE_FEE_QUANTITY
        );

        $this->incrementCashierOrderPositionsQuantity($orderTransfer);
        $this->totalSum = $this->totalSum + $this->getShipmentExpensePrice($orderTransfer);

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
            $itemQuantity = $depositAggregation['quantity'];
            $priceDeposit = $depositAggregation['price'];
            $this->totalSum += ($itemQuantity * $priceDeposit);
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
            static::POSITION_KEY_IDENTIFIER_CZ,
            static::DEFAULT_ANDERUNGS_NUMBER,
            static::ORDER_KEY_IDENTIFIER,
            $orderTransfer->getOrderReference() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_EAN_IDENTIFIER,
            $this->extractPluFromProductDepositSku($depositSkuIdentifier) ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_NAME_IDENTIFIER,
            $this->applyLength($depositAggregation[static::DEPOSIT_NAME]),
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

        $this->incrementCashierOrderPositionsQuantity($orderTransfer);

        return $this->addEndingZeroSets($content, static::DEFAULT_POSITION_ENDING_ZERO_SETS);
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string
     */
    protected function getItemName(ItemTransfer $itemTransfer): string
    {
        if ($itemTransfer->getBontext() && $itemTransfer->getBontext() != "") {
            $itemName = $itemTransfer->getBontext();
        } else {
            $itemName = $itemTransfer->getName();
        }

        //$itemName = $this->sanitizeItemNameFromUmlauts($itemName);
        $itemName = $this->sanitizeItemNameFromNotSupportedChars($itemName);

        return $this->applyLength($itemName);
    }

    /**
     * @param string $itemName
     *
     * @return string
     */
    protected function sanitizeItemNameFromUmlauts(string $itemName): string
    {
        return str_replace(static::UMLAUTS_REPLACE_FROM, static::UMLAUTS_REPLACE_TO, $itemName);
    }

    /**
     * @param string $itemName
     *
     * @return string
     */
    protected function sanitizeItemNameFromNotSupportedChars(string $itemName): string
    {
        $itemNameInSupportedEncoding = mb_convert_encoding(
            $itemName,
            $this->cashierOrderExportConfig->getCashierFileSupportedEncoding()
        );

        return str_replace('?', '', $itemNameInSupportedEncoding);
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
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getCashierNumberServiceFee(OrderTransfer $orderTransfer): string
    {
        $serviceFeeToServiceFeeCashierNumber = $this->cashierOrderExportConfig->getServiceFeeToServiceFeeCashierNumber();
        $currentOrderShipmentExpensePrice = $this->getShipmentExpensePrice($orderTransfer);

        if ($currentOrderShipmentExpensePrice === null) {
            return static::DEFAULT_EMPTY_NUMBER;
        }

        return $serviceFeeToServiceFeeCashierNumber[$currentOrderShipmentExpensePrice] ?? static::DEFAULT_EMPTY_NUMBER;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return int
     */
    protected function getItemPrice(ItemTransfer $itemTransfer)
    {
        $aggregatedPrice = $itemTransfer->getQuantity() * ($itemTransfer->getSumPrice() - $itemTransfer->getSumDiscountAmountAggregation());
        $this->totalSum += $aggregatedPrice;

        if ($itemTransfer->getPricePerKg()) {
            return $itemTransfer->getPricePerKg() - $itemTransfer->getSumDiscountAmountAggregation();
        }

        return $itemTransfer->getSumPrice() - $itemTransfer->getSumDiscountAmountAggregation();
    }
}
