<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Payment;

use Pyz\Client\Payment\PaymentMethodsReader\PaymentMethodsReader;
use Pyz\Client\Payment\PaymentMethodsReader\PaymentMethodsReaderInterface;
use Spryker\Client\Kernel\AbstractFactory;

/**
 * @method \Pyz\Client\Payment\PaymentConfig getConfig()
 */
class PaymentFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\Payment\PaymentMethodsReader\PaymentMethodsReaderInterface
     */
    public function createPaymentMethodsReader(): PaymentMethodsReaderInterface
    {
        return new PaymentMethodsReader($this->getConfig());
    }
}
