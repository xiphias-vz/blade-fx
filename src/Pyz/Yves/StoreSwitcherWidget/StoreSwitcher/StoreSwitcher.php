<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\StoreSwitcher;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\QuoteUpdateRequestAttributesTransfer;
use Generated\Shared\Transfer\QuoteUpdateRequestTransfer;
use Pyz\Client\MerchantStorage\MerchantStorageClient;
use Spryker\Client\PersistentCart\PersistentCartClientInterface;
use Spryker\Client\Quote\QuoteClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;

class StoreSwitcher
{
    public const COOKIE_STORE_IDENTIFIER = 'current_store';
    public const FIELD_MERCHANT_REF = 'fillialNumber';

    /**
     * @var \Spryker\Client\Store\StoreClientInterface
     */
    protected $storeClient;

    /**
     * @var \Spryker\Client\Quote\QuoteClientInterface
     */
    protected $quoteClient;

    /**
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClient
     */
    protected $merchantClient;

    /**
     * @var \Spryker\Client\PersistentCart\PersistentCartClientInterface
     */
    protected $persistentCartClient;

    /**
     * @param \Spryker\Client\Quote\QuoteClientInterface $quoteClient
     * @param \Spryker\Client\Store\StoreClientInterface $storeClient
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClient $merchantClient
     * @param \Spryker\Client\PersistentCart\PersistentCartClientInterface $persistentCartClient
     */
    public function __construct(
        QuoteClientInterface $quoteClient,
        StoreClientInterface $storeClient,
        MerchantStorageClient $merchantClient,
        PersistentCartClientInterface $persistentCartClient
    ) {
        $this->quoteClient = $quoteClient;
        $this->storeClient = $storeClient;
        $this->merchantClient = $merchantClient;
        $this->persistentCartClient = $persistentCartClient;
    }

    /**
     * @param string $store
     * @param \Symfony\Component\HttpFoundation\Response $response
     * @param bool $isPwdProtected
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function switchStore(string $store, Response $response, bool $isPwdProtected): Response
    {
        $response->headers->setCookie(new Cookie(static::COOKIE_STORE_IDENTIFIER, $store, time() + (86400 * 30)));

        if ($isPwdProtected == true) {
            $response->headers->setCookie(new Cookie(static::COOKIE_STORE_IDENTIFIER, $store));
        }

        $this->switchStoreInQuote($store);

        return $response;
    }

    /**
     * @param string $storeName
     *
     * @return void
     */
    public function switchStoreInQuote(string $storeName): void
    {
        $quoteTransfer = $this->quoteClient->getQuote();
        $merchant = $this->merchantClient->getMerchantsList()->getMerchants()[0];
        if (isset($merchant->getVisibleStoresArray()[$storeName])) {
            $quoteTransfer->setMerchantReference($merchant->getVisibleStoresArray()[$storeName][static::FIELD_MERCHANT_REF]);
        }
        $store = $this->storeClient->getStoreByName($storeName);
        $quoteTransfer = $quoteTransfer->setStore($store);
        $this->quoteClient->setQuote($quoteTransfer);
        $this->updatePersistentCartQuote($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    protected function updatePersistentCartQuote(QuoteTransfer $quoteTransfer): void
    {
        $quoteUpdateRequestTransfer = (new QuoteUpdateRequestTransfer())
            ->setCustomer($quoteTransfer->getCustomer())
            ->setIdQuote($quoteTransfer->getIdQuote())
            ->setQuoteUpdateRequestAttributes((new QuoteUpdateRequestAttributesTransfer())->setStore($quoteTransfer->getStore()));

        if ($quoteUpdateRequestTransfer->getCustomer() != null) {
            $this->persistentCartClient->updateQuote($quoteUpdateRequestTransfer);
        }
    }
}
