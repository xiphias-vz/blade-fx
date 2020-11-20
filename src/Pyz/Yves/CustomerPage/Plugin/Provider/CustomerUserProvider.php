<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider as SprykerCustomerUserProvider;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

/**
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CustomerUserProvider extends SprykerCustomerUserProvider
{
    public const ERROR_NOT_VERIFIED_CUSTOMER = 'ERROR_NOT_VERIFIED_CUSTOMER';

    /**
     * @param string $email
     *
     * @throws \Symfony\Component\Security\Core\Exception\AuthenticationException
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    protected function loadCustomerByEmail($email)
    {
        $data = null;
        if(!empty($_REQUEST["loginForm"]["data"])){
            $data = JSON::parse($_REQUEST["loginForm"]["data"]);
        }

        try {
            $customerTransfer = parent::loadCustomerByEmail($email);
            if(!empty($data)) {
                if($data["src"] == "CDC") {
                    $customerTransfer->setPassword($_REQUEST["loginForm"]["password"]);
                    $customerTransfer->setNewPassword($_REQUEST["loginForm"]["password"]);
                    $this->getFactory()->getCustomerClient()->updateCustomerPassword($customerTransfer);
                    $customerTransfer = parent::loadCustomerByEmail($email);
                }
            }
        } catch (AuthenticationException $e) {
            if(!empty($data)) {
                $customerTransfer = new CustomerTransfer();
                $customerTransfer->setEmail($data["profile"]["email"]);
                $customerTransfer->setFirstName($data["profile"]["firstName"]);
                $customerTransfer->setLastName($data["profile"]["lastName"]);
                $customerTransfer->setCity($data["profile"]["city"]);
                $customerTransfer->setZipCode($data["profile"]["zip"]);
                $customerTransfer->setDateOfBirth($data["profile"]["birthYear"] . '-' . $data["profile"]["birthMonth"] . '-' . $data["profile"]["birthDay"]);
                //$customerTransfer->setGender('0');
                $customerTransfer->setUsername($data["profile"]["email"]);
                $customerTransfer->setPassword($_REQUEST["loginForm"]["password"]);

                $customerTransfer->setSalutation('Mr');
                $customerTransfer->setAddress1($data["data"]["address"]["street"]);
                $customerTransfer->setAddress2($data["profile"]["zip"]);
                $customerTransfer->setMerchantReference($_COOKIE["merchant_switcher_selector-merchant_reference"]);
                $customerTransfer->setCustomerReference($_COOKIE["current_store"]);
                $customerTransfer->setThirdPartyRegistration(1);

                $this->registerCustomer($customerTransfer);
                /*
                 phone_prefix_1 = "+49"
                 mobile_phone = "24343243"
                 phone_prefix_2 = "+49"
                 phone = "24343243"
                 accept_terms = true
                 recieve_notifications = true
                */
                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer->setRegistered(date('yy-m-d'));
                $customerTransfer->setRegistrationKey(null);
                $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
            }
        }

        if ($customerTransfer->getRegistrationKey() !== null) {
            throw new AuthenticationException(self::ERROR_NOT_VERIFIED_CUSTOMER);
        }

        return $customerTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerResponseTransfer
     */
    protected function registerCustomer(CustomerTransfer $customerTransfer)
    {
        return $this
            ->getFactory()
            ->getAuthenticationHandler()
            ->registerCustomer($customerTransfer);
    }
}
