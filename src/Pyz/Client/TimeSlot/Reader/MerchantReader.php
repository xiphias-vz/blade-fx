<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Reader;

use Generated\Shared\Transfer\MerchantSearchRequestTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Client\MerchantStorage\MerchantStorageClient;
use Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface;
use Spryker\Client\MerchantSearch\MerchantSearchClientInterface;
use Spryker\Client\Quote\QuoteClientInterface;

class MerchantReader implements MerchantReaderInterface
{
    public const FIELD_MERCHANT_REF = 'fillialNumber';

    /**
     * @uses \Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter\MerchantSearchResultFormatterPlugin::NAME
     */
    protected const MERCHANT_SEARCH_COLLECTION = 'MerchantSearchCollection';

    /**
     * @var \Spryker\Client\MerchantSearch\MerchantSearchClientInterface
     */
    protected $merchantSearchClient;

    /**
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    protected $merchantClient;

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
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClientInterface $merchantClient
     * @param \Spryker\Client\Quote\QuoteClientInterface $quoteClient
     * @param \Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface $merchantStorageDataExpander
     */
    public function __construct(
        MerchantSearchClientInterface $merchantSearchClient,
        MerchantStorageClient $merchantClient,
        QuoteClientInterface $quoteClient,
        MerchantStorageDataExpanderInterface $merchantStorageDataExpander
    ) {
        $this->merchantSearchClient = $merchantSearchClient;
        $this->merchantClient = $merchantClient;
        $this->quoteClient = $quoteClient;
        $this->merchantStorageDataExpander = $merchantStorageDataExpander;
    }

    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getCurrentMerchant(): MerchantTransfer
    {
        $currentMerchantReference = $this->quoteClient->getQuote()->getMerchantReference();
        $merchantTransfer = new MerchantTransfer();

        if (empty($currentMerchantReference)) {
            if (isset($_COOKIE['merchant_switcher_selector-merchant_reference'])) {
                $currentMerchantReference = $_COOKIE['merchant_switcher_selector-merchant_reference'];
                $merchantTransfer->setMerchantReference($currentMerchantReference);
            } elseif (isset($_COOKIE['current_store'])) {
                $merchantTransfer = $this->setMerchantTransferFromStoreName($_COOKIE['current_store']);
            }
        } else {
            $merchantTransfer->setMerchantReference($currentMerchantReference);
        }

        return $this->merchantStorageDataExpander->expand($merchantTransfer);
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

    /**
     * @param string $storeName
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function setMerchantTransferFromStoreName(string $storeName): MerchantTransfer
    {
        $merchantTransfer = new MerchantTransfer();
        $merchantList = $this->merchantClient->getMerchantsList()->getMerchants();

        foreach ($merchantList as $merchant) {
            if (isset($merchant->getVisibleStoresArray()[$storeName])) {
                return $merchantTransfer->setMerchantReference($merchant->getVisibleStoresArray()[$storeName]['fillialNumber']);
            }
        }

        return $merchantTransfer;
    }
}
