<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderHistoryBoosting;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\OrderHistoryBoosting\OrderHistoryBoostingFactory getFactory()
 */
class OrderHistoryBoostingClient extends AbstractClient implements OrderHistoryBoostingClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function extendCustomerTransfer(QuoteTransfer $quoteTransfer): void
    {
        $customerTransfer = $this->getFactory()->getCustomerClient()->getCustomer();

        if (!$customerTransfer) {
            return;
        }

        $customerTransfer->setPhone($quoteTransfer->getCustomer()->getPhone());
        $customerTransfer->setMobilePhoneNumber($quoteTransfer->getCustomer()->getMobilePhoneNumber());
        $previouslyBoughtSkus = $customerTransfer->getPreviouslyBoughtSkus();
        if ($previouslyBoughtSkus === null) {
            $previouslyBoughtSkus = [];
        }

        foreach ($quoteTransfer->getItems() as $itemTransfer) {
            $previouslyBoughtSkus[] = $itemTransfer->getSku();
        }

        $previouslyBoughtSkus = array_unique(array_filter($previouslyBoughtSkus));
        $customerTransfer->setPreviouslyBoughtSkus($previouslyBoughtSkus);

        $this->getFactory()->getCustomerClient()->setCustomer($customerTransfer);

        if ($this->getFactory()->getCodeBucket() != 'CZ') {
            $userProvider = new CustomerUserProvider();
            $userProvider->setCdcAccountInfo('', $customerTransfer);
        }
    }
}
