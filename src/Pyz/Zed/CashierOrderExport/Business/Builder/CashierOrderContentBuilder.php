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

class CashierOrderContentBuilder implements CashierOrderContentBuilderInterface
{
    protected const HEADER_MASK = '%s%s%s%s%s%s%s%s%s%s%s%020u%s%s%s%020u%s%020u%s%s%s%s%s%020s%s%s';
    protected const DEFAULT_HEADER_ENDING_ZERO_SETS = 7;
    protected const POSITION_MASK = '%s%s%s%s%s%s%s%s%s%s%s%020u%s%s%s%.20s%s%020s%s%s%s%020s%s%020s';
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
    protected const ORDER_ITEM_WRG_LINK_IDENTIFIER = '0004';
    protected const ORDER_ITEM_TAX_IDENTIFIER = '0005';
    protected const ORDER_ITEM_QUANTITY_IDENTIFIER = '0059';

    protected const DEFAULT_DATE_FORMAT = 'YmdHi';
    protected const DEFAULT_COMPANY_NUMBER = '0000';
    protected const DEFAULT_KEYBOARD_NUMBER = '0000';
    protected const DEFAULT_CASH_DESK_NUMBER = '0000';
    protected const DEFAULT_BON_NUMBER = '0000';
    protected const DEFAULT_POSITIONS_NUMBER = '0000';
    protected const DEFAULT_EMPTY_OPERATOR_NUMBER = '0000';
    protected const DEFAULT_ANDERUNGS_NUMBER = '02';
    protected const DEFAULT_EMPTY_NUMBER = '00000000000000000000';

    // @TODO EXAMPLE switch this value after it will be provided
    protected const DEFAULT_ITEM_WRG_LINK_NUMBER = '00000000000000000624';
    // @TODO EXAMPLE switch this value after it will be provided
    protected const DEFAULT_ITEM_EAN_NUMBER = '00000000000000000624';

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

        return $headerContent . $positionsContent;
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
            static::DEFAULT_ITEM_EAN_NUMBER,
            static::ORDER_ITEM_NAME_IDENTIFIER,
            $itemTransfer->getName() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_PRICE_IDENTIFIER,
            $itemTransfer->getSumPrice() ?? static::DEFAULT_EMPTY_NUMBER,
            static::ORDER_ITEM_WRG_LINK_IDENTIFIER,
            static::DEFAULT_ITEM_WRG_LINK_NUMBER,
            static::ORDER_ITEM_TAX_IDENTIFIER,
            $this->getSapItemTaxId($itemTransfer),
            static::ORDER_ITEM_QUANTITY_IDENTIFIER,
            $itemTransfer->getQuantity() ?? static::DEFAULT_EMPTY_NUMBER
        );

        return $this->addEndingZeroSets($content, static::DEFAULT_POSITION_ENDING_ZERO_SETS);
    }

    protected function getSapItemTaxId(ItemTransfer $itemTransfer)
    {
        $taxRateToSapItemTaxIdMap = $this->cashierOrderExportConfig->getTaxRateToSapItemTaxIdMap();

        return $taxRateToSapItemTaxIdMap[$itemTransfer->getTaxRate()] ?? static::DEFAULT_EMPTY_NUMBER;
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
}
