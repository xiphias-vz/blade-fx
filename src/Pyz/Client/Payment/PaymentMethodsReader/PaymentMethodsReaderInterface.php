<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Payment\PaymentMethodsReader;

use Generated\Shared\Transfer\PaymentMethodsTransfer;

interface PaymentMethodsReaderInterface
{
    /**
     * @return \Generated\Shared\Transfer\PaymentMethodsTransfer
     */
    public function getPaymentMethods(): PaymentMethodsTransfer;
}
