<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Controller;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as SprykerCheckoutControllerAlias;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CheckoutPage\CheckoutPageFactory getFactory()
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

        $quoteTransfer->setCartNote(json_encode($quoteTransfer->getCartNote()));

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
     * @return mixed
     */
    public function shipmentAction(Request $request)
    {
        $quoteValidationResponseTransfer = $this->canProceedCheckout();

        if (!$quoteValidationResponseTransfer->getIsSuccessful()) {
            $this->processErrorMessages($quoteValidationResponseTransfer->getMessages());

            return $this->redirectResponseInternal(static::ROUTE_CART);
        }

        $response = $this->createStepProcess()->process(
            $request,
            $this->getFactory()
                ->createCheckoutFormFactory()
                ->createShipmentFormCollection()
        );

        if (!is_array($response)) {
            return $response;
        }

            return $this->view(
                $response,
                $this->getFactory()->getCustomerPageWidgetPlugins(),
                '@CheckoutPage/views/shipment/shipment.twig'
            );
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getTimeSlotDataAction(Request $request)
    {
        $storeName = $this->getFactory()->getStore()->getStoreName();
        $test = $this->getFactory()->getQuoteClient()->getQuote();

//        $weekDayTimeSlotCapacity = $this->getFactory()->getTimeSlotClient()->getTimeSlot();
        $shipmentMethodTransfer = new ShipmentMethodTransfer();
        $shipmentMethodTransfer->setShipmentMethodKey("click_and_collect");
        $weekDayTimeSlotCapacity = $this->getFactory()->getTimeSlotClient()->expandWithShipmentTimeSlots($shipmentMethodTransfer);

        return new JsonResponse($weekDayTimeSlotCapacity->getTimeSlots()["click_and_collect"]);
    }
}
