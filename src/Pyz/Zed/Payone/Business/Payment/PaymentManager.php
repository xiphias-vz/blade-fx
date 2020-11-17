<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business\Payment;

use Generated\Shared\Transfer\CaptureResponseTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PayoneCaptureTransfer;
use Generated\Shared\Transfer\PayonePartialOperationRequestTransfer;
use Generated\Shared\Transfer\RefundResponseTransfer;
use Pyz\Shared\Payone\PayoneTransactionStatusConstants;
use Spryker\Shared\Shipment\ShipmentConfig;
use SprykerEco\Shared\Payone\PayoneApiConstants;
use SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer;
use SprykerEco\Zed\Payone\Business\Api\Request\Container\Capture\BusinessContainer;
use SprykerEco\Zed\Payone\Business\Api\Response\Container\CaptureResponseContainer;
use SprykerEco\Zed\Payone\Business\Api\Response\Container\RefundResponseContainer;
use SprykerEco\Zed\Payone\Business\Api\Response\Mapper\CaptureResponseMapper;
use SprykerEco\Zed\Payone\Business\Api\Response\Mapper\RefundResponseMapper;
use SprykerEco\Zed\Payone\Business\Payment\PaymentManager as SprykerEcoPaymentManager;

class PaymentManager extends SprykerEcoPaymentManager implements PaymentManagerInterface
{
    protected const PARAMETER_KEY_CAPTURE_MODE = 'capturemode';
    protected const PARAMETER_VALUE_CAPTURE_COMPLETED = 'completed';

    /**
     * @var \Pyz\Zed\Payone\Business\Api\Adapter\Http\Guzzle
     */
    protected $executionAdapter;

    /**
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CaptureResponseTransfer
     */
    public function executePartialCapture(
        PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
    ): CaptureResponseTransfer {
        $paymentEntity = $this->getPaymentEntity($payonePartialOperationRequestTransfer->getOrder()->getIdSalesOrder());
        $paymentMethodMapper = $this->getPaymentMethodMapper($paymentEntity);

        $requestContainer = $paymentMethodMapper->mapPaymentToCapture($paymentEntity);
        $requestContainer = $this->preparePartialCaptureOrderItems($payonePartialOperationRequestTransfer, $requestContainer);
        $captureAmount = $this->calculatePartialCaptureItemsAmount($payonePartialOperationRequestTransfer);

        $captureAmount += $this->getDeliveryCosts($payonePartialOperationRequestTransfer->getOrder());
        $requestContainer = $this->prepareOrderShipment($payonePartialOperationRequestTransfer->getOrder(), $requestContainer);

        $captureAmount += $this->calculateExpensesCost($payonePartialOperationRequestTransfer->getOrder());
        $requestContainer = $this->prepareOrderHandling($payonePartialOperationRequestTransfer->getOrder(), $requestContainer);

        $businessContainer = new BusinessContainer();
        $businessContainer->setSettleAccount(PayoneApiConstants::SETTLE_ACCOUNT_YES);
        $requestContainer->setBusiness($businessContainer);

        $requestContainer->setAmount($captureAmount);
        $this->setStandardParameter($requestContainer);

        $apiLogEntity = $this->initializeApiLog($paymentEntity, $requestContainer);

        $rawResponse = $this->executionAdapter->sendRequest(
            $requestContainer,
            [static::PARAMETER_KEY_CAPTURE_MODE => static::PARAMETER_VALUE_CAPTURE_COMPLETED]
        );
        $responseContainer = new CaptureResponseContainer($rawResponse);

        $this->updateApiLogAfterCapture($apiLogEntity, $responseContainer);
        $this->updatePaymentPayoneOrderItemsWithStatus(
            $payonePartialOperationRequestTransfer,
            $this->getPartialCaptureStatus($responseContainer)
        );

        $responseMapper = new CaptureResponseMapper();

        return $responseMapper->getCaptureResponseTransfer($responseContainer);
    }

