<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Controller;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
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
    public const LINK_ACCOUNT_WITH_PAYBACK = 'linkPayBackInput';
    public const PAYBACK_NUMBER = 'paymentCardNumber';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed
     */
    public function customerAction(Request $request)
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
                ->createCustomerFormCollection()
        );

        if (!is_array($response)) {
            return $response;
        }

        return $this->view(
            $response,
            $this->getFactory()->getCustomerPageWidgetPlugins(),
            '@CheckoutPage/views/login/login.twig'
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed
     */
    public function addressAction(Request $request)
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
                ->createAddressFormCollection()
        );

        if (!is_array($response)) {
            return $response;
        }

        return $this->view(
            $response,
            $this->getFactory()->getCustomerPageWidgetPlugins(),
            '@CheckoutPage/views/address/address.twig'
        );
    }

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
     * @return mixed
     */
    public function summaryAction(Request $request)
    {
        $quoteValidationResponseTransfer = $this->canProceedCheckout();
        $linkAccountWithPayback = $request->get(static::LINK_ACCOUNT_WITH_PAYBACK) == null ?
            0 : (int)$request->get(static::LINK_ACCOUNT_WITH_PAYBACK);
        $paybackNumber = $request->get(static::PAYBACK_NUMBER) == null ?
            "" : (string)$request->get(static::PAYBACK_NUMBER);

        $isOrderConnectedWithPayback = $this->getFactory()
            ->getQuoteClient()
            ->getQuote()
            ->getCustomer()
            ->getIsConnected();

        if ($linkAccountWithPayback) {
            $this->getFactory()
                ->getQuoteClient()
                ->getQuote()
                ->getCustomer()
                ->setPaybackNumber($paybackNumber)
                ->setIsConnected(true);
        } else {
            if (!$isOrderConnectedWithPayback) {
                $paybackInfo = (array)$this->getPayBackInfoFromAccount();
                if (isset($paybackInfo['payback'])) {
                    $payback = $paybackInfo['payback'];
                    $cardNumber = $payback->cards[0]->number;
                    $cardNumberWithoutPrefix = substr($cardNumber, 6);
                    $this->getFactory()
                        ->getQuoteClient()
                        ->getQuote()
                        ->getCustomer()
                        ->setPaybackNumber($cardNumberWithoutPrefix)
                        ->setIsConnected(true)
                        ->setIsAccountConnected(true);
                }
            }
        }

        if (!$quoteValidationResponseTransfer->getIsSuccessful()) {
            $this->processErrorMessages($quoteValidationResponseTransfer->getMessages());

            return $this->redirectResponseInternal(static::ROUTE_CART);
        }

        $viewData = $this->createStepProcess()->process(
            $request,
            $this->getFactory()
                ->createCheckoutFormFactory()
                ->createSummaryFormCollection()
        );

        if (!is_array($viewData)) {
            return $viewData;
        }

        return $this->view(
            $viewData,
            $this->getFactory()->getSummaryPageWidgetPlugins(),
            '@CheckoutPage/views/summary/summary.twig'
        );
    }

    /**
     * @return mixed
     */
    public function getPayBackInfoFromAccount()
    {
        $uuid = $this->getFactory()->getSessionClient()->get("cdcUID");
        $idToken = $this->getFactory()->getSessionClient()->get("id_token");

        if ($uuid == null || $idToken == null) {
            return "";
        }
        $result = GlobusRestApiClientAccount::getPayBackInfoFromAccount($uuid, $idToken);

        return json_decode($result);
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

        return [];
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

        $shipmentMethodTransfer = new ShipmentMethodTransfer();
        $shipmentMethodTransfer->setShipmentMethodKey("click_and_collect");
        $shipmentMethodTransfer->setName("Click & Collect");
        $shipmentMethodTransfer->setCarrierName("Filiale");
        $shipmentMethodTransfer->setIdShipmentMethod(1);
        $shipmentMethodTransfer->setStoreCurrencyPrice(299);
        $weekDayTimeSlotCapacity = $this->getFactory()->getTimeSlotClient()->expandWithShipmentTimeSlots($shipmentMethodTransfer);

        return new JsonResponse($weekDayTimeSlotCapacity->getTimeSlots()["click_and_collect"]);
    }
}
