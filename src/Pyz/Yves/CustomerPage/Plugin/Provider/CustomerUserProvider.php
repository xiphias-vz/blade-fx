<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider as SprykerCustomerUserProvider;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

/**
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CustomerUserProvider extends SprykerCustomerUserProvider
{
    public const ERROR_NOT_VERIFIED_CUSTOMER = 'ERROR_NOT_VERIFIED_CUSTOMER';
    private const API_KEY = '3_IVfYuFFTkEygbMQjcP8LamKwRZBH4_qjl-EAGSvZJPGTAL59E9yUPdTxqLCyofkZ';
    private $shopContextResolver;

    public function __construct(ShopContextResolver $shopContextResolver)
    {
        $this->shopContextResolver = $shopContextResolver;
    }

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
        $pass = null;
        if (!empty($_POST["loginForm"]["data"])) {
            $data = JSON::parse($_POST["loginForm"]["data"]);
            $pass = $_POST["loginForm"]["password"];
        }

        try {
            $customerTransfer = parent::loadCustomerByEmail($email);
            if (!empty($data)) {
                if ($data["src"] == "CDC" && $this->isAuthorizedInCdc($email, $pass)) {
                    $user = $this->getFactory()->createSecurityUser($customerTransfer);
                    $encoder = $this->getContainer()->get('security.encoder_factory');
                    $encodedPass = $encoder->getEncoder($user)->encodePassword($pass, $user->getSalt());
                    if ($customerTransfer->getPassword() != $encodedPass) {
                        $customerTransfer->setPassword($encodedPass);
                        $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
                    }
                }
            }
        } catch (AuthenticationException $e) {
            if (!empty($data)) {
                if ($data["src"] == "CDC" && $this->isAuthorizedInCdc($email, $pass)) {
                    $customerTransfer = new CustomerTransfer();
                    $customerTransfer->setEmail($data["profile"]["email"]);
                    $customerTransfer->setFirstName($data["profile"]["firstName"]);
                    $customerTransfer->setLastName($data["profile"]["lastName"]);
                    $customerTransfer->setCity($data["profile"]["city"]);
                    $customerTransfer->setZipCode($data["profile"]["zip"]);
                    $customerTransfer->setDateOfBirth($data["profile"]["birthYear"] . '-' . $data["profile"]["birthMonth"] . '-' . $data["profile"]["birthDay"]);
                    $customerTransfer->setUsername($data["profile"]["email"]);
                    $customerTransfer->setPassword($pass);

                    $customerTransfer->setAddress1($data["data"]["address"]["street"]);
                    $customerTransfer->setAddress2($data["profile"]["zip"]);
                    $customerTransfer->setMerchantReference($this->shopContextResolver->resolve()->getMerchantReference());
                    $customerTransfer->setCustomerReference($this->getFactory()->getStore()->getStoreName());
                    $customerTransfer->setThirdPartyRegistration(true);
                    $this->registerCustomer($customerTransfer);

                    $customerTransfer = parent::loadCustomerByEmail($email);
                    $customerTransfer->setRegistered(date('yy-m-d'));
                    $customerTransfer->setRegistrationKey(null);
                    $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
                }
            }
        }

        if ($customerTransfer->getRegistrationKey() !== null) {
            throw new AuthenticationException(self::ERROR_NOT_VERIFIED_CUSTOMER);
        }

        return $customerTransfer;
    }

    protected function isAuthorizedInCdc($username, $pass): bool
    {
        $url = "https://accounts.eu1.gigya.com/accounts.login?apiKey=" . self::API_KEY;
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
        $result = JSON::parse($result);

        if ($result["errorCode"] == 0) {
            return true;
        } else {
            return false;
        }
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
