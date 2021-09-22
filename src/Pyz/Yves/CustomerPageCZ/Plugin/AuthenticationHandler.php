<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPageCZ\Plugin;

use Generated\Shared\Transfer\CustomerResponseTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
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
//        $customerTransfer->setEmail($_REQUEST['registerForm_customer_email']);
//        $customerTransfer->setPassword($_REQUEST['registerForm_customer_password_pass']);
//        $decodeAdress = json_decode($validAddress);
//        $isAddresAuthorized = false;
//        $isRegistrationAuthorized = false;
//        if ($decodeAdress->code == 'VA') {
//            $isAddresAuthorized = true;
//        }

        $customerResponseTransfer = new CustomerResponseTransfer();
        $customerTransfer->setMerchantReference($this->createShopContextResolver()->resolve()->getMerchantReference());
        //$isAuthorized = $this->getCdcAuthorization($customerTransfer->getEmail(), $customerTransfer->getPassword());
        //$customerResponseTransfer->setIsSuccess($isAddresAuthorized);

        //if (!$isAddresAuthorized) {
            //$isRegistrationAuthorized = $this->registerCdcUser($customerTransfer);
        //}
        $customerResponseTransfer->setIsSuccess(true);
        //if ($isRegistrationAuthorized) {
        $customerResponseTransfer = parent::registerCustomer($customerTransfer);
        //}

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

    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver
     */
    public function createShopContextResolver(): ShopContextResolver
    {
        return new ShopContextResolver($this->getApplication());
    }
}
