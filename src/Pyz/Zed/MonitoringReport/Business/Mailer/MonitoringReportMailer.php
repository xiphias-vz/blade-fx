<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business\Mailer;

use Generated\Shared\Transfer\MailAttachmentTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Shared\Invoice\InvoiceConfig as SharedInvoiceConfig;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Pyz\Zed\Invoice\Communication\Plugin\Mail\CustomerInvoiceMailTypePlugin;
use Pyz\Zed\Mail\Business\MailFacadeInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use Twig\Environment;

class MonitoringReportMailer
{
    private const CMS_BLOCK_NAME = 'Customer invoice email';
    public const TRANSLATION_WEEK_PREFIX = 'day-of-week.n.';
    public const TRANSLATION_MONTH_PREFIX = 'month-name.n.';

    /**
     * @var \Pyz\Zed\Mail\Business\MailFacadeInterface
     */
    private $mailFacade;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    private $salesFacade;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @var \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    private $orderDetailClient;

    /**
     * @var \Pyz\Client\Pdf\PdfClientInterface
     */
    private $pdfClient;

    /**
     * @var \Twig\Environment
     */
    private $twigEnvironment;

    /**
     * @var \Pyz\Zed\Invoice\InvoiceConfig
     */
    private $config;

    /**
     * @var \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    private $translatorFacade;

    /**
     * @var \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private $mailCmsBlockService;

    /**
     * @var \Spryker\Shared\Kernel\Store
     */
    private $store;

    /**
     * @param \Pyz\Zed\Mail\Business\MailFacadeInterface $mailFacade
     * @param \Twig\Environment $twigEnvironment
     * @param \Spryker\Zed\Translator\Business\TranslatorFacadeInterface $translatorFacade
     * @param \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface $mailCmsBlockService
     * @param \Spryker\Shared\Kernel\Store $store
     */
    public function __construct(
        MailFacadeInterface $mailFacade,
        Environment $twigEnvironment,
        TranslatorFacadeInterface $translatorFacade,
        MailCmsBlockServiceInterface $mailCmsBlockService,
        Store $store
    ) {
        $this->mailFacade = $mailFacade;
        $this->twigEnvironment = $twigEnvironment;
        $this->translatorFacade = $translatorFacade;
        $this->mailCmsBlockService = $mailCmsBlockService;
        $this->store = $store;
    }

    /**
     * @inheritDoc
     */
    public function sendInvoiceEmail(int $idSalesOrder): void
    {
        $orderTransfer = $this->salesFacade->getOrderByIdSalesOrder($idSalesOrder);

        $customerTransfer = $orderTransfer->getCustomer();

        $mailTransfer = new MailTransfer();
        $mailTransfer->setType(CustomerInvoiceMailTypePlugin::MAIL_TYPE);
        $mailTransfer->setCustomer($customerTransfer);
        $mailTransfer->setLocale($orderTransfer->getLocale());
        $mailTransfer->setCmsBlockName(self::CMS_BLOCK_NAME);
        $mailTransfer->setCmsBlockPlaceholders(
            $this->mailCmsBlockService->convertArrayToPlaceholders(
                $this->getCmsBlockPlaceholders($orderTransfer)
            )
        );
        $mailTransfer->setBcc($this->config->getInvoiceEmailBcc());
        $mailTransfer->setOrder($orderTransfer);

        $invoiceData = $this->getInvoiceData($orderTransfer);
        $invoiceData[OrderDetailConstants::KEY_ORDER] = $orderTransfer;
        $twigContent = $this->twigEnvironment
            ->render('@Invoice/Invoice/invoice.twig', $invoiceData);

        $pdfContent = $this->pdfClient
            ->generateFromHTML(
                $twigContent,
                $this->config->getPdfInvoiceConfig()
            );

        $pdfFile = tmpfile();
        fwrite($pdfFile, $pdfContent);

        $pdfFileUri = stream_get_meta_data($pdfFile)['uri'];

        $mailAttachmentTransfer = new MailAttachmentTransfer();
        $mailAttachmentTransfer->setAttachmentUrl($pdfFileUri);
        $mailAttachmentTransfer->setFileName($pdfFileUri);
        $mailAttachmentTransfer->setDisplayName($orderTransfer->getInvoiceReference() . '.pdf');
        $mailTransfer->addAttachment($mailAttachmentTransfer);

        $this->mailFacade->handleMail($mailTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array
     */
    protected function getCmsBlockPlaceholders(
        OrderTransfer $orderTransfer
    ): array {
        $orderDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone(
            $this->mailCmsBlockService->getDeliveryDate($orderTransfer)
        );

        return [
            'baseUrlYves' => $this->config->getBaseUrlYves(),
            'firstName' => $orderTransfer->getFirstName(),
            'invoiceReference' => $orderTransfer->getInvoiceReference(),
            'orderReference' => $orderTransfer->getOrderReference(),
            'invoiceLink' => $this->getInvoiceUrl($orderTransfer),
            'dateOfOrder' => $orderDateTime->format('d.m.Y'),
            'weekdayOfDelivery' => $this->translatorFacade->trans(self::TRANSLATION_WEEK_PREFIX . $orderDateTime->format("w")),
            'dayOfDelivery' => $orderDateTime->format("d"),
            'monthOfDelivery' => $this->translatorFacade->trans(self::TRANSLATION_MONTH_PREFIX . $orderDateTime->format("m")),
            'divisionSubDomain' => $this->config->getYvesHost(),
            'divisionLongName' => $orderTransfer->getMerchantRegion()->getRegionName(),
            'divisionStreet' => $orderTransfer->getMerchantRegion()->getStreet(),
            'divisionZipCode' => $orderTransfer->getMerchantRegion()->getZipCode(),
            'divisionTown' => $orderTransfer->getMerchantRegion()->getCity(),
            'divisionFooter' => $this->mailCmsBlockService->convertNewLineToBr($orderTransfer->getMerchantRegion()->getFooterText()),
        ];
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    private function getInvoiceUrl(OrderTransfer $orderTransfer): string
    {
        return sprintf(
            '%s/%s/%s?id=%s',
            $this->config->getBaseUrlYves(),
            array_search($orderTransfer->getLocale()->getLocaleName(), $this->store->getLocales()),
            SharedInvoiceConfig::ROUTE_CUSTOMER_INVOICE,
            $orderTransfer->getIdSalesOrder()
        );
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array|null
     */
    protected function getInvoiceData(OrderTransfer $orderTransfer): ?array
    {
        if (empty($orderTransfer->getInvoiceCreatedAt())) {
            return null;
        }

        $orderDetails = $this->getInvoiceOrderDetailsResponseData($orderTransfer);

        return [
            'orderDetails' => $orderDetails,
        ];
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array
     */
    protected function getInvoiceOrderDetailsResponseData(OrderTransfer $orderTransfer): array
    {
        $orderDetailRequestTransfer = (new OrderDetailRequestTransfer())
            ->fromArray($orderTransfer->toArray(), true);

        return $this->orderDetailClient
            ->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);
    }
}
