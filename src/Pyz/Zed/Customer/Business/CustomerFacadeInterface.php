<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Business;

use Generated\Shared\Transfer\CustomerAddressRequestTransfer;
use Generated\Shared\Transfer\CustomerAddressResponseTransfer;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface as SprykerCustomerFacadeInterface;

interface CustomerFacadeInterface extends SprykerCustomerFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\CustomerAddressRequestTransfer $customerAddressRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAddressResponseTransfer
     */
    public function isPostalCodeWhiteListed(CustomerAddressRequestTransfer $customerAddressRequestTransfer): CustomerAddressResponseTransfer;

    /**
     * Specification:
     * - Finds customer by customer reference.
     * - Sets `hasOrders` flag for the found customer to true.
     *
     * @api
     *
     * @param string $customerReference
     *
     * @return void
     */
    public function setCustomerHasOrderByCustomerReference(string $customerReference): void;
}
