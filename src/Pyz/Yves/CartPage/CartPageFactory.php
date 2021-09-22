<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage;

use Pyz\Client\DepositProductOption\DepositProductOptionClientInterface;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Spryker\Client\Quote\QuoteClientInterface;
use Spryker\Client\Session\SessionClientInterface;
use SprykerShop\Yves\CartPage\CartPageFactory as SprykerCartPageFactory;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBag;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

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
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    public function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(CartPageDependencyProvider::SERVICE_FORM_CSRF_PROVIDER);
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
}
