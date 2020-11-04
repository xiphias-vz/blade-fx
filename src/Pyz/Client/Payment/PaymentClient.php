<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Payment;

use Generated\Shared\Transfer\PaymentMethodsTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\Payment\PaymentClient as SprykerPaymentClient;

/**
 * @method \Pyz\Client\Payment\PaymentFactory getFactory()
 */
class PaymentClient extends SprykerPaymentClient implements PaymentClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\PaymentMethodsTransfer
     */
    public function getAvailableMethods(QuoteTransfer $quoteTransfer): PaymentMethodsTransfer
    {
        return $this->getFactory()->createPaymentMethodsReader()->getPaymentMethods();
    }
}
