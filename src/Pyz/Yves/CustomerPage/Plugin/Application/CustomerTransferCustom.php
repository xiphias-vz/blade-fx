<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Application;

use Elastica\JSON;
use Exception;
use Generated\Shared\Transfer\CustomerTransfer;

/**
 * Class CustomerTransferCustom
 *
 * @package Pyz\Yves\CustomerPage\Plugin\Application
 */
class CustomerTransferCustom
{
    /**
     * @param string $eventData
     * @param \Generated\Shared\Transfer\CustomerTransfer|null $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function fromProfileEvent($eventData, ?CustomerTransfer $customerTransfer = null): CustomerTransfer
    {
        if ($customerTransfer == null) {
            $customerTransfer = new CustomerTransfer();
        }

        $data = JSON::parse($eventData);

        $customerTransfer->setEmail($data["profile"]["email"])
            ->setFirstName($data["profile"]["firstName"])
            ->setLastName($data["profile"]["lastName"])
            ->setCity($data["profile"]["city"])
            ->setZipCode($data["profile"]["zip"])
            ->setBirthDay($data["profile"]["birthDay"])
            ->setBirthMonth($data["profile"]["birthMonth"])
            ->setBirthYear($data["profile"]["birthYear"])
            ->setDateOfBirth($data["profile"]["birthYear"] . '-' . $data["profile"]["birthMonth"] . '-' . $data["profile"]["birthDay"])
            ->setUsername($data["profile"]["email"])
            ->setGender($this->getMapGender($data["profile"]["gender"]))
            ->setSalutation($this->getMapSalutation($data["data"]["salutation"]))
            ->setAddress1($data["data"]["address"]["street"])
            ->setAddress2($data["data"]["address"]["houseNo"])
            ->setCity($data["profile"]["city"])
            ->setZipCode($data["profile"]["zip"])
            ->setCountry($data["profile"]["country"]);

        if (array_key_exists("cardID", $data["data"])) {
            $customerTransfer->setMyGlobusCard($data["data"]["cardID"]);
        }

        try {
            if (array_key_exists("terms.meinGlobus", $data["preferences"])) {
                $customerTransfer->setThirdPartyRegistration($data["preferences"]["terms.meinGlobus"]["isConsentGranted"]);
            } else {
                $customerTransfer->setThirdPartyRegistration($data["preferences"]["terms"]["meinGlobus"]["isConsentGranted"]);
            }
        } catch (Exception $ex) {
        }

        if (array_key_exists("phones", $data["profile"])) {
            $phones = $data["profile"]["phones"];
            try {
                $customerTransfer->setPhone(count($phones) > 0 ? $phones[0]["number"] : '')
                    ->setMobilePhoneNumber(count($phones) > 1 ? $phones[1]["number"] : '');
            } catch (Exception $ex) {
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
}
