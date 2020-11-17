<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Checkout;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\Checkout\CheckoutClient as SprykerCheckoutClient;

/**
 * @method \Pyz\Client\Checkout\CheckoutFactory getFactory()
 */
class CheckoutClient extends SprykerCheckoutClient
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function placeOrder(QuoteTransfer $quoteTransfer)
    {
        $this->getFactory()->getOrderHistoryBoostingClient()->extendCustomerTransfer($quoteTransfer);

        return parent::placeOrder($quoteTransfer);
    }
}
