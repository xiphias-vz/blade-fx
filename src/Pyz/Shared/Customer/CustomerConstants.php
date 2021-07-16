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
    public const GLOBUS_API_URL = 'globusApiUrlNoScreen';
    public const GLOBUS_API_KEY = 'globusApiKeyNoScreen';
    public const GLOBUS_API_SECRET_KEY = 'globusApiSecretKeyNoScreen';
    public const GLOBUS_API_ENDPOINT = 'globus_api_endpoint';
    public const GLOBUS_API_END_POINT_ADDRESS_VALIDATION = 'globusApiEndPointAddressValidation';
    public const GLOBUS_API_END_POINT_NEXT_CARD_NUMBER = 'globusApiEndPointNextCardNumber';
    public const GLOBUS_API_END_POINT_ACCOUNT_AVAILABLE = 'globusApiEndPointAccountAvailable';
    public const GLOBUS_API_END_POINT_ACCOUNT_LOGIN = 'globusApiEndPointAccountLogin';
    public const GLOBUS_API_END_POINT_ACCOUNT_LOGOUT = 'globusApiEndPointAccountLogout';
    public const GLOBUS_API_END_POINT_ACCOUNT_PASSWORD_RESET = 'globusApiEndPointAccountPasswordReset';
    public const GLOBUS_API_END_POINT_ACCOUNT_REGISTRATION_FULL = 'globusApiEndPointAccountRegistrationFull';
    public const GLOBUS_API_END_POINT_ACCOUNT_PAYBACK_INFO = 'globusApiEndPointAccountPaybackInfo';

    public const GOOGLE_CAPTCHA_CONSTANTS = 'GOOGLE_CAPTCHA_CONSTANTS';
    public const GOOGLE_CAPTCHA_CREDENTIALS = 'google_captcha_credentials';
    public const GOOGLE_CAPTCHA_KEY = 'google_captcha_site_key';
    public const GOOGLE_CAPTCHA_SECRET = 'google_captcha_secret';
}
