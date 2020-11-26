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
}
