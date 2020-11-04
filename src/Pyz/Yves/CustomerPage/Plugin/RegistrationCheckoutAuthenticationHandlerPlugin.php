<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin;

use Generated\Shared\Transfer\CustomerResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Customer\Code\Messages;
use SprykerShop\Yves\CustomerPage\Plugin\RegistrationCheckoutAuthenticationHandlerPlugin as SprykerRegistrationCheckoutAuthenticationHandlerPlugin;

/**
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class RegistrationCheckoutAuthenticationHandlerPlugin extends SprykerRegistrationCheckoutAuthenticationHandlerPlugin
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function addToQuote(QuoteTransfer $quoteTransfer)
    {
        $customerResponseTransfer = $this->getFactory()
            ->getAuthenticationHandler()
            ->registerCustomer($quoteTransfer->getCustomer());

        $this->processErrorMessages($customerResponseTransfer);

        $quoteTransfer->setCustomer(null);

        return $quoteTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerResponseTransfer $customerResponseTransfer
     *
     * @return void
     */
    protected function processErrorMessages(CustomerResponseTransfer $customerResponseTransfer)
    {
        foreach ($customerResponseTransfer->getErrors() as $errorTransfer) {
            if ($errorTransfer->getMessage() === Messages::CUSTOMER_EMAIL_ALREADY_USED) {
                continue;
            }

            $this->getMessenger()->addErrorMessage($errorTransfer->getMessage());
        }
    }
}
