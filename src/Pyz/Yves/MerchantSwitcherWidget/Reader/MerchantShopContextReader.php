<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Reader;

use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;

/**
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory getFactory()
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig getConfig()
 */
class MerchantShopContextReader
{
    /**
     * @var \Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver
     */
    private $shopContextResolver;

    /**
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    private $merchantStorageClient;

    /**
     * @param \Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver $shopContextResolver
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClientInterface $merchantStorageClient
     */
    public function __construct(
        ShopContextResolver $shopContextResolver,
        MerchantStorageClientInterface $merchantStorageClient
    ) {
        $this->shopContextResolver = $shopContextResolver;
        $this->merchantStorageClient = $merchantStorageClient;
    }

    /**
     * @return string|null
     */
    public function getCurrentMerchantReference(): ?string
    {
        $shopContextTransfer = $this->shopContextResolver->resolve();

        return $shopContextTransfer->getMerchantReference();
    }

    /**
     * @return string|null
     */
    public function getCurrentMerchantName(): ?string
    {
        $currentMerchantReference = $this->getCurrentMerchantReference();
        if ($currentMerchantReference === null) {
            return null;
        }

        $merchantList = $this->merchantStorageClient->getMerchantsList();
        foreach ($merchantList->getMerchants() as $merchantTransfer) {
            if ($merchantTransfer->getMerchantReference() === $currentMerchantReference) {
                return $merchantTransfer->getName();
            }
        }

        return null;
    }
}
