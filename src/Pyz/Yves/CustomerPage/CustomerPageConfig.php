<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage;

use Pyz\Shared\Customer\CustomerConstants;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    public const CDC_LANGUAGE = '&lang=de';
    /**
     * @return string
     */
    public function getCustomerProfileUrl(): string
    {
        return $this->get(CustomerConstants::CUSTOMER_PROFILE_URL);
    }

    /**
     * @return string
     */
    public function getCDCApiUrl(): string
    {
        $url = $this->getCdcUrlPrefix();
        $apiKey = $this->getCdcApiKey();

        return $url . '?apikey=' . $apiKey . self::CDC_LANGUAGE;
    }

    /**
     * @return string
     */
    protected function getCdcUrlPrefix(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $urlPrefix = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_SCREENS_URL])) {
            $urlPrefix = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_SCREENS_URL];
        }

        return $urlPrefix;
    }

    /**
     * @return string
     */
    protected function getCdcApiKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_KEY])) {
            $apiKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_KEY];
        }

        return $apiKey;
    }

    /**
     * @return string
     */
    public function getCaptchaSiteKey(): string
    {
        $captcha_credentials = Config::get(CustomerConstants::GOOGLE_CAPTCHA_CONSTANTS);

        $apiKey = '';
        if (isset($captcha_credentials[CustomerConstants::GOOGLE_CAPTCHA_CREDENTIALS][CustomerConstants::GOOGLE_CAPTCHA_KEY])) {
            $apiKey = $captcha_credentials[CustomerConstants::GOOGLE_CAPTCHA_CREDENTIALS][CustomerConstants::GOOGLE_CAPTCHA_KEY];
        }

        return $apiKey;
    }
}
