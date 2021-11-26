<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GsoaRestApiClient\Provider;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\GsoaRestApiClient\ApiClient;

class CustomerProfileProvider
{
    /**
     * @var string
     */
    private $url = '/CustomerProfile/2/customer/profiles';

    /**
     * @var string
     */
    private $token;

    /**
     * @return string
     */
    private function getBearerToken(): string
    {
        if (empty($this->token)) {
            $client = new TokenProvider();
            $this->token = $client->getBearerToken(TokenScope::CUSTOMER_PROFILE);
        }

        return $this->token;
    }

    /**
     * @param string $customerId
     *
     * @return array
     */
    public function getCustomerProfileById(string $customerId): array
    {
        $token = $this->getBearerToken();
        $url = $this->url . '/' . $customerId;

        return ApiClient::get($url, $token, "");
    }

    /**
     * @param string $cardNumberEAN
     *
     * @return array
     */
    public function getCustomerProfileByCardNumberEAN(string $cardNumberEAN): array
    {
        $token = $this->getBearerToken();
        $url = $this->url . '/ean-' . $cardNumberEAN;

        return ApiClient::get($url, $token, "");
    }

    /**
     * @param string $userName
     * @param string $password
     *
     * @return string if returned string starts with ERROR than login has failed.
     */
    public function getCustomerLoginToken(string $userName, string $password): string
    {
        $client = new TokenProvider();

        return $client->getBearerTokenByUser($userName, $password);
    }

    /**
     * @param string $token Get token with function getCustomerLoginToken()
     *
     * @return array
     */
    public function getCurrentCustomerData(string $token): array
    {
        $url = $this->url . '/me';

        return ApiClient::get($url, $token, []);
    }

    /**
     * @param string $token Get token with function getCustomerLoginToken()
     * @param \Generated\Shared\Transfer\CustomerTransfer|null $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function getCurrentCustomerTransfer(string $token, ?CustomerTransfer $customerTransfer = null): CustomerTransfer
    {
        $url = $this->url . '/me';

        $data = ApiClient::get($url, $token, []);

        return $this->fromProfileEvent($data, $customerTransfer);
    }

    /**
     * @param array $data
     *
     * @return string
     */
    public function getEmailFromProfile(array $data): string
    {
        return $data["contacts"]["email"];
    }

    /**
     * @param mixed|array $eventData
     * @param \Generated\Shared\Transfer\CustomerTransfer|null $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function fromProfileEvent($eventData, ?CustomerTransfer $customerTransfer = null): CustomerTransfer
    {
        if ($customerTransfer == null) {
            $customerTransfer = new CustomerTransfer();
        }
        $data = $eventData;
        if (!is_array($eventData)) {
            $data = JSON::parse($eventData);
        }

        $birthDay = strtotime($this->getValue($data["personalInfo"], "birthDate"));
        $customerTransfer
            ->setEmail($data["contacts"]["email"])
            ->setPhone($data["contacts"]["phone"])
            ->setPhonePrefix($data["contacts"]["phonePrefix"])
            ->setFirstName($this->getValue($data["personalInfo"], "name"))
            ->setLastName($this->getValue($data["personalInfo"], "surname"))
            ->setGender($this->getMapGender($this->getValue($data["personalInfo"], "sex")))
            ->setCity($this->getValue($data["personalInfo"], "address", "city"))
            ->setZipCode($this->getValue($data["personalInfo"], "address", "zip"))
            ->setCountry($this->getValue($data["personalInfo"], "address", "country"))
            ->setAddress1($this->getValue($data["personalInfo"], "address", "street"))
            ->setAddress2($this->getValue($data["personalInfo"], "address", "streetNumber"))
            ->setBirthDay(date("j", $birthDay))
            ->setBirthMonth(date("m", $birthDay))
            ->setBirthYear(date("Y", $birthDay))
            ->setDateOfBirth(date("Y-m-j", $birthDay))
            ->setUsername($this->getValue($data["authentication"], "login"))
            ->setSalutation("Divers")
            ->setMyGlobusCard($this->getValue($data["account"], "card", "eanGlobusCard"))
            ->setThirdPartyRegistration(true);

        return $customerTransfer;
    }

    /**
     * @param array $array
     * @param string $name
     * @param string|null $child
     *
     * @return string|null
     */
    private function getValue(array $array, string $name, ?string $child = null): ?string
    {
        if (array_key_exists($name, $array)) {
            if ($child != null) {
                if (array_key_exists($child, $array[$name])) {
                    return $array[$name][$child];
                }
            } else {
                return $array[$name];
            }
        }

        return null;
    }

    /**
     * @param string $gender
     * Male, Female
     *
     * @return string|null
     */
    public function getMapGender(string $gender): ?string
    {
        $mapGender = [
            'F' => 'Female',
            'M' => 'Male',
            'U' => null,
        ];

        return array_key_exists($gender, $mapGender) ? $mapGender[$gender] : null;
    }
}
