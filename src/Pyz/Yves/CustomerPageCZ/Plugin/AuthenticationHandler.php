<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPageCZ\Plugin;

use Generated\Shared\Transfer\CustomerResponseTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use SprykerShop\Yves\CustomerPage\Plugin\AuthenticationHandler as SprykerAuthenticationHandler;

/**
 * @method \Pyz\Yves\CustomerPageCZ\CustomerPageFactory getFactory()
 */
class AuthenticationHandler extends SprykerAuthenticationHandler
{
    public const CUSTOMER_REGISTRATION_VALIDATION_REQUIRED = 'customer.registration.validation_required';

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerResponseTransfer
     */
    public function registerCustomer(CustomerTransfer $customerTransfer)
    {
        $customerResponseTransfer = new CustomerResponseTransfer();
        $customerTransfer->setMerchantReference($this->getFactory()->createShopContextResolver()->resolve()->getMerchantReference());
        $customerResponseTransfer->setIsSuccess(true);
        $customerResponseTransfer = parent::registerCustomer($customerTransfer);

        $this->getFactory()
            ->getMessenger()
            ->addSuccessMessage(self::CUSTOMER_REGISTRATION_VALIDATION_REQUIRED);

        return $customerResponseTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return void
     */
    protected function loginAfterSuccessfulRegistration(CustomerTransfer $customerTransfer)
    {
        $token = $this->getFactory()->createUsernamePasswordToken($customerTransfer);

        $this->getFactory()
            ->createCustomerAuthenticator()
            ->authenticateCustomer($customerTransfer, $token);
    }
}
