<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPageCZ\Plugin\Provider;

use ArrayObject;
use Generated\Shared\Transfer\CustomerResponseTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\GsoaRestApiClient\Provider\CustomerProfileProvider;
use Pyz\Yves\CustomerPage\Controller\ProfileController;
use Pyz\Yves\CustomerPage\Plugin\Provider\CustomerUserProviderInterface;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider as SprykerCustomerUserProvider;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CustomerUserProvider extends SprykerCustomerUserProvider implements CustomerUserProviderInterface
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
        $api = new CustomerProfileProvider();
        $pass = $_POST["loginForm"]["password"];
        $authCheck = $api->getCustomerLoginToken($email, $pass);
        $customerTransfer = null;

        if (!str_starts_with($authCheck, "ERROR:")) {
            $customerApiData = $api->getCurrentCustomerData($authCheck);
            try {
                $customerTransfer = parent::loadCustomerByEmail($api->getEmailFromProfile($customerApiData));
                $customerTransfer = $api->fromProfileEvent($customerApiData, $customerTransfer);
                if (empty($customerTransfer->getCity())) {
                    $customerTransfer = $this->populateCustomerAddress($customerTransfer);
                }
                $user = $this->getFactory()->createSecurityUser($customerTransfer);
                $encoder = $this->getContainer()->get('security.encoder_factory');
                $encodedPass = $encoder->getEncoder($user)->encodePassword($pass, $user->getSalt());
                if ($customerTransfer->getPassword() != $encodedPass) {
                    $customerTransfer->setPassword($encodedPass);
                }

                $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
                $profile = new ProfileController();
                $profile->processProfileUpdateByTransfer($customerTransfer, false);
            } catch (AuthenticationException $e) {
                $customerTransfer = $api->fromProfileEvent($customerApiData);
                $customerTransfer->setUsername($email);
                $customerTransfer->setPassword($pass);
                $customerTransfer->setCustomerReference($this->getFactory()->getStore()->getStoreName());
                $this->registerCustomer($customerTransfer);

                $customerTransfer = parent::loadCustomerByEmail($customerTransfer->getEmail());
                $customerTransfer->setRegistered(date('yy-m-d'));
                $customerTransfer->setRegistrationKey(null);
                $customerTransfer->setThirdPartyRegistration(true);
                $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
            }
        } else {
            throw new AuthenticationException(self::ERROR_NOT_VERIFIED_CUSTOMER);
        }

        return $customerTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    private function populateCustomerAddress(CustomerTransfer $customerTransfer): CustomerTransfer
    {
        $addresses = $this->getFactory()->getCustomerClient()->getAddresses($customerTransfer);
        foreach ($addresses->getAddresses() as $address) {
            if ($address->getIdCustomerAddress() == $customerTransfer->getDefaultBillingAddress()) {
                $customerTransfer->setBillingAddress(new ArrayObject([$address]));
                $customerTransfer
                    ->setCity($address->getCity())
                    ->setAddress1($address->getAddress1())
                    ->setAddress2($address->getAddress2())
                    ->setZipCode($address->getZipCode());
            }
            if ($address->getIdCustomerAddress() == $customerTransfer->getDefaultShippingAddress()) {
                $customerTransfer->setShippingAddress(new ArrayObject([$address]));
            }
        }

        return $customerTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerResponseTransfer
     */
    protected function registerCustomer(CustomerTransfer $customerTransfer): CustomerResponseTransfer
    {
        return $this
            ->getFactory()
            ->getAuthenticationHandler()
            ->registerCustomer($customerTransfer);
    }

    /**
     * @return string
     */
    public function getCdcApiKey(): string
    {
        return "";
    }

    /**
     * @return string
     */
    public function getCdcSecretKey(): string
    {
        return "";
    }

    /**
     * @return string
     */
    public function getCdcUserKey(): string
    {
        return "";
    }

    /**
     * @return string
     */
    public function getCdcUrlPrefix(): string
    {
        return "";
    }

    /**
     * @return string
     */
    public function getCaptchaSecretKey(): string
    {
        return "";
    }

    /**
     * @param string $emailOrCardNumber
     *
     * @return string
     */
    public function checkEmailOrCardAvailability(string $emailOrCardNumber): string
    {
        return "";
    }

    /**
     * @param string $emailOrCardNumber
     * @param string $password
     *
     * @return string
     */
    public function globusLogin(string $emailOrCardNumber, string $password): string
    {
        return "";
    }
}
