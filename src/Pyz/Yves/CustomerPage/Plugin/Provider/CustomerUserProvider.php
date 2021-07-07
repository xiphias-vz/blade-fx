<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use ArrayObject;
use Elastica\JSON;
use Exception;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Controller\ProfileController;
use Pyz\Yves\CustomerPage\Plugin\Application\CustomerTransferCustom;
use Spryker\Shared\Config\Config;
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
        $pass = $_POST["loginForm"]["password"];
        $authCheck = $this->getCdcAuthorization($email, $pass);
        $accountInfo = $this->getCdcAccountInfo($authCheck["UID"]);
        $this->getFactory()->getSessionClient()->set("cdcUID", $authCheck["UID"]);

        $customerTransfer = null;

        if ($authCheck["errorCode"] == 0) {
            $data = $_POST["loginForm"]["data"];
            $customerTransferCustom = new CustomerTransferCustom();
            try {
                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer = $customerTransferCustom->fromProfileEvent($accountInfo, $customerTransfer);
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
                $customerTransfer = $customerTransferCustom->fromProfileEvent($accountInfo);
                $customerTransfer->setUsername($email);
                $customerTransfer->setPassword($pass);
                $customerTransfer->setCustomerReference($this->getFactory()->getStore()->getStoreName());
                $this->registerCustomer($customerTransfer);

                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer->setRegistered(date('yy-m-d'));
                $customerTransfer->setRegistrationKey(null);
                $customerTransfer->setThirdPartyRegistration(true);
                $customerTransfer = $this->populateCustomerAddress($customerTransfer);
                $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);
            }

            try {
                $data = JSON::parse($data);

                if ($data["screen"] === "gigya-register-screen") {
                    $this->setCdcPreferredStore($data["response"]["UID"], $customerTransfer->getMerchantReference());
                    $this->sendCdcMailForRegistration($data["response"]["UID"]);
                }
            } catch (Exception $ex) {
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
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return array
     */
    public function setCdcAccountInfo(string $uid, CustomerTransfer $customerTransfer): array
    {
        if (empty($uid)) {
            $uid = $this->getFactory()->getSessionClient()->get("cdcUID");
        }
        $apiKey = $this->getCdcApiKey();
        $apiSecretKey = $this->getCdcSecretKey();
        $apiUserKey = $this->getCdcUserKey();
        $urlPrefix = $this->getCdcUrlPrefix();
        $url = $urlPrefix . "accounts.setAccountInfo";
        $data = [
            'apiKey' => $apiKey,
            'secret' => $apiSecretKey,
            'userKey' => $apiUserKey,
            'UID' => $uid,
            'profile' => '{"phones": [{"type":"home", "number":"' . $customerTransfer->getPhone() . '"}, {"type":"mobile", "number":"' . $customerTransfer->getMobilePhoneNumber() . '"}]}',
        ];

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        $profile = new ProfileController();
        $profile->processProfileUpdateByTransfer($customerTransfer, false);

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

    /**
     * @return string
     */
    public function getGlobusApiUrlPrefix(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);

        $urlPrefix = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_URL])) {
            $urlPrefix = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_URL];
        }

        return $urlPrefix;
    }

    /**
     * @return string
     */
    public function getGlobusApiKey(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);

        $apiKey = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_KEY])) {
            $apiKey = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_KEY];
        }

        return $apiKey;
    }

    /**
     * @return string
     */
    public function getGlobusApiSecretKey(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);

        $apiSecretKey = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_SECRET_KEY])) {
            $apiSecretKey = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_SECRET_KEY];
        }

        return $apiSecretKey;
    }

    /**
     * @return string
     */
    public function getCaptchaSecretKey(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GOOGLE_CAPTCHA_CONSTANTS);

        $apiSecretKey = '';
        if (isset($globus_api_credentials[CustomerConstants::GOOGLE_CAPTCHA_CREDENTIALS][CustomerConstants::GOOGLE_CAPTCHA_SECRET])) {
            $apiSecretKey = $globus_api_credentials[CustomerConstants::GOOGLE_CAPTCHA_CREDENTIALS][CustomerConstants::GOOGLE_CAPTCHA_SECRET];
        }

        return $apiSecretKey;
    }

    /**
     * @param string $emailOrCardNumber
     *
     * @return string
     */
    public function checkEmailOrCardAvaliability(string $emailOrCardNumber): string
    {
        $apiKey = $this->getGlobusApiKey();
        $apiSecretKey = $this->getGlobusApiSecretKey();
        $urlPrefix = $this->getGlobusApiUrlPrefix();
        $url = "v2/meinglobus/accounts/registrations/available";
        $fullUrl = $urlPrefix . $url;
        $data = '{"id": "' . $emailOrCardNumber . '"}';

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => [
                'APIKey: ' . $apiKey,
                'APISecret: ' . $apiSecretKey,
                'Content-Type: application/json',
            ],
        ]);

        $result = curl_exec($curl);
        curl_close($curl);

        return $result;
    }

    /**
     * @param string $emailOrCardNumber
     * @param string $password
     *
     * @return string
     */
    public function globusLogin(string $emailOrCardNumber, string $password): string
    {
        $apiKey = $this->getGlobusApiKey();
        $apiSecretKey = $this->getGlobusApiSecretKey();
        $urlPrefix = $this->getGlobusApiUrlPrefix();
        $url = "v2/meinglobus/accounts/login";
        $fullUrl = $urlPrefix . $url;
        $data = '{"id": "' . $emailOrCardNumber . '" , "password": "' . $password . '"}';

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => [
                'APIKey: ' . $apiKey,
                'APISecret: ' . $apiSecretKey,
                'Content-Type: application/json',
            ],
        ]);

        $result = curl_exec($curl);
        curl_close($curl);

        return $result;
    }
}
