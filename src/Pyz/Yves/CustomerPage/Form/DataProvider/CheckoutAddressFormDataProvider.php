<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form\DataProvider;

use Generated\Shared\Transfer\AddressTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\CustomerPage\Form\DataProvider\CheckoutAddressFormDataProvider as SpryCheckoutAddressFormDataProvider;

class CheckoutAddressFormDataProvider extends SpryCheckoutAddressFormDataProvider
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\AddressTransfer
     */
    protected function getBillingAddress(QuoteTransfer $quoteTransfer): AddressTransfer
    {
        $addressTransfer = new AddressTransfer();
        if ($this->customerTransfer !== null) {
            $addressTransfer->setIdCustomerAddress($this->customerTransfer->getDefaultBillingAddress());
        }

        return $addressTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    protected function isBillingAddressInQuote(QuoteTransfer $quoteTransfer): bool
    {
        $billingAddressTransfer = $quoteTransfer->getBillingAddress();

        if ($billingAddressTransfer === null) {
            return false;
        } elseif ($billingAddressTransfer->getFirstName() === null) {
            return false;
        }

        return $billingAddressTransfer->getIdCustomerAddress() !== null
            || $billingAddressTransfer->getIdCompanyUnitAddress() !== null
            || !(empty(trim($billingAddressTransfer->getFirstName())) && empty($billingAddressTransfer->getLastName()));
    }
}
