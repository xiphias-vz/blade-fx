<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Payment;

use Spryker\Client\Kernel\AbstractBundleConfig;
use Spryker\Shared\Payment\PaymentConstants;

class PaymentConfig extends AbstractBundleConfig
{
    /**
     * @return array
     */
    public function getPaymentStatemachineMappings(): array
    {
        return $this->get(PaymentConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING);
    }
}
