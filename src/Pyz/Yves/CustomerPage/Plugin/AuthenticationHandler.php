<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerResponseTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientDigitalCard;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientValidation;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
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
        $meinGlobus = $_REQUEST["registerForm_isMeinGlobus"];
        if (strtolower($meinGlobus) == "true") {
            $meinGlobus = true;
        } else {
            $meinGlobus = false;
        }
        $we = $_REQUEST["registerForm_isAdvertise"];
        if (strtolower($we) == "true") {
            $we = true;
        } else {
            $we = false;
        }

        $validAdress = $this->getApiAdressCheck($customerTransfer, $meinGlobus, $we);
        $isAuthorized = false;
        $customerResponseTransfer = new CustomerResponseTransfer();
        if ($validAdress["code"] == 'VA') {
            $isAuthorized = true;
        }
        $customerTransfer->setMerchantReference($this->createShopContextResolver()->resolve()->getMerchantReference());
        if (isset($_REQUEST['loginForm'])) {
            if (empty($customerTransfer->getEmail())) {
                $customerTransfer->setEmail($_REQUEST['loginForm']['email']);
            }
            $customerTransfer->setPassword($_REQUEST['loginForm']['password']);
            $isAuthorized = $this->getCdcAuthorization($customerTransfer->getEmail(), $customerTransfer->getPassword());

            $data = JSON::parse($_REQUEST['loginForm']['data']);
            if (array_key_exists("cardID", $data['data'])) {
                $customerTransfer->setMyGlobusCard($data["cardID"]);
            }

            if (array_key_exists("response", $data) && !$data['response']['isRegistered']) {
                $isRegistrationAuthorized = $this->registerCdcUser($customerTransfer);
                $customerResponseTransfer->setIsSuccess($isRegistrationAuthorized);
                if ($isRegistrationAuthorized) {
                    $customerResponseTransfer = parent::registerCustomer($customerTransfer);
                }
            } else {
                $customerResponseTransfer = parent::registerCustomer($customerTransfer);
            }
        } else {
            $customerTransfer->setEmail($_REQUEST['registerForm_customer_email']);
            $customerTransfer->setPassword($_REQUEST['registerForm_customer_password_pass']);
            $customerTransfer->setMyGlobusCard($_REQUEST['registerForm_my_globus_card_number']);
            $customerTransfer->setIsAdvertise($we);
            $customerTransfer->setIsScanAndGo($_REQUEST['hidShowScanAndGo']);
            $customerTransfer->setIsMeinGlobus($meinGlobus);

            $customerResponseTransfer->setIsSuccess($isAuthorized);
            $isRegistrationAuthorized = $this->registerCdcUser($customerTransfer);
            $customerResponseTransfer->setIsSuccess($isRegistrationAuthorized);
            if ($isRegistrationAuthorized) {
                 $customerResponseTransfer = parent::registerCustomer($customerTransfer);
                 $isAuthorized = true;
            }
        }

        $customerResponseTransfer->setIsSuccess($isAuthorized);
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
        $globusMyCardNumber = $_REQUEST["registerForm_my_globus_card_number"];
        $globusIsAdvertise = $_REQUEST["registerForm_isAdvertise"];
        $globusIsMeinGlobus = $_REQUEST["registerForm_isMeinGlobus"];

        $validAddress = $this->getApiAdressCheck($customerTransfer, $globusIsMeinGlobus, $globusIsAdvertise);
        $addressStatus = $validAddress["code"];
        $addressLastUpdated = date("Y-m-d");

        if ($_REQUEST["hidShowScanAndGo"] == 1) {
            $customerTransfer->setZipCode($validAddress["result"]["address"]["zip"]);
            $customerTransfer->setAddress2($validAddress["result"]["address"]["houseNo"]);
            $customerTransfer->setAddress1($validAddress["result"]["address"]["street"]);
            $customerTransfer->setCity($validAddress["result"]["address"]["city"]);
        } elseif ($_REQUEST["hidShowScanAndGo"] == 0) {
            $addressStatus = "UN";
        }

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

        $newMyGlobusCardNumber = 0;
        if (!$customerTransfer->getMyGlobusCard()) {
            $newMyGlobusCardNumber = $this->getNewGlobusCardNumber();
            $customerTransfer->setMyGlobusCard($newMyGlobusCardNumber);
        } else {
            $newMyGlobusCardNumber = $customerTransfer->getMyGlobusCard();
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
                      "subscriptions": {
                        "meinGlobus": ' . $globusIsMeinGlobus . ',
                        "general": true,
                        "marketingPermission": {
                          "email": ' . $globusIsAdvertise . ',
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
        $result = GlobusRestApiClientAccount::registrationFull($data);
        if ($result->isSuccess) {
            $resultRegisterApi = $result->resultToJson();
            if (isset($resultRegisterApi->UID)) {
                if (isset($resultRegisterApi->profile)
                    && isset($resultRegisterApi->profile->address)
                    && isset($resultRegisterApi->profile->address->verification)
                    && isset($resultRegisterApi->profile->address->verification->status)) {
                    $customerTransfer->setAddressStatus($resultRegisterApi->profile->address->verification->status);
                }

                $customerTransfer->setIsMeinGlobus($globusIsMeinGlobus);
                $customerTransfer->setMyGlobusCard($globusMyCardNumber);
                $customerTransfer->setIsAdvertise($globusIsAdvertise);

                return true;
            } else {
                return false;
            }
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
     * @param bool $mainGlobus
     * @param bool $we
     *
     * @return array
     */
    protected function getApiAdressCheck($customerTransfer, bool $mainGlobus, bool $we): array
    {
        $firstName = $customerTransfer->getFirstName();
        $lastName = $customerTransfer->getLastName();
        $zip = $customerTransfer->getZipCode();
        $houseNo = $customerTransfer->getAddress2();
        $street = $customerTransfer->getAddress1();
        $city = $customerTransfer->getCity();

        return GlobusRestApiClientValidation::addressValidation($firstName, $lastName, $zip, $houseNo, $street, $city, $mainGlobus, $we);
    }

    /**
     * @return string
     */
    public function getNewGlobusCardNumber(): string
    {
        return GlobusRestApiClientDigitalCard::getNewGlobusCardNumber();
    }
}
