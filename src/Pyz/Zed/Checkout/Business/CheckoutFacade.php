<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Business;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Checkout\Business\CheckoutFacade as SprykerCheckoutFacade;
use Spryker\Zed\Checkout\Business\CheckoutFacadeInterface;

/**
 * @method \Pyz\Zed\Checkout\Business\CheckoutBusinessFactory getFactory()
 */
class CheckoutFacade extends SprykerCheckoutFacade implements CheckoutFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @throws \Exception
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function placeOrder(QuoteTransfer $quoteTransfer)
    {
        if ($quoteTransfer->getUuid() != null) {
            $orderUuid = $this->getFactory()->getSalesOrderFacade()->getOrderByUid($quoteTransfer->getUuid());
        } else {
            $orderUuid = null;
        }
        if ($orderUuid == null) {
            $checkoutResponseTransfer = $this
                ->getFactory()
                ->createCheckoutWorkflow()
                ->placeOrder($quoteTransfer);
        } else {
            $checkoutResponseTransfer = $this
                ->getFactory()
                ->createCheckoutWorkflow()
                ->addCheckoutResponseTransfer($quoteTransfer, $orderUuid);
        }

        return $checkoutResponseTransfer;
    }
}
