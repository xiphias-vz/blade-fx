<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Generated\Shared\Transfer\ProductAvailabilityTransfer;
use Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\FactFinder\Business\Api\FactFinderApiClient;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Pyz\Yves\CartPage\Plugin\Router\CartPageRouteProviderPlugin;
use Spryker\Shared\Messenger\MessengerConfig;
use SprykerShop\Yves\CartPage\Controller\CartController as SprykerCartController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Yves\CartPage\CartPageFactory getFactory()
 */
class CartController extends SprykerCartController
{
    public const REQUEST_HEADER_REFERER = 'referer';
    public const ADD_ITEMS_SUCCESS = 'cart.add.items.success';

    protected const ADD_TO_CART_CSRF_TOKEN_NAME = 'add-to-cart';
    protected const ADD_TO_CART_AJAX_CSRF_TOKEN_NAME = 'add-to-cart-ajax';
    protected const CHANGE_CART_AJAX_CSRF_TOKEN_NAME = 'change-cart-ajax';
    protected const CHANGE_CART_CSRF_TOKEN_NAME = 'change-cart';
    protected const CLEAR_CART_CSRF_TOKEN_NAME = 'clear-cart';
    protected const REQUEST_PARAM_CSRF_TOKEN = 'token';
    protected const REQUEST_PARAMETER_TOKEN = 'token';
    protected const REQUEST_ATTRIBUTE_PRODUCT_ABSTRACT_ID = 'productAbstractId';

    protected const KEY_ERROR = 'error';

    protected const ITEMS = 'items';

    protected const ITEM_QUANTITY = 'itemQuantity';

    protected const OPERATION = 'operation';

    protected const DEFAULT_QUANTITY = 1;

    protected const MESSAGE_AJAX_ADD_TO_CART_INVALID_ACTION = 'catalog.add_to_cart.invalid_action';

    /**
     * @param array $selectedAttributes
     *
     * @return array
     */
    public function executeIndexAction(array $selectedAttributes = []): array
    {
        $data = parent::executeIndexAction($selectedAttributes);
        $quoteTransfer = $data['cart'];

        if (count($quoteTransfer->getItems()) > 0 && $data['isQuoteValid'] == false) {
            $amountToPay = $quoteTransfer->getTotals()->getPriceToPay() / 100;
            if ($amountToPay > 15) {
                $data['isQuoteValid'] = true;
            }
        }

        $orderDetailRequestTransfer = $this->getOrderDetailRequestTransfer($quoteTransfer);
        $orderDetails = $this->getFactory()
            ->getOrderDetailClient()
            ->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);

