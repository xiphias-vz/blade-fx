<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Builder;

use DateTime;
use Exception;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig;
use Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface;
use Spryker\Shared\Log\LoggerTrait;
use Spryker\Shared\Shipment\ShipmentConfig;
use XMLWriter;

class CashierOrderContentBuilder implements CashierOrderContentBuilderInterface
{
    use LoggerTrait;

    protected const HEADER_MASK = '%s%s%s%s%s%s%s%s%s%s%s%020s%s%s%s%020u%s%020u%s%s%s%s%s%020s%s%s';
    protected const DEFAULT_HEADER_ENDING_ZERO_SETS = 7;
    protected const POSITION_MASK = '%s%s%s%s%s%s%s%s%s%s%s%020s%s%020s%s%s%s%020s%s%020s%s%020s%s%020s';
    protected const DEFAULT_POSITION_ENDING_ZERO_SETS = 8;
    protected const DEFAULT_VALUE_LENGTH = 20;
    protected const UMLAUTS_REPLACE_FROM = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];
    protected const UMLAUTS_REPLACE_TO = ['ae', 'oe', 'ue', 'ss', 'Ae', 'Oe', 'Ue'];
    protected const PICKING_ZONE_TO_PRODUCT_NUMBER_MAPPER = [
        'Metzgerei' => '210602',
    ];

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

    protected const DEFAULT_POSITIONS_QUANTITY = 0;
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
    protected const DEFAULT_SERVICE_FEE_FEE_NUMBER = '00000000000000000001';
    protected const DEFAULT_SERVICE_FEE_FEE_QUANTITY = '00000000000000001000';
    protected const DEFAULT_EMPTY_NUMBER = '00000000000000000000';

    protected const PAYBACK_PREFIX = '308342';

    protected const DEPOSIT_NAME = 'deposit_name';
    protected const TAX_RATE = 'tax_rate';
    protected const QUANTITY = 'quantity';
    protected const PRICE = 'price';

    protected const DEFAULT_EMPTY_XML_TAG = '';
    protected const DEFAULT_EMPTY_XML_LOCALE = 'de_DE';
    protected const DEFAULT_EMPTY_XML_NUMBER = '000000';
    protected const XML_ENCODING = 'utf-8';
    protected const XML_VERSION = '1.0';
    protected const XML_FORMAT_OUTPUT = true;
    protected const XML_DOCUMENT_NSD_PREFIX = 'xmlns:xsd';
    protected const XML_DOCUMENT_NSD = 'http://www.w3.org/2001/XMLSchema';
    protected const XML_DOCUMENT_NSI_PREFIX = 'xmlns:xsi';
    protected const XML_DOCUMENT_NSI = 'http://www.w3.org/2001/XMLSchema-instance';
    protected const XML_DOCUMENT_NODE_NS = 'Document';
    protected const XML_DOCUMENT_NODE_VERSION = 'DocumentVersion';
    protected const XML_DOCUMENT_NODE_VERSION_VALUE = '1';

    protected const XML_HEADER = 'Header';
    protected const XML_ORIGIN = 'Origin';
    protected const XML_ORIGIN_VALUE = '100';
    protected const XML_CREATE_DATE = 'CreateDate';
    protected const XML_STORE_NUMBER = 'StoreNumber';
    protected const XML_SCANNER_WALL_NUMBER = 'ScannerWallNumber';
    protected const XML_TRANSACTION_NUMBER = 'TransactionNumber';
    protected const XML_TRANSACTION_NUMBER_PREFIX = '97400';
    protected const XML_SELFSCANNER_NUMBER = 'SelfscannerNumber';
    protected const XML_CARD_NUMBER = 'CardNumber';
    protected const XML_CUSTOMER_LANGUAGE = 'CustomerLanguage';
    protected const XML_PERSONNEL_NUMBER = 'PersonnelNumber';
    protected const XML_TIMESTAMP = 'Timestamp';
    protected const XML_TIMESTAMP_FORMAT = 'Ymdhis';

    protected const XML_ITEM_GROUP = 'ItemGroup';
    protected const XML_ITEM = 'Item';
    protected const XML_POSITION_NUMBER = 'PositionNumber';
    protected const XML_BARCODE = 'Barcode';
    protected const XML_ITEM_NUMBER = 'ItemNumber';
    protected const XML_DEPARTMENT_NUMBER = 'DepartmentNumber';
    protected const XML_DEPARTMENT_NUMBER_VALUE_DSCOUNT = '714';
    protected const XML_DESCRIPTION = 'Description';
    protected const XML_NETTO_PRICE = 'NettoPrice';
    protected const XML_DISCOUNT = 'Discount';
    protected const XML_HISTORIC_PER_PRICE = 'HistoricPerPrice';
    protected const XML_MARKDOWN_AMOUNT = 'MarkdownAmount';
    protected const XML_AGE_RESTRICTION = 'AgeRestriction';
    protected const XML_SCALE_ITEM = 'ScaleItem';
    protected const XML_RESCAN_ITEM = 'RescanItem';
    protected const XML_MIXED_CRATE_TICKET_ID = 'MixedCrateTicketId';

    protected const XML_SERVICE_FEE_DEFAULT_BARCODE = '99999';
    protected const XML_SERVICE_FEE_DEFAULT_ITEM_NUMBER = '99999';
    protected const XML_SERVICE_FEE_DEPARTMENT_NUMBER = '714';
    protected const XML_SERVICE_FEE_DESCRIPTION = 'Abholung';

    protected const XML_FOOTER = 'Footer';
    protected const XML_NUMBER_OF_ITEMS = 'NumberOfItems';
    protected const XML_VOIDED_ITEMS = 'VoidedItems';
    protected const XML_POS_NUMBER = 'PosNumber';
    protected const XML_RESCAN = 'Rescan';
    protected const XML_ERROR_SCANS = 'ErrorScans';
    protected const XML_TOTAL_AMOUNT_SELF_SCAN = 'TotalAmountSelfscan';
    protected const XML_LOYALTY_POINT_BALANCE = 'LoyaltyPointBalance';
    protected const XML_LOYALTY_POINT_CHANGE = 'LoyaltyPointChange';
    protected const XML_RESCAN_REQUIRED = 'RescanRequired';
    protected const XML_RESCAN_REQUIRED_VALUE = 'false';

    protected const XML_DEPOSIT_DESCRIPTION = 'Leergut Flaschenpfand';

    /**
     * @var int
     */
    public static $numberOfItems = 0;

    /**
     * @var \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig
     */
    protected $cashierOrderExportConfig;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface
     */
    protected $cashierOrderExportRepository;

    /**
     * @param \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig $cashierOrderExportConfig
     * @param \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface $cashierOrderExportRepository
     */
    public function __construct(CashierOrderExportConfig $cashierOrderExportConfig, CashierOrderExportRepositoryInterface $cashierOrderExportRepository)
    {
        $this->cashierOrderExportConfig = $cashierOrderExportConfig;
        $this->cashierOrderExportRepository = $cashierOrderExportRepository;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    public function prepareContent(OrderTransfer $orderTransfer): string
    {
        $positionsContent = $this->getPositionsContent($orderTransfer);
        $serviceFeeContent = $this->getServiceFeeContent($orderTransfer);
        $depositPositionsContent = $this->getDepositPositionsContent($orderTransfer);
        $headerContent = $this->getHeaderContent($orderTransfer);

        return $headerContent . $positionsContent . $serviceFeeContent . $depositPositionsContent;
    }

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
             static::HEADER_KEY_IDENTIFIER,
             static::DEFAULT_ANDERUNGS_NUMBER,
             static::ORDER_KEY_IDENTIFIER,
             $orderTransfer->getOrderReference() ?? static::DEFAULT_EMPTY_NUMBER,
             static::ACCOUNT_NUMBER_IDENTIFIER,
             static::DEFAULT_EMPTY_NUMBER,
             static::CUSTOMER_KEY_IDENTIFIER,
             $renderCardInformation,
             static::ORDER_TOTAL_KEY_IDENTIFIER,
             $orderTransfer->getTotals()->getGrandTotal() ?? static::DEFAULT_EMPTY_NUMBER,
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
            static::POSITION_KEY_IDENTIFIER,
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
            static::POSITION_KEY_IDENTIFIER,
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

    /***
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array
     */
    protected function getAggregatedDepositCollection(OrderTransfer $orderTransfer): array
    {
        $depositAggregationCollection = [];
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount()) {
                continue;
            }
            foreach ($itemTransfer->getProductOptions() as $productOption) {
                $currentQuantity = $depositAggregationCollection[$productOption->getSku()][static::QUANTITY] ?? static::DEFAULT_POSITIONS_QUANTITY;
                $depositAggregationCollection[$productOption->getSku()][static::QUANTITY] = $itemTransfer->getQuantity() + $currentQuantity;
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

        if ($currentOrderShipmentExpensePrice === null) {
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
        if ($itemTransfer->getNewWeight()) {
            return $itemTransfer->getNewWeight();
        }

        $itemQuantity = $itemTransfer->getQuantity();

        if (!$itemQuantity) {
            return null;
        }

        return $itemQuantity * static::DEFAULT_ITEM_QUANTITY_MULTIPLIER;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    protected function incrementCashierOrderPositionsQuantity(OrderTransfer $orderTransfer): OrderTransfer
    {
        $currentCashierOrderPositionsQuantity = $orderTransfer->getCashierPositionsQantity() ?? static::DEFAULT_POSITIONS_QUANTITY;
        $incrementedCashierOrderPositionsQuantity = ++$currentCashierOrderPositionsQuantity;

        return $orderTransfer->setCashierPositionsQantity($incrementedCashierOrderPositionsQuantity);
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string
     */
    protected function getItemName(ItemTransfer $itemTransfer): string
    {
        $itemName = $itemTransfer->getBontext() ?? $itemTransfer->getName();

        $itemName = $this->sanitizeItemNameFromUmlauts($itemName);
        $itemName = $this->sanitizeItemNameFromNotSupportedChars($itemName);

        return $this->applyLength($itemName);
    }

    /**
     * @param string $name
     *
     * @return string
     */
    protected function applyLength(string $name): string
    {
        $name = mb_substr($name, 0, static::DEFAULT_VALUE_LENGTH);
        $bytesVsCharsDiff = strlen($name) - mb_strlen($name);

        return str_pad($name, static::DEFAULT_VALUE_LENGTH + $bytesVsCharsDiff);
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
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return int
     */
    protected function getItemPrice(ItemTransfer $itemTransfer)
    {
        if ($itemTransfer->getPricePerKg()) {
            return $itemTransfer->getPricePerKg();
        }

        return $itemTransfer->getSumPrice();
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string|null
     */
    protected function getItemProductNumber(ItemTransfer $itemTransfer): ?string
    {
        return static::PICKING_ZONE_TO_PRODUCT_NUMBER_MAPPER[$itemTransfer->getPickZone()] ?? $itemTransfer->getProductNumber();
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \XMLWriter
     */
    public function prepareContentXml(OrderTransfer $orderTransfer): XMLWriter
    {
        $writer = new XMLWriter();
        $writer->openMemory();

        $writer->setIndentString('  ');
        $writer->setIndent(true);

        try {
            $writer->startDocument(static::XML_VERSION);
            $writer->startElement(static::XML_DOCUMENT_NODE_NS);
            $writer->writeAttribute(static::XML_DOCUMENT_NSD_PREFIX, static::XML_DOCUMENT_NSD);
            $writer->writeAttribute(static::XML_DOCUMENT_NSI_PREFIX, static::XML_DOCUMENT_NSI);
            $writer->writeElement(static::XML_DOCUMENT_NODE_VERSION, static::XML_DOCUMENT_NODE_VERSION_VALUE);
            $this->prepareXmlHeader($writer, $orderTransfer);
            $this->prepareXmlItems($writer, $orderTransfer);
            $this->prepareXmlFooter($writer, $orderTransfer);
            $writer->endElement();
            $writer->endDocument();
        } catch (Exception $exception) {
            $this->logError($exception->getMessage(), $exception->getTrace());
        }

        return $writer;
    }

    /**
     * @param string $idSalesOrder
     *
     * @return string
     */
    public function calculateTransactionNumber(string $idSalesOrder)
    {
        $numLength = strlen((string)$idSalesOrder);
        $numberOfZeroes = 9 - $numLength;
        if ($numberOfZeroes > 0) {
            //$result = static::XML_TRANSACTION_NUMBER_PREFIX;
            $result = str_repeat('0', $numberOfZeroes);
            $result .= $idSalesOrder;
        } else {
            $result = substr($idSalesOrder, 0, 9);
        }

        return $result;
    }

    /**
     * @param \XMLWriter $writer
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \XMLWriter
     */
    public function prepareXmlHeader(XMLWriter $writer, OrderTransfer $orderTransfer): XMLWriter
    {
        $writer->startElement(static::XML_HEADER);
        try {
            if ($orderTransfer->getCustomer() === null) {
                if ($orderTransfer->getIsConnected()) {
                    $myGlobusCard = self::PAYBACK_PREFIX . $orderTransfer->getPaybackNumber() ?? static::DEFAULT_EMPTY_XML_TAG;
                } else {
                    $myGlobusCard = static::DEFAULT_EMPTY_XML_TAG;
                }
                $locale = substr(static::DEFAULT_EMPTY_XML_LOCALE, -2);
            } else {
                if ($orderTransfer->getIsConnected()) {
                    $myGlobusCard = self::PAYBACK_PREFIX . $orderTransfer->getPaybackNumber() ?? static::DEFAULT_EMPTY_XML_TAG;
                } else {
                    $myGlobusCard = $orderTransfer->getCustomer()->getMyGlobusCard() ?? static::DEFAULT_EMPTY_XML_TAG;
                }

                $locale = $orderTransfer->getCustomer()->getLocale() === null ? substr(static::DEFAULT_EMPTY_XML_LOCALE, -2) : substr(($orderTransfer->getCustomer()->getLocale()->getLocaleName() ?? static::DEFAULT_EMPTY_XML_LOCALE), -2);
            }
            $transactionNumber = $this->calculateTransactionNumber($orderTransfer->getOrderReference() ?? static::DEFAULT_EMPTY_XML_NUMBER);

            $writer->writeElement(static::XML_ORIGIN, static::XML_ORIGIN_VALUE);
            $writer->writeElement(static::XML_CREATE_DATE, date("Y-m-d"));
            $writer->writeElement(static::XML_STORE_NUMBER, ($orderTransfer->getMerchantReference() ?? static::DEFAULT_EMPTY_XML_TAG));
            $writer->writeElement(static::XML_SCANNER_WALL_NUMBER);
            $writer->writeElement(static::XML_TRANSACTION_NUMBER, $transactionNumber);
            $writer->writeElement(static::XML_SELFSCANNER_NUMBER);
            $writer->writeElement(static::XML_CARD_NUMBER, $myGlobusCard);
            $writer->writeElement(static::XML_CUSTOMER_LANGUAGE, $locale);
            $writer->writeElement(static::XML_PERSONNEL_NUMBER);
            $writer->writeElement(static::XML_TIMESTAMP, date(static::XML_TIMESTAMP_FORMAT));
        } catch (Exception $exception) {
            $this->logError($exception->getMessage(), $exception->getTrace());
        }
        $writer->endElement();

        return $writer;
    }

    /**
     * @param \XMLWriter $writer
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \XMLWriter
     */
    public function prepareXmlItems(XMLWriter $writer, OrderTransfer $orderTransfer): XMLWriter
    {
        $writer->startElement(static::XML_ITEM_GROUP);
        $productSku["sku"] = "SapNumber";
        try {
            $counter = 0;
            foreach ($orderTransfer->getItems() as $item) {
                if ($item->getCanceledAmount()) {
                    continue;
                }
                $quantity = $item->getQuantity();
                $product = $this->cashierOrderExportRepository->getProductBySku($item->getSku());
                $productSku[$item->getSku()] = $product->getSapNumber();
                for ($x = 0; $x < $quantity; $x++) {
                    $counter++;

                    $writer->startElement(static::XML_ITEM);
                    $writer->writeElement(static::XML_ORIGIN, static::XML_ORIGIN_VALUE);
                    $writer->writeElement(static::XML_POSITION_NUMBER, $counter);
                    $writer->writeElement(static::XML_BARCODE, $this->getXmlPickZoneValue($item, $item->getSku()));
                    $writer->writeElement(static::XML_ITEM_NUMBER, $this->getXmlPickZoneValue($item, $product->getSapNumber()));
                    $writer->writeElement(static::XML_DEPARTMENT_NUMBER, $item->getSapWgr());
                    $writer->writeElement(static::XML_DESCRIPTION, $this->getItemName($item));
                    $writer->writeElement(static::XML_NETTO_PRICE, $this->getXmlItemPrice($item) ?? static::DEFAULT_EMPTY_XML_NUMBER);
                    $writer->writeElement(static::XML_DISCOUNT);
                    $writer->writeElement(static::XML_HISTORIC_PER_PRICE);
                    $writer->writeElement(static::XML_MARKDOWN_AMOUNT);
                    $writer->writeElement(static::XML_AGE_RESTRICTION);
                    $writer->writeElement(static::XML_SCALE_ITEM);
                    $writer->writeElement(static::XML_RESCAN_ITEM);
                    $writer->writeElement(static::XML_MIXED_CRATE_TICKET_ID);
                    $writer->writeElement(static::XML_TIMESTAMP, date(static::XML_TIMESTAMP_FORMAT));
                    $writer->endElement();

                    foreach ($item->getProductOptions() as $productOption) {
                        $counter++;

                        $writer->startElement(static::XML_ITEM);
                        $writer->writeElement(static::XML_ORIGIN, static::XML_ORIGIN_VALUE);
                        $writer->writeElement(static::XML_POSITION_NUMBER, $counter);
                        $writer->writeElement(static::XML_BARCODE, $this->extractPluFromProductDepositSku($productOption->getSku()) ?? static::DEFAULT_EMPTY_XML_NUMBER);
                        $writer->writeElement(static::XML_ITEM_NUMBER, $productSku[$item->getSku()]);
                        $writer->writeElement(static::XML_DEPARTMENT_NUMBER, $item->getSapWgr());
                        $writer->writeElement(static::XML_DESCRIPTION, static::XML_DEPOSIT_DESCRIPTION);
                        $writer->writeElement(static::XML_NETTO_PRICE, $productOption->getUnitGrossPrice());
                        $writer->writeElement(static::XML_DISCOUNT);
                        $writer->writeElement(static::XML_HISTORIC_PER_PRICE);
                        $writer->writeElement(static::XML_MARKDOWN_AMOUNT);
                        $writer->writeElement(static::XML_AGE_RESTRICTION);
                        $writer->writeElement(static::XML_SCALE_ITEM);
                        $writer->writeElement(static::XML_RESCAN_ITEM);
                        $writer->writeElement(static::XML_MIXED_CRATE_TICKET_ID);
                        $writer->writeElement(static::XML_TIMESTAMP, date(static::XML_TIMESTAMP_FORMAT));
                        $writer->endElement();
                    }
                }
            }

            $counter++;

            $xmlFeeBarcode = $this->getCashierServiceXmlFeeBarcodeNumber($orderTransfer);
            $xmlFeeItemNumber = $this->getCashierServiceXmlFeeItemNumber($orderTransfer);

            $writer->startElement(static::XML_ITEM);
            $writer->writeElement(static::XML_ORIGIN, static::XML_ORIGIN_VALUE);
            $writer->writeElement(static::XML_POSITION_NUMBER, $counter);
            $writer->writeElement(static::XML_BARCODE, $xmlFeeBarcode);
            $writer->writeElement(static::XML_ITEM_NUMBER, $xmlFeeItemNumber);
            $writer->writeElement(static::XML_DEPARTMENT_NUMBER, static::XML_SERVICE_FEE_DEPARTMENT_NUMBER);
            $writer->writeElement(static::XML_DESCRIPTION, static::XML_SERVICE_FEE_DESCRIPTION);
            $writer->writeElement(static::XML_NETTO_PRICE, $this->getShipmentExpensePrice($orderTransfer));
            $writer->writeElement(static::XML_DISCOUNT);
            $writer->writeElement(static::XML_HISTORIC_PER_PRICE);
            $writer->writeElement(static::XML_MARKDOWN_AMOUNT);
            $writer->writeElement(static::XML_AGE_RESTRICTION);
            $writer->writeElement(static::XML_SCALE_ITEM);
            $writer->writeElement(static::XML_RESCAN_ITEM);
            $writer->writeElement(static::XML_MIXED_CRATE_TICKET_ID);
            $writer->writeElement(static::XML_TIMESTAMP, date(static::XML_TIMESTAMP_FORMAT));
            $writer->endElement();

            static::$numberOfItems = $counter;
        } catch (Exception $exception) {
            $this->logError($exception->getMessage(), $exception->getTrace());
        }
        $writer->endElement();

        return $writer;
    }

    /**
     * @param \XMLWriter $writer
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \XMLWriter
     */
    public function prepareXmlFooter(XMLWriter $writer, OrderTransfer $orderTransfer): XMLWriter
    {
        $writer->startElement(static::XML_FOOTER);
        try {
            $writer->writeElement(static::XML_ORIGIN, static::XML_ORIGIN_VALUE);
            $writer->writeElement(static::XML_NUMBER_OF_ITEMS, static::$numberOfItems);
            $writer->writeElement(static::XML_VOIDED_ITEMS);
            $writer->writeElement(static::XML_POS_NUMBER);
            $writer->writeElement(static::XML_RESCAN, 0);
            $writer->writeElement(static::XML_ERROR_SCANS, 0);
            $writer->writeElement(static::XML_TOTAL_AMOUNT_SELF_SCAN, $orderTransfer->getTotals()->getPriceToPay());
            $writer->writeElement(static::XML_LOYALTY_POINT_BALANCE, 0);
            $writer->writeElement(static::XML_LOYALTY_POINT_CHANGE, 0);
            $writer->writeElement(static::XML_TIMESTAMP, date(static::XML_TIMESTAMP_FORMAT));
            $writer->writeElement(static::XML_RESCAN_REQUIRED, static::XML_RESCAN_REQUIRED_VALUE);
        } catch (Exception $exception) {
            $this->logError($exception->getMessage(), $exception->getTrace());
        }
        $writer->endElement();

        return $writer;
    }

    /**
     * @param string $message
     * @param array $trace
     *
     * @return void
     */
    protected function logError(string $message, array $trace = [])
    {
        $this->getLogger()->error(
            $message,
            $trace
        );
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getCashierServiceXmlFeeBarcodeNumber(OrderTransfer $orderTransfer): string
    {
        $serviceFeeXmlBarcode = $this->cashierOrderExportConfig->getServiceFeeXmlBarcodeNumber();
        $currentOrderShipmentExpensePrice = $this->getShipmentExpensePrice($orderTransfer);

        if ($currentOrderShipmentExpensePrice === null) {
            return static::XML_SERVICE_FEE_DEFAULT_BARCODE;
        }

        return $serviceFeeXmlBarcode[$currentOrderShipmentExpensePrice] ?? static::XML_SERVICE_FEE_DEFAULT_BARCODE;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getCashierServiceXmlFeeItemNumber(OrderTransfer $orderTransfer): string
    {
        $serviceFeeXmlItemNumber = $this->cashierOrderExportConfig->getServiceFeeXmlItemNumber();
        $currentOrderShipmentExpensePrice = $this->getShipmentExpensePrice($orderTransfer);

        if ($currentOrderShipmentExpensePrice === null) {
            return static::XML_SERVICE_FEE_DEFAULT_ITEM_NUMBER;
        }

        return $serviceFeeXmlItemNumber[$currentOrderShipmentExpensePrice] ?? static::XML_SERVICE_FEE_DEFAULT_ITEM_NUMBER;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return float
     */
    protected function getXmlItemPrice(ItemTransfer $itemTransfer): float
    {
        $weight = 0;

        if ($itemTransfer->getPricePerKg()) {
            if ($itemTransfer->getNewWeight()) {
                $weight = $itemTransfer->getNewWeight();
            }

            return round(($weight * $itemTransfer->getPricePerKg()) / 1000, 0);
        }

        return $itemTransfer->getSumPrice();
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param string $defaultResult
     *
     * @return string|null
     */
    protected function getXmlPickZoneValue(ItemTransfer $itemTransfer, string $defaultResult): ?string
    {
        if (array_key_exists($itemTransfer->getPickZone(), static::PICKING_ZONE_TO_PRODUCT_NUMBER_MAPPER)) {
            return static::PICKING_ZONE_TO_PRODUCT_NUMBER_MAPPER[$itemTransfer->getPickZone()];
        } else {
            return $defaultResult;
        }
    }
}
