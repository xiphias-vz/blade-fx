<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Customer;

use Generated\Shared\Transfer\CustomerAddressRequestTransfer;
use Generated\Shared\Transfer\CustomerAddressResponseTransfer;
use Spryker\Client\Customer\CustomerClient as SprykerCustomerClient;

/**
 * @method \Pyz\Client\Customer\CustomerFactory getFactory()
 */
class CustomerClient extends SprykerCustomerClient implements CustomerClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\CustomerAddressRequestTransfer $customerAddressRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAddressResponseTransfer
     */
    public function isPostalCodeWhiteListed(CustomerAddressRequestTransfer $customerAddressRequestTransfer): CustomerAddressResponseTransfer
    {
        return $this->getFactory()
            ->createZedCustomerStub()
            ->isPostalCodeWhiteListed($customerAddressRequestTransfer);
    }
}
