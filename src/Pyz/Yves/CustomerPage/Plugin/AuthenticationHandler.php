<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin;

use Elastica\JSON;
use Exception;
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

        $customerTransfer->setEmail($_REQUEST['loginForm']['email']);
        $customerTransfer->setPassword($_REQUEST['loginForm']['password']);
        //$customerTransfer->setMyGlobusCard($_REQUEST['registerForm_my_globus_card_number']);

        $data = JSON::parse($_REQUEST['loginForm']['data']);
        if (array_key_exists("cardID", $data['data'])) {
            $customerTransfer->setMyGlobusCard($data["cardID"]);
        }

        $customerResponseTransfer = new CustomerResponseTransfer();
        $customerTransfer->setMerchantReference($this->createShopContextResolver()->resolve()->getMerchantReference());
        $isAuthorized = $this->getCdcAuthorization($customerTransfer->getEmail(), $customerTransfer->getPassword());
        $customerResponseTransfer->setIsSuccess($isAuthorized);

        if (!$data['response']['isRegistered']) {
            $isRegistrationAuthorized = $this->registerCdcUser($customerTransfer);
            $customerResponseTransfer->setIsSuccess($isRegistrationAuthorized);
            if ($isRegistrationAuthorized) {
                $customerResponseTransfer = parent::registerCustomer($customerTransfer);
            }
        } else {
            $customerResponseTransfer = parent::registerCustomer($customerTransfer);
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
        $validAddress = $this->getApiAdressCheck($customerTransfer);
        $validAdressDecode = json_decode($validAddress);
        $addressStatus = $validAdressDecode->code;
        $addressLastUpdated = date("Y-m-d");

        if ($customerTransfer->getCountry() == 60) {
            $country = "DE";
        } else {
            $country = "DE";
        }

        if ($customerTransfer->getSalutation() == "Mr") {
            $gender = "m";
        } elseif ($customerTransfer->getSalutation() == "Ms") {
            $gender = "f";
        } else {
            $gender = "u";
        }
        $marketingPermission = "false";
        //$token = $this->getCdcAuthorizationToken();

        $apiKey = $this->getGlobusApiKey();
        $apiSecretKey = $this->getGlobusApiSecretKey();
        $urlPrefix = $this->getGlobusApiUrlPrefix();
        $url = "v2/meinglobus/accounts/registrations/full";
        $fullUrl = $urlPrefix . $url;
        $newMyGlobusCardNumber = 0;
        if (!$customerTransfer->getMyGlobusCard()) {
            $newMyGlobusCardNumber = $this->getNewGlobusCardNumber($apiKey, $apiSecretKey);
            $customerTransfer->setMyGlobusCard($newMyGlobusCardNumber);
        }

        $cardType = "digital";
        $cardOrigin = "ClickAndCollect";
        $data = '{
                      "email": "' . $customerTransfer->getEmail() . '",
                      "cardNumber": "' . $newMyGlobusCardNumber . '",
                      "cardType": "' . $cardType . '",
                      "origin": "' . $cardOrigin . '",
                      "profile": {
                        "lastName": "' . $customerTransfer->getFirstName() . '",
                        "firstName": "' . $customerTransfer->getLastName() . '",
                        "title": "",
                        "gender": "' . $gender . '",
                        "birthDay": ' . $customerTransfer->getBirthDay() . ',
                        "birthMonth": ' . $customerTransfer->getBirthMonth() . ',
                        "birthYear": ' . $customerTransfer->getBirthYear() . ',
                        "preferredStore": "' . $customerTransfer->getMerchantReference() . '",
                        "languages": "DE",
                        "phones": [
                          {
                            "number": "' . $customerTransfer->getMobilePhoneNumber() . '",
                            "type": "mobile"
                          },
                          {
                            "number": "' . $customerTransfer->getPhone() . '",
                            "type": "landLine"
                          }
                        ],
                        "address": {
                          "zip": "' . $customerTransfer->getZipCode() . '",
                          "houseNo": "' . $customerTransfer->getAddress2() . '",
                          "street": "' . $customerTransfer->getAddress1() . '",
                          "city": "' . $customerTransfer->getCity() . '",
                          "country": "' . $country . '",
                          "verification": {
                            "status": "' . $addressStatus . '",
                            "lastUpdated": "' . $addressLastUpdated . '"
                          }
                        }
                      },
                      "subsrciptions": {
                        "meinGlobus": true,
                        "general": true,
                        "marketingPermission": {
                          "email": ' . $marketingPermission . ',
                          "letter": false
                        },
                        "wec": {
                          "email": false
                        },
                        "wlc": {
                          "email": false
                        },
                        "doi": "Confirmed"
                      },
                      "password": "' . $customerTransfer->getPassword() . '"
                    }';

        try {
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

            $resultRegisterApi = json_decode($result);
            if ($resultRegisterApi->UID) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $exception) {
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

    /**
     * @param string $apiKey
     * @param string $apiSecretKey
     *
     * @return string
     */
    public function getNewGlobusCardNumber(string $apiKey, string $apiSecretKey): string
    {
        $urlPrefix = $this->getGlobusApiUrlPrefix();
        $url = "v2/meinglobus/digitalcard/nextcard";
        $fullUrl = $urlPrefix . $url;

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => [
                'APIKey: ' . $apiKey,
                'APISecret: ' . $apiSecretKey,
                'Content-Type: application/json',
            ],
        ]);

        $resultAPI = curl_exec($curl);
        curl_close($curl);

        $newCardResult = json_decode($resultAPI);
        $result = "";
        if ($newCardResult->code == 200) {
            $result = $newCardResult->cardNumber;
        } else {
            $result = $newCardResult->message;
        }

        return $result;
    }
}
