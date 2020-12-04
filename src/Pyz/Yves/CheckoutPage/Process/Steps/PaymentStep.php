<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\DummyPaymentTransfer;
use Generated\Shared\Transfer\PaymentTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\PaymentStep as SprykerPaymentStep;
use Symfony\Component\HttpFoundation\Request;

class PaymentStep extends SprykerPaymentStep
{
    public const DUMMY_INVOICE = "invoice";

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function requireInput(AbstractTransfer $quoteTransfer)
    {
        return false;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\AbstractTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        $payment = PaymentTransfer::DUMMY_PAYMENT;
        $paymentInvoice = PaymentTransfer::DUMMY_PAYMENT_INVOICE;

        $paymentTransferDummyPayment = new PaymentTransfer();
        $paymentTransferDummyPayment->setPaymentSelection($paymentInvoice);
        $paymentTransferDummyPayment->setPaymentProvider($payment);
        $paymentTransferDummyPayment->setPaymentMethod(self::DUMMY_INVOICE);
        $paymentTransferDummyPayment->setDummyPaymentInvoice(new DummyPaymentTransfer());
        $quoteTransfer->setPayment($paymentTransferDummyPayment);

        return parent::execute($request, $quoteTransfer);
    }
}
