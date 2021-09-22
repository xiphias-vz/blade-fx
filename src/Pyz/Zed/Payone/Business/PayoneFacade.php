<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business;

use Generated\Shared\Transfer\CaptureResponseTransfer;
use Generated\Shared\Transfer\PayoneCaptureTransfer;
use Generated\Shared\Transfer\PayonePartialOperationRequestTransfer;
use Generated\Shared\Transfer\RefundResponseTransfer;
use SprykerEco\Zed\Payone\Business\PayoneFacade as SprykerEcoPayoneFacade;

/**
 * @method \Pyz\Zed\Payone\Business\PayoneBusinessFactory getFactory()
 */
class PayoneFacade extends SprykerEcoPayoneFacade implements PayoneFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CaptureResponseTransfer
     */
    public function executePartialCapture(
        PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
    ): CaptureResponseTransfer {
        return $this->getFactory()
            ->createPaymentManager($payonePartialOperationRequestTransfer->getOrder()->getStore())
            ->executePartialCapture($payonePartialOperationRequestTransfer);
    }

    /**
     * (@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PayoneCaptureTransfer $captureTransfer
     *
     * @return \Generated\Shared\Transfer\CaptureResponseTransfer
     */
    public function capturePayment(PayoneCaptureTransfer $captureTransfer): CaptureResponseTransfer
    {
        return $this->getFactory()
            ->createPaymentManager($captureTransfer->getOrder()->getStore())
            ->capturePayment($captureTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\RefundResponseTransfer
     */
    public function executePartialRefund(PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer): RefundResponseTransfer
    {
        return $this->getFactory()
            ->createPaymentManager($payonePartialOperationRequestTransfer->getOrder()->getStore())
            ->executePartialRefund($payonePartialOperationRequestTransfer);
    }
}
