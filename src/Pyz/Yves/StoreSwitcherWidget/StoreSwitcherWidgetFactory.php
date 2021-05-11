<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget;

use Pyz\Client\StoreSwitcher\StoreSwitcherClientInterface;
use Pyz\Yves\StoreSwitcherWidget\StoreSwitcher\StoreSwitcher;
use Spryker\Client\Quote\QuoteClientInterface;
use Spryker\Client\Store\StoreClientInterface;
use Spryker\Yves\Kernel\AbstractFactory;

/**
 * @method \Pyz\Client\StoreSwitcher\StoreSwitcherClient getClient()
 */
class StoreSwitcherWidgetFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getStore()
    {
        return $this->getProvidedDependency(StoreSwitcherWidgetDependencyProvider::STORE);
    }

    /**
     * @return \Pyz\Yves\StoreSwitcherWidget\StoreSwitcher\StoreSwitcher
     */
    public function getStoreSwitcher()
    {
        return new StoreSwitcher($this->getQuoteClient(), $this->getStoreClient());
    }

    /**
     * @return \Spryker\Client\Quote\QuoteClientInterface
     */
    public function getQuoteClient(): QuoteClientInterface
    {
        return $this->getProvidedDependency(StoreSwitcherWidgetDependencyProvider::CLIENT_QUOTE);
    }

    /**
     * @return \Spryker\Client\Store\StoreClientInterface
     */
    public function getStoreClient(): StoreClientInterface
    {
        return $this->getProvidedDependency(StoreSwitcherWidgetDependencyProvider::CLIENT_STORE);
    }

    /**
     * @return \Pyz\Client\StoreSwitcher\StoreSwitcherClientInterface
     */
    public function getStoreSwitcherClient(): StoreSwitcherClientInterface
    {
        return $this->getProvidedDependency(StoreSwitcherWidgetDependencyProvider::CLIENT_STORE_SWITCHER);
    }

    /**
     * @return mixed
     */
    public function getVisibleStoreNames()
    {
        return $this->getClient()->getVisibleStores();
    }
}
