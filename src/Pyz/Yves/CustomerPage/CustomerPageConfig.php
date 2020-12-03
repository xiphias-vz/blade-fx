<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage;

use Pyz\Shared\Customer\CustomerConstants;
use SprykerShop\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
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
        $url = $this->get(CustomerConstants::CDC_API_URL);
        $apiKey = $this->get(CustomerConstants::CDC_API_KEY);

        return $url["cdcScreensUrl"] . '?apikey=' . array_shift($apiKey);
    }
}
