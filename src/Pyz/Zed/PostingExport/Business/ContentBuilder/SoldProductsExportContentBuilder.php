<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Business\ContentBuilder;

use DateTime;
use DateTimeZone;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Pyz\Zed\PostingExport\PostingExportConfig;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

class SoldProductsExportContentBuilder
{
    private const FILE_NAME_FORMAT = 'Sold Products (%s)';

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
     * @var \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    private $translatorFacade;

    /**
     * @var \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    private $orderDetailClient;

    /**
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Spryker\Zed\Money\Business\MoneyFacadeInterface $moneyFacade
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Spryker\Zed\Translator\Business\TranslatorFacadeInterface $translatorFacade
     * @param \Pyz\Client\OrderDetail\OrderDetailClientInterface $orderDetailClient
     */
    public function __construct(
        SalesFacadeInterface $salesFacade,
        MoneyFacadeInterface $moneyFacade,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        TranslatorFacadeInterface $translatorFacade,
        OrderDetailClientInterface $orderDetailClient
    ) {
        $this->salesFacade = $salesFacade;
        $this->moneyFacade = $moneyFacade;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->translatorFacade = $translatorFacade;
        $this->orderDetailClient = $orderDetailClient;
    }

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generateContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer
    {
        $postingExportContentsTransfer = new ExportContentsTransfer();
        $postingExportContentsTransfer->setFilename($this->getFileName($dateFrom, $dateTo));
        $postingExportContentsTransfer->addContentItem([
            $this->translatorFacade->trans('export.posting.invoice.region-number'),
            $this->translatorFacade->trans('export.posting.invoice.store-code'),
            $this->translatorFacade->trans('export.posting.invoice.date'),
            $this->translatorFacade->trans('export.posting.invoice.number'),
            $this->translatorFacade->trans('export.order.number'),
            $this->translatorFacade->trans('export.customer.number'),
            $this->translatorFacade->trans('export.product.number'),
            $this->translatorFacade->trans('export.product.quantity'),
            $this->translatorFacade->trans('export.product.gross-no-deposit'),
            $this->translatorFacade->trans('export.product.tax-rate'),
            $this->translatorFacade->trans('export.product.gross-deposit'),
        ]);

        $orderIds = $this->salesFacade->getOrdersInfoByInvoiceDateTimeRange($dateFrom, $dateTo);

        foreach ($orderIds as $orderId => $orderData) {
            $orderTransfer = $this->salesFacade->getOrderByIdSalesOrder($orderId);

            if ($orderTransfer->getTotals()->getPriceToPay() === 0) {
                continue;
            }

            $orderDetailRequestTransfer = (new OrderDetailRequestTransfer())
                ->fromArray($orderTransfer->toArray(), true);
            $orderDetails = $this->orderDetailClient->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);

            $baseContentItem = [
                $orderTransfer->getMerchantRegionNumber(),
                $orderTransfer->getMerchantFilialNumber(),
                $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone($orderTransfer->getInvoiceCreatedAt())->format('d.m.Y'),
                $orderTransfer->getInvoiceReference(),
                $orderTransfer->getOrderReference(),
                $orderTransfer->getCustomerReference(),
            ];

            foreach ($orderDetails[OrderDetailConstants::KEY_ORDERED_ITEMS] as $itemTransfer) {
                $contentItem = array_merge(
                    $baseContentItem,
                    [
                        $itemTransfer->getProductNumber(),
                        $itemTransfer->getQuantity(),
                        $this->formatIntValueToDecimalCurrency($itemTransfer->getSumGrossPrice()),
                        (int)$itemTransfer->getTaxRate(),
                        $this->formatIntValueToDecimalCurrency($itemTransfer->getSumProductOptionPriceAggregation()),
                    ]
                );

                $postingExportContentsTransfer->addContentItem($contentItem);
            }
        }

        return $postingExportContentsTransfer;
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
     * @param int $value
     *
     * @return string
     */
    protected function formatIntValueToDecimalCurrency(int $value): string
    {
        $moneyTransfer = $this->moneyFacade
            ->fromInteger($value);

        return $this->moneyFacade
            ->formatWithoutSymbol($moneyTransfer);
    }
}
