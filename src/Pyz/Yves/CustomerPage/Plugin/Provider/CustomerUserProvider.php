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
        $accountInfo = $this->getCdcAccountInfo($authCheck["UID"]);
        $customerTransfer = null;

        if ($authCheck["errorCode"] == 0) {
            $data = $_POST["loginForm"]["data"];
            $customerTransferCustom = new CustomerTransferCustom();
            try {
                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer = $customerTransferCustom->fromProfileEvent($accountInfo, $customerTransfer);
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
                $customerTransfer = $customerTransferCustom->fromProfileEvent($accountInfo);
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
                $this->setCdcPreferredStore($data["response"]["UID"], $customerTransfer->getMerchantReference());
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
        $apiKey = $this->getCdcApiKey();
        $apiSecretKey = $this->getCdcSecretKey();
        $urlPrefix = $this->getCdcUrlPrefix();
        $url = $urlPrefix . "accounts.login?apiKey=" . $apiKey . "&sec=" . $apiSecretKey;
        $data = ['loginID' => $username, 'password' => $pass, 'include' => 'profile', 'extraProfileFields' => 'firstName,lastName,birthDay,birthMonth,birthYear,zip,city,country,gender,phones,samlData'];
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
    protected function getCdcAccountInfo(string $uid): array
    {
        $apiKey = $this->getCdcApiKey();
        $apiSecretKey = $this->getCdcSecretKey();
        $apiUserKey = $this->getCdcUserKey();
        $urlPrefix = $this->getCdcUrlPrefix();
        $url = $urlPrefix . "accounts.getAccountInfo";
        $data = [
        'apiKey' => $apiKey,
            'secret' => $apiSecretKey,
            'userKey' => $apiUserKey,
            'UID' => $uid,
            'include' => 'profile,data,preferences',
            'extraProfileFields' => 'firstName,lastName,birthDay,birthMonth,birthYear,zip,city,country,gender,phones,samlData'];
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
    protected function sendCdcMailForRegistration(string $uid): array
    {
        $apiKey = $this->getCdcApiKey();
        $apiSecretKey = $this->getCdcSecretKey();
        $apiUserKey = $this->getCdcUserKey();
        $urlPrefix = $this->getCdcUrlPrefix();

        $url = $urlPrefix . "accounts.resendVerificationCode";
        $data = ['apiKey' => $apiKey, 'secret' => $apiSecretKey, 'userKey' => $apiUserKey, 'UID' => $uid];
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
     * @param string $merchantReference
     *
     * @return array
     */
    protected function setCdcPreferredStore(string $uid, string $merchantReference): array
    {
        $apiKey = $this->getCdcApiKey();
        $apiSecretKey = $this->getCdcSecretKey();
        $apiUserKey = $this->getCdcUserKey();
        $urlPrefix = $this->getCdcUrlPrefix();
        $url = $urlPrefix . "accounts.setAccountInfo";
        $data = ['apiKey' => $apiKey, 'secret' => $apiSecretKey, 'userKey' => $apiUserKey, 'UID' => $uid, 'httpStatusCodes' => true, 'data' => '{"preferredStore":"' . $merchantReference . '"}'];
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

    /**
     * @return string
     */
    public function getCdcApiKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_KEY])) {
            $apiKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_KEY];
        }

        return $apiKey;
    }

    /**
     * @return string
     */
    public function getCdcSecretKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiSecretKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_SECRET_KEY])) {
            $apiSecretKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_SECRET_KEY];
        }

        return $apiSecretKey;
    }

    /**
     * @return string
     */
    public function getCdcUserKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiUserKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_USER_KEY])) {
            $apiUserKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_USER_KEY];
        }

        return $apiUserKey;
    }

    /**
     * @return string
     */
    public function getCdcUrlPrefix(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $urlPrefix = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_URL])) {
            $urlPrefix = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_URL];
        }

        return $urlPrefix;
    }

    /**
     * @return string
     */
    public function getCdcScreensUrl(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $urlScreens = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_SCREENS_URL])) {
            $urlScreens = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_SCREENS_URL];
        }

        return $urlScreens;
    }
}
