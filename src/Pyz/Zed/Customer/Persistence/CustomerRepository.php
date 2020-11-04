<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Persistence;

use Generated\Shared\Transfer\CustomerAddressRequestTransfer;
use Generated\Shared\Transfer\CustomerAddressResponseTransfer;
use Spryker\Zed\Customer\Persistence\CustomerRepository as SprykerCustomerRepository;

/**
 * @method \Pyz\Zed\Customer\Persistence\CustomerPersistenceFactory getFactory()
 */
class CustomerRepository extends SprykerCustomerRepository implements CustomerRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\CustomerAddressRequestTransfer $customerAddressRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAddressResponseTransfer
     */
    public function isPostalCodeWhiteListed(CustomerAddressRequestTransfer $customerAddressRequestTransfer): CustomerAddressResponseTransfer
    {
        $postalCodeQuery = $this->getFactory()
            ->createPostalCodeQuery()
            ->filterByPostalCode($customerAddressRequestTransfer->getPostalCode());

        return (new CustomerAddressResponseTransfer())
            ->setIsSuccess($postalCodeQuery->count());
    }
}
