<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Merchant;

use Pyz\Client\Merchant\Reader\Context\MerchantContextReader;
use Pyz\Client\Merchant\Reader\Context\MerchantContextReaderInterface;
use Pyz\Client\Merchant\Reader\MerchantReader;
use Pyz\Client\Merchant\Reader\MerchantReaderInterface;
use Pyz\Client\MerchantStorage\MerchantStorageClient;
use Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpander;
use Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\MerchantSearch\MerchantSearchClientInterface;
use Spryker\Client\Quote\QuoteClientInterface;

class MerchantFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\MerchantStorage\MerchantStorageClient
     */
    public function getMerchantStorageClient(): MerchantStorageClient
    {
        return $this->getProvidedDependency(MerchantDependencyProvider::CLIENT_MERCHANT_STORAGE);
    }

    /**
     * @return \Pyz\Client\Merchant\Reader\MerchantReaderInterface
     */
    public function createMerchantReader(): MerchantReaderInterface
    {
        return new MerchantReader(
            $this->getMerchantStorageClient(),
            $this->createMerchantContextReader(),
            $this->getMerchantSearchClient(),
            $this->getQuoteClient(),
            $this->createMerchantStorageDataExpander()
        );
    }

    /**
     * @return \Pyz\Client\Merchant\Reader\Context\MerchantContextReaderInterface
     */
    public function createMerchantContextReader(): MerchantContextReaderInterface
    {
        return new MerchantContextReader(
            $this->getContainer()
        );
    }

    /**
     * @return \Spryker\Client\MerchantSearch\MerchantSearchClientInterface
     */
    protected function getMerchantSearchClient(): MerchantSearchClientInterface
    {
        return $this->getProvidedDependency(MerchantDependencyProvider::CLIENT_MERCHANT_SEARCH);
    }

    /**
     * @return \Pyz\Client\TimeSlot\Expander\MerchantStorageDataExpanderInterface
     */
    public function createMerchantStorageDataExpander(): MerchantStorageDataExpanderInterface
    {
        return new MerchantStorageDataExpander(
            $this->getMerchantStorageClient()
        );
    }

    /**
     * @return \Spryker\Client\Quote\QuoteClientInterface
     */
    public function getQuoteClient(): QuoteClientInterface
    {
        return $this->getProvidedDependency(MerchantDependencyProvider::CLIENT_QUOTE);
    }
}
