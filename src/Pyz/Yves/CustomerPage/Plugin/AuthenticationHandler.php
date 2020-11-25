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
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
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
        $customerResponseTransfer = new CustomerResponseTransfer();
        $customerTransfer->setMerchantReference($this->createShopContextResolver()->resolve()->getMerchantReference());
        $isAuthorized = $this->getCdcAuthorization($customerTransfer->getEmail(), $customerTransfer->getPassword());
        $customerResponseTransfer->setIsSuccess($isAuthorized);
        if (!$isAuthorized) {
            $isAuthorized = $this->registerCdcUser($customerTransfer);
        }
        if ($isAuthorized) {
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
        $apiKey = Config::get(CustomerConstants::CDC_API_KEY);
        $apiSecretKey = Config::get(CustomerConstants::CDC_API_SECRET_KEY);
        $urlPrefix = Config::get(CustomerConstants::CDC_API_URL);
        $url = array_shift($urlPrefix) . $action . "?apiKey=" . array_shift($apiKey) . "&sec=" . array_shift($apiSecretKey);
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
    protected function getCdcAuthorization($username, $pass): bool
    {
        $postData = ['loginID' => $username, 'password' => $pass];
        $result = $this->executeCdcApiCall('accounts.login', 'POST', $postData);

        if ($result["errorCode"] == 0) {
            return true;
        } else {
            return false;
        }
    }
}
