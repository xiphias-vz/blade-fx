<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Reader;

use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;
use Pyz\Client\TimeSlot\Exception\MerchantNotFound;
use Spryker\Client\Quote\QuoteClientInterface;

class MerchantReader implements MerchantReaderInterface
{
    /**
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    protected $merchantStorageClient;

    /**
     * @var \Spryker\Client\Quote\QuoteClientInterface
     */
    protected $quoteClient;

    /**
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClientInterface $merchantStorageClient
     * @param \Spryker\Client\Quote\QuoteClientInterface $quoteClient
     */
    public function __construct(
        MerchantStorageClientInterface $merchantStorageClient,
        QuoteClientInterface $quoteClient
    ) {
        $this->merchantStorageClient = $merchantStorageClient;
        $this->quoteClient = $quoteClient;
    }

    /**
     * @throws \Pyz\Client\TimeSlot\Exception\MerchantNotFound
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getCurrentMerchant(): MerchantTransfer
    {
        $merchantList = $this->merchantStorageClient->getMerchantsList();
        $currentMerchantReference = $this->quoteClient->getQuote()->getMerchantReference();

        foreach ($merchantList->getMerchants() as $merchantTransfer) {
            if ($merchantTransfer->getMerchantReference() === $currentMerchantReference) {
                return $merchantTransfer;
            }
        }

        throw new MerchantNotFound(
            "Current user Merchant with merchantReference: `$currentMerchantReference` was't found in the merchant storage"
        );
    }
}
