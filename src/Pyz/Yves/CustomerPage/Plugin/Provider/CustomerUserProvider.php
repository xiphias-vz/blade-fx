<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Spryker\Shared\Config\Config;
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
        $pass = $_POST["loginForm"]["password"];
        $data = $this->getCdcAuthorization($email, $pass);
        $customerTransfer = null;

        if ($data["errorCode"] == 0) {
            try {
                $customerTransfer = parent::loadCustomerByEmail($email);
                $user = $this->getFactory()->createSecurityUser($customerTransfer);
                $encoder = $this->getContainer()->get('security.encoder_factory');
                $encodedPass = $encoder->getEncoder($user)->encodePassword($pass, $user->getSalt());
                if ($customerTransfer->getPassword() != $encodedPass) {
                    $customerTransfer->setPassword($encodedPass);
                    $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
                }
            } catch (AuthenticationException $e) {
                $customerTransfer = new CustomerTransfer();
                $customerTransfer->setEmail($data["profile"]["email"]);
                $customerTransfer->setFirstName($data["profile"]["firstName"]);
                $customerTransfer->setLastName($data["profile"]["lastName"]);
                $customerTransfer->setCity($data["profile"]["city"]);
                $customerTransfer->setZipCode($data["profile"]["zip"]);
                $customerTransfer->setBirthDay($data["profile"]["birthDay"]);
                $customerTransfer->setBirthMonth($data["profile"]["birthMonth"]);
                $customerTransfer->setBirthYear($data["profile"]["birthYear"]);
                $customerTransfer->setDateOfBirth($data["profile"]["birthYear"] . '-' . $data["profile"]["birthMonth"] . '-' . $data["profile"]["birthDay"]);
                $customerTransfer->setUsername($data["profile"]["email"]);
                $customerTransfer->setPassword($pass);
                $customerTransfer->setCustomerReference($this->getFactory()->getStore()->getStoreName());
                $this->registerCustomer($customerTransfer);

                $customerTransfer = parent::loadCustomerByEmail($email);
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
     * @param string $username
     * @param string $pass
     *
     * @return array
     */
    protected function getCdcAuthorization($username, $pass): array
    {
        $apiKey = Config::get(CustomerConstants::CDC_API_KEY);
        $apiSecretKey = Config::get(CustomerConstants::CDC_API_SECRET_KEY);
        $urlPrefix = Config::get(CustomerConstants::CDC_API_URL);
        $url = array_shift($urlPrefix) . "accounts.login?apiKey=" . array_shift($apiKey) . "&sec=" . array_shift($apiSecretKey);
        $data = ['loginID' => $username, 'password' => $pass];
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        return JSON::parse($result);
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
