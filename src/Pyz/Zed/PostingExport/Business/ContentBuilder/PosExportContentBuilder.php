<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Business\ContentBuilder;

use DateTime;
use DateTimeZone;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\Sku\SkuServiceInterface;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\PostingExport\PostingExportConfig;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;

class PosExportContentBuilder
{
    private const FILE_NAME_FORMAT = 'Pos Export (%s)';

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @var \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    protected $moneyFacade;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @var \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    private $orderDetailClient;

    /**
     * @var \Pyz\Zed\PostingExport\PostingExportConfig
     */
    private $config;

    /**
     * @var \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    private $productFacade;

    /**
     * @var \Pyz\Service\Sku\SkuServiceInterface
     */
    private $skuService;

    /**
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Spryker\Zed\Money\Business\MoneyFacadeInterface $moneyFacade
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Pyz\Client\OrderDetail\OrderDetailClientInterface $orderDetailClient
     * @param \Pyz\Zed\Product\Business\ProductFacadeInterface $productFacade
     * @param \Pyz\Zed\PostingExport\PostingExportConfig $config
     * @param \Pyz\Service\Sku\SkuServiceInterface $skuService
     */
    public function __construct(
        SalesFacadeInterface $salesFacade,
        MoneyFacadeInterface $moneyFacade,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        OrderDetailClientInterface $orderDetailClient,
        ProductFacadeInterface $productFacade,
        PostingExportConfig $config,
        SkuServiceInterface $skuService
    ) {
        $this->salesFacade = $salesFacade;
        $this->moneyFacade = $moneyFacade;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->orderDetailClient = $orderDetailClient;
        $this->config = $config;
        $this->productFacade = $productFacade;
        $this->skuService = $skuService;
    }

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generateContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer
    {
        $exportContentsTransfer = new ExportContentsTransfer();
        $exportContentsTransfer->setFilename($this->getFileName($dateFrom, $dateTo));

        $orderIds = $this->salesFacade->getOrdersInfoByInvoiceDateTimeRange($dateFrom, $dateTo);
        $exportDataMap = [];

        $depositUnitPrice = $this->config->getDepositUnitPrice();

        foreach ($orderIds as $orderId => $orderData) {
            $orderTransfer = $this->salesFacade->getOrderByIdSalesOrder($orderId);

            if ($orderTransfer->getTotals()->getPriceToPay() === 0) {
                continue;
            }

            $skus = $this->skuService->aggregateOrderSkus($orderTransfer);
            $concreteSkuToAttributesMap = $this->productFacade
                ->getConcreteSkuToAttributesMap($skus, $orderTransfer->getStore());

            $orderDetailRequestTransfer = (new OrderDetailRequestTransfer())
                ->fromArray($orderTransfer->toArray(), true);
            $orderDetails = $this->orderDetailClient->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);

            $invoiceDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone($orderTransfer->getInvoiceCreatedAt());

            $taxes = [];

            foreach ($orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS] as $rate => $taxDetail) {
                if (!$taxDetail[OrderDetailConstants::KEY_SUM]) {
                    continue;
                }

                $taxes[] = [
                    'tax_rate' => $rate / OrderDetailConstants::TAX_RATE_MULTIPLIER,
                    'tax_amount' => $taxDetail[OrderDetailConstants::KEY_TAX],
                    'net_amount' => $taxDetail[OrderDetailConstants::KEY_NET],
                    'gross_amount' => $taxDetail[OrderDetailConstants::KEY_SUM],
                ];
            }

            $items = [];

