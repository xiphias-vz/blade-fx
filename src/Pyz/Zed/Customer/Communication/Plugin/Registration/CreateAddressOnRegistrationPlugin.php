<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Plugin\Registration;

use Generated\Shared\Transfer\AddressesTransfer;
use Generated\Shared\Transfer\AddressTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\Zed\CustomerExtension\Dependency\Plugin\PostCustomerRegistrationPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\Customer\Communication\CustomerCommunicationFactory getFactory()
 * @method \Spryker\Zed\Customer\Business\CustomerFacadeInterface getFacade()
 * @method \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Customer\CustomerConfig getConfig()
 * @method \Spryker\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class CreateAddressOnRegistrationPlugin extends AbstractPlugin implements PostCustomerRegistrationPluginInterface
{
    /**
     * Persist customer default address during registration
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return void
     */
    public function execute(CustomerTransfer $customerTransfer): void
    {
        $addressTransfer = $this->extractAddressFromCustomer($customerTransfer);

        if (!$addressTransfer) {
            return;
        }

        $addressTransfer = $this->getFacade()->createAddress($addressTransfer);

        $addressCollection = new AddressesTransfer();
        $addressCollection->addAddress($addressTransfer);
        $customerTransfer->setAddresses($addressCollection);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\AddressTransfer|null
     */
    private function extractAddressFromCustomer(CustomerTransfer $customerTransfer): ?AddressTransfer
    {
        if (!$customerTransfer->getAddress1()) {
            return null;
        }

        $customerTransfer
            ->setPhone($customerTransfer->getPhonePrefix() . $customerTransfer->getPhone())
            ->setMobilePhoneNumber($customerTransfer->getMobilePhonePrefix() . $customerTransfer->getMobilePhoneNumber());

        $addressTransfer = new AddressTransfer();
        $addressTransfer->fromArray($customerTransfer->toArray(), true);
        $addressTransfer
            ->setIsDefaultBilling(true)
            ->setFkCountry($addressTransfer->getCountry())
            ->setCellPhone($customerTransfer->getMobilePhoneNumber())
            ->setIsDefaultShipping(true);

        return $addressTransfer;
    }
}
