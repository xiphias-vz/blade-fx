<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Controller;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as SprykerCheckoutControllerAlias;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageFactory getFactory()
 * @method \Spryker\Client\Checkout\CheckoutClientInterface getClient()
 */
class CheckoutController extends SprykerCheckoutControllerAlias
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function placeOrderAction(Request $request)
    {
        $quoteValidationResponseTransfer = $this->canProceedCheckout();

        if (!$quoteValidationResponseTransfer->getIsSuccessful()) {
            $this->processErrorMessages($quoteValidationResponseTransfer->getMessages());

            return $this->redirectResponseInternal(static::ROUTE_CART);
        }

        $quoteTransfer = $this->getFactory()
            ->getQuoteClient()
            ->getQuote();

        $grandTotal = $quoteTransfer
            ->getTotals()
            ->getGrandTotal();

        if (!$this->can('PlaceOrderWithAmountUpToPermissionPlugin', $grandTotal)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(CheckoutPageControllerProvider::CHECKOUT_SUMMARY);
        }

        return $this->createStepProcess()->process($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function placeOrderDebugAction(Request $request)
    {
        if ($request->isMethod('post')) {
            $encodedQuote = $request->get('_payload');
            if ($encodedQuote === null) {
                return $this->redirectResponseExternal('/');
            }

            $quoteArray = json_decode($encodedQuote, true);
            $quoteTransfer = (new QuoteTransfer())->fromArray($quoteArray, true);
            $this->getFactory()
                ->getQuoteClient()
                ->setQuote($quoteTransfer);

            return $this->placeOrderAction($request);
        }
    }
}
