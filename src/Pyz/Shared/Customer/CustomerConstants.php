<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Customer;

/**
 * Interface CustomerConstants
 *
 * @package Pyz\Shared\Customer
 */
interface CustomerConstants
{
    public const CUSTOMER_COUNTRY = 'CUSTOMER_COUNTRY_DROPDOWN';
    public const CUSTOMER_PHONE_PREFIX = 'CUSTOMER_PHONE_PREFIX';
    public const CUSTOMER_PROFILE_URL = 'CUSTOMER_PROFILE_URL';
    public const CDC_API_KEY = 'cdcApiKey';
    public const CDC_API_URL = 'cdcApiUrl';
    public const CDC_API_SECRET_KEY = 'cdcApiSecretKey';
    public const CDC_API_USER_KEY = 'cdcApiUserKey';
    public const CDC_SCREENS_URL = 'cdcScreensUrl';
    public const CDC_LOCAL_CREDENTIALS = 'globus_cdc_credentials';
    public const CDC_CONSTANTS = 'CDC_CONSTANTS';

    public const GLOBUS_API_CONSTANTS = 'GLOBUS_API_CONSTANTS';
    public const GLOBUS_API_CREDENTIALS = 'globus_api_credentials';
    public const GLOBUS_API_URL = 'globusApiUrl';
    public const GLOBUS_API_KEY = 'globusApiKey';
    public const GLOBUS_API_SECRET_KEY = 'globusApiSecretKey';

    public const GOOGLE_CAPTCHA_CONSTANTS = 'GOOGLE_CAPTCHA_CONSTANTS';
    public const GOOGLE_CAPTCHA_CREDENTIALS = 'google_captcha_credentials';
    public const GOOGLE_CAPTCHA_KEY = 'google_captcha_site_key';
    public const GOOGLE_CAPTCHA_SECRET = 'google_captcha_secret';
}
