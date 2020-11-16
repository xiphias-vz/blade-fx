<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business\Payment;

use Generated\Shared\Transfer\CaptureResponseTransfer;
use Generated\Shared\Transfer\PayonePartialOperationRequestTransfer;
use SprykerEco\Zed\Payone\Business\Payment\PaymentManagerInterface as SprykerEcoPaymentManagerInterface;

interface PaymentManagerInterface extends SprykerEcoPaymentManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CaptureResponseTransfer
     */
    public function executePartialCapture(
        PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
    ): CaptureResponseTransfer;
}
