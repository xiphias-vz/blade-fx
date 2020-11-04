<?php

namespace Pyz\Client\Checkout;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\Checkout\CheckoutClient as SprykerCheckoutClient;

/**
 * @method \Pyz\Client\Checkout\CheckoutFactory getFactory()
 */
class CheckoutClient extends SprykerCheckoutClient
{
    public function placeOrder(QuoteTransfer $quoteTransfer)
    {
        $this->getFactory()->getOrderHistoryBoostingClient()->extendCustomerTransfer($quoteTransfer);

        return parent::placeOrder($quoteTransfer);
    }

}
