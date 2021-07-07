<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Customer;

use Spryker\Shared\Customer\CustomerConfig as SpryCustomerConfig;

class CustomerConfig extends SpryCustomerConfig
{
    public const PARAM_TOKEN = 'token';
    public const PARAM_CONTINUE_CHECKOUT = 'continueCheckout';
}
