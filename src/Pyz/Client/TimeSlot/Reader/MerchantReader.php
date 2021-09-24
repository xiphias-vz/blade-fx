<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Reader;

use Generated\Shared\Transfer\MerchantSearchRequestTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Client\TimeSlot\Exception\MerchantNotFound;
use Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface;
use Spryker\Client\MerchantSearch\MerchantSearchClientInterface;
use Spryker\Client\Quote\QuoteClientInterface;

class MerchantReader implements MerchantReaderInterface
{
    /**
     * @uses \Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter\MerchantSearchResultFormatterPlugin::NAME
     */
    protected const MERCHANT_SEARCH_COLLECTION = 'MerchantSearchCollection';

    /**
     * @var \Spryker\Client\MerchantSearch\MerchantSearchClientInterface
     */
    protected $merchantSearchClient;

    /**
     * @var \Spryker\Client\Quote\QuoteClientInterface
     */
    protected $quoteClient;

    /**
     * @var \Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface
     */
    protected $merchantStorageDataExpander;

    /**
     * @param \Spryker\Client\MerchantSearch\MerchantSearchClientInterface $merchantSearchClient
     * @param \Spryker\Client\Quote\QuoteClientInterface $quoteClient
     * @param \Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface $merchantStorageDataExpander
     */
    public function __construct(
        MerchantSearchClientInterface $merchantSearchClient,
        QuoteClientInterface $quoteClient,
        MerchantStorageDataExpanderInterface $merchantStorageDataExpander
    ) {
        $this->merchantSearchClient = $merchantSearchClient;
        $this->quoteClient = $quoteClient;
        $this->merchantStorageDataExpander = $merchantStorageDataExpander;
    }

    /**
     * @throws \Pyz\Client\TimeSlot\Exception\MerchantNotFound
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getCurrentMerchant(): MerchantTransfer
    {
        $merchantSearchTransfers = $this->getMerchantSearchTransfers();
        $currentMerchantReference = $this->quoteClient->getQuote()->getMerchantReference();

        foreach ($merchantSearchTransfers as $merchantTransfer) {
            if ($merchantTransfer->getMerchantReference() === $currentMerchantReference) {
                $merchantTransfer = (new MerchantTransfer())->fromArray($merchantTransfer->toArray(), true);

                return $this->merchantStorageDataExpander->expand($merchantTransfer);
            }
        }

        throw new MerchantNotFound(
            "Current user Merchant with merchantReference: `$currentMerchantReference` was't found in the merchant storage"
        );
    }

    /**
     * @return \ArrayObject|\Generated\Shared\Transfer\MerchantSearchTransfer[]
     */
    protected function getMerchantSearchTransfers()
    {
        $merchantSearchCollectionTransfer = $this->merchantSearchClient
            ->search(new MerchantSearchRequestTransfer())[static::MERCHANT_SEARCH_COLLECTION];

        return $merchantSearchCollectionTransfer
            ->getMerchants();
    }
}
