<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep as SprykerAddressStep;
use Symfony\Component\HttpFoundation\Request;

class AddressStep extends SprykerAddressStep
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        $data = parent::getTemplateVariables($quoteTransfer);

        $data['isBillingSameAsShippingChecked'] = $quoteTransfer->getBillingSameAsShipping();

        return $data;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        if (!$this->executeCheckoutAddressStepEnterPreCheckPlugins($quoteTransfer)) {
            return $quoteTransfer;
        }
        $quoteTransfer = $this->stepExecutor->execute($request, $quoteTransfer);
        $phone = $_POST["addressesForm"]["shippingAddress"]["phone"];
        $cellPhone = $_POST["addressesForm"]["shippingAddress"]["cell_phone"];

        if ($quoteTransfer->getCustomer() != null && $quoteTransfer->getCustomer()->getIsGuest()) {
            $billingAddress = $quoteTransfer->getBillingAddress();
            $newCustomer = $quoteTransfer->getCustomer();
            $newCustomer->setSalutation($billingAddress->getSalutation());
            $newCustomer->setFirstName($billingAddress->getFirstName());
            $newCustomer->setLastName($billingAddress->getLastName());
            $newCustomer->setZipCode($billingAddress->getZipCode());
            $newCustomer->setCity($billingAddress->getCity());
            $newCustomer->setPhone($phone);
            $newCustomer->setMobilePhoneNumber($cellPhone);
            $billingAddress->setPhone($phone);
            $billingAddress->setCellPhone($cellPhone);
            $quoteTransfer->setBillingAddress($billingAddress);

            $quoteTransfer->setCustomer($newCustomer);
        } else {
            $customer = $quoteTransfer->getCustomer();
            $customer->setPhone($phone);
            $customer->setMobilePhoneNumber($cellPhone);
            $billingAddress = $quoteTransfer->getBillingAddress();
            $billingAddress->setPhone($phone);
            $billingAddress->setCellPhone($cellPhone);
            $quoteTransfer->setBillingAddress($billingAddress);
            $quoteTransfer->setCustomer($customer);
        }

        return $this->calculationClient->recalculate($quoteTransfer);
    }
}
