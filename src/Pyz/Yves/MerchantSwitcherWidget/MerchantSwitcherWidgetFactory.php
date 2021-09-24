<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget;

use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;
use Pyz\Yves\MerchantSwitcherWidget\Cookie\SelectedMerchantCookie;
use Pyz\Yves\MerchantSwitcherWidget\MerchantCapacityChecker\MerchantCapacityChecker;
use Pyz\Yves\MerchantSwitcherWidget\MerchantCapacityChecker\MerchantCapacityCheckerInterface;
use Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcher\MerchantSwitcher;
use Pyz\Yves\MerchantSwitcherWidget\Reader\MerchantShopContextReader;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
use SprykerShop\Yves\MerchantSwitcherWidget\Cookie\SelectedMerchantCookieInterface;
use SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcher\MerchantSwitcherInterface;
use SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory as SprykerMerchantSwitcherWidgetFactory;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \SprykerShop\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetConfig getConfig()
 */
class MerchantSwitcherWidgetFactory extends SprykerMerchantSwitcherWidgetFactory
{
    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcher\MerchantSwitcher
     */
    public function createMerchantSwitcher(): MerchantSwitcherInterface
    {
        return new MerchantSwitcher(
            $this->getQuoteClient(),
            $this->getMerchantSwitcherClient(),
            $this->getCustomerClient()
        );
    }

    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\Reader\MerchantShopContextReader
     */
    public function createMerchantShopContextReader(): MerchantShopContextReader
    {
        return new MerchantShopContextReader(
            $this->createShopContextResolver(),
            $this->getMerchantStorageClient()
        );
    }

    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver
     */
    public function createShopContextResolver(): ShopContextResolver
    {
        return new ShopContextResolver($this->getContainer());
    }

    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\MerchantCapacityChecker\MerchantCapacityCheckerInterface
     */
    public function createMerchantCapacityChecker(): MerchantCapacityCheckerInterface
    {
        return new MerchantCapacityChecker(
            $this->getCustomerClient(),
            $this->getMerchantStorageClient()
        );
    }

    /**
     * @return \Pyz\Client\Customer\CustomerClientInterface
     */
    public function getCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(MerchantSwitcherWidgetDependencyProvider::CLIENT_CUSTOMER);
    }

    /**
     * @return \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    public function getMerchantStorageClient(): MerchantStorageClientInterface
    {
        return $this->getProvidedDependency(MerchantSwitcherWidgetDependencyProvider::CLIENT_MERCHANT_STORAGE);
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    public function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getProvidedDependency(MerchantSwitcherWidgetDependencyProvider::SERVICE_FORM_CSRF_PROVIDER);
    }

    /**
     * @return \SprykerShop\Yves\MerchantSwitcherWidget\Cookie\SelectedMerchantCookieInterface
     */
    public function createSelectedMerchantCookie(): SelectedMerchantCookieInterface
    {
        return new SelectedMerchantCookie(
            $this->getCookies(),
            $this->getRequestStack(),
            $this->getConfig()
        );
    }
}
