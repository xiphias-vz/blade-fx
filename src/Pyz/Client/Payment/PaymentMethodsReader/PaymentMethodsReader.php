<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Payment\PaymentMethodsReader;

use Generated\Shared\Transfer\PaymentMethodsTransfer;
use Generated\Shared\Transfer\PaymentMethodTransfer;
use Pyz\Client\Payment\PaymentConfig;

class PaymentMethodsReader implements PaymentMethodsReaderInterface
{
    /**
     * @var \Pyz\Client\Payment\PaymentConfig
     */
    protected $config;

    /**
     * @param \Pyz\Client\Payment\PaymentConfig $config
     */
    public function __construct(PaymentConfig $config)
    {
        $this->config = $config;
    }

    /**
     * @return \Generated\Shared\Transfer\PaymentMethodsTransfer
     */
    public function getPaymentMethods(): PaymentMethodsTransfer
    {
        $paymentMethodNames = array_keys($this->config->getPaymentStatemachineMappings());
        $paymentMethodsTransfer = new PaymentMethodsTransfer();

        foreach ($paymentMethodNames as $paymentMethodName) {
            $paymentMethodsTransfer->addMethod((new PaymentMethodTransfer())->setMethodName($paymentMethodName));
        }

        return $paymentMethodsTransfer;
    }
}
