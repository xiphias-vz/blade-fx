<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Quote;

use Generated\Shared\Transfer\CookieTransfer;
use Spryker\Client\Quote\QuoteClientInterface;
use Spryker\Client\Session\SessionClientInterface;
use Spryker\Yves\Kernel\AbstractFactory;

class QuoteFactory extends AbstractFactory
{
    /**
     * @return SessionClientInterface
     */
    public function getSessionClient(): SessionClientInterface
    {
        return $this->getProvidedDependency(QuoteDependencyProvider::CLIENT_SESSION);
    }

    /**
     * @return QuoteClientInterface
     */
    public function getQuoteClient(): QuoteClientInterface
    {
        return $this->getProvidedDependency(QuoteDependencyProvider::CLIENT_QUOTE);
    }

    /**
     * @return \Generated\Shared\Transfer\CookieTransfer
     */
    public function createCookieTransfer(): CookieTransfer
    {
        return new CookieTransfer();
    }
}
