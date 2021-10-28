<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage;

use Pyz\Client\DepositProductOption\DepositProductOptionClientInterface;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Yves\CartPage\Dependency\Client\CartPageToZedRequestClientInterface;
use Spryker\Client\Quote\QuoteClientInterface;
use Spryker\Client\Session\SessionClientInterface;
use SprykerShop\Yves\CartPage\CartPageFactory as SprykerCartPageFactory;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBag;

class CartPageFactory extends SprykerCartPageFactory
{
    /**
     * @return \Spryker\Client\Session\SessionClientInterface
     */
    public function getSessionClient(): SessionClientInterface
    {
        return $this->getProvidedDependency(CartPageDependencyProvider::CLIENT_SESSION);
    }

    /**
     * @return \Spryker\Client\Quote\QuoteClientInterface
     */
    public function getBaseQuoteClient(): QuoteClientInterface
    {
        return $this->getProvidedDependency(CartPageDependencyProvider::BASE_CLIENT_QUOTE);
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface|\Symfony\Component\HttpFoundation\Session\SessionBagInterface
     */
    public function getFlashBag()
    {
        return $this->getSessionClient()->getBag($this->getFlashBagName());
    }

    /**
     * @return string
     */
    private function getFlashBagName(): string
    {
        return (new FlashBag())->getName();
    }

    /**
     * @return \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    public function getOrderDetailClient(): OrderDetailClientInterface
    {
        return $this->getProvidedDependency(CartPageDependencyProvider::CLIENT_ORDER_DETAIL);
    }

    /**
     * @return \Pyz\Client\DepositProductOption\DepositProductOptionClientInterface
     */
    public function getDepositProductOptionClient(): DepositProductOptionClientInterface
    {
        return $this->getProvidedDependency(CartPageDependencyProvider::CLIENT_DEPOSIT_PRODUCT_OPTION);
    }

    /**
     * @return \Pyz\Yves\CartPage\Dependency\Client\CartPageToZedRequestClientInterface
     */
    public function getPyzZedRequestClient(): CartPageToZedRequestClientInterface
    {
        return $this->getProvidedDependency(CartPageDependencyProvider::PYZ_CLIENT_ZED_REQUEST);
    }
}
