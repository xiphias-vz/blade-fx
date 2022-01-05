<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Merchant\Reader;

use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Client\Merchant\Reader\Context\MerchantContextReaderInterface;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;
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
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    protected $merchantStorageClient;

    /**
     * @var \Pyz\Client\Merchant\Reader\Context\MerchantContextReaderInterface
     */
    protected $merchantContextReader;

    /**
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClientInterface $merchantStorageClient
     * @param \Pyz\Client\Merchant\Reader\Context\MerchantContextReaderInterface $merchantContextReader
     * @param \Spryker\Client\MerchantSearch\MerchantSearchClientInterface $merchantSearchClient
     * @param \Spryker\Client\Quote\QuoteClientInterface $quoteClient
     * @param \Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface $merchantStorageDataExpander
     */
    public function __construct(
        MerchantStorageClientInterface $merchantStorageClient,
        MerchantContextReaderInterface $merchantContextReader,
        MerchantSearchClientInterface $merchantSearchClient,
        QuoteClientInterface $quoteClient,
        MerchantStorageDataExpanderInterface $merchantStorageDataExpander
    ) {
        $this->merchantStorageClient = $merchantStorageClient;
        $this->merchantContextReader = $merchantContextReader;
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
        $currentMerchantReference = $this->quoteClient->getQuote()->getMerchantReference();
        $merchants = $this->merchantStorageClient->getMerchantsList()->getMerchants()[0]->getVisibleStoresArray();
        $currentStore = $this->merchantContextReader->getCurrentStore();

        foreach ($merchants as $store => $merchant) {
            if ($store === $currentStore) {
                return (new MerchantTransfer())->fromArray($merchant, true);
            }
        }

        throw new MerchantNotFound(
            "Current user Merchant with merchantReference: `$currentMerchantReference` was't found in the merchant storage"
        );
    }
}