    /**
     * @param \Generated\Shared\Transfer\PayoneCaptureTransfer $captureTransfer
     *
     * @return \Generated\Shared\Transfer\CaptureResponseTransfer
     */
    public function capturePayment(PayoneCaptureTransfer $captureTransfer): CaptureResponseTransfer
    {
        $paymentEntity = $this->getPaymentEntity($captureTransfer->getPayment()->getFkSalesOrder());
        $paymentMethodMapper = $this->getPaymentMethodMapper($paymentEntity);

        $requestContainer = $paymentMethodMapper->mapPaymentToCapture($paymentEntity);

        if ($captureTransfer->getAmount()) {
            $requestContainer = $this->prepareOrderItems($captureTransfer->getOrder(), $requestContainer);
            $requestContainer = $this->prepareOrderShipment($captureTransfer->getOrder(), $requestContainer);
            $requestContainer = $this->prepareOrderDiscount($captureTransfer->getOrder(), $requestContainer);
            $requestContainer = $this->prepareOrderHandling($captureTransfer->getOrder(), $requestContainer);
        }

        $businnessContainer = new BusinessContainer();
        $businnessContainer->setSettleAccount(PayoneApiConstants::SETTLE_ACCOUNT_YES);
        $requestContainer->setBusiness($businnessContainer);

        if ($captureTransfer->getAmount() !== null) {
            $requestContainer->setAmount($captureTransfer->getAmount());
        }

        $this->setStandardParameter($requestContainer);

        $apiLogEntity = $this->initializeApiLog($paymentEntity, $requestContainer);

        $rawResponse = $this->executionAdapter->sendRequest(
            $requestContainer,
            [static::PARAMETER_KEY_CAPTURE_MODE => static::PARAMETER_VALUE_CAPTURE_COMPLETED]
        );
        $responseContainer = new CaptureResponseContainer($rawResponse);

        $this->updateApiLogAfterCapture($apiLogEntity, $responseContainer);

        $responseMapper = new CaptureResponseMapper();

        return $responseMapper->getCaptureResponseTransfer($responseContainer);
    }

    /**
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\RefundResponseTransfer
     */
    public function executePartialRefund(PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer): RefundResponseTransfer
    {
        $paymentEntity = $this->getPaymentEntity($payonePartialOperationRequestTransfer->getOrder()->getIdSalesOrder());
        $paymentMethodMapper = $this->getPaymentMethodMapper($paymentEntity);
        $requestContainer = $paymentMethodMapper->mapPaymentToRefund($paymentEntity);

        $requestContainer->setAmount($payonePartialOperationRequestTransfer->getRefund()->getAmount() * -1);
        $requestContainer = $this->preparePartialRefundOrderItems($payonePartialOperationRequestTransfer, $requestContainer);
        $requestContainer = $this->preparePartialRefundExpenses($payonePartialOperationRequestTransfer, $requestContainer);
        $this->setStandardParameter($requestContainer);
        $apiLogEntity = $this->initializeApiLog($paymentEntity, $requestContainer);

        $rawResponse = $this->executionAdapter->sendRequest($requestContainer);
        $responseContainer = new RefundResponseContainer($rawResponse);

        $this->updateApiLogAfterRefund($apiLogEntity, $responseContainer);
        $this->updatePaymentPayoneOrderItemsWithStatus(
            $payonePartialOperationRequestTransfer,
            $this->getPartialRefundStatus($responseContainer)
        );

        $responseMapper = new RefundResponseMapper();

        return $responseMapper->getRefundResponseTransfer($responseContainer);
    }

    /**
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return int
     */
    protected function calculatePartialCaptureItemsAmount(PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer): int
    {
        $itemsAmount = 0;
        foreach ($payonePartialOperationRequestTransfer->getOrder()->getItems() as $itemTransfer) {
            if (in_array($itemTransfer->getIdSalesOrderItem(), $payonePartialOperationRequestTransfer->getSalesOrderItemIds())) {
                $itemsAmount += $itemTransfer->getSumPriceToPayAggregation();
            }
        }

        return $itemsAmount;
    }

