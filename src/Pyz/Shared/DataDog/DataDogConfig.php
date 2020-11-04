<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\DataDog;

use Spryker\Shared\Kernel\KernelConfig as SprykerKernelConfig;

class DataDogConfig extends SprykerKernelConfig
{
    public const DATA_DOG_REGISTRATION_SUCCESS_STAT = 'spryker.registration_success';
    public const DATA_DOG_REGISTRATION_ERROR_STAT = 'spryker.registration_error';

    public const DATA_DOG_USER_AUTH_STAT = 'spryker.active_user';
    public const DATA_DOG_USER_AUTH_LOGIN_SUCCESS_STAT = 'spryker.login_success';
    public const DATA_DOG_USER_AUTH_LOGIN_ERROR_STAT = 'spryker.login_error';

    public const DATA_DOG_SEARCH_STAT = 'spryker.search_count';

    public const DATA_DOG_CHECKOUT_SUCCESS_STAT = 'spryker.checkout_success';
    public const DATA_DOG_CHECKOUT_SUCCESS_REVENUE_STAT = 'spryker.revenue';
    public const DATA_DOG_CHECKOUT_ERROR_STAT = 'spryker.checkout_error';

    public const DATA_DOG_DELIVERY_PICK_UP_STAT = 'spryker.pickup_count';
    public const DATA_DOG_DELIVERY_STAT = 'spryker.delivery_count';

    public const DATA_DOG_REGION_SCOPE = 'spryker.region';
    public const DATA_DOG_PAYMENT_OPTION_SCOPE = 'spryker.paymentOption';
    public const DATA_DOG_MARKET_SCOPE = 'spryker.market';
    public const DATA_DOG_BUCKET_SCOPE = 'spryker.bucket';

    public const DATA_DOG_EMAIL_FAILED = 'spryker.email_failed';
    public const DATA_DOG_EMAIL_FAIL_CODE = 'spryker.email_failed_code';
}
