<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\AddressTransfer;
use Generated\Shared\Transfer\CountryTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Plugin\Application\CustomerTransferCustom;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\CustomerPage\Controller\ProfileController as SprykerShopProfileController;

/**
 * Class ProfileController
 *
 * @package Pyz\Yves\CustomerPage\Controller
 */
class ProfileController extends SprykerShopProfileController
{
    /**
     * @param array $customerData
     *
     * @return bool
     */
    protected function processProfileUpdate(array $customerData)
    {
        $customerTransferCustom = new CustomerTransferCustom();
        $customerTransfer = $customerTransferCustom->fromProfileEvent($customerData["data"]);
        $customerTransfer->setIdCustomer($this->getLoggedInCustomerTransfer()->getIdCustomer());

        return $this->processProfileUpdateByTransfer($customerTransfer, true);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     * @param bool $doCurrentProfileUpdate
     *
     * @return bool
     */
    public function processProfileUpdateByTransfer(CustomerTransfer $customerTransfer, bool $doCurrentProfileUpdate): bool
    {
        $customerResponseTransfer = $this
            ->getFactory()
            ->getCustomerClient()
            ->updateCustomer($customerTransfer);

        if ($customerResponseTransfer->getIsSuccess()) {
             $customerTransfer = $this
                 ->getFactory()
                 ->getCustomerClient()
                 ->getCustomerByEmail($customerTransfer);

             $isNewAddress = $customerTransfer->getDefaultBillingAddress() == null;
            $idCountry = $customerTransfer->getCountry();
            if (is_string($idCountry) == true) {
                $countryIso2Code = $idCountry;
                $idCountry = $this->getIdCountryFromISO2CodeFromConfig($countryIso2Code);
            } else {
                $countryIso2Code = $this->getCountryISO2CodeFromConfig($idCountry);
            }

             $addressTransfer = new AddressTransfer();
             $addressTransfer
                 ->setCustomerId($customerTransfer->getIdCustomer())
                 ->setAddress1($customerTransfer->getAddress1())
                 ->setAddress2($customerTransfer->getAddress2())
                 ->setCity($customerTransfer->getCity())
                 ->setZipCode($customerTransfer->getZipCode())
                 ->setPhone($customerTransfer->getPhone())
                 ->setCellPhone($customerTransfer->getMobilePhoneNumber())
                 ->setFirstName($customerTransfer->getFirstName())
                 ->setLastName($customerTransfer->getLastName())
                 ->setEmail($customerTransfer->getEmail())
                 ->setFkCountry($idCountry)
                 ->setCountry((new CountryTransfer())->setIso2Code($countryIso2Code)->setIdCountry($idCountry));

            if (!empty($customerTransfer->getCity()) &&
                 !empty($customerTransfer->getZipCode())) {
                if (!$isNewAddress) {
                    $addressTransfer->setIdCustomerAddress($customerTransfer->getDefaultBillingAddress());

                    $this
                        ->getFactory()
                        ->getCustomerClient()
                        ->updateAddressAndCustomerDefaultAddresses($addressTransfer);
                }
            }

            if ($isNewAddress) {
                $this
                    ->getFactory()
                    ->getCustomerClient()
                    ->createAddressAndUpdateCustomerDefaultAddresses($addressTransfer);
            }

             $this->updateLoggedInCustomerTransfer($customerResponseTransfer->getCustomerTransfer());

            if ($doCurrentProfileUpdate) {
                $this->addSuccessMessage(self::MESSAGE_PROFILE_CHANGE_SUCCESS);
            }

            return true;
        }

        $this->processResponseErrors($customerResponseTransfer);

        return false;
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

    /**
     * @param string|null $iso2Code
     *
     * @return int
     */
    public function getIdCountryFromISO2CodeFromConfig(?string $iso2Code): int
    {
        $countries = Config::get(CustomerConstants::CUSTOMER_COUNTRY_ISO_2_CODE);
        if ($iso2Code == null) {
            return 60;
        } else {
            if ($countries != null) {
                return (int)array_search($iso2Code, $countries);
            } else {
                return 60;
            }
        }
    }
}
