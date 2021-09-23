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
use Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Shared\Shipment\ShipmentConfig;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\Oms\Business\Mail\MailHandler as SprykerMailHandler;
use Spryker\Zed\Oms\Communication\Plugin\Mail\OrderShippedMailTypePlugin;
use Spryker\Zed\Oms\Dependency\Facade\OmsToMailInterface;
use Spryker\Zed\Oms\Dependency\Facade\OmsToSalesInterface;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use Symfony\Component\Config\Definition\Exception\Exception;
use Twig\Environment;

class MailHandler extends SprykerMailHandler
{
    public const MAIL_ORDER_DEAR = 'mail.order.dear';
    public const MAIL_ORDER_MR = 'mail.order.mr';
    public const MAIL_ORDER_DEAR_LADY = 'mail.order.dear.lady';
    public const MAIL_ORDER_MS = 'mail.order.ms';
    public const MAIL_ORDER_GOOD = 'mail.order.good';
    public const MAIL_ORDER_DAY = 'mail.order.day';

    /**
     * @var \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface
     */
    protected $queryContainer;

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
     * @param \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface $queryContainer
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
        OmsQueryContainerInterface $queryContainer,
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
        $this->queryContainer = $queryContainer;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderConfirmationMail(SpySalesOrder $salesOrderEntity)
    {
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
    public function sendOrderShippedMail(SpySalesOrder $salesOrderEntity)
    {
        try {
            $orderTransfer = $this->getOrderTransfer($salesOrderEntity);
            $orderTransfer = $this->expandWithItemGroups($orderTransfer);

            $mailTransfer = new MailTransfer();
            $mailTransfer->setOrder($orderTransfer);
            $mailTransfer->setType(OrderShippedMailTypePlugin::MAIL_TYPE);
            $mailTransfer->setLocale($orderTransfer->getLocale());
            $mailTransfer->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_ORDER_SHIPPED);
            $mailTransfer->setCmsBlockPlaceholders(
                $this->getCmsBlockPlaceholders($orderTransfer)
            );

            $this->mailFacade->handleMail($mailTransfer);
        } catch (Exception $e) {
        }
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
        $dateOfOrder = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone($orderTransfer->getCreatedAt());

        $deliveryDateInterval = $this->mailCmsBlockService->getDeliveryDate($orderTransfer);
        [$deliveryDate, $timeInterval] = explode(' ', $deliveryDateInterval);
        [$timeFrom, $timeTo] = explode('-', $timeInterval);
        $orderDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone($deliveryDate);

        $items = $orderTransfer->getItems();
        $itemsCanceled = $this->getCanceledProductListItems($orderTransfer);
        $itemsShipped = $this->getShippedProductListItems($orderTransfer);

        $orderTransfer->setItems($itemsCanceled);
        $orderTransfer = $this->expandWithItemGroups($orderTransfer);
        $itemsGroupsCanceled = $orderTransfer->getItemGroups();

        $orderTransfer->setItems($itemsShipped);
        $orderTransfer = $this->expandWithItemGroups($orderTransfer);
        $itemsGroupsShipped = $orderTransfer->getItemGroups();

        $orderTransfer->setItems($items);
        $orderTransfer = $this->expandWithItemGroups($orderTransfer);

        foreach ($orderTransfer->getItemGroups() as $grp) {
            $sku = $grp['sku'];
            foreach ($itemsGroupsShipped as $grpShipped) {
                if ($grpShipped['sku'] == $sku) {
                    $grpShipped['canceledAmount'] = $grp['quantity'];
                }
            }
            foreach ($itemsGroupsCanceled as $grpCanceled) {
                if ($grpCanceled['sku'] == $sku) {
                    $grpCanceled['canceledAmount'] = $grp['quantity'];
                }
            }
        }

        $itemsCanceled = $this->getCanceledProductListItems($orderTransfer);
        $similarProducts = [];
        $store = $orderTransfer->getMerchantReference();
        $sku = "";
        foreach ($itemsCanceled as $product) {
            if (isset($product['sku'])) {
                $sku = $product['sku'];
                $similarProduct = $this->queryContainer->queryRelatedProductsBySku($sku, $store);
                if (!empty($similarProduct)) {
                    array_push($similarProducts, $similarProduct);
                }
            }
        }

        $orderTransfer->setItems($itemsShipped);
        $orderTransfer = $this->expandWithItemGroups($orderTransfer);
        $totals = $orderTransfer->getTotals();
        $similarProductsTwig = '0';
        try {
            $similarProductsTwig = $this->getSimilarProductsList($similarProducts, $orderTransfer);
        } catch (Exception $e) {
        }

        $params = [
            'totalPriceOfTheOrder' => $this->getMoneyValue($totals->getGrandTotal()),
            'subtotalPriceOfTheOrder' => $this->getMoneyValue($totals->getSubtotal() - $totals->getCanceledTotal()),
            'vat' => $this->getMoneyValue($totals->getTaxTotal()->getAmount()),
            'deliveryDate' => $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone($deliveryDate)->format("d.m.Y") . " " . $timeInterval,
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
            'dateOfOrder' => $dateOfOrder->format("d.m.Y"),
            'discountTotal' => $this->getMoneyValue($totals->getDiscountTotal()),
            'sumOptions' => $this->getMoneyValue($this->getSumOptions($orderTransfer)),
            'tax7' => $this->getMoneyValue($this->getSumTaxes($orderTransfer, '7')),
            'tax19' => $this->getMoneyValue($this->getSumTaxes($orderTransfer, '19')),
            'collectNumber' => $orderTransfer->getCollectNumber(),
            'shippedProductList' => $this->getShippedProductList($orderTransfer, $itemsGroupsShipped, 'shipped'),
            'canceledProductList' => $this->getShippedProductList($orderTransfer, $itemsGroupsCanceled, 'canceled'),
            'orderReference' => $orderTransfer->getOrderReference(),
            'merchantName' => $orderTransfer->getMerchantName() ?: ' ',
            'similarProducts' => $similarProductsTwig,
            'tax15' => $this->getMoneyValue($this->getSumTaxes($orderTransfer, '15')),
            'tax21' => $this->getMoneyValue($this->getSumTaxes($orderTransfer, '21')),
        ];

        $orderTransfer->setItems($items);
        if ($items->count() > 0) {
            $orderTransfer = $this->expandWithItemGroups($orderTransfer);
        }

        if ($orderTransfer->getMerchantReference() == 1004 || $orderTransfer->getMerchantReference() == 1021 || $orderTransfer->getMerchantReference() == 1003) {
            $merchantReference = [
                'footerAddress' => 'GLOBUS Handelshof GmbH & Co. KG <br> Neunmorgenstraße 8 – 12 <br> 66424 Homburg-Einöd <br> Amtsgericht Saarbrücken: HRB 80397 <br>',
            ];
            $params = array_merge($params, $merchantReference);
        } else {
            $merchantReference = [
                'footerAddress' => 'GLOBUS Handelshof St. Wendel GmbH & Co. KG <br> Am Wirthembösch <br> 66606 St. Wendel <br> Amtsgericht Saarbrücken, HRA 80636 <br>',
            ];
            $params = array_merge($params, $merchantReference);
        }

        if ($orderTransfer->getBillingAddress() !== null) {
            $addressParams = [
                'address1' => $orderTransfer->getBillingAddress()->getAddress1() ?: ' ',
                'address2' => $orderTransfer->getBillingAddress()->getAddress2() ?: ' ',
                'zipCode' => $orderTransfer->getBillingAddress()->getZipCode() ?: ' ',
                'city' => $orderTransfer->getBillingAddress()->getCity() ?: ' ',
                'phone' => $orderTransfer->getBillingAddress()->getPhone() ?: ' ',
                'firstName' => $orderTransfer->getBillingAddress()->getFirstName() ?: ' ',
                'lastName' => $orderTransfer->getBillingAddress()->getLastName() ?: ' ',
                'email' => $orderTransfer->getBillingAddress()->getEmail() ?: $orderTransfer->getEmail() ?: ' ',
            ];
            $params = array_merge($params, $addressParams);
            $salutationParams = $this->getSalutationParams($orderTransfer->getBillingAddress()->getSalutation() ?: ' ');
            $params = array_merge($params, $salutationParams);
        } else {
            $addressParams = [
                'address1' => ' ',
                'address2' => ' ',
                'zipCode' => ' ',
                'city' => ' ',
                'phone' => ' ',
                'firstName' => $orderTransfer->getFirstName() ?: ' ',
                'lastName' => $orderTransfer->getLastName() ?: ' ',
                'email' => $orderTransfer->getEmail() ?: ' ',
            ];
            $params = array_merge($params, $addressParams);
            $salutationParams = $this->getSalutationParams($orderTransfer->getSalutation() ?: ' ');
            $params = array_merge($params, $salutationParams);
        }

        return $this->mailCmsBlockService->convertArrayToPlaceholders($params);
    }

