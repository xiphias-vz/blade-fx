<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SequenceNumberSettingsTransfer;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Shared\Oms\OmsConstants;
use Pyz\Shared\Sales\SalesConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    public const DEFAULT_OMS_PROCESS_WORKER_NUMBER = 10;

    protected const DEFAULT_ORDER_CANCELLATION_ALLOWED_PERIOD = '+1 day';
    protected const DEFAULT_ORDER_REFERENCE_PADDING = 9;

    protected const ORDER_STATE_MAP = [
        OmsConfig::STATE_NEW => OmsConfig::STATE_NEW,
        OmsConfig::STATE_INVALID => OmsConfig::STATE_INVALID,
        OmsConfig::STATE_CANCELLED => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_READY_FOR_PICKING => OmsConfig::STORE_STATE_READY_FOR_PICKING,
        OmsConfig::STORE_STATE_CANCELLED_NOT_IN_STOCK => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_CUSTOMER => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_COLLECTION_CANCELLED_BY_STORE => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_DELIVERY_CANCELLED_BY_CUSTOMER => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_DELIVERY_CANCELLED_BY_STORE => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_CANCELLED_BY_TIMEOUT => OmsConfig::STATE_CANCELLED,
        OmsConfig::STATE_CANCELLED_BY_CUSTOMER => OmsConfig::STATE_CANCELLED,
        OmsConfig::STATE_CANCELLED_BY_BACKOFFICE => OmsConfig::STATE_CANCELLED,
        OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER_CANCELED => OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER,
        OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER => OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER,
        OmsConfig::STORE_STATE_ORDER_INVOICED => OmsConfig::STATE_INVOICED,
        OmsConfig::STORE_STATE_ORDER_INVOICED_CANCELED => OmsConfig::STATE_INVOICED,
        OmsConfig::STORE_STATE_DELIVERED => OmsConfig::STATE_COMPLETED,
        OmsConfig::STORE_STATE_COLLECTED_BY_CUSTOMER => OmsConfig::STATE_COMPLETED,
        OmsConfig::STATE_CLOSED => OmsConfig::STATE_COMPLETED,
    ];

    /**
     * This method determines state machine process from the given quote transfer and order item.
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string
     */
    public function determineProcessForOrderItem(QuoteTransfer $quoteTransfer, ItemTransfer $itemTransfer)
    {
        $paymentMethodStatemachineMapping = $this->getPaymentMethodStatemachineMapping();

        if (!array_key_exists($quoteTransfer->getPayment()->getPaymentSelection(), $paymentMethodStatemachineMapping)) {
            return parent::determineProcessForOrderItem($quoteTransfer, $itemTransfer);
        }

        return $paymentMethodStatemachineMapping[$quoteTransfer->getPayment()->getPaymentSelection()];
    }

    /**
     * This method provides list of urls to render blocks inside order detail page.
     * URL defines path to external bundle controller. For example: /discount/sales/list would call discount bundle, sales controller, list action.
     * Action should return return array or redirect response.
     *
     * example:
     * [
     *    'discount' => '/discount/sales/index',
     * ]
     *
     * @return array
     */
    public function getSalesDetailExternalBlocksUrls()
    {
        $projectExternalBlocks = [
            'cart_note' => '/cart-note/sales/list', #CartNoteFeature
            'payments' => '/payment/sales/list',
            'shipment' => '/shipment/sales/list',
            'discount' => '/discount/sales/list',
            'refund' => '/refund/sales/list',
        ];

        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();

        return array_merge($externalBlocks, $projectExternalBlocks);
    }

    /**
     * @return int
     */
    public function getOmsProcessWorkerNumber()
    {
        return $this->get(OmsConstants::OMS_PROCESS_WORKER_NUMBER, static::DEFAULT_OMS_PROCESS_WORKER_NUMBER);
    }

    /**
     * @return string
     */
    public function getOrderCancellationAllowedPeriod(): string
    {
        return $this->get(
            SalesConstants::ORDER_CANCELLATION_ALLOWED_PERIOD,
            static::DEFAULT_ORDER_CANCELLATION_ALLOWED_PERIOD
        );
    }

    /**
     * @return int
     */
    public function getOrderExpireHour(): int
    {
        return (int)$this->get(SalesConstants::ORDER_EXPIRE_HOUR);
    }

    /**
     * @return int
     */
    public function getOrderReadyForPickingHour(): int
    {
        return (int)$this->get(SalesConstants::ORDER_READY_FOR_PICKING_HOUR);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\SequenceNumberSettingsTransfer
     */
    public function getOrderReferenceDefaults()
    {
        $sequenceNumberSettingsTransfer = new SequenceNumberSettingsTransfer();

        $sequenceNumberSettingsTransfer->setName(SalesConstants::NAME_ORDER_REFERENCE);
        $sequenceNumberSettingsTransfer->setPadding(static::DEFAULT_ORDER_REFERENCE_PADDING);

        return $sequenceNumberSettingsTransfer;
    }

    /**
     * @param string $state
     *
     * @return string
     */
    public function getOrderStateByStateMap(string $state): string
    {
        if (isset(static::ORDER_STATE_MAP[$state])) {
            return static::ORDER_STATE_MAP[$state];
        }

        return OmsConfig::STATE_IN_PROCESSING;
    }

    /**
     * @return array
     */
    public function getSapStoreIdToStoreMap(): array
    {
        return $this->get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
    }
}
