<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Controller;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrderAddress;
use Pyz\Shared\FactFinder\Business\Api\FactFinderApiClient;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientValidation;
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
    public const MESSAGE_NO_CUSTOMER = 'checkout.summary.no.customer';

    /**
     * @uses \SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin::CHECKOUT_CUSTOMER
     */
    protected const ROUTE_CHECKOUT_CUSTOMER = 'checkout-customer';

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
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');
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

        $customerTransfer = $this->getFactory()->getCustomerClient()->getCustomer();
        if (isset($customerTransfer)) {
            $firstName = $customerTransfer->getFirstName() ?? '';
            $lastName = $customerTransfer->getLastName() ?? '';
            $zip = $customerTransfer->getZipCode() ?? '';
            $houseNo = $customerTransfer->getAddress2() ?? '';
            $street = $customerTransfer->getAddress1() ?? '';
            $city = $customerTransfer->getCity() ?? '';
            $we = $customerTransfer->getIsAdvertise() ?? '';
            $meinGlobus = $customerTransfer->getIsMeinGlobus() ?? '';

            if ($we == "true") {
                $we = true;
            } else {
                $we = false;
            }
            if ($meinGlobus == "true") {
                $meinGlobus = true;
            } else {
                $meinGlobus = false;
            }

            $storeCodeBucket != "CZ" ? $validAddress = GlobusRestApiClientValidation::addressValidation($firstName, $lastName, $zip, $houseNo, $street, $city, $meinGlobus, $we) : $validAddress = '';
            $response["data"] = $validAddress;
        }

        $quoteTransfer = $this->getFactory()
            ->getQuoteClient()
            ->getQuote();

        $merchantTransfer = $this->getFactory()
            ->getMerchantClient()
            ->getMerchant();

        $isSubstitutionAllowed = $quoteTransfer->getIsSubstitutionAllowed();
        if ($isSubstitutionAllowed === null || $storeCodeBucket == 'CZ') {
            $isSubstitutionAllowed = true;
        }
        $response['isSubstitutionAllowed'] = $isSubstitutionAllowed;

        if ($merchantTransfer->getIsTransportboxEnabled() == true) {
            $response['isTransportboxEnabled'] = true;
        } else {
            $response['isTransportboxEnabled'] = false;
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
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

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

        if ($storeCodeBucket == 'DE') {
            $customerId = $quoteTransfer->getCustomer()->getIdCustomer() ?: '';

            foreach ($quoteTransfer->getItems() as $item) {
                $count = $item->getQuantity() ?: null;
                $productSku = $item->getSku() ?: '';
                $productPrice = $item->getUnitPrice() ?: null;
                $productTitle = $item->getName() ?: '';

                $this->checkoutTrackingEvent($count, $productSku, $productPrice, $customerId, $productTitle);
            }
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
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        $quoteValidationResponseTransfer = $this->canProceedCheckout();
        if (!$quoteValidationResponseTransfer->getIsSuccessful()) {
            $this->processErrorMessages($quoteValidationResponseTransfer->getMessages());

            return $this->redirectResponseInternal(static::ROUTE_CART);
        }

        $customer = $this->getFactory()->getQuoteClient()->getQuote()->getCustomer();
        $quoteTransfer = $this->getFactory()->getQuoteClient()->getQuote();

        if ($customer->getEmail() !== null && $storeCodeBucket == 'DE') {
            $customerProfileFromApi = (array)$this->getAccountInfo();

            $customerPhone = $customer->getPhone();
            $customerMobile = $customer->getMobilePhoneNumber();

            if (isset($customerProfileFromApi['profile']->phones)) {
                $customerPhoneFromApi = $customerProfileFromApi['profile']->phones[1]->number;
                $customerMobilePhoneFromApi = $customerProfileFromApi['profile']->phones[0]->number;

                if ($customerPhone !== $customerPhoneFromApi) {
                    $this->getFactory()
                        ->getCustomerClient()
                        ->getCustomer()
                        ->setPhone($customerPhone);
                    $this->getFactory()
                        ->getQuoteClient()
                        ->getQuote()
                        ->getBillingAddress()
                        ->setPhone($customerPhone);
                    $customerProfileFromApi['profile']->phones[1]->number = $customerPhone;
                }

                if ($customerMobile !== $customerMobilePhoneFromApi) {
                    $this->getFactory()
                        ->getCustomerClient()
                        ->getCustomer()
                        ->setMobilePhoneNumber($customerMobile);
                    $this->getFactory()
                        ->getQuoteClient()
                        ->getQuote()
                        ->getBillingAddress()
                        ->setCellPhone($customerMobile);
                    $customerProfileFromApi['profile']->phones[0]->number = $customerMobile;
                }

                $spySalesOrderAddress = new SpySalesOrderAddress();
                $spySalesOrderAddress->fromArray($quoteTransfer->getBillingAddress()->toArray());
                $spySalesOrderAddress->setPhone($customerPhone);
                $spySalesOrderAddress->setCellPhone($customerMobile);

                $dataProfilePhones = ['profile' => ['phones' => $customerProfileFromApi["profile"]->phones]];

                $this->changeAccountData($dataProfilePhones);
            }
        } else {
            $billingMobile = $quoteTransfer->getBillingAddress()->getCellPhone();
            $customerMobile = $customer->getMobilePhoneNumber();

            if ($customerMobile !== $billingMobile) {
                $this->getFactory()
                    ->getCustomerClient()
                    ->getCustomer()
                    ->setMobilePhoneNumber($customerMobile);
                $this->getFactory()
                    ->getQuoteClient()
                    ->getQuote()
                    ->getBillingAddress()
                    ->setCellPhone($customerMobile);
            }
        }

        if ($customer === null) {
            $this->addErrorMessage(static::MESSAGE_NO_CUSTOMER);

            return $this->redirectResponseInternal(static::ROUTE_CHECKOUT_CUSTOMER);
        }

        $linkAccountWithPayback = $request->get(static::LINK_ACCOUNT_WITH_PAYBACK) == null ?
            0 : (int)$request->get(static::LINK_ACCOUNT_WITH_PAYBACK);
        $paybackNumber = $this->getFactory()->getAntiXss()->xss_clean($request->get(static::PAYBACK_NUMBER)) == null ?
            "" : (string)$this->getFactory()->getAntiXss()->xss_clean($request->get(static::PAYBACK_NUMBER));

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
                    if (isset($payback->cards)) {
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

        $isDepositAllowed = $this->getFactory()->getQuoteClient()->getQuote()->getIsDepositAllowed();
        $viewData['isTransportboxEnabled'] = $isDepositAllowed;

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
     * @return mixed
     */
    public function getAccountInfo()
    {
        $uid = $this->getFactory()->getSessionClient()->get("cdcUID");
        $idToken = $this->getFactory()->getSessionClient()->get("id_token");

        if ($uid == null || $idToken == null) {
            return "";
        }
        $result = GlobusRestApiClientAccount::getAccountInfo($uid, $idToken);

        return json_decode($result);
    }

    /**
     * @return mixed
     */
    public function changeAccountData($data)
    {
        $uid = $this->getFactory()->getSessionClient()->get("cdcUID");

        if ($_SESSION["_sf2_attributes"]["id_token_strong"]) {
            $idToken = $this->getFactory()->getSessionClient()->get("id_token_strong");
        } else {
            $idToken = $this->getFactory()->getSessionClient()->get("id_token");
        }

        if ($uid == null || $idToken == null) {
            return "";
        }
        $result = GlobusRestApiClientAccount::changeAccountData($uid, $data, $idToken);

        if ($result->isSuccess) {
            return true;
        } else {
            return false;
        }
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request|null $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Spryker\Yves\Kernel\View\View
     */
    public function errorAction(?Request $request = null)
    {
        if ($request === null) {
            return $this->view([], [], '@CheckoutPage/views/order-fail/order-fail.twig');
        }

        $response = $this->createStepProcess()->process($request);

        if (!is_array($response)) {
            //Temp fix for infinite redirect
            if ($request->getRequestUri() !== $response->getTargetUrl()) {
                return $response;
            }

            $response = [];
        }

        return $this->view($response, [], '@CheckoutPage/views/order-fail/order-fail.twig');
    }

    /**
     * @param $count
     * @param $productSku
     * @param $productPrice
     * @param $customerId
     * @param $productTitle
     *
     * @return array
     */
    public function checkoutTrackingEvent($count, $productSku, $productPrice, $customerId, $productTitle): array
    {
        $data = [[
            'count' => $count,
            'id' => $productSku,
            'masterId' => $productSku,
            'price' => $productPrice / 100,
            'purchaserId' => $customerId,
            'sid' => session_id(),
            'title' => $productTitle,
            'userId' => $customerId,
        ]];

        return FactFinderApiClient::postTrackCheckoutData($data);
    }
}
