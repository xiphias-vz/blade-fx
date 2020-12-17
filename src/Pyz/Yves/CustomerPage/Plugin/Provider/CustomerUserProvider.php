<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Controller\ProfileController;
use Pyz\Yves\CustomerPage\Plugin\Application\CustomerTransferCustom;
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
        $authCheck = $this->getCdcAuthorization($email, $pass);
        $customerTransfer = null;

        if ($authCheck["errorCode"] == 0) {
            $data = $_POST["loginForm"]["data"];
            $customerTransferCustom = new CustomerTransferCustom();
            try {
                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer = $customerTransferCustom->fromProfileEvent($data, $customerTransfer);
                $user = $this->getFactory()->createSecurityUser($customerTransfer);
                $encoder = $this->getContainer()->get('security.encoder_factory');
                $encodedPass = $encoder->getEncoder($user)->encodePassword($pass, $user->getSalt());
                if ($customerTransfer->getPassword() != $encodedPass) {
                    $customerTransfer->setPassword($encodedPass);
                    $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
                }
                $profile = new ProfileController();
                $profile->processProfileUpdateByTransfer($customerTransfer, false);
            } catch (AuthenticationException $e) {
                $customerTransfer = $customerTransferCustom->fromProfileEvent($data);
                $customerTransfer->setUsername($email);
                $customerTransfer->setPassword($pass);
                $customerTransfer->setCustomerReference($this->getFactory()->getStore()->getStoreName());
                $this->registerCustomer($customerTransfer);

                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer->setRegistered(date('yy-m-d'));
                $customerTransfer->setRegistrationKey(null);
                $customerTransfer->setThirdPartyRegistration(true);
                $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
            }

            $data = JSON::parse($data);

            if ($data["screen"] === "gigya-register-screen") {
                $this->sendCdcMailForRegistration($data["response"]["UID"]);
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
     * @param string $uid
     *
     * @return array
     */
    protected function sendCdcMailForRegistration($uid): array
    {
        $apiKey = Config::get(CustomerConstants::CDC_API_KEY);
        $apiSecretKey = Config::get(CustomerConstants::CDC_API_SECRET_KEY);
        $apiUserKey = Config::get(CustomerConstants::CDC_API_USER_KEY);
        $urlPrefix = Config::get(CustomerConstants::CDC_API_URL);
        $url = array_shift($urlPrefix) . "accounts.resendVerificationCode?apiKey=" . array_shift($apiKey) . "&secret=" . array_shift($apiSecretKey) . "&userKey=" . $apiUserKey;
        $data = ['UID' => $uid];
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
