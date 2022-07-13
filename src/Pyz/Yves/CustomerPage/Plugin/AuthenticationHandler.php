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
use Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiClientDigitalCard;
use Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiClientValidation;
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
        if (isset($_REQUEST["registerForm_isMeinGlobus"])) {
            $meinGlobus = $_REQUEST["registerForm_isMeinGlobus"];
            if (strtolower($meinGlobus) == "true") {
                $meinGlobus = true;
            } else {
                $meinGlobus = false;
            }
        } else {
            $meinGlobus = false;
        }

        if (isset($_REQUEST["registerForm_isAdvertise"])) {
            $we = $_REQUEST["registerForm_isAdvertise"];
            if (strtolower($we) == "true") {
                $we = true;
            } else {
                $we = false;
            }
        } else {
            $we = false;
        }

        $validAddress = $this->getApiAdressCheck($customerTransfer, $meinGlobus, $we);

        $customerTransfer->setCity($this->getCityFromApiResult($validAddress));
        $customerTransfer->setAddress1($this->getStreetNameFromApiResult($validAddress));

        $mobilePhoneWithPrefix = $customerTransfer->getMobilePhonePrefix() . $customerTransfer->getMobilePhoneNumber();
        $phoneWithPrefix = $customerTransfer->getPhonePrefix() . $customerTransfer->getPhone();

        $customerTransfer
            ->setPhone($mobilePhoneWithPrefix)
            ->setMobilePhoneNumber($phoneWithPrefix);

        $ssoRegister = true;
        if (isset($_COOKIE['localLogin'])) {
            if ($_COOKIE['localLogin'] == 1) {
                $ssoRegister = false;
            }
        }
        $isAuthorized = false;
        $customerResponseTransfer = new CustomerResponseTransfer();
        if ($validAddress["code"] == 'VA') {
            $isAuthorized = true;
        }
        $customerTransfer->setMerchantReference($this->getFactory()->createShopContextResolver()->resolve()->getMerchantReference());
        if (isset($_REQUEST['loginForm'])) {
            if (empty($customerTransfer->getEmail())) {
                $customerTransfer->setEmail($_REQUEST['loginForm']['email']);
            }
            $customerTransfer->setPassword($_REQUEST['loginForm']['password']);

            $data = JSON::parse($_REQUEST['loginForm']['data']);
            if (array_key_exists("cardID", $data['data'])) {
                $customerTransfer->setMyGlobusCard($data['data']['cardID']);
            }

            if (array_key_exists("response", $data) && !$data['response']['isRegistered']) {
                $isRegistrationAuthorized = $this->registerCdcUser($customerTransfer, $validAddress);
                $customerResponseTransfer->setIsSuccess($isRegistrationAuthorized);
                if ($isRegistrationAuthorized) {
                    $customerResponseTransfer = parent::registerCustomer($customerTransfer);
                }
            } else {
                $customerResponseTransfer = parent::registerCustomer($customerTransfer);
            }
        } elseif (isset($_REQUEST['registerForm'])) {
            $customerTransfer->setEmail($_REQUEST['registerForm_customer_email']);
            $customerTransfer->setPassword($_REQUEST['registerForm_customer_password_pass']);
            $customerTransfer->setMyGlobusCard($_REQUEST['registerForm_my_globus_card_number']);
            $customerTransfer->setIsAdvertise($we);
            $customerTransfer->setIsScanAndGo($_REQUEST['hidShowScanAndGo']);
            $customerTransfer->setIsMeinGlobus($meinGlobus);

            $customerResponseTransfer->setIsSuccess($isAuthorized);
            $isRegistrationAuthorized = $this->registerCdcUser($customerTransfer, $validAddress);
            $customerResponseTransfer->setIsSuccess($isRegistrationAuthorized);
            if ($isRegistrationAuthorized) {
                 $customerResponseTransfer = parent::registerCustomer($customerTransfer);
                 $isAuthorized = true;
            }
        } elseif ($ssoRegister === true) {
            $customerResponseTransfer = parent::registerCustomer($customerTransfer);
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
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     * @param array $validAddress
     *
     * @return bool
     */
    protected function registerCdcUser(CustomerTransfer $customerTransfer, array $validAddress): bool
    {
        $globusMyCardNumber = $_REQUEST["registerForm_my_globus_card_number"];
        $globusIsAdvertise = $_REQUEST["registerForm_isAdvertise"];
        $globusIsMeinGlobus = $_REQUEST["registerForm_isMeinGlobus"];
        $globusIsMYGloubsCardValid = $_REQUEST["registerForm_isMyGloubsCardValid"];

        $addressStatus = $validAddress["code"];
        $addressLastUpdated = date("Y-m-d");

        if ($_REQUEST["hidShowScanAndGo"] == 1) {
            $customerTransfer->setZipCode($validAddress["result"]["address"]["zip"]);
            $customerTransfer->setAddress2($validAddress["result"]["address"]["houseNo"]);
            $customerTransfer->setAddress1($this->getStreetNameFromApiResult($validAddress));
            $customerTransfer->setCity($this->getCityFromApiResult($validAddress));
        } elseif ($_REQUEST["hidShowScanAndGo"] == 0) {
            $addressStatus = "UN";
        }

        if (isset($validAddress["result"]["address"]["country"])) {
            $country = $validAddress["result"]["address"]["country"];
        } else {
            $country = $this->getCountryISO2CodeFromConfig($customerTransfer->getCountry());
        }

        if ($customerTransfer->getSalutation() == "Mr") {
            $gender = "m";
        } elseif ($customerTransfer->getSalutation() == "Ms") {
            $gender = "f";
        } else {
            $gender = "u";
        }

        $newMyGlobusCardNumber = null;
        $cardOrigin = "ClickAndCollect";

        if ($globusIsMYGloubsCardValid == "true") {
            $cardType = "physical";
        } else {
            $cardType = "digital";
        }

        $myGlobusCardNumberAPIVariable = '';
        $cardTypeAPIVariable = '';
        $meinGlobusAPIVariable = '';
        if ($globusIsMeinGlobus == "true") {
            if (!$globusMyCardNumber) {
                $newMyGlobusCardNumber = $this->getNewGlobusCardNumber();
                $customerTransfer->setMyGlobusCard($newMyGlobusCardNumber);
            } else {
                $newMyGlobusCardNumber = $globusMyCardNumber;
            }

            $myGlobusCardNumberAPIVariable = '"cardNumber": "' . $newMyGlobusCardNumber . '",';
            $cardTypeAPIVariable = '"cardType": "' . $cardType . '",';
            $meinGlobusAPIVariable = '"meinGlobus": ' . $globusIsMeinGlobus . ',';
        }

        $data = '{
                      "email": "' . $customerTransfer->getEmail() . '",
                      ' . $myGlobusCardNumberAPIVariable . '
                      ' . $cardTypeAPIVariable . '
                      "origin": "' . $cardOrigin . '",
                      "profile": {
                        "lastName": "' . $customerTransfer->getLastName() . '",
                        "firstName": "' . $customerTransfer->getFirstName() . '",
                        "title": "",
                        "gender": "' . $gender . '",
                        "birthDay": ' . $customerTransfer->getBirthDay() . ',
                        "birthMonth": ' . $customerTransfer->getBirthMonth() . ',
                        "birthYear": ' . $customerTransfer->getBirthYear() . ',
                        "preferredStore": "' . $customerTransfer->getMerchantReference() . '",
                        "languages": "' . $country . '",
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
                        ' . $meinGlobusAPIVariable . '
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
                $customerTransfer->setMyGlobusCard($newMyGlobusCardNumber);
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
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     * @param bool $mainGlobus
     * @param bool $we
     *
     * @return array
     */
    protected function getApiAdressCheck($customerTransfer, bool $mainGlobus, bool $we): array
    {
        $firstName = $customerTransfer->getFirstName() ?? '';
        $lastName = $customerTransfer->getLastName() ?? '';
        $zip = $customerTransfer->getZipCode() ?? '';
        $houseNo = $customerTransfer->getAddress2() ?? '';
        $street = $customerTransfer->getAddress1() ?? '';
        $city = $customerTransfer->getCity() ?? '';

        return GlobusRestApiClientValidation::addressValidation($firstName, $lastName, $zip, $houseNo, $street, $city, $mainGlobus, $we);
    }

    /**
     * @return string
     */
    public function getNewGlobusCardNumber(): string
    {
        return GlobusRestApiClientDigitalCard::getNewGlobusCardNumber();
    }

    /**
     * @param array $validAddress
     *
     * @return string
     */
    public function getStreetNameFromApiResult(array $validAddress): string
    {
        if (isset($validAddress["result"]["address"]["street"])) {
            if (is_array($validAddress["result"]["address"]["street"])) {
                return $validAddress["result"]["address"]["street"]["value"];
            } else {
                return $validAddress["result"]["address"]["street"];
            }
        } else {
            return '';
        }
    }

    /**
     * @param array $validAddress
     *
     * @return string
     */
    public function getCityFromApiResult(array $validAddress): string
    {
        if (isset($validAddress["result"]["address"]["city"])) {
            if (is_array($validAddress["result"]["address"]["city"])) {
                return $validAddress["result"]["address"]["city"]["value"];
            } else {
                return $validAddress["result"]["address"]["city"];
            }
        } else {
            return '';
        }
    }

    /**
     * @param int|null $idCountry
     *
     * @return string
     */
    public function getCountryISO2CodeFromConfig(?int $idCountry): string
    {
        $countries = Config::get(CustomerConstants::CUSTOMER_COUNTRY_ISO_2_CODE);
        if ($idCountry == null) {
            return 'DE';
        } else {
            if ($countries != null) {
                return $countries[$idCountry];
            } else {
                return 'DE';
            }
        }
    }
}
