<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\DummyPayment;

use Spryker\Shared\DummyPayment\DummyPaymentConfig as BaseDummyPaymentConfig;

interface DummyPaymentConfig extends BaseDummyPaymentConfig
{
    public const PAYMENT_METHOD_LOOP = 'DummyPaymentLoop';
    public const PAYMENT_METHOD_NAME_LOOP = 'loop';
}
