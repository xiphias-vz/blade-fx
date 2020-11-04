<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcher;

use Pyz\Client\Customer\CustomerClientInterface;
use SprykerShop\Yves\MerchantSwitcherWidget\Dependency\Client\MerchantSwitcherWidgetToMerchantSwitcherClientInterface;
use SprykerShop\Yves\MerchantSwitcherWidget\Dependency\Client\MerchantSwitcherWidgetToQuoteClientInterface;
use SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcher\MerchantSwitcher as SprykerMerchantSwitcher;

class MerchantSwitcher extends SprykerMerchantSwitcher
{
    /**
     * @var \Pyz\Client\Customer\CustomerClientInterface
     */
    private $customerClient;

    /**
     * @param \SprykerShop\Yves\MerchantSwitcherWidget\Dependency\Client\MerchantSwitcherWidgetToQuoteClientInterface $quoteClient
     * @param \SprykerShop\Yves\MerchantSwitcherWidget\Dependency\Client\MerchantSwitcherWidgetToMerchantSwitcherClientInterface $merchantSwitcherClient
     * @param \Pyz\Client\Customer\CustomerClientInterface $customerClient
     */
    public function __construct(
        MerchantSwitcherWidgetToQuoteClientInterface $quoteClient,
        MerchantSwitcherWidgetToMerchantSwitcherClientInterface $merchantSwitcherClient,
        CustomerClientInterface $customerClient
    ) {
        parent::__construct($quoteClient, $merchantSwitcherClient);
        $this->customerClient = $customerClient;
    }

    /**
     * @param string $merchantReference
     *
     * @return void
     */
    public function switchMerchantInQuoteAndCustomer(string $merchantReference): void
    {
        $this->switchMerchantInQuote($merchantReference);
        $this->switchMerchantInCustomer($merchantReference);
    }

    /**
     * @param string $merchantReference
     *
     * @return void
     */
    protected function switchMerchantInCustomer(string $merchantReference): void
    {
        $customerTransfer = $this->customerClient->getCustomer();
        $customerTransfer->setMerchantReference($merchantReference);
        $customerResponse = $this->customerClient->updateCustomer($customerTransfer);
        $customerTransfer = $customerResponse->getCustomerTransfer();
        $this->customerClient->setCustomer($customerTransfer);
    }
}
