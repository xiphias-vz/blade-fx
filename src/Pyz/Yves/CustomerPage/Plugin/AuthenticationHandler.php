<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerResponseTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\CustomerPage\Plugin\AuthenticationHandler as SprykerAuthenticationHandler;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
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
        $validAdress = $this->getApiAdressCheck($customerTransfer);
        $decodeAdress = json_decode($validAdress);
        $isAuthorized = false;
        if ($decodeAdress->code == 'VA') {
            $isAuthorized = true;
        }

        $customerResponseTransfer = new CustomerResponseTransfer();
        $customerTransfer->setMerchantReference($this->createShopContextResolver()->resolve()->getMerchantReference());
        $isAuthorized = $this->getCdcAuthorization($customerTransfer->getEmail(), $customerTransfer->getPassword());
        $customerResponseTransfer->setIsSuccess($isAuthorized);

        if (!$isAuthorized) {
            $isAuthorized = $this->registerCdcUser($customerTransfer);
        }
        if ($isAuthorized) {
            $customerResponseTransfer = parent::registerCustomer($customerTransfer); //TODO return this code
        }

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

    /**
     * @param string $action
     * @param string $method
     * @param array $postData
     *
     * @return array
     */
    protected function executeCdcApiCall($action, $method, $postData)
    {
        $apiKey = $this->getFactory()->createCustomerUserProvider()->getCdcApiKey();
        $apiSecretKey = $this->getFactory()->createCustomerUserProvider()->getCdcSecretKey();
        $urlPrefix = $this->getFactory()->createCustomerUserProvider()->getCdcUrlPrefix();
        $url = $urlPrefix . $action . "?apiKey=" . $apiKey . "&sec=" . $apiSecretKey;
        $options = [
            'http' => [
                'method' => 'GET',
            ],
        ];

        if ($method == 'POST') {
            $options = [
                'http' => [
                    'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
                        "Accept: application/json\r\n",
                    'method' => 'POST',
                    'content' => http_build_query($postData),
                ],
            ];
        }

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        return JSON::parse($result);
    }

    /**
     * @return string
     */
    protected function getCdcAuthorizationToken(): string
    {
        $result = $this->executeCdcApiCall('accounts.initRegistration', 'GET', null);

        if ($result["errorCode"] == 0) {
            return $result["regToken"];
        } else {
            return "ERROR";
        }
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return bool
     */
    protected function registerCdcUser(CustomerTransfer $customerTransfer): bool
    {
        $token = $this->getCdcAuthorizationToken();

        $profile = [
            'firstName' => $customerTransfer->getFirstName(),
            'lastName' => $customerTransfer->getLastName(),
            'zip' => $customerTransfer->getZipCode(),
            'city' => $customerTransfer->getCity(),
            'country' => "DE",
            'birthDay' => $customerTransfer->getBirthDay(),
            'birthMonth' => $customerTransfer->getBirthMonth(),
            'birthYear' => $customerTransfer->getBirthYear(),
            'phones' => [
                [
                    'type' => "001",
                    'number' => $customerTransfer->getMobilePhoneNumber(),
                ],
            ],
        ];

        $preferences = [
            'terms' => [
                'general' => [
                    'isConsentGranted' => true,
                ],
            ],
        ];

        $data = [
            'address' => [
                'street' => $customerTransfer->getAddress1(),
                'houseNo' => $customerTransfer->getAddress2(),
            ],
            'salutation' => '0006',     //Frau=0001, Herr=0002, Keine Angabe=0006
            'preferredStore' => '1031',
            'origin' => 'ClickAndCollect',
        ];

        $postData = [
            'email' => $customerTransfer->getEmail(),
            'password' => $customerTransfer->getPassword(),
            'regToken' => $token,
            'finalizeRegistration' => true,
            'profile' => json_encode($profile),
            'data' => json_encode($data),
            'preferences' => json_encode($preferences),
            'format' => "json",
        ];

        $result = $this->executeCdcApiCall('accounts.register', 'POST', $postData);

        if ($result["errorCode"] == 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param string $username
     * @param string $pass
     *
     * @return bool
     */
    protected function getCdcAuthorization(string $username, string $pass): bool
    {
        $postData = ['loginID' => $username, 'password' => $pass];
        $result = $this->executeCdcApiCall('accounts.login', 'POST', $postData);

        if ($result["errorCode"] == 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param string $uid
     *
     * @return array
     */
    protected function getCdcAccountInfo(string $uid): array
    {
        $postData = ['UID' => $uid, 'include' => 'profile, data, subscriptions, preferences'];

        return $this->executeCdcApiCall('accounts.getAccountInfo', 'POST', $postData);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return string
     */
    protected function getApiAdressCheck($customerTransfer)
    {
        $firstName = $customerTransfer->getFirstName();
        $lastName = $customerTransfer->getLastName();
        $zip = $customerTransfer->getZipCode();
        $houseNo = $customerTransfer->getAddress2();
        $street = $customerTransfer->getAddress1();
        $city = $customerTransfer->getCity();

        $apiKey = $this->getGlobusApiKey();
        $apiSecretKey = $this->getGlobusApiSecretKey();
        $urlPrefix = $this->getGlobusApiUrlPrefix();
        $url = "/v1/meinglobus/validations/address";
        $fullUrl = $urlPrefix . $url;
        $data = '{
                    "firstName": "' . $firstName . '",
                    "lastName": "' . $lastName . '",
                    "address": {
                    "zip": "' . $zip . '",
                    "houseNo": "' . $houseNo . '",
                    "street": "' . $street . '",
                    "city": "' . $city . '"
                    }
                }';

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
    public function getGlobusApiUrlPrefix(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);

        $urlPrefix = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_URL])) {
            $urlPrefix = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_URL];
        }

        return $urlPrefix;
    }
}
