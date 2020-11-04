<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\MerchantCapacityChecker;

use Generated\Shared\Transfer\AddressTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;

class MerchantCapacityChecker implements MerchantCapacityCheckerInterface
{
    /**
     * @var \Pyz\Client\Customer\CustomerClientInterface
     */
    protected $customerClient;

    /**
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    protected $merchantStorageClient;

    /**
     * @param \Pyz\Client\Customer\CustomerClientInterface $customerClient
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClientInterface $merchantStorageClient
     */
    public function __construct(CustomerClientInterface $customerClient, MerchantStorageClientInterface $merchantStorageClient)
    {
        $this->customerClient = $customerClient;
        $this->merchantStorageClient = $merchantStorageClient;
    }

    /**
     * @return bool
     */
    public function hasMerchantCapacityForDelivery(): bool
    {
        $customerTransfer = $this->customerClient->getCustomer();
        $customerTransfer = $this->customerClient->getCustomerById($customerTransfer->getIdCustomer());
        $currentMerchantTransfer = $this->getCurrentMerchant($customerTransfer);

        if (!$currentMerchantTransfer || !$customerTransfer->getIdCustomer()) {
            return false;
        }

        return $this->hasCustomerDeliverablePostalCode($customerTransfer, $currentMerchantTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    protected function getCurrentMerchant(CustomerTransfer $customerTransfer): ?MerchantTransfer
    {
        foreach ($this->merchantStorageClient->getMerchantsList()->getMerchants() as $merchantTransfer) {
            if ($merchantTransfer->getMerchantReference() === $customerTransfer->getMerchantReference()) {
                return $merchantTransfer;
            }
        }

        return null;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return bool
     */
    protected function hasCustomerDeliverablePostalCode(CustomerTransfer $customerTransfer, MerchantTransfer $merchantTransfer): bool
    {
        $defaultShippingAddress = $this->getCustomerDefaultShippingAddress($customerTransfer);

        return $defaultShippingAddress
            && $defaultShippingAddress->getZipCode()
            && in_array($defaultShippingAddress->getZipCode(), $merchantTransfer->getDeliveryPostalCodes());
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\AddressTransfer|null
     */
    protected function getCustomerDefaultShippingAddress(CustomerTransfer $customerTransfer): ?AddressTransfer
    {
        foreach ($customerTransfer->getShippingAddress() as $shippingAddressTransfer) {
            if ($shippingAddressTransfer->getIsDefaultShipping()) {
                return $shippingAddressTransfer;
            }
        }

        return null;
    }
}