    /**
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     * @param \SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer $container
     *
     * @return \SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer
     */
    protected function preparePartialCaptureOrderItems(
        PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer,
        AbstractRequestContainer $container
    ): AbstractRequestContainer {
        $arrayIt = [];
        $arrayId = [];
        $arrayPr = [];
        $arrayNo = [];
        $arrayDe = [];
        $arrayVa = [];

        $key = 1;

        foreach ($payonePartialOperationRequestTransfer->getOrder()->getItems() as $itemTransfer) {
            if (!in_array($itemTransfer->getIdSalesOrderItem(), $payonePartialOperationRequestTransfer->getSalesOrderItemIds())) {
                continue;
            }

            $arrayIt[$key] = PayoneApiConstants::INVOICING_ITEM_TYPE_GOODS;
            $arrayId[$key] = substr($itemTransfer->getSku(), 0, 32);
            $arrayPr[$key] = $itemTransfer->getUnitPriceToPayAggregation();
            $arrayNo[$key] = $itemTransfer->getQuantity();
            $arrayDe[$key] = $itemTransfer->getName();
            $arrayVa[$key] = (int)$itemTransfer->getTaxRate();
            $key++;
        }

        $container->setIt($arrayIt);
        $container->setId($arrayId);
        $container->setPr($arrayPr);
        $container->setNo($arrayNo);
        $container->setDe($arrayDe);
        $container->setVa($arrayVa);

        return $container;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return int
     */
    protected function calculateExpensesCost(OrderTransfer $orderTransfer): int
    {
        $expensesCostAmount = 0;

        foreach ($orderTransfer->getExpenses() as $expense) {
            if ($expense->getType() !== static::SHIPMENT_EXPENSE_TYPE) {
                $expensesCostAmount += $expense->getSumGrossPrice();
            }
        }

        return $expensesCostAmount;
    }

    /**
     * @param \SprykerEco\Zed\Payone\Business\Api\Response\Container\CaptureResponseContainer $responseContainer
     *
     * @return string
     */
    protected function getPartialCaptureStatus(CaptureResponseContainer $responseContainer): string
    {
        if ($responseContainer->getStatus() === PayoneApiConstants::RESPONSE_TYPE_APPROVED) {
            return PayoneTransactionStatusConstants::STATUS_CAPTURE_APPROVED;
        }

        return PayoneTransactionStatusConstants::STATUS_CAPTURE_FAILED;
    }

    /**
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     * @param \SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer $container
     *
     * @return \SprykerEco\Zed\Payone\Business\Api\Request\Container\AbstractRequestContainer
     */
    protected function preparePartialRefundExpenses(
        PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer,
        AbstractRequestContainer $container
    ): AbstractRequestContainer {
        $arrayIt = $container->getIt() ?? [];
        $arrayId = $container->getId() ?? [];
        $arrayPr = $container->getPr() ?? [];
        $arrayNo = $container->getNo() ?? [];
        $arrayDe = $container->getDe() ?? [];
        $arrayVa = $container->getVa() ?? [];

        $key = count($arrayId) + 1;

        foreach ($payonePartialOperationRequestTransfer->getRefund()->getExpenses() as $expenseTransfer) {
            $expenseType = PayoneApiConstants::INVOICING_ITEM_TYPE_HANDLING;
            if ($expenseTransfer->getType() === ShipmentConfig::SHIPMENT_EXPENSE_TYPE) {
                $expenseType = PayoneApiConstants::INVOICING_ITEM_TYPE_SHIPMENT;
            }

            $arrayIt[$key] = $expenseType;
            $arrayId[$key] = $expenseType;
            $arrayPr[$key] = $expenseTransfer->getRefundableAmount();
            $arrayNo[$key] = $expenseTransfer->getQuantity();
            $arrayDe[$key] = $expenseTransfer->getName();
            $arrayVa[$key] = (int)$expenseTransfer->getTaxRate();
            $key++;
        }

        $container->setIt($arrayIt);
        $container->setId($arrayId);
        $container->setPr($arrayPr);
        $container->setNo($arrayNo);
        $container->setDe($arrayDe);
        $container->setVa($arrayVa);

        return $container;
    }
}
