<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPageCZ;

use Pyz\Yves\CustomerPage\CustomerPageFactory as LocalCustomerPageFactory;
use Pyz\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 */
class CustomerPageFactory extends LocalCustomerPageFactory
{
    /**
     * @return \Pyz\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider
     */
    public function createCustomerUserProvider(): CustomerUserProvider
    {
        return new CustomerUserProvider();
    }
}
