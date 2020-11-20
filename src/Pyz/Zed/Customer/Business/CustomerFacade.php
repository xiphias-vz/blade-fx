<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Business;

use Generated\Shared\Transfer\CustomerAddressRequestTransfer;
use Generated\Shared\Transfer\CustomerAddressResponseTransfer;
use Spryker\Zed\Customer\Business\CustomerFacade as SprykerCustomerFacade;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerBusinessFactory getFactory()
 * @method \Spryker\Zed\Customer\Persistence\CustomerEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class CustomerFacade extends SprykerCustomerFacade implements CustomerFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\CustomerAddressRequestTransfer $customerAddressRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAddressResponseTransfer
     */
    public function isPostalCodeWhiteListed(CustomerAddressRequestTransfer $customerAddressRequestTransfer): CustomerAddressResponseTransfer
    {
        return $this->getRepository()->isPostalCodeWhiteListed($customerAddressRequestTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $customerReference
     *
     * @return void
     */
    public function setCustomerHasOrderByCustomerReference(string $customerReference): void
    {
        $this->getFactory()->createCustomerWriter()->setCustomerHasOrderByCustomerReference($customerReference);
    }
}