            foreach ($orderTransfer->getItems() as $itemTransfer) {
                if ($itemTransfer->getCanceledAmount() > 0) {
                    continue;
                }

                $attributes = $concreteSkuToAttributesMap[$itemTransfer->getSku()];

                if (!empty($items[$itemTransfer->getSku()])) {
                    $item = $items[$itemTransfer->getSku()];

                    $item['quantity'] += $itemTransfer->getQuantity();
                    $item['position_gross_amount'] += $itemTransfer->getSumPrice();

                    if ($itemTransfer->getProductOptions()->count()) {
                        $deposit = $itemTransfer->getProductOptions()[0];
                        $item['deposit']['deposit_quantity'] += $deposit->getSumGrossPrice() / $depositUnitPrice;
                        $item['deposit']['deposit_gross_amount'] += $deposit->getSumGrossPrice();
                    }

                    $items[$itemTransfer->getSku()] = $item;
                    continue;
                }

                $item = [
                    'product_code' => (int)$attributes[ProductConfig::KEY_PRODUCT_NUMBER],
                    'gtin' => isset($attributes[ProductConfig::KEY_PRODUCT_EAN]) ? $attributes[ProductConfig::KEY_PRODUCT_EAN] : null,
                    'quantity' => $itemTransfer->getQuantity(),
                    'gross_unit_price' => $itemTransfer->getUnitPrice(),
                    'position_gross_amount' => $itemTransfer->getSumPrice(),
                    'tax_rate' => (int)$itemTransfer->getTaxRate(),
                    'deposit' => $this->getDepositData($itemTransfer, $depositUnitPrice),
                ];

                $items[$itemTransfer->getSku()] = $item;
            }

            if (!$items) {
                continue;
            }

            $exportDataMap[$orderTransfer->getMerchantRegionNumber()][$orderTransfer->getMerchantFilialNumber()][] = [
                'date' => $invoiceDateTime->format('Y-m-d'),
                'time' => $invoiceDateTime->format('H:i:s'),
                'gross_amount' => $this->sumPayments($orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS], OrderDetailConstants::KEY_SUM),
                'net_amount' => $this->sumPayments($orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS], OrderDetailConstants::KEY_NET),
                'taxes' => $taxes,
                'invoice_number' => $orderTransfer->getInvoiceReference(),
                'item_positions' => array_values($items),
            ];
        }

        $exportData = [];

        foreach ($exportDataMap as $merchantNumber => $merchantOrders) {
            foreach ($merchantOrders as $filialNUmber => $orders) {
                $exportData[] = [
                    "div_no" => $merchantNumber,
                    "store_no" => $filialNUmber,
                    "receipts" => $orders,
                ];
            }
        }

        $exportContentsTransfer->setContents($exportData);

        return $exportContentsTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param int $depositUnitPrice
     *
     * @return array
     */
    private function getDepositData(ItemTransfer $itemTransfer, int $depositUnitPrice): array
    {
        if ($itemTransfer->getProductOptions()->count()) {
            $deposit = $itemTransfer->getProductOptions()[0];

            return [
                'deposit_quantity' => $deposit->getSumGrossPrice() / $depositUnitPrice,
                'deposit_gross_unit_price' => $depositUnitPrice,
                'deposit_gross_amount' => $deposit->getSumGrossPrice(),
                'deposit_tax_rate' => (int)$deposit->getTaxRate(),
            ];
        }

        return [
            'deposit_quantity' => 0,
            'deposit_gross_unit_price' => 0,
            'deposit_gross_amount' => 0,
            'deposit_tax_rate' => 0,
        ];
    }

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return string
     */
    protected function getFileName(?DateTime $dateFrom, ?DateTime $dateTo): string
    {
        $filenameFragments = [];

        if ($dateFrom) {
            $filenameFragments[] = $dateFrom->format(PostingExportConfig::DATE_FORMAT);
        }

        if ($dateTo) {
            $filenameFragments[] = $dateTo->format(PostingExportConfig::DATE_FORMAT);
        }

        if (empty($filenameFragments)) {
            $dateTimeZone = new DateTimeZone($this->dateTimeWithZoneService->getCurrentStoreTimezoneString());
            $filenameFragments[] = (new DateTime())
                ->setTimezone($dateTimeZone)
                ->format(PostingExportConfig::DATE_FORMAT);
        }

        return sprintf(
            static::FILE_NAME_FORMAT,
            implode(PostingExportConfig::FILE_NAME_DELIMITER, array_unique($filenameFragments))
        );
    }

    /**
     * @param array $taxPayments
     * @param string $paymentKey
     *
     * @return int
     */
    private function sumPayments(array $taxPayments, string $paymentKey): int
    {
        return array_reduce(
            $taxPayments,
            function ($total, array $payments) use ($paymentKey) {
                return $total + $payments[$paymentKey];
            },
            0
        );
    }
}
