<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\Mail;

use ArrayObject;
use Generated\Shared\Transfer\MailTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Shared\Cms\CmsBlockConfig;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\OrderCancelledMailTypePlugin;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\OrderRefundedMailTypePlugin;
use Pyz\Zed\Invoice\Business\Mailer\InvoiceMailer;
use Pyz\Zed\Oms\Communication\Plugin\Mail\OrderConfirmationMailTypePlugin;
use Pyz\Zed\Oms\OmsConfig;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Shared\Shipment\ShipmentConfig;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\Oms\Business\Mail\MailHandler as SprykerMailHandler;
use Spryker\Zed\Oms\Dependency\Facade\OmsToMailInterface;
use Spryker\Zed\Oms\Dependency\Facade\OmsToSalesInterface;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use Twig\Environment;

class MailHandler extends SprykerMailHandler
{
    /**
     * @var \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface
     */
    protected $utilDateTimeService;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $pyzSalesFacade;

    /**
     * @var \Twig\Environment
     */
    protected $twigEnvironment;

    /**
     * @var \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    private $moneyFacade;

    /**
     * @var \Pyz\Zed\Oms\OmsConfig
     */
    private $config;

    /**
     * @var \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private $mailCmsBlockService;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @var \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    private $translatorFacade;

    /**
     * @param \Spryker\Zed\Oms\Dependency\Facade\OmsToSalesInterface $salesFacade
     * @param \Spryker\Zed\Oms\Dependency\Facade\OmsToMailInterface $mailFacade
     * @param \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsOrderMailExpanderPluginInterface[] $orderMailExpanderPlugins
     * @param \Spryker\Zed\Money\Business\MoneyFacadeInterface $moneyFacade
     * @param \Pyz\Zed\Oms\OmsConfig $config
     * @param \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface $mailCmsBlockService
     * @param \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface $utilDateTimeService
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $pyzSalesFacade
     * @param \Twig\Environment $twigEnvironment
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Spryker\Zed\Translator\Business\TranslatorFacadeInterface $translatorFacade
     */
    public function __construct(
        OmsToSalesInterface $salesFacade,
        OmsToMailInterface $mailFacade,
        array $orderMailExpanderPlugins,
        MoneyFacadeInterface $moneyFacade,
        OmsConfig $config,
        MailCmsBlockServiceInterface $mailCmsBlockService,
        UtilDateTimeServiceInterface $utilDateTimeService,
        SalesFacadeInterface $pyzSalesFacade,
        Environment $twigEnvironment,
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        TranslatorFacadeInterface $translatorFacade
    ) {
        parent::__construct($salesFacade, $mailFacade, $orderMailExpanderPlugins);

        $this->moneyFacade = $moneyFacade;
        $this->config = $config;
        $this->mailCmsBlockService = $mailCmsBlockService;
        $this->utilDateTimeService = $utilDateTimeService;
        $this->pyzSalesFacade = $pyzSalesFacade;
        $this->twigEnvironment = $twigEnvironment;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->translatorFacade = $translatorFacade;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderConfirmationMail(SpySalesOrder $salesOrderEntity)
    {
        //todo: remove Test Orders
        if ($salesOrderEntity->getIsTest()) {
            return;
        }

        $orderTransfer = $this->getOrderTransfer($salesOrderEntity);
        $orderTransfer = $this->expandWithItemGroups($orderTransfer);

        $mailTransfer = new MailTransfer();
        $mailTransfer->setOrder($orderTransfer);
        $mailTransfer->setType(OrderConfirmationMailTypePlugin::MAIL_TYPE);
        $mailTransfer->setLocale($orderTransfer->getLocale());
        $mailTransfer->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_ORDER_CONFIRMATION);
        $mailTransfer->setCmsBlockPlaceholders(
            $this->getCmsBlockPlaceholders($orderTransfer)
        );

        $this->mailFacade->handleMail($mailTransfer);
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderCancelledEmail(SpySalesOrder $salesOrderEntity)
    {
        $orderTransfer = $this->getOrderTransfer($salesOrderEntity);

        $mailTransfer = new MailTransfer();
        $mailTransfer->setOrder($orderTransfer);
        $mailTransfer->setType(OrderCancelledMailTypePlugin::MAIL_TYPE);
        $mailTransfer->setLocale($orderTransfer->getLocale());
        $mailTransfer->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_ORDER_CANCELLED);
        $mailTransfer->setCmsBlockPlaceholders(
            $this->getCmsBlockPlaceholders($orderTransfer)
        );

        $this->mailFacade->handleMail($mailTransfer);
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderRefundedMail(SpySalesOrder $salesOrderEntity)
    {
        $orderTransfer = $this->getOrderTransfer($salesOrderEntity);

        $mailTransfer = new MailTransfer();
        $mailTransfer->setOrder($orderTransfer);
        $mailTransfer->setType(OrderRefundedMailTypePlugin::MAIL_TYPE);
        $mailTransfer->setLocale($orderTransfer->getLocale());
        $mailTransfer->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_ORDER_REFUNDED);
        $mailTransfer->setCmsBlockPlaceholders(
            $this->getCmsBlockPlaceholders($orderTransfer)
        );

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
        $totals = $orderTransfer->getTotals();

        $deliveryDateInterval = $this->mailCmsBlockService->getDeliveryDate($orderTransfer);
        [$deliveryDate, $timeInterval] = explode(' ', $deliveryDateInterval);
        [$timeFrom, $timeTo] = explode('-', $timeInterval);
        $orderDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone($deliveryDate);

        $params = $orderTransfer->getCustomer()->modifiedToArray(true, true)
            + $orderTransfer->modifiedToArray(true, true)
            + [
                'totalPriceOfTheOrder' => $this->getMoneyValue($totals->getGrandTotal()),
                'subtotalPriceOfTheOrder' => $this->getMoneyValue($totals->getSubtotal()),
                'vat' => $this->getMoneyValue($totals->getTaxTotal()->getAmount()),
                'deliveryDate' => $this->mailCmsBlockService->getDeliveryDate($orderTransfer),
                'deliveryCost' => $this->getShipmentMoneyValue($orderTransfer),
                'productList' => $this->getProductList($orderTransfer),
                'baseUrlYves' => $this->config->getBaseUrlYves(),
                'collectNumberOfTheOrder' => $this->getCollectNumber($orderTransfer),
                'weekdayOfDelivery' => $this->translatorFacade->trans(InvoiceMailer::TRANSLATION_WEEK_PREFIX . $orderDateTime->format("w")),
                'dayOfDelivery' => $orderDateTime->format("d"),
                'monthOfDelivery' => $this->translatorFacade->trans(InvoiceMailer::TRANSLATION_MONTH_PREFIX . $orderDateTime->format("m")),
                'beginDeliveryTimeSlot' => $timeFrom,
                'endDeliveryTimeSlot' => $timeTo,
                'storeAddress' => $orderTransfer->getMerchantName(),
                'divisionSubDomain' => $this->config->getBaseUrlYves(),
                'divisionLongName' => $orderTransfer->getMerchantRegion()->getRegionName(),
                'divisionStreet' => $orderTransfer->getMerchantRegion()->getStreet(),
                'divisionZipCode' => $orderTransfer->getMerchantRegion()->getZipCode(),
                'divisionTown' => $orderTransfer->getMerchantRegion()->getCity(),
                'divisionFooter' => $this->mailCmsBlockService->convertNewLineToBr($orderTransfer->getMerchantRegion()->getFooterText()),
            ];

        return $this->mailCmsBlockService->convertArrayToPlaceholders($params);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getShipmentMoneyValue(OrderTransfer $orderTransfer): string
    {
        foreach ($orderTransfer->getExpenses() as $expenseTransfer) {
            if ($expenseTransfer->getType() === ShipmentConfig::SHIPMENT_EXPENSE_TYPE) {
                return $this->getMoneyValue($expenseTransfer->getSumPrice());
            }
        }

        return '';
    }

    /**
     * @param int $amount
     *
     * @return string
     */
    protected function getMoneyValue(int $amount): string
    {
        return $this->moneyFacade->formatWithSymbol($this->moneyFacade->fromInteger($amount));
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    protected function expandWithItemGroups(OrderTransfer $orderTransfer): OrderTransfer
    {
        $uniqueItems = $this->pyzSalesFacade->getUniqueItemsFromOrder($orderTransfer);

        return $orderTransfer->setItemGroups(new ArrayObject($uniqueItems));
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getProductList(OrderTransfer $orderTransfer): string
    {
        return $this->twigEnvironment->render(
            $this->config->getOrderConfirmationProductListTemplate(),
            ['order' => $orderTransfer]
        );
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    protected function getCollectNumber(OrderTransfer $orderTransfer): string
    {
        return $this->twigEnvironment->render(
            $this->config->getOrderConfirmationCollectNumberTemplate(),
            ['order' => $orderTransfer]
        );
    }
}