    /**
     * @param string $salutation
     *
     * @return array
     */
    protected function getSalutationParams(string $salutation): array
    {
        if ($salutation == 'Mr') {
            $salutationParams = [
                'salutationPrefix' => $this->translatorFacade->trans(static::MAIL_ORDER_DEAR),
                'salutation' => $this->translatorFacade->trans(static::MAIL_ORDER_MR),
            ];
        } elseif ($salutation == 'Ms') {
            $salutationParams = [
                'salutationPrefix' => $this->translatorFacade->trans(static::MAIL_ORDER_DEAR_LADY),
                'salutation' => $this->translatorFacade->trans(static::MAIL_ORDER_MS),
            ];
        } elseif ($salutation == 'Divers') {
            $salutationParams = [
                'salutationPrefix' => $this->translatorFacade->trans(static::MAIL_ORDER_GOOD),
                'salutation' => $this->translatorFacade->trans(static::MAIL_ORDER_DAY),
            ];
        } else {
            $salutationParams = [
                'salutationPrefix' => '',
                'salutation' => $salutation,
            ];
        }

        return $salutationParams;
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
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return int
     */
    protected function getShipmentTax(OrderTransfer $orderTransfer): int
    {
        foreach ($orderTransfer->getExpenses() as $expenseTransfer) {
            if ($expenseTransfer->getType() === ShipmentConfig::SHIPMENT_EXPENSE_TYPE) {
                return $expenseTransfer->getSumTaxAmount();
            }
        }

        return 0;
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
     * @param \ArrayObject $itemsGroups
     * @param string $itemStatus
     *
     * @return string
     */
    protected function getShippedProductList(OrderTransfer $orderTransfer, ArrayObject $itemsGroups, string $itemStatus): string
    {
        $orderTransfer = $orderTransfer->setItemGroups($itemsGroups);

        return $this->twigEnvironment->render(
            $this->config->getOrderShippedProductListTemplate(),
            [ 'order' => $orderTransfer, 'itemStatus' => $itemStatus]
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

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return int
     */
    protected function getSumOptions(OrderTransfer $orderTransfer): int
    {
        $sumOptions = 0;
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ((int)$itemTransfer->getCanceledAmount() < 1) {
                $sumOptions += $itemTransfer["sumProductOptionPriceAggregation"];
            }
        }

        return $sumOptions;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param string $tax
     *
     * @return int
     */
    protected function getSumTaxes(OrderTransfer $orderTransfer, string $tax): int
    {
        $result = 0;
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        if ((($storeCodeBucket == 'DE') && ($tax == "7")) || (($storeCodeBucket == 'CZ') && ($tax == "15"))) {
            foreach ($orderTransfer->getItems() as $itemTransfer) {
                if ($itemTransfer->getCanceledAmount() == null) {
                    $itemTransfer->setCanceledAmount(0);
                }
                if ($tax == $itemTransfer["taxRate"] && $itemTransfer->getCanceledAmount() < 1) {
                    $result += $itemTransfer["sumTaxAmountFullAggregation"];
                }
            }
        } elseif ((($storeCodeBucket == 'DE') && ($tax == "19")) || (($storeCodeBucket == 'CZ') && ($tax == "21"))) {
            $deliveryCostTax = $this->getShipmentTax($orderTransfer);
            foreach ($orderTransfer->getItems() as $itemTransfer) {
                if ($itemTransfer->getCanceledAmount() == null) {
                    $itemTransfer->setCanceledAmount(0);
                }
                if ($tax == $itemTransfer["taxRate"] && $itemTransfer->getCanceledAmount() < 1) {
                    $result += $itemTransfer["sumTaxAmountFullAggregation"];
                }
            }
            $result += $deliveryCostTax;
        }

        return $result;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \ArrayObject
     */
    protected function getCanceledProductListItems(OrderTransfer $orderTransfer): ArrayObject
    {
        $items = new ArrayObject();
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer["canceledAmount"] > 0) {
                $itemTransfer->setCanceledAmount(1);
                $items->append($itemTransfer);
            }
        }

        return $items;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \ArrayObject
     */
    protected function getShippedProductListItems(OrderTransfer $orderTransfer): ArrayObject
    {
        $items = new ArrayObject();
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount() > 0) {
            } else {
                $items->append($itemTransfer);
            }
        }

        return $items;
    }

    /**
     * @param mixed $similarProducts
     * @param mixed $orderTransfer
     *
     * @return string
     */
    protected function getSimilarProductsList($similarProducts, $orderTransfer): string
    {
        return $this->twigEnvironment->render(
            $this->config->getSimilarProductListTemplate(),
            ['similarProducts' => $similarProducts, 'order' => $orderTransfer]
        );
    }
}
