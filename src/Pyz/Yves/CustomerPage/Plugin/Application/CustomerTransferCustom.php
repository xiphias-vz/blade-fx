<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Application;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;

/**
 * Class CustomerTransferCustom
 *
 * @package Pyz\Yves\CustomerPage\Plugin\Application
 */
class CustomerTransferCustom
{
    /**
     * @param mixed $eventData
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

        $city = "";
        $zip = "";
        $street = "";
        $houseNo = "";
        $country = "";

        if (isset($data["profile"]["city"])) {
            $city = $this->getValue($data["profile"], "city");
            $zip = $this->getValue($data["profile"], "zip");
            $street = $this->getValue($data["data"]["address"], "street");
            $houseNo = $this->getValue($data["data"]["address"], "houseNo");
            $country = $this->getValue($data["profile"], "country");
        } elseif (isset($data["profile"]["address"]["city"])) {
            $city = $this->getValue($data["profile"]["address"], "city");
            $zip = $this->getValue($data["profile"]["address"], "zip");
            $street = $this->getValue($data["profile"]["address"], "street");
            $houseNo = $this->getValue($data["profile"]["address"], "houseNo");
            $country = $this->getValue($data["profile"]["address"], "country");
        }
        if (!empty($city)) {
            $customerTransfer->setEmail($data["profile"]["email"])
                ->setFirstName($this->getValue($data["profile"], "firstName"))
                ->setLastName($this->getValue($data["profile"], "lastName"))
                ->setCity($city)
                ->setZipCode($zip)
                ->setBirthDay($this->getValue($data["profile"], "birthDay"))
                ->setBirthMonth($this->getValue($data["profile"], "birthMonth"))
                ->setBirthYear($this->getValue($data["profile"], "birthYear"))
                ->setDateOfBirth($data["profile"]["birthYear"] . '-' . $data["profile"]["birthMonth"] . '-' . $data["profile"]["birthDay"])
                ->setUsername($this->getValue($data["profile"], "email"))
                ->setGender($this->getMapGender($this->getValue($data["profile"], "gender")))
                ->setSalutation($this->getMapSalutation($this->getValue($data["data"], "salutation")))
                ->setAddress1($street)
                ->setAddress2($houseNo)
                ->setCountry($country);

            if (isset($data["cardNumber"])) {
                $customerTransfer->setMyGlobusCard($data["cardNumber"]);
            } elseif (array_key_exists("cardID", $data["data"])) {
                $customerTransfer->setMyGlobusCard($data["data"]["cardID"]);
            }

            if (isset($data["subscriptions"]["general"])) {
                $customerTransfer->setThirdPartyRegistration($data["subscriptions"]["general"]);
            } elseif (array_key_exists("preferences", $data)) {
                if (array_key_exists("terms.meinGlobus", $data["preferences"])) {
                    $customerTransfer->setThirdPartyRegistration($data["preferences"]["terms.meinGlobus"]["isConsentGranted"]);
                } elseif (array_key_exists("terms", $data["preferences"])) {
                    if (array_key_exists("meinGlobus", $data["preferences"]["terms"])) {
                        $customerTransfer->setThirdPartyRegistration($data["preferences"]["terms"]["meinGlobus"]["isConsentGranted"]);
                    }
                }
            }

            if (isset($data["profile"]["phones"])) {
                $phones = $data["profile"]["phones"];
                foreach ($phones as $phone) {
                    if ($phone["type"] == "home") {
                        $customerTransfer->setPhone($phone["number"]);
                    } else {
                        $customerTransfer->setMobilePhoneNumber($phone["number"]);
                    }
                }
            }
        }

        return $customerTransfer;
    }

    /**
     * @param string $salutation
     * Mr, Ms, Divers, Dr
     *
     * @return string
     */
    public function getMapSalutation($salutation): string
    {
        $mapSalutation = [
            '0001' => 'Ms',
            '0002' => 'Mr',
            '0006' => 'Divers',
        ];

        return array_key_exists($salutation, $mapSalutation) ? $mapSalutation[$salutation] : 'Divers';
    }

    /**
     * @param string $gender
     * Male, Female
     *
     * @return string|null
     */
    public function getMapGender($gender): ?string
    {
        $mapGender = [
            'f' => 'Female',
            'm' => 'Male',
            'u' => null,
        ];

        return array_key_exists($gender, $mapGender) ? $mapGender[$gender] : null;
    }

    /**
     * @param array $array
     * @param string $name
     *
     * @return string|null
     */
    private function getValue(array $array, string $name): ?string
    {
        if (array_key_exists($name, $array)) {
            return $array[$name];
        }

        return null;
    }
}
