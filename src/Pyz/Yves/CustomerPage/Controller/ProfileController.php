<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\AddressTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Yves\CustomerPage\Plugin\Application\CustomerTransferCustom;
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

        $customerTransfer = $this
            ->getFactory()
            ->getCustomerClient()
            ->getCustomerByEmail($customerTransfer);

        $isNewAddress = $customerTransfer->getDefaultBillingAddress() == null;

        $addressTransfer = new AddressTransfer();
        $addressTransfer
            ->setCustomerId($customerTransfer->getIdCustomer())
            ->setAddress1($customerTransfer->getAddress1())
            ->setAddress2($customerTransfer->getAddress2())
            ->setCity($customerTransfer->getCity())
            ->setZipCode($customerTransfer->getZipCode())
            ->setPhone($customerTransfer->getPhone())
            ->setFirstName($customerTransfer->getFirstName())
            ->setLastName($customerTransfer->getLastName())
            ->setEmail($customerTransfer->getEmail());

        if (!$isNewAddress) {
            $addressTransfer->setIdCustomerAddress($customerTransfer->getDefaultBillingAddress());

            $this
                ->getFactory()
                ->getCustomerClient()
                ->updateAddressAndCustomerDefaultAddresses($addressTransfer);
        } else {
            $this
                ->getFactory()
                ->getCustomerClient()
                ->createAddressAndUpdateCustomerDefaultAddresses($addressTransfer);
        }

        if ($customerResponseTransfer->getIsSuccess()) {
            if ($doCurrentProfileUpdate) {
                $this->updateLoggedInCustomerTransfer($customerResponseTransfer->getCustomerTransfer());

                $this->addSuccessMessage(self::MESSAGE_PROFILE_CHANGE_SUCCESS);
            }

            return true;
        }

        $this->processResponseErrors($customerResponseTransfer);

        return false;
    }
}