        $data['taxPayments'] = $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS] ?? [];
        $data['orderLimitationMessage'] = $this->getCartLimitationMessage();
        $data['cartItemsSkuWithQuantity'] = $this->getProductSkuWithQuantity($data);

        return $data;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $sku
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function addAction(Request $request, $sku): RedirectResponse
    {
        if ($this->isCsrfTokenValid(static::ADD_TO_CART_CSRF_TOKEN_NAME, $request)) {
            $this->addItemFromPdp($request, $sku);
        } else {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);
        }

        return $this->redirect($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function clearAction(Request $request): RedirectResponse
    {
        if ($this->isCsrfTokenValid(static::CLEAR_CART_CSRF_TOKEN_NAME, $request)) {
            $this->executeClearAction();
        } else {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);
        }

        return $this->redirect($request);
    }

    /**
     * @return void
     */
    protected function executeClearAction(): void
    {
        $this->getFactory()
            ->getBaseQuoteClient()
            ->clearQuote();
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    protected function executeAddAjaxAction(Request $request): array
    {
        if (isset($_POST['myToken']) && isset($_POST['myOperation']) && isset($_POST['myQuantity'])) {
            $token = $_POST['myToken'];
            $operation = $_POST['myOperation'];
            $quantity = $_POST['myQuantity'];
        }

        if (!$this->isCsrfTokenValid(static::ADD_TO_CART_AJAX_CSRF_TOKEN_NAME, $request)) {
            return $this->createAjaxAddErrorResponse(
                Response::HTTP_BAD_REQUEST,
                static::MESSAGE_PERMISSION_FAILED
            );
        }
        $productAbstractId = $request->attributes->get(static::REQUEST_ATTRIBUTE_PRODUCT_ABSTRACT_ID);

        if (!$productAbstractId || !$this->canAddCartItem()) {
            return [];
        }

        if (!$this->canAddCartItem()) {
            return $this->createAjaxAddErrorResponse(
                Response::HTTP_FORBIDDEN,
                static::MESSAGE_PERMISSION_FAILED
            );
        }
        $messageTransfers = $this->addItemToCart($request, $productAbstractId);

        $error = '';

        if (count($messageTransfers) !== 0) {
            $error = $messageTransfers[0]->getValue();
        }

        $cartQuantity = $this->getFactory()
            ->getCartClient()
            ->getItemCount();

        return [
            static::KEY_CODE => Response::HTTP_OK,
            static::REQUEST_PARAMETER_QUANTITY => $cartQuantity,
            static::KEY_ERROR => $error,
            static::ITEM_QUANTITY => $this->getCurrentItemQuantityFromCart($productAbstractId),
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function changeAjaxAction(Request $request): JsonResponse
    {
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        if (!$this->isCsrfTokenValid(static::CHANGE_CART_AJAX_CSRF_TOKEN_NAME, $request)) {
            return $this->createChangeAjaxErrorResponse(
                Response::HTTP_BAD_REQUEST,
                static::MESSAGE_PERMISSION_FAILED
            );
        }
        $productAbstractId = $request->attributes->get(static::REQUEST_ATTRIBUTE_PRODUCT_ABSTRACT_ID);
        $productViewTransfer = $this->getFactory()
            ->getProductStorageClient()
            ->findProductAbstractViewTransfer($productAbstractId, $this->getLocale());

        $productConcreteSku = $this->resolveProductConcreteSkuFromProductAbstractId($productViewTransfer);
        if (isset($_POST['myToken']) && isset($_POST['myOperation']) && isset($_POST['myQuantity'])) {
            $operation = $_POST['myOperation'];
            $quantity = $_POST['myQuantity'];
        } else {
            $quantity = $request->request->getInt('quantity');
            $operation = $request->request->get('operation');
        }

        $this->getFactory()
            ->getCartClient()
            ->changeItemQuantity((string)$productConcreteSku, null, $quantity);

        $messageTransfers = $this->getFactory()
            ->getZedRequestClient()
            ->getResponsesErrorMessages();

        $error = '';
        if (count($messageTransfers) !== 0) {
            $error = $messageTransfers[0]->getValue();
            $availableQuantity = $this->getAvailableQuantityOfProduct($productAbstractId)->getAvailability()->trim()->toInt();

            if ($quantity > $availableQuantity) {
                $this->getFactory()
                    ->getCartClient()
                    ->changeItemQuantity((string)$productConcreteSku, null, $availableQuantity);
            }
        }

        $cartQuantity = $this->getFactory()
            ->getCartClient()
            ->getItemCount();

        if ($storeCodeBucket == 'DE') {
            if ($operation !== "REMOVE") {
                if ($operation == "ADD") {
                    $count = $_REQUEST['addedQuantity'] ?? 0;
                } else {
                    $count = $_REQUEST['myQuantity'] ?? $quantity;
                }
                $productSku = $_REQUEST['productSku'] ?? $productViewTransfer->getSku();
                $productPrice = $_REQUEST['productPrice'] ?? $productViewTransfer->getPrice();
                $productTitle = $_REQUEST['productTitle'] ?? $productViewTransfer->getName();

                $this->cartTrackingEvent($count, $productSku, $productPrice, $productTitle);
            }
        }

        $response = [
            static::KEY_CODE => Response::HTTP_OK,
            static::REQUEST_PARAMETER_QUANTITY => $cartQuantity,
            static::KEY_ERROR => $error,
            static::OPERATION => $operation,
            static::ITEM_QUANTITY => $this->getCurrentItemQuantityFromCart($productAbstractId),
        ];

        return $this->jsonResponse($response);
    }

    /**
     * @param int $productAbstractId
     *
     * @return \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer
     */
    protected function getAvailableQuantityOfProduct(int $productAbstractId): ProductConcreteAvailabilityTransfer
    {
        $storeTransfer = $this->getFactory()->getCartClient()->getQuote()->getStore();
        $itemTransfer = $this->getItemTransferByIdProductAbstract($productAbstractId);

        $productAvailabilityTransfer = (new ProductAvailabilityTransfer())
            ->setProductSku($itemTransfer->getSku())
            ->setStore($storeTransfer);

        return $this->getFactory()
            ->getPyzZedRequestClient()
            ->checkProductAvailability($productAvailabilityTransfer);
    }

    /**
     * @param int $idProductAbstract
     *
     * @return int
     */
    protected function getCurrentItemQuantityFromCart(int $idProductAbstract): int
    {
        $quantity = 0;

        $itemsInCart = $this->getFactory()->getCartClient()->getQuote()
            ->getItems();

        foreach ($itemsInCart as $item) {
            if ($item->getIdProductAbstract() == $idProductAbstract) {
                return $item->getQuantity();
            }
        }

        return $quantity;
    }

    /**
     * @param int $idProductAbstract
     *
     * @return \Generated\Shared\Transfer\ItemTransfer|null
     */
    protected function getItemTransferByIdProductAbstract(int $idProductAbstract): ?ItemTransfer
    {
        $itemsInCart = $this->getFactory()->getCartClient()->getQuote()
            ->getItems();

        foreach ($itemsInCart as $item) {
            if ($item->getIdProductAbstract() == $idProductAbstract) {
                return $item;
            }
        }

        return null;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $sku
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function changeAction(Request $request, $sku): RedirectResponse
    {
        if (!$this->isCsrfTokenValid(static::CHANGE_CART_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
        }

        $quantity = $request->request->getInt('quantity', static::DEFAULT_QUANTITY);

        if (!$quantity) {
            $quantity = static::DEFAULT_QUANTITY;
        }

        if (!$this->canChangeCartItem($quantity)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
        }

        $this->getFactory()
            ->getCartClient()
            ->changeItemQuantity($sku, $request->get('groupKey'), $quantity);

        $this->getFactory()
            ->getZedRequestClient()
            ->addResponseMessagesToMessenger();

        return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $sku
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeAction(Request $request, $sku): RedirectResponse
    {
        if ($this->isCsrfTokenValid(static::CHANGE_CART_CSRF_TOKEN_NAME, $request)) {
            if (!$this->canRemoveCartItem()) {
                $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

                return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
            }

            $groupKey = $request->get('groupKey', null);

            if (!$this->canRemoveCartItem()) {
                $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

                return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
            }

            $this->getFactory()
                ->getCartClient()
                ->removeItem($sku, $groupKey);

            $this->getFactory()
                ->getZedRequestClient()
                ->addResponseMessagesToMessenger();

            return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
        } else {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);
        }

        return $this->redirect($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function redirect(Request $request): RedirectResponse
    {
        if ($request->headers->has(static::REQUEST_HEADER_REFERER)) {
            return $this->redirectResponseExternal($request->headers->get(static::REQUEST_HEADER_REFERER));
        }

        return $this->redirectResponseInternal(CartPageRouteProviderPlugin::ROUTE_NAME_CART);
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        if ($request->get(static::REQUEST_PARAMETER_TOKEN) !== null) {
            $csrfToken = $this->createCsrfToken(
                $id,
                $request->get(static::REQUEST_PARAMETER_TOKEN)
            );

            return $this->getFactory()
                ->getCsrfTokenManager()
                ->isTokenValid($csrfToken);
        } else {
            return true;
        }
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return string|null
     */
    protected function resolveProductConcreteSkuFromProductAbstractId(ProductViewTransfer $productViewTransfer): ?string
    {
        $productConcreteIds = $productViewTransfer->getAttributeMap()->getProductConcreteIds();
        if (count($productConcreteIds) === 1) {
            return $productViewTransfer->getSku();
        }

        $merchantRef = $this->getFactory()->getBaseQuoteClient()->getQuote()->getMerchantReference();
        foreach ($productConcreteIds as $key => $id) {
            if (str_contains($key, "_" . $merchantRef)) {
                return $key;
            }
        }

        return array_key_first($productConcreteIds);
    }

    /**
     * @return string
     */
    private function getCartLimitationMessage(): string
    {
        /** @var \Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface $flashBag */
        $flashBag = $this->getFactory()->getFlashBag();

        /** @var string[] $infoMessages */
        $infoMessages = $flashBag->get(MessengerConfig::FLASH_MESSAGES_INFO);

        $infoMessages = array_unique($infoMessages);

        return implode("\n", $infoMessages);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\OrderDetailRequestTransfer
     */
    private function getOrderDetailRequestTransfer(QuoteTransfer $quoteTransfer): OrderDetailRequestTransfer
    {
        return (new OrderDetailRequestTransfer())
            ->setItems($quoteTransfer->getItems())
            ->setTotals($quoteTransfer->getTotals());
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $productAbstractId
     *
     * @return void
     */
    public function addItemFromPdp(Request $request, string $productAbstractId): void
    {
        $data = [];

        $messageTransfers = $this->addItemToCart($request, $productAbstractId);

        if (count($messageTransfers) !== 0) {
            $data['error'] = $messageTransfers[0]->getValue();
        }
    }

    /**
     * @param int $code
     * @param string $message
     *
     * @return array
     */
    protected function createAjaxAddErrorResponse(int $code, string $message = ''): array
    {
        return [
            static::KEY_CODE => $code,
            static::KEY_ERROR => $message ?? '',
        ];
    }

    /**
     * @param int $code
     * @param string $message
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    protected function createChangeAjaxErrorResponse(int $code, string $message = ''): JsonResponse
    {
        $response = [
            static::KEY_CODE => $code,
            static::KEY_ERROR => $message ?? '',
        ];

         return $this->jsonResponse($response);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param int $productAbstractId
     *
     * @return \Generated\Shared\Transfer\MessageTransfer[]
     */
    protected function addItemToCart(Request $request, int $productAbstractId): array
    {
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

        $quantity = $request->get('quantity', 1);
        $productViewTransfer = $this->getFactory()
            ->getProductStorageClient()
            ->findProductAbstractViewTransfer($productAbstractId, $this->getLocale());
        if ($productViewTransfer) {
            $productConcreteSku = $this->resolveProductConcreteSkuFromProductAbstractId($productViewTransfer);
            $itemTransfer = (new ItemTransfer())
                ->setSku($productConcreteSku)
                ->setQuantity($quantity);

            $depositProductOptions = $this->getFactory()
                ->getDepositProductOptionClient()
                ->getDepositProductOptionsByIdProductAbstract($productAbstractId, $productViewTransfer);

            $this->addProductOptions($depositProductOptions, $itemTransfer);
            $itemTransfer = $this->executePreAddToCartPlugins($itemTransfer, $request->request->all());

            $this->getFactory()->getCartClient()->addItem($itemTransfer, $request->request->all());
        } else {
            $this->addErrorMessage("Item not found!");
        }

        $messageTransfers = $this->getFactory()
            ->getZedRequestClient()
            ->getResponsesErrorMessages();

        if (count($messageTransfers) !== 0) {
            $this->addErrorMessage($messageTransfers[0]->getValue());
        }

        if ($storeCodeBucket == 'DE') {
            $count = $_REQUEST['myQuantity'] ?? $quantity;
            $productSku = $_REQUEST['productSku'] ?? $productViewTransfer->getSku();
            $productPrice = $_REQUEST['productPrice'] ?? $productViewTransfer->getPrice();
            $productTitle = $_REQUEST['productTitle'] ?? $productViewTransfer->getName();

            $this->cartTrackingEvent($count, $productSku, $productPrice, $productTitle);
        }

        return $messageTransfers;
    }

    /**
     * @param $count
     * @param $productSku
     * @param $productPrice
     * @param $productTitle
     *
     * @return array
     */
    public function cartTrackingEvent($count, $productSku, $productPrice, $productTitle): array
    {
        $data = [[
            'count' => (int)$count,
            'id' => $productSku,
            'masterId' => $productSku,
            'price' => $productPrice / 100,
            'sid' => session_id(),
            'title' => $productTitle,
        ]];

        return FactFinderApiClient::postTrackCartData($data);
    }

    /**
     * @param $data
     *
     * @return array
     */
    public function getProductSkuWithQuantity($data): array {
        $cartItems = $data['cartItems'];
        $cartItemsSku = [];
        foreach ($cartItems as $item) {
            $key = $item['sku'];
            $value= $item['quantity'];
            $cartItemsSku[] = array($key, $value);
        }

        return $cartItemsSku;
    }

}
